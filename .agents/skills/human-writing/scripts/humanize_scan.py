#!/usr/bin/env python3
"""Scan prose for AI-writing patterns. Stdlib only.

This is a *gauge*, not an authorship detector. It reports candidate matches
that a careful editor should read in context. A hit is not proof of anything:
humans produce every one of these patterns, and a clean scan does not mean a
text "passes" any detector.

Usage
  python3 humanize_scan.py FILE [--register auto|email|message|docs|blog|academic|marketing|social|fiction]
                               [--genre none|fiction|horror|romance|thriller|mystery|fantasy|scifi|literary|comedy|memoir|truecrime|poetry]
                               [--json] [--explain] [--include-quotes] [--max-hits N]
  cat draft.md | python3 humanize_scan.py -

Exit codes: 0 = light or clean, 1 = moderate/heavy pattern density, 2 = bad input.

Sources for the pattern families: Wikipedia "Signs of AI writing" (WikiProject AI
Cleanup, 2023-2026), Kobak et al. 2025 (Science Advances excess vocabulary),
Reinhart et al. 2025 (PNAS), Russell et al. 2025 (ACL), The Economist 2026
study, EQ-Bench creative-writing slop lists, tropes.fyi, blader/humanizer and
conorbronsdon/avoid-ai-writing (both MIT). See references/ for details.
"""

from __future__ import annotations

import argparse
import json
import math
import re
import statistics
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

try:  # vendored from guillaumemeyer/watermarks-remover (MIT)
    from score_stylometry import compute_mattr  # type: ignore
except Exception:  # pragma: no cover
    compute_mattr = None  # type: ignore

FICTION_GENRES = {
    "fiction", "horror", "romance", "thriller", "mystery", "fantasy", "scifi",
    "literary", "comedy", "memoir", "truecrime", "poetry",
}

# ---------------------------------------------------------------------------
# Pattern tables: (regex, label, severity, weight)
# severity: P0 = near-certain artifact, P1 = strong tell, P2 = weak/density tell
# ---------------------------------------------------------------------------

I = re.IGNORECASE

MARKUP_LEAKS = [
    (r"contentReference\[oaicite:\d+\]|oaicite:\d+|oai_citation", "ChatGPT citation markup leak"),
    (r"\bcite?turn\d+(?:search|news|file|image)\d+|\bturn\d+(?:search|news|file|image)\d+", "ChatGPT turnNsearchN leak"),
    (r"\{\s*\"attribution\"\s*:\s*\{\s*\"attributableIndex\"", "ChatGPT attributableIndex JSON leak"),
    (r"\[cite:\s*\d+(?:\s*,\s*\d+)*\]", "Gemini [cite: N] leak"),
    (r"\[span_\d+\]\((?:start|end)_span\)", "Gemini span marker leak"),
    (r"grok_card|grok_render_citation_card_json", "Grok card markup leak"),
    (r"\u3010\d+\u2020[^\u3011]*\u3011", "DeepSeek lenticular citation leak"),
    (r"\[(?:attached_file|web):\d+\]|ppl-ai-file-upload", "Perplexity citation leak"),
    (r":::writing\{[^}]*\}", ":::writing document markup leak"),
    (r"utm_source=(?:chatgpt\.com|openai|copilot\.com|claude\.ai|perplexity(?:\.ai)?)|referrer=grok\.com", "AI-tool URL tracking parameter"),
    (r"```\s*wikitext", "wikitext inside a Markdown fence"),
]

PLACEHOLDERS = [
    (r"\[(?:Your|Insert|Add|Enter|Describe|Specify|Choose|Company|Recipient|Name|Date)[^\]\n]{0,60}\]", "unfilled bracket placeholder"),
    (r"\b(?:19|20)\d{2}-(?:XX|xx)-(?:XX|xx)\b", "placeholder date"),
    (r"\((?:Add|Insert|Include)[^)\n]{0,60}(?:here|if available)\)", "unfilled parenthetical placeholder"),
    (r"<!--\s*(?:Add|Insert|TODO|Fill)[^>]{0,80}-->", "placeholder HTML comment"),
]

CHATBOT_RESIDUE = [
    (r"\bI hope (?:this|that) helps\b", "I hope this helps"),
    (r"^\s*(?:Certainly|Absolutely|Of course|Sure thing|Great question)[!,.]", "sycophantic/eager opener"),
    (r"\bGreat question\b|\bYou'?re absolutely right\b|\bExcellent point\b", "sycophancy"),
    (r"\b(?:Would you like me to|Do you want me to|Want me to|Shall I|Should I continue)\b", "assistant offer"),
    (r"\b(?:let me know if (?:you|there)|feel free to (?:reach out|ask|let me know))\b", "assistant sign-off"),
    (r"\bas an AI(?: language model)?\b|\bas a large language model\b", "AI self-reference"),
    (r"\b(?:as of|up to) my (?:last|latest) (?:training|knowledge) (?:update|cutoff)\b|\bmy knowledge cutoff\b", "knowledge-cutoff disclaimer"),
    (r"^\s*Here(?:'s| is) (?:a|an|the|your) (?:revised|rewritten|polished|updated|draft|version|breakdown|summary|overview)\b", "'Here is a...' wrapper"),
]

KNOWLEDGE_GAPS = [
    (r"\b(?:while|although) specific details (?:are|remain) (?:limited|scarce)\b", "specific-details-are-limited disclaimer"),
    (r"\bnot (?:widely|publicly|extensively) (?:documented|available|disclosed|reported)\b", "not-widely-documented gap filler"),
    (r"\bbased on (?:the )?available (?:information|sources|data)\b", "based-on-available-information hedge"),
    (r"\bmaintains? a (?:relatively )?low (?:public )?profile\b|\bkeeps? (?:personal|private) details private\b", "speculative 'low profile' filler"),
    (r"\b(?:likely|probably) (?:grew up|began (?:his|her|their) career|studied|was born)\b", "speculative biographical guess"),
    (r"\bshould be (?:treated|understood|read|regarded) as [^.]{3,60}? rather than\b", "didactic 'treated as X rather than Y' disclaimer"),
]

