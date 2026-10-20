# Genre routing

Load this file whenever the request names or clearly implies a genre ("scary story", "nosleep post", "romance chapter", "poem", "short story", "true crime piece", "memoir essay", "creepypasta", "flash fiction"). If there is no genre, stay on the default path in `../registers.md` and do not load anything here.

## Contents
1. Three stackable layers
2. The truth axis
3. Intake questions and defaults
4. Rule overrides by genre
5. Fiction-wide tells (all genres)
6. Workflow for a genre piece
7. File map

---

## 1. Three stackable layers

Split every genre request into three layers and load one file per layer:

| Layer | What it sets | Examples | File |
|---|---|---|---|
| **Base genre** | the promise to the reader, core emotion, obligatory moments | horror, thriller, mystery, crime, romance, fantasy, sci-fi, literary, comedy, poetry, memoir/personal essay, true crime | the genre file |
| **Subgenre / tone** | flavor, pacing, what the monster or conflict is | psychological, cosmic, folk, gothic, body, quiet, slasher; cozy mystery, noir, procedural; romantasy, rom-com, slow burn; grimdark, cozy fantasy, hard SF | inside the genre file |
| **Frame / format** | POV, tense, document form, platform rules | first-person account, nosleep post, epistolary, diary, found footage, analog horror, transcript, rules list, SCP-style report, script, flash fiction | `frames.md` and `platforms.md` |

Examples:
- "fiction + horror" = horror base, subgenre unspecified (default: psychological/supernatural blend), frame default (close third or first person, past tense).
- "true-story horror" = horror base + first-person-account frame + the truth-axis question.
- "nosleep post about a night shift" = horror base + nosleep frame (platform rules) + probably the "rules" format.
- "enemies-to-lovers fantasy" = romance base (the love story is the spine) + fantasy setting (romantasy): load both, romance obligations win.

When two base genres combine, decide which is the **spine** (the promise the ending must keep) and which is **flavor**. A murder in a romance is flavor; the ending must still deliver the relationship.

## 2. The truth axis

Anything that sounds true must sit in one of three states. They have different rules.

| State | Examples | Invention | Rules |
|---|---|---|---|
| **Fiction framed as real** | nosleep, creepypasta, found footage, "this happened to me" horror, fake documents | Allowed; believability is the craft | One consistent narrator; plausible reason the account exists; no author's notes breaking frame; no real private people defamed; see `frames.md` |
| **Actually true** | the user's own experience, family history, real events, true crime, memoir | **None.** No invented dialogue presented as verbatim, events, motives, or details | No-fabrication rule fully on; reconstructed dialogue flagged as reconstructed; real-people ethics; see `nonfiction-truth.md` |
| **Based on / inspired by true events** | "loosely based on my grandmother", composite characters, changed names | Allowed, but labelled | Tell the reader what is invented (note, subtitle, or framing line); disclose composites and changed names; don't put invented crimes or acts on identifiable real people |

If the request is ambiguous ("write my true scary story", "a true crime story about X"), ask once with these three options. If the user supplies real events and names, assume "actually true" until told otherwise.

## 3. Intake questions and defaults

Ask at most one question (tap options), only for a detail that changes the whole piece. Default the rest and name the defaults in one line after the draft.

| Detail | Ask when | Default |
|---|---|---|
| Truth axis | anything described as "true" | ask |
| Length | "story" with no length; platform with limits | 1,500–2,500 words for a short story; 800–4,000 for nosleep; ~1,000 for flash; one scene ~1,200 |
| Audience age | any hint of kids/teens | adult; if children or teens, no graphic violence or sexual content, and horror stays at dread and suspense |
| POV and tense | frame unclear | first person past for "account" frames; close third past otherwise |
| Gore level (horror) | horror with no tone cue | moderate: implication over anatomy |
| Heat level (romance) | romance with no cue | closed door (on-page tension, off-page intimacy); explicitness always stays within the platform's content policy |
| Ending type | rarely | genre-appropriate (romance: HEA/HFN; horror: unresolved or costly; mystery: solved) |
| Platform | "for Reddit/AO3/Wattpad/KDP/a magazine" | none; follow `platforms.md` if named |

## 4. Rule overrides by genre

The default rules were written for functional prose. Some are wrong for fiction. Each genre file refines these; this is the summary.

