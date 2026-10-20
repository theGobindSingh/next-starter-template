---
name: human-writing
description: Write, rewrite, or audit text so it reads like a skilled human wrote it, not a chatbot. Removes AI tells (not-X-but-Y, rule of three, "delve/tapestry/testament", inflated significance, -ing riders, em-dash habits, bold-label bullets, chatbot residue, citation-markup leaks, invisible Unicode) while keeping every fact. Covers everyday writing by default (emails, messages, READMEs, docs, posts, reports) and loads genre profiles for fiction and nonfiction genres (horror, nosleep/creepypasta, true-story, romance, thriller, mystery, fantasy, sci-fi, literary, comedy, memoir, true crime, poetry). Use whenever the user asks to humanize, de-AI, make something sound natural or less robotic, rewrite in their voice, check whether text reads as AI-written, clean up ChatGPT/Claude output, or write any story, post, or message that should not sound machine-made, even if they never say "AI". Do not use to fake authorship where AI disclosure is required.
---

# Human writing

Write, rewrite, and audit prose so it reads like a person who knows the subject wrote it for one reader. Three things matter, in this order: the facts stay true, the text fits its reader and genre, and the known machine patterns are gone.

The Wikipedia editors who catalogued AI writing put the central warning plainly: the surface patterns are _signs_ of a deeper problem, not the problem itself. Patching words while leaving the vague, inflated, generic substance in place only makes weak writing harder to spot. So this skill fixes substance first (what is actually being said, to whom, with which specifics) and surface second.

## Step 0. Route the request

Decide four things before writing a word. Most can be read off the request; ask only when a wrong guess would waste the user's time.

**1. Mode**

| Mode      | Trigger                                                                               | Output                                                     |
| --------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `write`   | "write me a...", "draft...", a brief with no source text                              | The piece, finished                                        |
| `rewrite` | text supplied + "humanize / make it sound natural / less AI / in my voice / fix this" | The rewritten text, then a short change note               |
| `audit`   | "does this sound AI?", "check this", "flag only", "scan"                              | Findings with quotes and severity, no rewrite              |
| `clean`   | "strip hidden characters / watermarks / weird Unicode"                                | Runs the finalize pass (below) and reports what it removed |

**2. Register or genre.** No genre named and none obvious means the default everyday path: email, message, README, docs, post, report, cover letter, and so on. Load `references/registers.md` for the specific register. Do not change this path when no genre applies. A stated or obvious genre ("scary story", "romance chapter", "nosleep post", "poem", "true crime piece", "memoir") loads the genre layer: read `references/genres/routing.md` first, then the genre file it points to.

**3. Truth axis** (only for genres that sound true). "True story" can mean three different things, and they have different rules. Resolve which one before writing:

- _Fiction framed as real_ (nosleep, creepypasta, found footage, "this happened to me" horror): invention is the job, believability is the craft.
- _Actually true_ (the user's own experience, real events, real people, true crime): nothing gets invented, and real-people ethics apply.
- _Based on / inspired by true events_: invention is allowed but must be labelled for the reader; composites and changed names are disclosed.

If the request is ambiguous ("write my true horror story"), ask one tap-to-answer question with these three options.

**4. Voice source.** A writing sample the user owns beats everything else. Otherwise take the voice from the register or genre. Read `references/voice-matching.md` when a sample is given or the user says "in my voice".

### Quick intake (at most one question)

If a detail that changes the whole piece is missing, ask once, with tap options, and default the rest. Typical make-or-break details: length, audience (especially age), POV for fiction, heat level for romance, gore level for horror, the truth axis above, and the destination platform. For everything else, pick a sensible default and say which default was used in one line after the piece. Never interrogate; a short request deserves a short path to the result.

## Step 1. Know why AI prose sounds like AI

A language model picks the most probable continuation, and instruction tuning pushes it further toward a single "helpful, authoritative" register. The result regresses to the mean: specific, odd, true details get replaced by generic, positive, important-sounding ones. Instruction-tuned models also ignore genre: studies show they write present-participle clauses at 2 to 5 times the human rate and nominalizations at 1.5 to 2 times, whatever they are asked to imitate (Reinhart et al., PNAS 2025). The detail for this is in `references/why-ai-sounds-like-ai.md`. Five consequences drive everything below:

1. **Generic beats specific.** The fix is real specifics from the source or the user, never invented ones.
2. **Staging beats stating.** Sentences announce importance, contrast, candor, or a coming point instead of delivering it. The fix is to state the thing.
3. **Rhythm by rule.** Triads, dashes, balanced clauses, and one-line paragraph "punches" get applied everywhere. The fix is to let the content set the shape.
4. **Wrong reader.** Text is written for nobody in particular, re-explains what the reader knows, and ends with a summary nobody needed. The fix is to write for one reader in one situation.
5. **Machine structure.** The strongest signal is below the words. In 2026 studies, structure alone separated AI from human fiction (StoryScope, 93%) and company blog posts (SlopShape, 97 to 98%), and rewording barely dented it. AI posts promise the payoff in the title, state the thesis before the first section, announce the flow, and close with a recap; AI stories state their theme, run one tidy track, and end early and long. So a rewrite that only swaps words fails. Change the shape: open on the specific, let the content set the order, end when it ends.

## Step 2. The rules that never bend

- **Do not invent facts.** No new numbers, names, dates, quotes, sources, credentials, anecdotes, or experiences to make prose feel specific. If a sentence needs a detail you do not have, ask for it, leave a clearly marked gap, or write a simpler true sentence. Fiction and fiction-framed-as-real are the exceptions, because invention is the task there.
- **Do not drop facts, conditions, or uncertainty.** Every claim, caveat, negation, and required disclosure in the source survives the rewrite. Cutting filler is fine; cutting a qualifier that carries meaning is not.
- **Do not inject a fake personality.** No invented first person ("in my experience"), manufactured stakes, forced contrarianism, performed candor ("honestly?", "real talk"), staccato fragment runs, or theatrical dashes that the source did not have. Swapping chatbot voice for "humanizer voice" just trades one detectable register for a louder one.
- **Protect non-prose.** Code, commands, paths, URLs, identifiers, formulas, citations, data, and verbatim quotes stay byte-for-byte.
- **Do not claim undetectability.** Never promise that text will pass GPTZero, Turnitin, Pangram, or any detector, or that it is "certified human". Say what changed; the user runs their own checks.
- **Respect disclosure rules.** See "When not to use" below.

## Step 3. Workflow by mode

### write

1. Settle reader, purpose, and the one thing the reader must come away with. For fiction, settle the genre promise (see the genre file).
2. Gather the true specifics available: the user's facts, their situation, names they gave, numbers they gave. Note what is missing instead of filling it.
3. Draft plainly. Lead with the point in functional writing; in fiction, start as late as possible in the action.
4. Run the self-edit pass (Step 4).
5. For anything over ~150 words, or any fiction, run the scanner and fix what it finds that is real in context:
   `python3 scripts/humanize_scan.py draft.md [--genre horror]`
6. **Finalize (always).** Run the hidden-mark pass on the delivered text: `python3 scripts/finalize.py draft.md -o final.md`. It strips invisible characters, space and homoglyph tricks, typographic pattern channels, and paste debris, then verifies none remain. Deliver `final.md`.
7. Deliver the piece. No preamble, no "here is your...", no offer to revise unless something genuinely needs a decision.

### rewrite

1. Read the whole source. Identify its reader, purpose, register, and the writer's own voice markers (their word choices, rough edges, jokes, spelling variety). Those stay.
2. Run the scanner on the original to see the pattern load: `python3 scripts/humanize_scan.py original.md`. If the tier is `clean` or `light` and nothing is wrong, say so and change little or nothing. Over-editing clean text pushes it toward the uniform profile this skill is trying to remove.
3. Rewrite from the meaning, not phrase by phrase. Patching flagged words one at a time leaves the skeleton intact. Where a paragraph is mostly pattern, restate its actual point.
4. Self-edit pass (Step 4), then rescan the rewrite.
5. Verify preservation: save both versions and run `python3 scripts/preserve_check.py original.md rewrite.md` (add `--fiction` for fiction). Fix every dropped fact and every added number or name that was not in the source.
6. **Finalize (always).** Run `python3 scripts/finalize.py rewrite.md -o final.md` on the result. This is the required last step for every rewrite, not only file outputs: it removes any hidden characters, exotic spaces, homoglyphs, mixed quote/apostrophe patterns, and chat citation debris that came in with the source or crept in, and re-scans to confirm the text is clean.
7. Return the final text once. Then, only if useful, 2 to 5 lines on what changed and anything left in place on purpose.

### audit

1. Run `python3 scripts/humanize_scan.py FILE --explain` (with `--genre` for fiction) and read `references/pattern-catalog.md` for anything unfamiliar.
2. Read the text yourself. The scanner misses structure (re-explaining, one point diluted over pages, a thesis that never arrives) and flags legitimate uses. Judge every hit in context.
3. Report in three groups: artifacts that are near-certain (P0: chatbot residue, markup leaks, placeholders, cutoff disclaimers), strong tells (P1), and weak or density tells (P2). Quote each finding. Mark which are clarity edits that say nothing about authorship (for example "in order to").
4. State limits in one line: patterns are signals, not proof; humans write all of them; people and tools that "detect AI" are wrong often, and false accusations hurt non-native writers most.

### clean

The hidden-mark hygiene pass. Also runs automatically as the last step of every `write` and `rewrite`, so most of the time it is not a separate request.

```bash
python3 scripts/finalize.py FILE -o FILE.clean.md    # clean and verify
python3 scripts/finalize.py FILE --check             # report only, change nothing
```

It handles every character-level way text carries a hidden mark or junk, then re-scans to prove the prose is clean:

- **Invisible carriers:** zero-width characters, BOM, word joiner, soft hyphen, Unicode tag characters (ASCII smuggling), variation-selector byte chains (Butler-style data smuggling), bidi overrides (Trojan Source), private-use and noncharacter code points, stray control characters. Emoji ZWJ sequences, VS16, flag tags, and in-word joiners for Arabic and Indic scripts are kept.
- **Space substitution:** exotic spaces (U+00A0, U+2000–200A, U+202F, U+205F, U+3000) used by EasyMark/WhiteMark, Innamark, and UniSpaCh to encode bits; trailing whitespace (SNOW-style); collapsed multi-space runs. Genuine French no-break spaces before `;:!?` and inside guillemets are kept.
- **Homoglyphs:** Cyrillic, Greek, and Armenian look-alikes inside Latin words are mapped back to Latin; fullwidth and mathematical-styled letters and digits are folded to plain ASCII (CJK punctuation and emoji like ℹ️ are kept). Whole words made only of look-alikes (which may be real Cyrillic or Greek, like "ухо") are listed for review, not changed.
- **Pattern channels:** mixed straight/curly apostrophes and quotes (the Genius "REDHANDED" Morse trick), mixed hyphen and ellipsis code points, and the NFC/NFD normalization channel (output is set to NFC). By default quotes are unified only if the text mixes them, toward the majority style; the writer's deliberate style is otherwise kept.
- **Paste debris:** chat citation markup (`oaicite`, `turn0search0`, `[cite: 3]`, span markers, `grok_card`, DeepSeek brackets, Perplexity tags, `:::writing`), AI-tool URL tracking parameters, and provenance HTML comments.

It never touches fenced, indented, or inline code; hidden characters found there are reported for a human to decide.

## Step 4. The self-edit pass

Three quick tests first: does each sentence add something the reader lacked; could anyone have written it about anything (the horoscope test); would you say it aloud to this reader? Then read the draft as its reader would and go through this list. It is the condensed version of `references/pattern-catalog.md`.

**Content**

- Does each sentence add something the reader did not already have? Cut the ones that restate.
- Is anything described as pivotal, crucial, a testament, a legacy, or part of a broader trend without evidence? Keep the fact, drop the halo.
- Are there "experts say", "studies show", "observers note" without a name? Name the source from the material, or cut the claim.
- Is there a "despite challenges... continues to thrive" or "the future looks bright" closer? End on the last concrete fact.
- Does the ending summarize the piece? Stop when the content stops.

**Sentences**

- _Not X but Y_ in any form, including split across two sentences and "Not X. Not Y. Just Z." Keep a contrast only if the reader actually believed X.
- Groups of three by reflex. Keep three only when there are three things.
- Clauses bolted on with _-ing_ ("..., highlighting its importance"). Cut or make them a real sentence with a real subject.
- "Serves as", "stands as", "boasts", "features" where "is" or "has" works.
- Stacked hedges ("could potentially"). Keep the one qualifier that carries the real uncertainty.
- Staged openers: "Here's the thing", "The result?", "Let's dive in", "Honestly?", "It's worth noting". Delete and start with the point.
- Synonym cycling ("the tool... the platform... the solution"). Pick the right word and repeat it. In fiction, write "said".

**Rhythm and punctuation**

- Vary sentence length because the thoughts vary, not by chopping sentences into fragments.
- Em dashes: humans use them, but Claude uses more than any other model or human baseline (The Economist, 2026). In Claude-drafted text keep them rare; in a rewrite, match the writer's own rate. When removing one, put in a comma, colon, parentheses, or a full stop. Do not leave a long run-on; sparse punctuation over long sentences is now a stronger machine signal than dashes.
- Long chains joined by "and" become two sentences.
- No bold-label bullets (`- **Term:** text`), no title-case headings, no emoji decoration, no arrows as connectors, no horizontal rule between every section, unless the destination's house style wants them.

**Reader**

- In replies and messages, lead with the answer or decision. Do not restate the question, recap their work back to them, or re-derive what they already know.
- No "I hope this helps", "Great question", "Let me know if you'd like", "Here is a revised version". No knowledge-cutoff talk.
- No chat citation debris (`turn0search0`, `oaicite`, `[cite: 3]`, `utm_source=chatgpt.com`). Replace with a real citation or remove.

**Claude's own habits** (this skill usually runs on Claude, so check these every time): em dashes, "honestly/genuinely/truly", "the one thing", "load-bearing", "where X actually lives", "worth naming", compressed noun-stacked half-sentences, "→" arrows, bold-first bullets, rewrites that describe the change ("revised", "retracted", "what changed") instead of the current state, and reasoning leaking into the output ("what that changes is smaller than it might appear").

**Over-correction** (the second way to sound fake): don't chop everything into fragments, ban the passive (models use agentless passives at about half the human rate), strip every "really" and "pretty", swap flagged words for thesaurus neighbors, remove dashes by deleting punctuation, or sand off the writer's quirks. Details in `references/human-signals.md`.

## What human writing has

Removing tells is half the job; `references/human-signals.md` covers the other half. In short, people write plain verbs (is, has, said, used, died), commit to superlatives when true ("the only", "the first"), hedge lightly and specifically ("probably", "I think", "pretty"), use real names and brand names and places, include the odd detail that is not strictly on-topic, let one paragraph run long and the next be two lines, use parentheses and semicolons, start sentences with "And" or "But", and stop when they are done. They do not add every one of these on purpose; they write for a reader and these fall out. So imitate the cause (a specific reader, a specific purpose, real material), not the symptoms.

## Scripts

All scripts are stdlib Python 3.10+, no network. Resolve paths relative to this skill directory.

| Script                                                                                                                                   | Use                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `scripts/humanize_scan.py FILE [--register R] [--genre G] [--explain] [--json]`                                                          | Pattern scanner. Registers: `email message docs blog academic marketing social fiction`. Genres: `fiction horror romance thriller mystery fantasy scifi literary comedy memoir truecrime poetry`. `--genre` switches on fiction checks (filter words, said-bookisms, Tom Swifties, one-line-paragraph overuse, stock AI names like Elara Voss, slop phrases, spectral-word density, cliché endings) and switches off functional checks (headings, bullets, bold). Exit 1 at `moderate` or worse. |
| `scripts/preserve_check.py ORIGINAL REWRITE [--fiction]`                                                                                 | Reports dropped or added numbers, names, quotes, URLs, code, disclosures, and lost negations or qualifiers.                                                                                                                                                                                                                                                                                                                                                                                      |
| `scripts/finalize.py FILE [-o OUT] [--check] [--json] [--quotes auto\|straight\|curly] [--keep-styled] [--keep-hard-breaks] [--all-utm]` | The required end-of-run hygiene pass: removes invisible carriers, exotic-space and homoglyph marks, typographic pattern channels, and paste debris, then re-scans and reports residue. Idempotent. Leaves code untouched. Does not touch word-choice watermarks.                                                                                                                                                                                                                                 |
| `scripts/inspect_text.py FILE [--stylometry] [--audit]`                                                                                  | Invisible-Unicode report plus a zero-LLM stylometry gauge (burstiness, phrase density, MATTR). Vendored from guillaumemeyer/watermarks-remover (MIT).                                                                                                                                                                                                                                                                                                                                            |
| `scripts/clean_text.py FILE -o OUT --stats --no-normalize-spaces`                                                                        | Lower-level Unicode carrier cleanup (a component `finalize.py` builds on). Same source.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `scripts/score_stylometry.py FILE [--explain]`                                                                                           | Standalone stylometry gauge. Same source.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

The scanner is a gauge built from published pattern research, not a detector. A `clean` result does not mean any classifier will call the text human, and a `heavy` result does not mean a person did not write it.

## When not to use (and what to do instead)

This skill improves writing. It must not become a tool for misrepresenting authorship where honesty is required.

- **Where AI use must be disclosed**, keep or add the disclosure instead of hiding it: school or university work under an AI policy, journal submissions that require an AI statement, Amazon KDP (AI-generated text must be declared even after heavy editing), contest entries, freelance work sold as human-only, and platforms that ban or require tagging of AI content. Most short-fiction magazines (Clarkesworld and others) reject AI-written submissions outright; tell the user rather than helping them slip one in. English Wikipedia has prohibited using LLMs to generate or rewrite article content since March 2026 (copyediting one's own writing excepted), so do not produce Wikipedia article text with this skill.
- **Undisclosed ghostwriting of things that claim a specific person's firsthand experience** (reviews, testimonials, "I tried this product") is deception; decline the fake-experience part and offer an honest version.
- **Impersonating a named real person's voice** to pass as them: don't. Writing in the user's own voice from their own samples is the intended use.
- **Code-only tasks**: not this skill, except for comments, docstrings, commit messages, and PR descriptions, which are prose.
- **Removing someone else's provenance marks** from content the user does not own: out of scope.

When intent is unclear, do the writing work and skip the detector-evasion framing. That covers nearly every real request, since most people just want their writing to stop sounding like a template.

## Reference map

Read only what the task needs.

| File                                          | Read when                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `references/pattern-catalog.md`               | Any rewrite or audit; the full catalog with before/after pairs and "when not to act" notes                                         |
| `references/vocabulary.md`                    | Word-level edits; dated lists by model era, measured excess ratios, replacements, words humans use that models avoid               |
| `references/why-ai-sounds-like-ai.md`         | Explaining findings to the user; understanding model-specific idiolects (GPT, Claude, Gemini, Grok)                                |
| `references/human-signals.md`                 | Every `write` and `rewrite`: what to keep, what humans do, what never to inject, indicators that do not work                       |
| `references/clear-writing-craft.md`           | Any non-trivial draft; Orwell, Strunk, Williams, Pinker, Gopen and Swan, Graham, plain language, editing process                   |
| `references/registers.md`                     | Default (non-genre) writing: email, Slack/text, README, docs, commit/PR, blog, LinkedIn, academic, reports, cover letters, UI text |
| `references/voice-matching.md`                | The user gives a sample or says "in my voice"                                                                                      |
| `references/genres/routing.md`                | Any genre request: layering, truth axis, intake, rule overrides, fiction-wide tells; then load the files below                     |
| `references/genres/fiction-craft.md`          | Any fiction: POV, scenes, dialogue, detail, names, endings, revision                                                               |
| `references/genres/horror.md`                 | Horror: Waggoner's palette, Golden's dread and momentum, Story Grid beats, subgenres, horror tells                                 |
| `references/genres/thriller-mystery-crime.md` | Thriller, mystery (fair play), crime, cozy, noir, procedural                                                                       |
| `references/genres/romance.md`                | Romance: HEA promise, obligatory moments, heat levels, tropes, romance tells                                                       |
| `references/genres/speculative.md`            | Fantasy and science fiction                                                                                                        |
| `references/genres/literary-comedy-poetry.md` | Literary fiction, humor, poetry                                                                                                    |
| `references/genres/nonfiction-truth.md`       | Memoir, personal essay, true crime, true-story retellings; ethics                                                                  |
| `references/genres/frames.md`                 | First-person accounts, nosleep, rules horror, epistolary, transcripts, found footage, analog horror, SCP-style, scripts, flash     |
| `references/genres/platforms.md`              | r/nosleep, creepypasta sites, Wattpad, AO3, KDP, magazine submissions, word counts, manuscript format                              |

## Output

- `write` and `rewrite`: the finished text once, with no wrapper phrase. For a rewrite, follow with a brief note only when something matters: a fact you could not verify, a gap left for the user, a disclosure you kept, or a place where you deliberately left the writer's quirk alone.
- `audit`: grouped findings with quotes, then one line on limits. Do not rewrite unless asked.
- Do not call the result "undetectable", "100% human", or "guaranteed to pass".

## Sources

Pattern knowledge comes from Wikipedia's "Signs of AI writing" (WikiProject AI Cleanup, revision of 1 Oct 2026), Kobak et al. (Science Advances 2025, 15M PubMed abstracts), Reinhart et al. (PNAS 2025), Russell, Karpinska and Iyyer (ACL 2025, expert human detectors), StoryScope (Russell et al. 2026) and SlopShape (Madler 2026) on structure, The Economist's 2026 study of 55,940 sentences, Juzek and Ward (2025), Sun et al. "Idiosyncrasies in LLMs", EQ-Bench creative-writing rubric and slop lists (Paech), tropes.fyi, Werner Robitza on "Claudish", Jill Walker Rettberg on genre glitches and AI story endings, genre craft from Tim Waggoner, Christopher Golden, Story Grid, the Turkey City Lexicon, r/nosleep's posting rules, and true-crime ethics guidance, and two MIT-licensed skills, blader/humanizer and conorbronsdon/avoid-ai-writing. Unicode and stylometry scripts are vendored from guillaumemeyer/watermarks-remover (MIT); the Wikipedia material is adapted under CC BY-SA 4.0. Full license texts are in the repository's `LICENSES/` folder.