# Core rhetorical/structural phrase patterns ---------------------------------
PHRASES = [
    # Staging / negative parallelism
    (r"\b(?:it|this|that)(?:'s| is| was)n?'?t? (?:just|only|merely|simply) (?:about )?[^.;:!?]{2,60}[,;:\u2014\u2013-]+\s*(?:it|this|that)(?:'s| is| was)\b", "not-just-X-it's-Y", "P1", 1.4),
    (r"\b(?:it|this|that)(?:'s| is)n'?t (?:about )?[^.;:!?]{2,50}[,;:\u2014\u2013]\s*(?:it|this|that)(?:'s| is)\b", "it's-not-X-it's-Y", "P1", 1.3),
    (r"\b(?:isn'?t|is not|aren'?t|are not|wasn'?t|was not) (?:just|only|merely|simply|about) [^.;:!?]{2,60}[,;:\u2014\u2013-]+\s*(?:it|this|that|they|he|she)(?:'s| is|'re| are| was)\b", "X-isn't-just-A-it's-B", "P1", 1.4),
    (r"\bnot (?:just|only|merely) [^.;!?]{2,60}?,? but (?:also )?\b", "not-only/just-X-but-Y", "P2", 0.8),
    (r"(?:^|[.!?]\s+)(?:This|That|It) (?:does not|doesn'?t|isn'?t|is not) (?:mean|about)[^.!?]{2,80}[.!?]\s+(?:It|This|That)(?:'s| is| means)\b", "split-sentence not-X. It's-Y", "P1", 1.2),
    (r"(?:^|[.!?]\s+)(?:No|Not) [^.!?\n]{2,30}[.,]\s+(?:No|Not) [^.!?\n]{2,30}[.,]\s+[A-Z][^.!?\n]{2,40}[.!]", "negation chain (Not X. Not Y. Z.)", "P1", 1.2),
    (r"\b(?:rather than|instead of) (?:simply |merely |just )?[\w' -]{2,40}(?:[,.]|$)", "'rather than X' contrast (check if needed)", "P2", 0.4),
    # Staged run-ups, hooks, candor
    (r"(?:^|[.!?]\s+)(?:Let'?s (?:dive in|delve|explore|break (?:this|it) down|unpack|take a (?:closer )?look|get started)|Here'?s (?:the thing|what you need to know|the kicker|the catch|why)|The (?:thing|truth|reality) is)\b", "staged run-up / hook", "P1", 1.1),
    (r"(?:^|\n)\s*(?:Honestly|Look|Real talk|Plot twist|Hot take|Fun fact|Pro tip|Spoiler)[?:,.!]", "fake-candid/label opener", "P1", 1.0),
    (r"(?:^|[.!?]\s+)The (?:result|catch|kicker|best part|twist|answer|problem|upshot)\?\s", "self-answered 'The X?' hook", "P1", 1.1),
    (r"\b(?:Honest caveat|in the interest of (?:full )?transparency|I want to be upfront|to be fully transparent|I'?d rather flag)\b", "narrated candor", "P1", 1.0),
    (r"\bthe (?:one|single) (?:thing|most important (?:thing|correction|point))\b", "'the one thing' framing", "P2", 0.7),
    (r"\b(?:Imagine|Picture|Envision) a (?:world|future) (?:where|in which)\b", "imagine-a-world opener", "P1", 1.1),
    (r"\bin (?:today'?s|an?|the|our) (?:(?:fast[- ]paced|ever[- ](?:evolving|changing)|rapidly (?:evolving|changing)|digital|modern|interconnected|complex|dynamic|increasingly \w+),? ){1,3}(?:world|landscape|era|age|environment|society|marketplace)\b", "in-today's-fast-paced-world", "P1", 1.3),
    (r"\bin today'?s (?:[\w-]+,? ){0,3}(?:world|landscape|era|age|environment|society|marketplace|economy|climate)\b", "in-today's-X-landscape", "P1", 1.3),
    (r"\bin an era (?:of|where|when)\b|\bin a world (?:where|of)\b", "in-an-era/in-a-world framing", "P2", 0.7),
    # Significance inflation / legacy
    (r"\b(?:stands?|serves?) as (?:a |an )?(?:testament|reminder|beacon|symbol|cornerstone|catalyst|hub)\b", "stands/serves as a testament/reminder", "P1", 1.3),
    (r"\ba testament to\b", "a testament to", "P1", 1.2),
    (r"\b(?:plays?|played) an? (?:pivotal|crucial|vital|key|significant|instrumental|central) role\b", "plays a pivotal/crucial role", "P1", 1.1),
    (r"\bmark(?:s|ed|ing)? (?:a|an) (?:pivotal|significant|major|new|important|key) (?:moment|milestone|chapter|shift|turning point|step)\b", "marking a pivotal moment", "P1", 1.2),
    (r"\b(?:underscore|highlight|emphasize|emphasise)s? (?:the|its|their|his|her) (?:importance|significance|need|role|value|commitment)\b", "underscores its importance", "P1", 1.1),
    (r"\b(?:enduring|lasting|indelible|rich) (?:legacy|mark|heritage|tradition|tapestry)\b", "enduring legacy / indelible mark", "P1", 1.1),
    (r"\breflects? (?:a )?(?:broader|wider|larger|growing) (?:trend|movement|shift|pattern|recognition)\b", "reflects a broader trend", "P1", 1.1),
    (r"\bsetting the stage for\b|\bpaving the way for\b|\blaying the groundwork for\b", "setting the stage / paving the way", "P1", 1.0),
    (r"\b(?:evolving|shifting|changing|broader) landscape\b", "evolving landscape", "P1", 1.0),
    (r"\bdeeply rooted\b|\bfocal point\b|\bkey turning point\b", "significance cliche", "P2", 0.7),
    (r"\b(?:the future(?: of [\w ]{1,25}?)? (?:looks|is|seems) (?:bright|promising)|exciting times (?:lie )?ahead|only time will tell|a step in the right direction|one thing is (?:certain|clear))\b", "generic upbeat closer", "P1", 1.2),
    (r"\b(?:despite|in spite of) (?:these|its|the|their|such) (?:challenges|obstacles|setbacks|hurdles)\b[^.]{0,80}\b(?:continues? to|remains?)\b", "despite-challenges-continues-to-thrive", "P1", 1.3),
    (r"\bfaces? (?:several |numerous |a number of |significant )?challenges\b", "faces-challenges formula", "P2", 0.6),
    # Superficial -ing riders at clause end
    (r",\s*(?:thereby |thus )?(?:highlighting|underscoring|emphasizing|emphasising|showcasing|reflecting|symbolizing|symbolising|signaling|signalling|illustrating|demonstrating|reinforcing|cementing|solidifying|fostering|cultivating|contributing to|ensuring|enhancing|encompassing|embodying|capturing)\b", "superficial -ing rider", "P1", 1.0),
    # Borrowed authority / vague attribution / notability
    (r"\b(?:experts|observers|analysts|critics|scholars|researchers|historians|industry (?:reports|leaders|insiders))(?: have)? (?:say|said|argue|argued|note|noted|believe|suggest|agree|point out|have cited|cite)\b", "vague attribution", "P1", 1.1),
    (r"\b(?:studies|research|reports) (?:show|shows|suggest|suggests|indicate|indicates|have shown)\b", "unnamed 'studies show'", "P2", 0.8),
    (r"\b(?:independent|significant|widespread|extensive) (?:media )?coverage\b|\bcited (?:in|by) (?:outlets|publications)\b|\bactive social media presence\b|\bfeatured in (?:several|numerous|various|multiple)\b", "canned notability/coverage claim", "P1", 1.1),
    (r"\b(?:associated|connected|linked|tied) (?:with|to) (?:the )?(?:leadership|development|management|founding|creation)\b|\bin (?:connection|association) with\b", "vague connection/association", "P2", 0.8),
    (r"\b(?:famously|notoriously|as we all know|a classic example)\b", "appeal to familiarity", "P2", 0.6),
    # Copula avoidance
    (r"\b(?:serves|served|serving) as (?:a|an|the)\b", "serves as (copula avoidance)", "P2", 0.7),
    (r"\bboasts? (?:a|an|over|more than|\d)\b", "boasts (copula avoidance)", "P2", 0.8),
    (r"\bholds the distinction of\b|\bstands as\b", "stands as / holds the distinction", "P2", 0.8),
    (r"(?:^|[.!?]\s+)[A-Z][\w ]{0,40} refers to (?:a|an|the)\b", "'X refers to' definition lead", "P2", 0.5),
    # Sayings / pseudo-depth / Claudish
    (r"\b(?:the real question is|at (?:its|the) (?:core|heart)|what (?:really|truly) matters|fundamentally|the heart of the matter|make no mistake)\b", "pseudo-depth framing", "P1", 1.0),
    (r"\bis the (?:language|currency|architecture|grammar|DNA|operating system) of\b", "X-is-the-language-of-Y aphorism", "P1", 1.1),
    (r"\bwhere (?:the|its|this) \w+ (?:actually|really) lives\b", "'where X actually lives'", "P1", 1.0),
    (r"\bload-bearing (?:assumption|claim|invariant|premise|constraint|dependency|argument|abstraction|detail|part)\b", "load-bearing (figurative)", "P1", 1.0),
    (r"\b(?:does(?:n'?t| not) survive contact with|the prior runs the other way|worth being precise about|sit with that|that'?s not nothing|worth naming)\b", "Claudish / performed-insight phrase", "P1", 1.0),
    (r"\b(?:wedge|wedged|dodged) the\b", "Claudish tech verb (wedge/dodge)", "P2", 0.5),
    (r"\b(?:a real|the real) \w+,? not (?:a |an |the )?\w+", "'a real X, not Y'", "P2", 0.7),
    (r"\bthink of (?:it|this|them) (?:as|like)\b", "'think of it as' analogy", "P2", 0.6),
    (r"(?:^|[.!?]\s+)(?:Two|Three|Four|Five|Six|Seven) (?:things|constraints|reasons|lessons|takeaways|points|factors|pillars|questions) (?:shape|matter|stand out|to know|you need|drive|define|worth)\b", "compulsive counting / preamble", "P1", 0.9),
    (r"\bso,? to answer your question\b|\bto answer your question\b", "tie-back to the question", "P1", 0.9),
    # Hedging and filler
    (r"\b(?:could|might|may) (?:potentially|possibly|perhaps|arguably|eventually) (?:be|have|become|lead|create|unlock|transform|help)\b", "stacked hedge", "P1", 0.9),
    (r"\bit(?:'s| is) (?:important|crucial|essential|worth|vital|critical) (?:to )?(?:note|noting|remember|mention|consider|highlight)\b", "it's-important-to-note", "P1", 1.0),
    (r"\b(?:needless to say|it goes without saying|at the end of the day|when it comes to)\b", "filler phrase", "P2", 0.6),
    (r"\b(?:in order to|due to the fact that|in terms of|at this point in time|has the ability to|in the event that)\b", "wordy construction (clarity edit, not an AI marker)", "P2", 0.3),
    (r"(?:^|\n|[.!?]\s+)(?:In (?:conclusion|summary|closing)|To (?:summarize|sum up|conclude|wrap (?:it|things) up))\b[,:]?", "signposted conclusion", "P1", 1.0),
    (r"(?:^|\n|[.!?]\s+)(?:Additionally|Furthermore|Moreover|Notably|Importantly|Interestingly|Ultimately|Overall),", "stock sentence-initial transition", "P2", 0.6),
    (r"\b(?:from [\w' -]{2,25} to [\w' -]{2,25}),? (?:and )?from\b|\bfrom [\w' -]{2,25} to [\w' -]{2,25} to\b", "false range (from X to Y to Z)", "P2", 0.7),
    (r"\bwhether you(?:'re| are) (?:a |an )?[\w' -]{2,30} or (?:a |an )?[\w' -]{2,30}\b", "false-breadth 'whether you're X or Y'", "P2", 0.7),
    (r"\b(?:Meet|Say hello to|Enter) [A-Z]\w{1,25}[,.]\s+(?:your|the) new\b", "launch-copy introduction", "P1", 0.9),
    (r"\b(?:game[- ]changer|game[- ]changing|paradigm shift|next level|unlock (?:the|your) (?:full )?potential|take (?:it|your \w+) to the next level)\b", "marketing cliche", "P1", 1.0),
    (r"\b(?:nestled|in the heart of|breathtaking|must-visit|hidden gem|vibrant (?:community|culture|city|hub|scene))\b", "travel-brochure language", "P1", 1.0),
    (r"\b(?:This one is worth your time|Thank me later|Don'?t sleep on this|Save this for later|Bookmark this)\b", "social endorsement closer", "P1", 0.9),
    (r"\b(?:I keep coming back to|I can'?t stop thinking about|still thinking about this)\b", "lingering-attention claim", "P2", 0.7),
    # Template letter/comment openers (human-possible, so P1 not P0)
    (r"\bI hope (?:this|my) (?:message|email) finds you well\b", "'finds you well' opener", "P1", 1.0),
    (r"\bI am writing to (?:express|inform|follow up|reach out|let you know)\b", "'I am writing to' opener", "P1", 1.0),
    (r"\bI understand (?:your|the) concerns?\b", "canned concern acknowledgement", "P1", 0.9),
    # Self-announcing document structure (SlopShape 2026)
    (r"\bin this (?:post|article|guide|piece|blog|essay|section|write-up),? (?:I|we)(?:'ll| will| are going to| want to)\b", "announced structure ('In this post, we'll...')", "P1", 1.1),
    (r"\b(?:by the end of this (?:post|article|guide)|here(?:'s| is) what (?:we'll|you'll|I'll) cover|this (?:article|post|guide) (?:will )?(?:explores?|covers?|walks? you through|breaks? down))\b", "announced structure / payoff promise", "P1", 1.0),
    (r"(?:^|\n|[.!?]\s+)(?:To recap|Let'?s recap|Key takeaways|The bottom line)\b[,:]?", "recap ending", "P1", 0.9),
    # Edit-summary / comment templates (Wikipedia 2026)
    (r"\b(?:while|whilst) (?:preserving|retaining|maintaining|keeping) (?:the )?(?:original|existing|core)\b", "'while preserving the original' procedural tell", "P1", 1.0),
    (r"\b(?:to ensure|ensuring|for improved|improved) (?:clarity|neutrality|flow|readability|verifiability|consistency)(?:,| and)\b", "canned improvement assurance", "P1", 1.0),
]

