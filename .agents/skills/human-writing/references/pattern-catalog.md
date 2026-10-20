# Pattern catalog

Every pattern below is something a person can write on purpose. A pattern justifies an edit when it adds weight without adding information, or when several appear together. Patterns are grouped by family and marked with strength:

- **P0** artifact. Near-certain leftover from a chat tool. Remove on sight.
- **P1** strong tell. Fix before publishing unless it is clearly doing work.
- **P2** weak alone. Act only in clusters or at high density.

## Contents

- A. Artifacts and leftovers (P0)
- B. Staging instead of stating
- C. Inflation and borrowed authority
- D. Rhythm by rule
- E. Word-level habits (see also vocabulary.md)
- F. Formatting by rule
- G. Writing for the wrong reader
- H. Rewrite-specific failures (diff-anchoring, reasoning leak, fake humanness)
- I. Comments, edit summaries, and replies
- J. When not to act

---

## A. Artifacts and leftovers (P0)

**A1. Chatbot wrappers.** "Certainly!", "Great question!", "You're absolutely right", "Here is a revised version:", "I hope this helps!", "Let me know if you'd like me to...", "Would you like me to expand on...". Remove the wrapper and keep any content inside it. This is the most certain tell and the easiest to miss when it frames real content.

**A2. Knowledge-limit disclaimers and gap filling.** "As of my last update", "While specific details are limited", "not widely documented", "based on available information". The worse form admits a gap and then fills it with a guess: "She likely grew up in a middle-class household", "maintains a low profile", "is believed to have". State what the source does not show, or cut the sentence. Never promote a guess to a fact.

A 2026 variant is the didactic disclaimer shaped as a contrast: "claims about the miracle should be treated as religious tradition rather than archaeological explanation." Keep the actual information; drop the instruction to the reader.