| Default rule | Override in genres |
|---|---|
| No fragments / vary sentences | Horror and thrillers use fragments for pacing at peaks; the limit is density (scanner allows ~45% one-line paragraphs for horror/thriller vs 30% elsewhere). Fragments must land a new beat, not repeat. |
| No triads | Comedy uses the rule of three legitimately (setup, setup, twist). Speeches and some poetry too. |
| No contrasts | Rhetoric, speeches, and character voice can use contrast; still banned as narrator reflex. |
| No invented specifics | Fiction invents by design. Frames-as-real invent within plausibility. Actually-true pieces invent nothing. |
| Lead with the point | Fiction withholds; mystery and horror depend on it. Start late in the action instead. |
| No headings/bullets | Frame-dependent: SCP reports, rules lists, logs, transcripts, and epistolary forms use document formatting by design. |
| Plain words | Genre voice can be ornate (gothic, epic fantasy, noir) if consistent and chosen, not default slop. |
| No em-dash habit | Dialogue interruptions use dashes legitimately ("I didn't—"). Narration still keeps them rare in Claude drafts. |
| Stricter in fiction | Filter words, said-bookisms, stock names, spectral vocabulary, stated themes, tidy upbeat endings, one-track plots. |

## 5. Fiction-wide tells (all genres)

Prose-level (the scanner catches many with `--genre`):
- Spectral and quiet vocabulary against the scene's logic: ghosts, echoes, whispers, hum, shadows, liminal, "quiet" at a party.
- Stock beats: breath she didn't know she was holding, shiver down her spine, heart pounding in his chest, the air was thick with, words hung in the air, a flicker of something akin to.
- Forced synesthesia and mystical abstraction: "a liminal day that tastes of almost-Friday", "the taste of forgotten promises".
- Present-participle pileups: "Leaning on the rail, she watched the city, feeling the wind, remembering...".
- Triadic description: three adjectives per noun, three senses per paragraph.
- Said-bookisms and Tom Swifties; "burly detective" substitutes for a character's name.
- Filter words (she saw, he felt, I noticed) distancing the reader from the sensation.
- Stock names (Elara Voss, Kael, Lyra, Aris Thorne...) and stock places (Eldoria, Willowbrook).

Narrative-level (StoryScope 2026; these survive any prose polish):
- **Stated themes.** The narrator explains what it all meant (77% of AI stories vs 52% of human ones). Let events carry meaning.
- **Tidy single-track plots.** One problem, one arc, resolved. Humans run subplots, loose threads, digressions.
- **Clean morality.** AI protagonists make clearly right choices; human fiction frames choices as ambiguous, with costs (59% vs 38%).
- **Linear time.** Humans use flashback, jumps, compression more.
- **Narrow narrative range.** AI stories cluster: fewer locations, less dialogue relative to narration, the most obvious take on the premise. Pick the less expected option at each decision point that still fits.
- **Endings.** AI endings start rising around 70% of the way through and stack multiple codas, epilogues, and morals (Witte 2026); human stories turn sharply in the last tenth. Also: "And for the first time in a long time, she smiled." "Maybe that was enough." "They would face it together." "It was only the beginning."
- **Characters as mouthpieces.** Everyone speaks in complete, articulate, emotionally literate sentences; conflict dissolves because they talk it out.
- **Unearned transformation and incongruent positivity.** EQ-Bench penalizes exactly these, along with purple prose, overwrought writing, tell-don't-show, meandering, weak dialogue, and (heavily weighted in its long-form test) forced poetry or metaphor.

## 6. Workflow for a genre piece

1. Resolve layers and, if needed, the truth axis.
2. Read the base genre file; note the obligatory moments and the core emotion. Read `fiction-craft.md` for any fiction.
3. If a frame or platform is named, read `frames.md` / `platforms.md`.
4. Plan in five lines: who wants what, what stops them, how it gets worse, the turn, where it ends. Choose at least one less-expected option.
5. Draft. Write specific over atmospheric: one precise detail instead of three moody ones.
6. Scan: `python3 ../../scripts/humanize_scan.py story.md --genre horror` (or the relevant genre). Fix real hits; ignore hits that are deliberate.
7. Check the narrative tells in section 5 by rereading, since no scanner sees them.
8. Run the hidden-mark pass: `python3 ../../scripts/finalize.py story.md -o final.md`. Deliver `final.md`, the story only, with no title card explaining the theme and no author's note unless the platform wants one.

## 7. File map

| File | Covers |
|---|---|
| `fiction-craft.md` | Craft for all fiction: POV, scene, dialogue, description, names, endings, revision |
| `horror.md` | Horror palette, dread and momentum, subgenres, obligatory moments, horror-specific tells |
| `thriller-mystery-crime.md` | Thriller, mystery (fair play), crime, noir, cozy, procedural |
| `romance.md` | Romance promise, beats, heat levels, tropes, romantasy, romance-specific tells |
| `speculative.md` | Fantasy and science fiction: worldbuilding, exposition, magic systems, subgenres |
| `literary-comedy-poetry.md` | Literary fiction, humor writing, poetry |
| `nonfiction-truth.md` | Memoir, personal essay, true crime, true-story horror retellings; ethics |
| `frames.md` | First-person accounts, nosleep, epistolary, diary, found footage, analog horror, transcripts, rules lists, SCP-style, scripts, flash |
| `platforms.md` | r/nosleep, creepypasta sites, Wattpad, AO3, Kindle/KDP, magazine submissions, word counts, manuscript format |