# Vocabulary tiers -----------------------------------------------------------
# Tier A: strong frequency markers (Kobak 2025 excess ratios, Wikipedia AI vocab,
#         Reinhart 2025, EQ-Bench). Flag every hit; weight by density.
TIER_A = {
    "delve": 1.4, "delves": 1.6, "delved": 1.5, "delving": 1.4,
    "underscore": 1.1, "underscores": 1.3, "underscored": 1.1, "underscoring": 1.2,
    "meticulous": 1.0, "meticulously": 1.2, "intricate": 1.0, "intricacies": 1.1, "intricately": 1.0,
    "showcase": 1.0, "showcases": 1.0, "showcasing": 1.2, "showcased": 1.0,
    "tapestry": 1.5, "testament": 1.2, "pivotal": 1.0, "commendable": 1.1, "garner": 0.9,
    "garnered": 1.0, "realm": 1.0, "realms": 1.0, "multifaceted": 1.1, "interplay": 0.9,
    "boasts": 0.8, "bolstered": 0.9, "bolstering": 0.9, "seamless": 0.9, "seamlessly": 1.0,
    "camaraderie": 1.2, "palpable": 1.1, "unwavering": 1.0, "embark": 0.9, "embarked": 0.8,
    "beacon": 0.9, "nestled": 1.0, "vibrant": 0.8, "enduring": 0.8, "groundbreaking": 0.9,
    "transformative": 0.8, "paramount": 0.9, "unparalleled": 0.9, "invaluable": 0.7,
    "encompassing": 0.8, "harnessing": 0.8, "fostering": 0.9, "navigating": 0.7,
    "leveraging": 0.8, "revolutionizing": 0.9, "revolutionize": 0.8, "elevate": 0.7,
    "ever-evolving": 1.1, "game-changer": 1.0, "synergy": 0.9, "synergies": 0.9,
    "holistic": 0.8, "actionable": 0.7, "impactful": 0.8, "learnings": 0.7,
    "quintessential": 0.8, "burgeoning": 0.8, "labyrinthine": 0.9, "symphony": 0.9,
    "whimsical": 0.8, "solace": 0.9, "amidst": 0.8, "resonate": 0.7, "resonates": 0.8,
}
# Tier B: legitimate words that become a tell in clusters (2+ per paragraph)
TIER_B = {
    "crucial", "vital", "essential", "key", "significant", "significantly", "notably",
    "additionally", "furthermore", "moreover", "robust", "comprehensive", "enhance",
    "enhances", "enhancing", "enhanced", "foster", "fosters", "leverage", "utilize",
    "utilizes", "utilizing", "facilitate", "facilitates", "streamline", "streamlined",
    "empower", "empowers", "empowering", "navigate", "harness", "unlock", "unlocks",
    "landscape", "ecosystem", "framework", "journey", "insights", "nuanced", "align",
    "aligns", "aligning", "cultivate", "cultivating", "profound", "diverse", "dynamic",
    "innovative", "cutting-edge", "state-of-the-art", "remarkable", "notable",
    "exceptional", "increasingly", "implications", "considerations", "consequences",
    "interdependence", "quietly", "deeply", "genuinely", "truly", "arguably",
    "fundamentally", "precisely", "honest", "honestly", "straightforward", "valuable",
    "highlighting", "emphasizing", "emphasising", "underpin", "underpins", "paving",
    "intersection", "integration", "commitment", "ensure", "ensures", "ensuring",
    "empirical", "causal", "correlate", "mechanism", "methodology", "parameter",
}
# Fiction slop words (EQ-Bench / antislop over-representation) - density only
FICTION_SLOP_WORDS = {
    "whisper", "whispered", "whispers", "whispering", "echo", "echoed", "echoes",
    "echoing", "shadow", "shadows", "flicker", "flickered", "flickering", "shimmer",
    "shimmering", "shimmered", "hum", "hummed", "humming", "quiet", "quietly",
    "silence", "liminal", "ethereal", "void", "gaze", "tendrils", "palpable",
    "crimson", "obsidian", "ozone", "scent", "tapestry", "unspoken", "weight",
    "testament", "symphony", "dance", "danced", "glint", "glinted", "etched",
    "unease", "dread", "flicker", "ancient", "eldritch", "otherworldly",
}
SPECTRAL = {"ghost", "ghosts", "ghostly", "spectral", "echo", "echoes", "echoed", "whisper",
            "whispers", "whispered", "shadow", "shadows", "quiet", "hum", "humming", "liminal",
            "ethereal", "void", "haunting", "silence", "phantom", "shimmer", "flicker"}