**A3. Citation and markup leaks.** These are fingerprints from specific tools, not style:
- ChatGPT: `:contentReference[oaicite:0]{index=0}`, `oai_citation`, `citeturn0search0`, `turn0image1`, `({"attribution":{"attributableIndex":"3-5"}})`
- Gemini: `[cite: 1, 4]`, `[span_1](start_span)`
- Grok: `grok_card`, `grok_render_citation_card_json`
- DeepSeek: `【85†L261-269】`
- Perplexity: `[attached_file:1]`, `[web:3]`, `ppl-ai-file-upload` URLs
- Unattributed: `:::writing{variant="document" id="12345"}`
- URL parameters: `utm_source=chatgpt.com`, `utm_source=openai`, `utm_source=copilot.com`, `referrer=grok.com`
- Markdown fences around another markup language (```` ```wikitext ````)

Strip the markup; if the user supplies the intended source, cite it properly. Do not "humanize" the markup.

**A4. Placeholders.** `[Your Name]`, `[Insert statistic]`, `2025-xx-xx`, `(Add your channel URL here)`, `<!-- Add citation if available -->`. Fill only with what the user supplies; otherwise flag.

**A5. Reasoning-chain residue.** "Let me think step by step", "First, let's consider", "Here's my thought process", "Breaking this down". Keep the reasoning if the reader needs it, lose the scaffolding.

**A6. Leftover instructions to the user.** Notes meant for the person who prompted, pasted into the output: "Delete this section before submission", "Make sure to cite...", "You may want to add...", reviewer notes. Remove.

---

## B. Staging instead of stating

The sentence signals that something matters instead of saying the thing. These are the strongest structural tells in current models.

**B1. Not X but Y (negative parallelism).** All forms:
- "It's not just a tool, it's a movement." / "not only... but also..." / "not merely X, but Y"
- Split across sentences: "This does not mean every choice is equal. It means..."
- Reversed: "Y rather than X" (common in Grok, also ChatGPT and Claude)
- Chains: "Not a bug. Not a feature. A design flaw." / "No fluff, no filler, just results."
- Clipped tail: "The options come from the selected item, no guessing."
- Claude variant: "It's a real X, not Y."

The negative half answers a claim nobody made, so the positive half sounds bigger. Fix: state the positive claim. Keep a contrast only when the reader really holds the mistaken belief, or both halves carry information ("It isn't raining, it's snowing").

> Before: It's not just about the beat; it's part of the aggression. It's not merely a song, it's a statement.
> After: The heavy beat adds to the aggression.

**B2. One-line closers and dramatic fragments.** A single-sentence paragraph that repeats the previous one ("That's the real win.", "Let that sink in.", "Read that again."), a line after an example that names what it showed ("This shows the importance of..."), a row of fragments ("No aesthetic prior. No nostalgia."), and every. single. word. emphasis. Fold into the preceding sentence or cut. A short sentence that adds a new fact is fine.

**B3. Sayings that sound deep.** "The real question is", "at its core", "what really matters", "fundamentally", "make no mistake", "X is the language/currency/architecture of Y", "X becomes a trap", "not a tool but a mirror", "quotable one-liners" built to be screenshotted. Replace with the specific claim.

**B4. Staged run-ups and hooks.** "Let's dive in", "Let's break this down", "Here's what you need to know", "Here's the thing", "The kicker?", "The result? Devastating.", "Plot twist:", "Hot take:", standalone "Honestly?" or "Look," before a routine point. Delete the run-up and start with the point. "Honestly" inside a casual sentence is normal speech.

**B5. Arguing with no one.** "This isn't to say...", "Don't get me wrong", "To be clear", "A tempting approach would be...", "You might think... but". The text rebuts an objection that appears nowhere. Keep an objection only if a real reader would raise it.

**B6. Preamble and compulsive counting.** "Two constraints shape the design.", "Five things to know", "There are three key takeaways", "The first wall is... The second wall is..." (a list disguised as prose). Announce the count only when the reader needs it to navigate; otherwise just give the items.

**B7. Narrated candor and performed insight.** "Honest caveat:", "I want to be upfront", "I'd rather flag this than let you discover it later", "sit with that", "that's not nothing", "worth naming", "the punchline is", "turns out". Cut the frame; keep the disclosure itself. A real conflict-of-interest disclosure ("In the interest of full disclosure, I own shares...") stays.

**B8. Signposted conclusions and tie-backs.** "In conclusion", "To sum up", "Overall,", "Ultimately," and "So, to answer your question: yes..." The reader can see the ending. End on the last point that matters.

**B9. Imagine-a-world and era openers.** "Imagine a world where...", "In today's fast-paced digital world", "In an era of...", "In a landscape defined by...". Start with the claim. Fiction and real thought experiments are exempt.

**B10. Rhetorical questions as transitions.** "But what does this mean for developers?", "So why should you care?", chains of questions ("Do I know how it works? Where it breaks?"). Answer directly, or ask one real question the text then explores.

---

## C. Inflation and borrowed authority

The underlying fact is usually fine. Remove the dressing.

**C1. Significance and legacy.** "stands as a testament to", "a pivotal moment", "plays a crucial role", "marking a new chapter", "underscores its importance", "reflects a broader trend", "setting the stage for", "enduring legacy", "indelible mark", "deeply rooted", "evolving landscape", "focal point". Also the same move at larger scale: a "Challenges and Future Outlook" section, or a closing paragraph promising a bright future. Keep the fact; if the source gives a real consequence, state that consequence.

> Before: The institute was established in 1989, marking a pivotal moment in the evolution of regional statistics.
> After: The institute was established in 1989.

Models also over-emphasize for mundane subjects: population figures, etymology, a plant species' "vital role in the ecosystem" and its conservation status when none is documented.

**C2. Superficial -ing riders.** "..., highlighting its importance", "..., reflecting the community's deep connection to the land", "..., contributing to the region's rich heritage", "..., ensuring...", "..., fostering...". Newer search-enabled models attach these to named sources ("Roger Ebert highlighted the lasting influence") whether or not the source said it. Cut the rider or verify it.

**C3. Promotional language.** "nestled in the heart of", "breathtaking", "vibrant", "rich cultural heritage", "boasts", "a diverse array", "renowned", "must-visit", "commitment to excellence", "seamless", "unlock", "elevate", "game-changer". Models slip into travel-brochure or press-release voice even when asked to be neutral, and a "neutralizing" rewrite can add more of it. State what the thing is and does.

**C4. Genre glitches.** A sudden switch into another genre's register triggered by a word: an inflation story that pauses to call tomatoes "tart bursts of flavor in salads and sandwiches", or a legal filing that describes a train route "famous for its scenic views". Delete the off-genre insert (Rettberg 2026).

**C5. Vague attribution and inflated consensus.** "Experts argue", "observers have noted", "industry reports suggest", "several publications have cited" (when there are two), "such as" before a list that is actually complete. Name the source and what it said, or cut the claim. A missing citation alone is not a tell; most writing is unsourced.

**C6. Canned notability.** "received significant independent coverage", "featured in several national outlets", "profiled in trade publications", "maintains an active social media presence", lists of prestige outlets. Say what one source actually reported.

**C7. Vague connection.** "associated with the leadership of ExampleCorp", "connected to science education at", "in connection with the celebrations". Name the relationship (CEO, board member, taught physics) if the source gives it; otherwise keep the honest vagueness rather than inventing a role.

**C8. Copula avoidance.** "serves as", "stands as", "functions as", "represents a", "boasts", "features", "offers", "maintains", "holds the distinction of", "refers to" in a lead. Use "is", "are", "has". Studies measured a drop of more than 10% in "is" and "are" in academic writing after 2023, and AI copyedits reliably make this change, so undo it.

**C9. Hedging and false balance.** Stacked hedges ("could potentially", "may eventually", "might arguably"); empty concessions ("While X is impressive, Y remains a challenge"); presenting both sides of something that is not contested. Keep one qualifier that reflects the real uncertainty. Note the flip side: humans hedge lightly and specifically ("probably", "I think", "tends to"), and those should stay.

**C10. Moral adjectives on objects and fake precision.** "an honest shape", "flagged honestly", "genuine accuracy" as the invented twin of the real term "false precision", "taught in every first-year course". Use the concrete property or drop the adjective.

**C11. Appeal to familiarity and invented labels.** "famously", "notoriously", "a classic", "as we all know"; coined labels used as if established ("the supervision paradox", "the acceleration trap", "workload creep"). Explain the mechanism instead of branding it.

---

## D. Rhythm by rule

**D1. Forced triads.** "innovation, inspiration, and insight"; three parallel examples; three short facts then a lesson; tri-tricolons. Use the real number of items. Two is fine. Four is fine.

**D2. Uniform sentence and paragraph length.** Models write sentences of stubbornly similar length (roughly half to three-quarters of human journalism's variation in The Economist's 2026 measurements) and paragraphs of similar size. Let one thought need forty words and the next need four. Do not fake this by chopping sentences into fragments.

**D3. Sparse punctuation and "and"-chains.** The 2026 generation writes long sentences with few commas, almost no semicolons, and hardly any parentheses, joined by "and" (the single most overused word in that study). Split the chains; let commas, semicolons, colons, and parentheses appear at human density.

**D4. Em dashes.** Older models overused them heavily, usually spaced ( — ), for punchy asides. By mid-2026 ChatGPT used fewer than human writers and only Claude used more. Readers still read dashes as a machine sign. Rules: in text Claude drafts, keep them rare (a couple per thousand words at most); in a rewrite, match the writer's own habit; never replace a dash by deleting punctuation and letting the sentence run on.

**D5. Repeated openings and anaphora.** Three or more sentences starting with the same word or skeleton ("They assume... They assume... They assume..."). Merge or vary. Deliberate rhetorical repetition in a speech is fine; so is "He... He..." in narration.

**D6. Present-participle clauses and nominalizations.** Instruction-tuned models use present-participial clauses ("Bryan, leaning on his agility, dances around the ring, evading...") at 2 to 5 times the human rate and nominalizations ("the implementation of", "conducted an evaluation") at 1.5 to 2 times. Turn buried verbs back into verbs: "we evaluated", "they implemented".

**D7. Stranded auxiliary contrasts and setup/reversal punchlines.** "The tool died; the data didn't." "We planned for every failure mode. Except the one that happened." One is style; a rhythm of them is a tic.

**D8. Never-ending conclusions and fractal summaries.** Endings that keep adding clauses; every section closing with a recap; "In this section we'll explore..." then "as we've seen in this section". AI stories also end too early and too long: the upswing starts around the 70% mark and keeps going through multiple codas (Witte 2026). Stop once.

---

## E. Word-level habits

See `vocabulary.md` for the full dated lists. Key rules:

- **AI vocabulary in clusters** is one of the strongest tells. One "crucial" means nothing; "crucial", "pivotal", "foster", and "landscape" in one paragraph means a rewrite.
- **Synonym cycling / elegant variation.** "The dashboard... the interface... the portal... the analytics hub" for one thing; "said... explained... noted... emphasized" for attributions; "the burly detective" instead of the character's name. Repeat the right word. In quotes and dialogue, "said" and "says" are invisible; use them.
- **Magic adverbs.** "quietly", "deeply", "fundamentally", "remarkably", "arguably", "genuinely", "truly", "increasingly".
- **Scientific register in non-technical prose.** "mechanism", "parameter", "framework", "methodology", "causal", "empirical", "correlate" in a blog post about cooking. Gemini, Claude, and Grok lean on this most.
- **Latinate over Saxon.** "utilize, facilitate, commence, approximately, demonstrate, subsequently" where "use, help, start, about, show, later" work. AI prose carries markedly more words of eight letters or more than journalism.
- **Hyphen habits.** Keep compound modifiers hyphenated before a noun ("a high-quality report"), open after it ("the report is high quality"); don't stack them ("a high-quality, well-architected, future-proof solution").

---

## F. Formatting by rule

Relevant mainly to documents, posts, and replies. Fiction switches most of these off.

**F1. Inline bold-header bullets.** `- **Performance:** Performance improved by...` repeated for every item. Turn into prose when the labels carry no information; otherwise drop the bold and the echo.

**F2. Bold scattered for emphasis.** Bolding every key phrase, key-takeaways style. One bold phrase per section at most, usually none.

**F3. Headings.** Title Case For Every Word; Wh-question headings as the default shape ("Where the market is stuck", "What this means"); a heading followed by a one-line sentence that restates it; headings that contain only sub-headings; a top-level heading repeating the document title; too many headings for a short text (three in under 300 words); generic labels ("Overview", "Key Points", "Conclusion", "Real-World Applications", "Challenges and Opportunities"). Use sentence case and name what the section contains.

**F4. Decoration.** Emoji before headings or bullets, unicode arrows (→) as connectors, a horizontal rule between every section, tiny tables that should be a sentence.

**F5. Bullet lists of bare noun phrases.** Five or more verbless items of equal length ("Stable performance / Reliable connectivity / Optimized workflows"). Either make them claims with facts or write a sentence.

**F6. Curly quotes in plain-text contexts.** Weak alone (Word, Docs, macOS, iOS all curl quotes). Relevant only in code comments, commit messages, and plain-text files. ChatGPT and DeepSeek curl; Claude and Gemini usually do not.

**F7. Wall-of-text replies.** A 120-word Slack or issue reply delivered as one unbroken block. People break conversational replies at thought boundaries. The reverse mistake, one-line paragraphs throughout, is a fiction and LinkedIn tell.

---

## G. Writing for the wrong reader

**G1. Re-explaining what the reader knows.** A reply that restates the problem, re-walks the diagnosis, and proves the plan before reaching the decision in the last line. Lead with the decision; keep only the one fact the reader lacks.

**G2. Recap-flattery.** "Thanks for all the legwork here: the migration script and rollback plan you built are what made this possible." The reader knows what they did. Keep a short thanks, then the point.

**G3. Premise stacking.** A question preceded by a paragraph of its own evidence, so it has been asked three times before it appears.

**G4. One-point dilution.** One argument restated in eight framings across 4,000 words. Make the point once, with the best evidence.

**G5. The helpful-teacher register for experts.** "Think of it as a highway for data", "Let's unpack this" to someone who built the system. Match the reader's level.

**G6. Opinion-free safety.** Every claim is one nobody could disagree with; every topic gets "both sides"; darker facts are softened toward hope. Russell et al. found expert detectors used exactly this (bland, uplifting, no stance) as a clue. If the writer has a view, let it show. If the facts are grim, leave them grim.

---

## H. Rewrite-specific failures

These happen when an AI edits an existing document.

**H1. Diff-anchored writing.** The rewrite describes history instead of the current state: "This function was added to replace the previous approach", headings like "Finding 3: Cause Was Misstated", labels like "Revised / Retracted / Replaced", a "What changed in v2" table at the top, body text structured as "What holds up / What was wrong". A fresh reader has no idea what was misstated. Write for someone reading this version only; changelogs and release notes are the exception (Robitza 2026).

**H2. Reasoning leak.** The output narrates its own deliberation: "What that changes in the design is smaller than it might appear, and what it changes is worth being precise about." Delete; state the change.

**H3. Compressed noun-stack prose ("Claudish level 2").** "Cap the study-lifecycle handlers so a hung study can't wedge the deep-link." Nouns used as adjectives, jargon verbs (wedge, dodge, gate, harden), missing articles, no flow. Write full sentences with actors and verbs.

**H4. Semantic ablation.** "Polishing" that swaps a writer's unusual metaphor for a safe cliché, replaces precise jargon with generic words, and forces a non-linear argument into a template. Vocabulary diversity drops with each pass. Keep the writer's odd, exact, high-information choices; they are the reason the text is theirs.

**H5. Humanizer voice.** A rewrite that trades AI patterns for a new costume: staccato fragments, "Look,", "Here's the thing", "And honestly?", invented first-person anecdotes, fake contrarian foils, lowercase-casual props ("*checks notes*", "(yes, really)", "wild."). An independent stress test of a popular humanizer skill found exactly this. See the never-inject list in `human-signals.md`.

**H6. Over-polishing.** Correcting every typo, contraction, and odd capitalization in someone's casual message, or making every paragraph the same tidy size. Rough edges are part of the voice.

**H7. Collaborative "we".** Switching a solo author's "I" to "we" in a personal document.

---

## I. Comments, edit summaries, and replies (Wikipedia 2026 observations)

- Openers: "Dear [X] Team, I am writing to...", "I hope this message finds you well", "I understand your concerns regarding...", "I understand my contributions may have been perceived as..."
- Self-conscious compliance: "revised for clarity and neutrality", "improved flow and readability", "ensured adherence to guidelines", "to enhance the article's accuracy and neutrality"
- Procedural statements about what was not changed: "while preserving the original meaning", "retained existing structure", "avoided promotional wording"
- Over-emphasis on sourcing without content: "added sourced information", "improved attribution with independent secondary sources"
- Parameter and markup name-dropping: listing template fields and "inline citations" a human wouldn't mention
- Headings and bullet lists inside a short comment; bolded "concise summary:" labels
- Dismissing concerns about AI use as "speculation", urging critics to "focus on the content"

A human summary says what changed in a few words: "added debut album info", "cut unsourced claims".

---

## J. When not to act

- Inside quotations, titles, proper names, code, and passages that discuss a phrase rather than use it.
- Salutations and sign-offs on letters ("Best regards" predates chatbots).
- Text written before 30 November 2022.
- A writer's documented habit (they used dashes in 2015; they always bold their key term).
- Technical senses: "robust" statistics, "key" in databases, "landscape" mode, a test "harness", "underscore" the character, "leverage" in finance.
- Genre conventions: rule of three in jokes and speeches, contrast in rhetoric, fragments for pacing in thrillers and horror, one-line paragraphs in social posts. The genre files list overrides.
- Second-language writing and plain professional prose that happens to use a few listed words. False accusations of AI use fall hardest on non-native writers.

Humans judging by feel do barely better than chance; people who use LLMs heavily do much better, and they rely on clusters, not single words. Several tells together are the only safeguard.
