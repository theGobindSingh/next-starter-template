# Human Writing

A skill for writing, rewriting, and auditing text so it reads like a person who knows the
subject wrote it for one reader. It removes machine patterns (not-X-but-Y, reflexive triads,
"delve/tapestry/testament", -ing riders, chatbot sign-offs, citation-markup leaks, hidden
Unicode) and keeps every fact, caveat, and quirk of the writer's own voice.

---

## Install

```bash
npx skills add webadeva/webadeva-skills --skill human-writing
```

In Claude Code:

```text
/plugin install human-writing --marketplace webadeva/webadeva-skills
```

The bundled scripts need Python 3.10+ (standard library only, no network).

---

## What This Skill Does

It routes each request into one of four modes:

- **Write**: draft a piece from a brief, for a specific reader, with no invented facts
- **Rewrite**: rework supplied text from its meaning, then verify nothing was dropped or added
- **Audit**: report AI-pattern findings by severity (P0 artifacts, P1 strong tells, P2 weak tells) without rewriting
- **Clean**: strip invisible characters, exotic spaces, homoglyphs, mixed quote styles, and chat paste debris

Everyday writing (email, Slack, README, docs, blog, cover letters, reports) is the default.
Naming a genre loads a genre layer: horror, nosleep/creepypasta, romance, thriller, mystery,
fantasy, sci-fi, literary, comedy, poetry, memoir, and true crime.

---

## When to Use It

- "Make this sound less like AI" / "humanize this" / "rewrite this in my voice"
- "Does this read as AI-written?"
- Cleaning up ChatGPT or Claude output before sending or publishing
- Writing any story, post, or message that should not sound machine-made
- Stripping hidden characters or paste debris from text

---

## What It Will NOT Do

- Invent facts, quotes, sources, or experiences to make prose feel specific (fiction excepted)
- Claim the result will pass GPTZero, Turnitin, or any other detector
- Hide AI use where disclosure is required (coursework, journals, Amazon KDP, contests, magazines)
- Fake a named real person's voice, or write fake firsthand reviews and testimonials
- Replace one detectable register with another ("humanizer voice": fragment runs, fake candor)

---

## File Structure

```
human-writing/
├── SKILL.md                         Routing, rules, workflows, self-edit checklist
├── README.md                        This file
├── scripts/
│   ├── humanize_scan.py             Pattern scanner with register and genre profiles
│   ├── preserve_check.py            Flags dropped/added facts, numbers, names, negations
│   ├── finalize.py                  Hidden-mark hygiene pass, run last on every output
│   ├── inspect_text.py              Invisible-Unicode report + stylometry gauge
│   ├── clean_text.py                Low-level Unicode carrier cleanup
│   ├── score_stylometry.py          Standalone stylometry gauge
│   └── common.py, text_unicode.py   Shared helpers
└── references/
    ├── pattern-catalog.md           Full pattern catalog with before/after pairs
    ├── vocabulary.md                Word lists by model era, with replacements
    ├── why-ai-sounds-like-ai.md     Causes, and model-specific idiolects
    ├── human-signals.md             What human writing has; over-correction traps
    ├── clear-writing-craft.md       Orwell, Williams, Pinker, Gopen and Swan, plain language
    ├── registers.md                 Email, Slack, README, docs, blog, academic, UI text
    ├── voice-matching.md            Writing from a user's own sample
    └── genres/                      Routing, fiction craft, and per-genre profiles
```

`SKILL.md` is always loaded. References and scripts are used on demand.

---

## Example Prompts

```
Rewrite this LinkedIn post so it doesn't sound like ChatGPT.

Does this cover letter read as AI-written? Just flag it, don't rewrite.

Write a nosleep story about a night-shift security guard at a closed mall.

Here are three emails I wrote. Draft a reply to this client in my voice.

Strip any hidden characters from this text before I paste it into our CMS.
```

---

## Running the Scripts Directly

```bash
cd skills/human-writing
python3 scripts/humanize_scan.py draft.md --explain          # pattern gauge
python3 scripts/humanize_scan.py story.md --genre horror      # fiction checks
python3 scripts/preserve_check.py original.md rewrite.md      # fact preservation
python3 scripts/finalize.py draft.md -o final.md              # hygiene pass
python3 scripts/finalize.py draft.md --check                  # report only
```

The scanner is a gauge built from published pattern research, not a detector. A `clean`
result does not mean a classifier will call the text human, and a `heavy` result does not
mean a person did not write it.

---

## Credits

Pattern knowledge draws on Wikipedia's "Signs of AI writing", published stylometry research,
and genre craft sources listed at the end of `SKILL.md`. Adapted from the MIT-licensed skills
[blader/humanizer](https://github.com/blader/humanizer) and
[conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing). The
Unicode and stylometry scripts are vendored from
[guillaumemeyer/watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover)
(MIT). Licenses and attribution details are in the repository's
[`LICENSES/`](../../LICENSES/) folder.