STOCK_NAMES = [
    "Elara", "Elena Voss", "Voss", "Vance", "Kael", "Kaelen", "Lyra", "Thorne", "Aris", "Silas",
    "Elias", "Seraphina", "Anya", "Liora", "Mira", "Nyx", "Orion", "Caelan", "Aldric",
    "Eldoria", "Aetheria", "Blackwood", "Emily Carter", "Sarah Thompson", "Sarah Chen",
    "Emily Chen", "Marcus Reynolds", "Dr. Aris", "Lena Petrova", "Evelyn", "Juno Hale",
]

FICTION_PHRASES = [
    (r"\b(?:voice|whisper) (?:barely|was barely|little more than) (?:above )?a whisper\b|\bvoice barely audible\b", "voice-barely-a-whisper", 1.2),
    (r"\b(?:let out|released|exhaled) a breath (?:she|he|they|I) (?:didn'?t|did not|hadn'?t) (?:know|realize)\b", "breath-they-didn't-know-they-were-holding", 1.4),
    (r"\b(?:couldn'?t|could not) (?:help but|shake the feeling)\b", "couldn't help but / shake the feeling", 1.0),
    (r"\b(?:a )?(?:shiver|chill) (?:ran|run|went|crept|traveled|travelled) (?:down|up) (?:her|his|my|their) spine\b", "shiver down spine", 1.0),
    (r"\b(?:heart|pulse) (?:pounding|hammering|racing|thundering) (?:in|against) (?:her|his|my|their) (?:chest|ribs|ears)\b", "heart pounding in chest", 0.9),
    (r"\b(?:the )?(?:words|silence|question|tension) hung (?:heavy )?in the air\b|\bhung heavy in the air\b", "hung in the air", 1.0),
    (r"\bthe air (?:was )?thick with\b|\bair grew thick\b", "air thick with", 0.9),
    (r"\bsomething (?:akin to|like) [a-z]+\b|\ba flicker of (?:something|recognition|hope|fear|doubt)\b", "flicker of something / something akin to", 0.9),
    (r"\b(?:a )?(?:mix|mixture) of [a-z]+ and [a-z]+\b", "a mixture of X and Y (emotion)", 0.8),
    (r"\b(?:jaw|fists?) (?:clenched|tightened)\b|\bknuckles (?:turned |turning )?white\b", "stock physical tell", 0.6),
    (r"\bthe weight of (?:it all|the world|his|her|their|my|what|everything)\b|\bthe weight of (?:the )?(?:silence|words|moment|decision)\b", "'the weight of' abstraction", 0.9),
    (r"\b(?:eyes|gaze) (?:never leaving|locked on|fixed on|darting)\b", "stock eye-direction", 0.6),
    (r"\ba (?:small|faint|wry|slow) smile (?:played|tugged|playing|tugging) (?:at|on|across)\b", "smile playing on lips", 0.9),
    (r"\bfor the first time in (?:a long time|years|forever)\b", "for the first time in a long time", 0.7),
    (r"\bdays (?:turned|bled) into weeks\b|\bweeks (?:turned|bled) into months\b", "days turned into weeks", 0.9),
    (r"\b(?:sun|light) (?:dipped|sank|slipped) below the horizon\b|\bcasting long shadows\b|\bpainting the sky\b", "sunset stock image", 0.9),
    (r"\bdust motes (?:danced|drifted|swirled)\b", "dust motes danced", 1.0),
    (r"\b(?:ready|prepared) to face whatever (?:came|lay|challenges)\b|\bwhatever (?:challenges|the future) (?:lay|held) ahead\b", "face-whatever-lay-ahead ending", 1.1),
    (r"\b(?:renewed|newfound) sense of (?:purpose|hope|determination)\b", "newfound sense of purpose", 1.1),
    (r"\b(?:and|but) in that moment,?\b|\bin that (?:single )?moment,? (?:she|he|they|I) (?:knew|understood|realized)\b", "in-that-moment epiphany", 0.8),
    (r"\b(?:tasted|tastes) (?:of|like) (?:almost|grief|regret|memory|longing|loss|possibility|nostalgia|sorrow|fear)\b|\bsmelled (?:of|like) (?:regret|memory|grief|nostalgia|longing)\b", "forced synesthesia", 1.1),
    (r"\bsomething (?:ancient|old|older than)\b[^.]{0,40}\b(?:stirred|woke|waited|watched)\b|\bolder than (?:time|memory|the stars)\b", "horror: 'something ancient stirred'", 1.0),
    (r"\b(?:And )?then I heard (?:it|the|a) (?:knock|knocking|scratch|scratching|breathing|voice)\b[^.]{0,40}\.?\s*$", "stock horror sting last line", 1.2),
    (r"\bI (?:haven'?t|have not) slept since\b|\bif you'?re reading this\b|\bI can still (?:hear|see|feel) (?:it|her|him|them)\b", "creepypasta stock line", 0.9),
    (r"\bIt was (?:all )?just a dream\b|\bwoke up (?:screaming|in a cold sweat)\b", "dream cop-out", 1.0),
    (r"\b(?:From that day (?:on|forward)|Years later|And so it was|In the end)\b", "epilogue/wrap-up marker", 0.6),
    (r"(?-i:^\s*(?:\*\*)?(?:Epilogue|EPILOGUE|The End|THE END)\b)", "explicit epilogue/end marker", 0.5),
]

FILTER_WORDS = r"\b(?:I|he|she|they|we|you)\s+(?:saw|see|felt|feel|noticed|notice|heard|hear|watched|realized|realised|wondered|seemed|seems|could (?:see|hear|feel|smell|tell)|knew|thought)\b"
SAID_BOOKISMS = (
    "exclaimed retorted hissed growled snarled barked breathed purred chuckled chortled "
    "intoned opined interjected quipped mused murmured muttered stammered sputtered "
    "snapped spat queried inquired enquired rasped husked cooed declared proclaimed "
    "admonished beamed laughed smiled sighed shrugged grinned smirked"
).split()
# Some of those are not speech verbs at all ("smiled", "shrugged") - using them as
# dialogue tags is the worse error, so they are included.

# ---------------------------------------------------------------------------

WORD_RE = re.compile(r"[A-Za-z][A-Za-z'\u2019-]*")
SENT_SPLIT = re.compile(r"(?<=[.!?\u2026])[\"'\u201d\u2019)\]]*\s+(?=[\"'\u201c\u2018(\[]?[A-Z0-9])")
NOMINAL_RE = re.compile(r"\b[a-z]{4,}(?:tion|tions|sion|sions|ment|ments|ity|ities|ness|ance|ances|ence|ences|ization|isation)\b", I)


@dataclass
class Hit:
    category: str
    label: str
    severity: str
    weight: float
    text: str
    line: int


@dataclass
class Report:
    words: int = 0
    sentences: int = 0
    paragraphs: int = 0
    hits: list[Hit] = field(default_factory=list)
    metrics: dict = field(default_factory=dict)
    notes: list[str] = field(default_factory=list)


def protect(text: str, include_quotes: bool) -> str:
    """Blank out spans that should not be judged: code, URLs, quotes, frontmatter.

    Lengths are preserved (replaced with spaces) so line numbers stay right.
    """
    def blank(m: re.Match) -> str:
        return re.sub(r"[^\n]", " ", m.group(0))

    t = text
    t = re.sub(r"\A---\n.*?\n---\n", blank, t, flags=re.S)  # YAML frontmatter
    t = re.sub(r"```.*?```", blank, t, flags=re.S)
    t = re.sub(r"~~~.*?~~~", blank, t, flags=re.S)
    t = re.sub(r"`[^`\n]+`", blank, t)
    t = re.sub(r"https?://\S+", lambda m: m.group(0) if re.search(r"utm_source=|referrer=grok", m.group(0)) else blank(m), t)
    if not include_quotes:
        t = re.sub(r"(?m)^\s*>.*$", blank, t)  # blockquotes
    return t


def line_of(text: str, pos: int) -> int:
    return text.count("\n", 0, pos) + 1


def paragraphs_of(text: str) -> list[str]:
    paras = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    return paras


def is_heading(p: str) -> bool:
    return bool(re.match(r"^#{1,6}\s", p)) or (len(p) < 80 and p.isupper())


def prose_paragraphs(paras: list[str]) -> list[str]:
    out = []
    for p in paras:
        if is_heading(p):
            continue
        if re.match(r"^\s*(?:[-*+]|\d+[.)])\s", p) and all(
            re.match(r"^\s*(?:[-*+]|\d+[.)])\s", ln) for ln in p.splitlines() if ln.strip()
        ):
            continue  # pure list block
        if p.startswith("|"):
            continue  # table
        out.append(p)
    return out


def sentences_of(text: str) -> list[str]:
    flat = re.sub(r"\s*\n\s*", " ", text)
    return [s.strip() for s in SENT_SPLIT.split(flat) if s.strip()]


def scan(raw: str, register: str, genre: str, include_quotes: bool, max_hits: int) -> Report:
    rep = Report()
    text = protect(raw, include_quotes)
    words = WORD_RE.findall(text)
    rep.words = len(words)
    fiction = genre in FICTION_GENRES or register == "fiction"
    paras_all = paragraphs_of(text)
    paras = prose_paragraphs(paras_all)
    rep.paragraphs = len(paras)
    prose = "\n\n".join(paras)
    sents = sentences_of(prose)
    rep.sentences = len(sents)
    per100 = max(rep.words, 1) / 100.0
    per1000 = max(rep.words, 1) / 1000.0

    def add(cat, label, sev, w, m_text, pos):
        if sum(1 for h in rep.hits if h.label == label) >= max_hits:
            return
        clean_t = re.sub(r"^[\s.!?,;:]+", "", m_text).strip()[:120]
        rep.hits.append(Hit(cat, label, sev, w, clean_t, line_of(raw, pos + (len(m_text) - len(m_text.lstrip(" .!?,;:\n"))))))

    # Raw-text leak checks (run on unprotected raw so URLs are seen)
    for pat, label in MARKUP_LEAKS:
        for m in re.finditer(pat, raw, I):
            add("markup-leak", label, "P0", 3.0, m.group(0), m.start())
    for pat, label in PLACEHOLDERS:
        for m in re.finditer(pat, text):
            add("placeholder", label, "P0", 2.5, m.group(0), m.start())

    for pat, label in CHATBOT_RESIDUE:
        for m in re.finditer(pat, text, I | re.M):
            add("chatbot-residue", label, "P0", 2.5, m.group(0), m.start())
    for pat, label in KNOWLEDGE_GAPS:
        for m in re.finditer(pat, text, I):
            add("knowledge-gap-filler", label, "P0", 2.0, m.group(0), m.start())

    for pat, label, sev, w in PHRASES:
        if fiction and label in {"serves as (copula avoidance)", "signposted conclusion", "wordy construction (clarity edit, not an AI marker)"}:
            continue
        for m in re.finditer(pat, text, I | re.M):
            add("phrase", label, sev, w, m.group(0), m.start())

    # Vocabulary -------------------------------------------------------------
    lw = [w.lower().strip("'\u2019") for w in words]
    counts = Counter(lw)
    tier_a_hits = {w: counts[w] for w in TIER_A if counts.get(w)}
    for w, c in sorted(tier_a_hits.items(), key=lambda x: -x[1]):
        for m in list(re.finditer(rf"\b{re.escape(w)}\b", text, I))[:max_hits]:
            add("vocab-tierA", f"AI-frequency word: {w}", "P1", TIER_A[w], m.group(0), m.start())
    # Tier B clustering per paragraph
    cluster_paras = 0
    for p in paras:
        pw = [w.lower() for w in WORD_RE.findall(p)]
        found = sorted({w for w in pw if w in TIER_B})
        if len(found) >= 3 or (len(found) >= 2 and len(pw) < 60):
            cluster_paras += 1
            pos = text.find(p[:40])
            add("vocab-cluster", "tier-B word cluster in one paragraph", "P1", 0.8 + 0.2 * len(found),
                ", ".join(found), max(pos, 0))
    tier_b_total = sum(counts[w] for w in TIER_B)

    # Punctuation & formatting ----------------------------------------------
    em = len(re.findall(r"\u2014", text)) + len(re.findall(r"(?<=\w) -- (?=\w)", text))
    spaced_em = len(re.findall(r" \u2014 ", text))
    en_prose = len(re.findall(r"(?<=[a-z]) \u2013 (?=[a-z])", text))
    curly = len(re.findall(r"[\u201c\u201d\u2018\u2019]", raw))
    arrows = len(re.findall(r"\u2192|\u21d2|\u27f6", text))
    bold = len(re.findall(r"\*\*[^*\n]+\*\*|__[^_\n]+__", raw))
    inline_header_bullets = len(re.findall(r"(?m)^\s*(?:[-*+]|\d+[.)])\s+\*\*[^*\n]+?(?:[:.]\*\*|\*\*\s*[:.\u2014-])", raw))
    headings = re.findall(r"(?m)^#{1,6}\s+(.+)$", raw)
    title_case = 0
    small = {"a", "an", "the", "and", "or", "but", "of", "in", "on", "to", "for", "with", "at", "by", "vs", "from"}
    for h in headings:
        toks = [t for t in re.findall(r"[A-Za-z][\w'-]*", h)]
        if len(toks) >= 4:
            caps = [t for t in toks[1:] if t.lower() not in small]
            if caps and all(t[0].isupper() for t in caps):
                title_case += 1
    emoji_head = len(re.findall(r"(?m)^(?:#{1,6}\s*|\s*[-*]\s*)[\U0001F300-\U0001FAFF\u2600-\u27BF]", raw))
    generic_heads = [h for h in headings if re.match(r"(?i)^(?:overview|introduction|conclusion|final thoughts|key (?:benefits|takeaways|points|features|considerations)|summary|the bottom line|real-world applications|challenges and (?:opportunities|solutions)|why it matters|what'?s next|looking ahead|future outlook)\s*$", h.strip())]
    wh_headers = len([h for h in headings if re.match(r"(?i)^(?:where|what|why|how|when)\b", h.strip())])
    hr = len(re.findall(r"(?m)^\s*(?:---|\*\*\*|___)\s*$", raw))
    commas = prose.count(",")
    semis = prose.count(";")
    parens = prose.count("(")
    colons = len(re.findall(r":(?!//)", prose))
    ands = counts.get("and", 0)

    if not fiction:
        if em / per1000 > 8 and em >= 3:
            add("punctuation", f"em-dash density {em / per1000:.1f}/1000 words", "P2", 1.0, "\u2014", 0)
        if spaced_em >= 3:
            add("punctuation", "spaced em dashes ( \u2014 ) used repeatedly", "P2", 0.5, " \u2014 ", 0)
        if inline_header_bullets >= 3:
            w_ihb = 0.5 if register == "docs" else 1.2
            add("format", f"inline bold-header bullets x{inline_header_bullets}", "P1" if register != "docs" else "P2", w_ihb, "- **Label:** ...", 0)
        if bold / per1000 > 10 and bold >= 4:
            add("format", f"bold density {bold / per1000:.1f}/1000 words", "P2", 0.8, "**...**", 0)
        if title_case >= 2:
            add("format", f"title-case headings x{title_case}", "P2", 0.6, "Heading In Title Case", 0)
        if emoji_head:
            add("format", f"emoji-decorated headings/bullets x{emoji_head}", "P1", 1.0, "emoji", 0)
        if generic_heads and register != "docs":
            add("format", f"generic template headings: {', '.join(generic_heads[:4])}", "P1", 0.9, generic_heads[0], 0)
        if wh_headers >= 2:
            add("format", f"Where/What/Why/How headings x{wh_headers}", "P2", 0.5, headings[0] if headings else "", 0)
        if register not in {"docs"} and headings and rep.words / max(len(headings), 1) < 90 and len(headings) >= 3:
            add("format", "heading density high (<90 words per heading)", "P2", 0.7, f"{len(headings)} headings", 0)
        if hr >= 3:
            add("format", f"thematic break between every section x{hr}", "P2", 0.6, "---", 0)
    if arrows >= 2:
        add("punctuation", f"unicode arrows x{arrows}", "P2", 0.4, "\u2192", 0)

    # Rhythm & grammar metrics ----------------------------------------------
    lens = [len(WORD_RE.findall(s)) for s in sents if WORD_RE.findall(s)]
    cv = None
    if len(lens) >= 3:
        mu = statistics.mean(lens)
        cv = statistics.stdev(lens) / mu if mu else None
    para_lens = [len(WORD_RE.findall(p)) for p in paras]
    para_cv = statistics.stdev(para_lens) / statistics.mean(para_lens) if len(para_lens) >= 4 and statistics.mean(para_lens) else None
    one_line = sum(1 for p in paras if len(sentences_of(p)) == 1 and len(WORD_RE.findall(p)) <= 14)
    one_line_ratio = one_line / len(paras) if paras else 0
    long_words = sum(1 for w in words if len(w) >= 9)
    nominal = len(NOMINAL_RE.findall(prose))
    participial = len(re.findall(r",\s+(?:[a-z]+ing)\b(?! (?:to|that)\b)", prose))
    triads = len(re.findall(r"\b\w+(?: \w+){0,3}, \w+(?: \w+){0,3},? and \w+", prose))

    # same-opener runs
    runs = 0
    openers = [re.findall(r"[A-Za-z']+", s)[:1] for s in sents]
    openers = [o[0].lower() if o else "" for o in openers]
    streak = 1
    pronouns = {"i", "he", "she", "they", "we", "you", "it"}
    for i in range(1, len(openers)):
        same = bool(openers[i]) and openers[i] == openers[i - 1]
        if same and not (fiction and openers[i] in pronouns):
            streak += 1
            if streak == 3:
                runs += 1
        else:
            streak = 1

    rep.metrics = {
        "words": rep.words,
        "sentences": rep.sentences,
        "paragraphs": rep.paragraphs,
        "mean_sentence_len": round(statistics.mean(lens), 1) if lens else None,
        "sentence_len_cv": round(cv, 3) if cv is not None else None,
        "paragraph_len_cv": round(para_cv, 3) if para_cv is not None else None,
        "one_line_paragraph_ratio": round(one_line_ratio, 3),
        "mattr": round(compute_mattr(lw), 3) if compute_mattr and lw else None,
        "tierA_per_100w": round(sum(tier_a_hits.values()) / per100, 3),
        "tierB_per_100w": round(tier_b_total / per100, 3),
        "tierB_cluster_paragraphs": cluster_paras,
        "em_dash_per_1000w": round(em / per1000, 2),
        "commas_per_100w": round(commas / per100, 2),
        "semicolons_per_1000w": round(semis / per1000, 2),
        "parens_per_1000w": round(parens / per1000, 2),
        "colons_per_1000w": round(colons / per1000, 2),
        "and_per_100w": round(ands / per100, 2),
        "long_words_pct": round(100 * long_words / max(rep.words, 1), 1),
        "nominalizations_per_100w": round(nominal / per100, 2),
        "participial_riders_per_100w": round(participial / per100, 2),
        "triads_per_1000w": round(triads / per1000, 2),
        "same_opener_runs": runs,
        "curly_quotes": curly,
        "headings": len(headings),
    }

    if rep.words >= 150:
        if cv is not None and cv < 0.35 and len(lens) >= 6:
            add("rhythm", f"uniform sentence length (CV {cv:.2f} < 0.35)", "P1", 1.2, f"mean {statistics.mean(lens):.0f} words", 0)
        if para_cv is not None and para_cv < 0.25 and len(para_lens) >= 5 and not fiction:
            add("rhythm", f"uniform paragraph length (CV {para_cv:.2f})", "P2", 0.7, "", 0)
        if triads / per1000 > 6:
            add("rhythm", f"triad density {triads / per1000:.1f}/1000 words", "P2", 0.8, "X, Y, and Z", 0)
        if participial / per100 > 0.8:
            add("grammar", f"present-participle riders {participial / per100:.2f}/100 words (Reinhart 2025: LLMs use 2-5x human rate)", "P2", 0.8, ", ...ing", 0)
        if nominal / per100 > 4.5 and not fiction:
            add("grammar", f"nominalization density {nominal / per100:.1f}/100 words", "P2", 0.6, "-tion/-ment/-ity", 0)
        if 100 * long_words / max(rep.words, 1) > 16 and not fiction:
            add("grammar", f"long-word share {100 * long_words / rep.words:.0f}% (Latinate drift)", "P2", 0.5, ">=9 letters", 0)
        if (commas / per100) < 3.0 and (parens + semis) == 0 and (statistics.mean(lens) if lens else 0) > 20:
            add("punctuation", "sparse punctuation with long sentences (Economist 2026 tell)", "P2", 0.7, f"{commas / per100:.1f} commas/100w", 0)
        if runs:
            add("rhythm", f"same-opener sentence runs x{runs}", "P2", 0.6, "", 0)

    # Register mismatch: no contractions in casual text ------------------------
    if register in {"message", "email", "social"} and rep.words >= 40:
        contr = len(re.findall(r"\b\w+(?:'|\u2019)(?:s|t|re|ve|ll|d|m)\b", prose, I))
        expandable = len(re.findall(r"\b(?:do not|does not|did not|is not|are not|was not|cannot|will not|would not|I am|I have|I will|it is|that is|we are|you are|they are|let us)\b", prose, I))
        rep.metrics["contractions"] = contr
        rep.metrics["expandable_uncontracted"] = expandable
        if expandable >= 3 and contr <= expandable // 3:
            add("register", f"formal uncontracted forms in casual {register} ({expandable} vs {contr} contractions)", "P2", 0.8, "", 0)

    # Fiction-only checks ------------------------------------------------------
    if fiction:
        for pat, label, w in FICTION_PHRASES:
            for m in re.finditer(pat, text, I | re.M):
                add("fiction-slop", label, "P1", w, m.group(0), m.start())
        fw = list(re.finditer(FILTER_WORDS, prose, I))
        if fw and len(fw) / per1000 > 12:
            add("fiction-craft", f"filter words {len(fw) / per1000:.0f}/1000 words (saw/felt/noticed/heard...)", "P2", 0.8,
                fw[0].group(0), fw[0].start())
        rep.metrics["filter_words_per_1000w"] = round(len(fw) / per1000, 1)
        sb_pat = r"[\"\u201d\u2019],?\s+(?:(?:he|she|they|I|[A-Z][a-z]+) )?(" + "|".join(SAID_BOOKISMS) + r")\b"
        sb = list(re.finditer(sb_pat, raw))
        if len(sb) >= 3:
            add("fiction-craft", f"said-bookisms x{len(sb)} ({', '.join(sorted({m.group(1) for m in sb})[:6])})", "P2", 0.7, sb[0].group(0), sb[0].start())
        swifty = list(re.finditer(r"\b(?:said|asked|replied|whispered)\s+(?:\w+ly)\b", raw))
        if len(swifty) >= 2:
            add("fiction-craft", f"Tom Swifties (said + -ly adverb) x{len(swifty)}", "P2", 0.6, swifty[0].group(0), swifty[0].start())
        rep.metrics["said_bookisms"] = len(sb)
        for nm in STOCK_NAMES:
            for m in re.finditer(rf"\b{re.escape(nm)}\b", text):
                add("fiction-names", f"stock AI character name: {nm}", "P1", 1.0, m.group(0), m.start())
                break
        spectral = sum(counts.get(w, 0) for w in SPECTRAL)
        rep.metrics["spectral_words_per_1000w"] = round(spectral / per1000, 1)
        if spectral / per1000 > 6 and spectral >= 4:
            add("fiction-slop", f"spectral/quiet word density {spectral / per1000:.1f}/1000 (ghost/echo/whisper/hum/quiet...)", "P1", 1.0, "", 0)
        slop = sum(counts.get(w, 0) for w in FICTION_SLOP_WORDS)
        rep.metrics["fiction_slop_words_per_1000w"] = round(slop / per1000, 1)
        if slop / per1000 > 14:
            add("fiction-slop", f"fiction slop-word density {slop / per1000:.1f}/1000", "P2", 0.8, "", 0)
        one_line_limit = 0.45 if genre in {"horror", "thriller"} else 0.30
        if one_line_ratio > one_line_limit and len(paras) >= 8 and genre != "poetry":
            add("fiction-craft", f"one-line paragraphs {one_line_ratio:.0%} of paragraphs (limit {one_line_limit:.0%} for {genre})", "P1", 1.0, "", 0)
        # Ending checks: last 15% of text
        tail = prose[int(len(prose) * 0.75):]
        tail_hits = len(re.findall(r"\b(?:hope|hopeful|heal|healed|healing|finally|peace|light|together|learned|understood|realized|knew that|forward|purpose|stronger|grateful)\b", tail, I))
        if tail_hits >= 5:
            add("fiction-ending", "upbeat resolution vocabulary piling up in the ending (AI endings rise early and long)", "P2", 0.8, "", len(raw) - len(tail))
        if genre == "horror" and re.search(r"\b(?:ancient|eldritch|older than|from beyond|dimension|entity|demon)\b[^.]{0,60}\b(?:explained|was|meant|because)\b", tail, I):
            add("fiction-ending", "horror: monster explained in the ending", "P2", 0.8, "", len(raw) - len(tail))
        if cv is not None and cv < 0.40 and len(lens) >= 10:
            add("rhythm", f"narration cadence too even for fiction (CV {cv:.2f})", "P2", 0.8, "", 0)

    # Suppress punctuation/format noise for tiny texts
    if rep.words < 60:
        rep.notes.append("Short text: rhythm and density metrics are unreliable below ~60 words; only phrase and leak hits are meaningful.")
    return rep


def density_score(rep: Report) -> tuple[float, str]:
    """0-100 pattern-density gauge. Not an authorship probability."""
    if rep.words == 0:
        return 0.0, "empty"
    weight = sum(h.weight for h in rep.hits)
    p0 = sum(1 for h in rep.hits if h.severity == "P0")
    per100 = weight / (rep.words / 100.0)
    # saturating curve; P0 artifacts dominate
    score = 100 * (1 - math.exp(-0.35 * per100)) if rep.words >= 60 else min(100, 12 * weight)
    if p0:
        score = max(score, 70)
    score = round(min(score, 100), 1)
    tier = "clean" if score < 15 else "light" if score < 35 else "moderate" if score < 60 else "heavy"
    return score, tier


def human_print(rep: Report, score: float, tier: str, explain: bool, genre: str, register: str) -> None:
    print("=== human-writing scan (pattern gauge, not an authorship verdict) ===")
    print(f"register={register} genre={genre}  words={rep.words} sentences={rep.sentences} paragraphs={rep.paragraphs}")
    print(f"pattern density: {score}/100 -> {tier}")
    by_sev = defaultdict(list)
    for h in rep.hits:
        by_sev[h.severity].append(h)
    for sev, title in (("P0", "P0 artifacts (fix always)"), ("P1", "P1 strong tells (fix before publishing)"), ("P2", "P2 weak/density tells (judge in context)")):
        hs = by_sev.get(sev, [])
        if not hs:
            continue
        print(f"\n{title}: {len(hs)}")
        grouped = defaultdict(list)
        for h in hs:
            grouped[h.label].append(h)
        for label, items in sorted(grouped.items(), key=lambda x: -len(x[1])):
            ex = items[0]
            sample = f' e.g. L{ex.line}: "{ex.text}"' if ex.text else ""
            print(f"  - {label} x{len(items)}{sample}")
            if explain:
                for it in items[1:4]:
                    if it.text:
                        print(f'      L{it.line}: "{it.text}"')
    print("\nmetrics:")
    for k, v in rep.metrics.items():
        print(f"  {k}: {v}")
    for n in rep.notes:
        print(f"note: {n}")
    print("\nReminder: every pattern here is something humans also write. Read each hit in context;"
          " fix the substance (missing specifics, inflated claims), not just the surface.")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", nargs="?", default="-")
    ap.add_argument("--register", default="auto",
                    choices=["auto", "email", "message", "docs", "blog", "academic", "marketing", "social", "fiction"])
    ap.add_argument("--genre", default="none", choices=["none"] + sorted(FICTION_GENRES))
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--explain", action="store_true")
    ap.add_argument("--include-quotes", action="store_true", help="also scan blockquotes (default: skip quoted examples)")
    ap.add_argument("--max-hits", type=int, default=8, help="cap per-pattern hits reported")
    ap.add_argument("--fail-at", default="moderate", choices=["light", "moderate", "heavy", "never"])
    a = ap.parse_args()

    try:
        raw = sys.stdin.read() if a.path == "-" else Path(a.path).read_text(encoding="utf-8", errors="replace")
    except OSError as e:
        print(f"cannot read input: {e}", file=sys.stderr)
        return 2
    if "\x00" in raw[:4096]:
        print("input looks binary; extract the text first", file=sys.stderr)
        return 2

    register = a.register
    if register == "auto":
        if a.genre != "none":
            register = "fiction"
        elif re.search(r"(?im)^(?:hi|hey|dear|hello)\b[^\n]{0,40},?\s*$", raw) or re.search(r"(?im)^(?:best|thanks|regards|cheers)[,!]?\s*$", raw):
            register = "email"
        elif re.search(r"```|^#{1,3}\s*(?:install|installation|usage|api|configuration|getting started|requirements)\b", raw, re.I | re.M):
            register = "docs"
        elif len(WORD_RE.findall(raw)) < 120:
            register = "message"
        else:
            register = "blog"

    rep = scan(raw, register, a.genre, a.include_quotes, a.max_hits)
    score, tier = density_score(rep)
    if a.json:
        print(json.dumps({
            "register": register, "genre": a.genre, "score": score, "tier": tier,
            "metrics": rep.metrics, "notes": rep.notes,
            "hits": [h.__dict__ for h in rep.hits],
        }, indent=2, ensure_ascii=False))
    else:
        human_print(rep, score, tier, a.explain, a.genre, register)
    order = ["clean", "light", "moderate", "heavy"]
    if a.fail_at == "never" or tier == "empty":
        return 0
    return 1 if order.index(tier) >= order.index(a.fail_at) else 0


if __name__ == "__main__":
    sys.exit(main())
