# Registers: the default (non-genre) path

When no genre is named, the text is functional: it has to get something done for a reader. The biggest tell in short functional text is **register mismatch**, a WhatsApp reply that reads like a press release. People code-switch constantly; instruction-tuned models write everything in one polished explainer voice (Reinhart et al. 2025). Match the medium, the relationship, and the person.

## Contents
1. Strictness by register (which rules apply where)
2. Texts and DMs · 3. Team chat · 4. Work email · 5. Cold outreach and follow-ups · 6. Freelance proposals and client messages · 7. LinkedIn and social · 8. Online comments and issue replies · 9. Cover letters, bios, résumés · 10. Blog posts and essays · 11. Docs, READMEs, tutorials · 12. Commits, PRs, code review, tickets · 13. Reports and memos · 14. Academic writing · 15. Product, marketing, UI text · 16. Speeches and scripts · 17. Language variety

---

## 1. Strictness by register

| Rule | Text/DM | Team chat | Email | LinkedIn/social | Blog/essay | Docs/README | Academic | Marketing | Speech |
|---|---|---|---|---|---|---|---|---|---|
| Chat residue, markup leaks, placeholders | strict | strict | strict | strict | strict | strict | strict | strict | strict |
| Not-X-but-Y, staged hooks | strict | strict | strict | strict (hooks are the cliché) | strict | strict | strict | strict | 1 deliberate OK |
| Triads | relaxed | relaxed | strict | strict | strict | relaxed (real lists) | strict | strict | 1 or 2 deliberate OK |
| Em dashes (Claude draft) | avoid | avoid | rare | rare | writer's rate | rare | per style guide | rare | rare |
| Bold-label bullets, headings | never | rare | rare | never | sparing | allowed (readers scan) | per venue | sparing | n/a |
| Contractions | always | always | usually | usually | usually | yes | rarely | yes | always |
| Hedging | light | light | light | strict | writer's | "may" is often accurate | calibrated | strict (no weasel claims) | light |
| Significance inflation, promo words | strict | strict | strict | strict | strict | strict | strict | extra strict | relaxed for emotion |
| Casual imperfections | allowed | allowed | only with people they know | light | voice-dependent | no | no | no | spoken rhythm |

"Strict" means fix on sight; "relaxed" means act only on clusters.

## 2. Texts and DMs (WhatsApp, iMessage, Instagram)

- Short. Often several messages rather than one block.
- No final period on a one-line message; mid-message periods are fine. Lowercase starts are normal.
- Contractions always; fragments normal ("on my way", "sounds good").
- The person's own abbreviations and emoji habits only.
- No greeting or sign-off in an ongoing chat. Answer the thing.

> AI: Hi Rahul! Thank you so much for the invitation. I would love to join you for dinner on Saturday. Please let me know what time works best for you!
> Human: yes!! saturday works. what time?

## 3. Team chat (Slack, Teams, Discord)

- Point or ask first; people read on phones between things.
- One or two short paragraphs, broken at thought boundaries (a single dense 120-word block is a tell; so is one line per sentence). Thread the detail.
- Code in backticks; bullets only for real lists.
- Status updates: done, blocked, what you need.

> AI: Hi team! 👋 I wanted to provide a quick update on the authentication migration. I'm pleased to share that we've made significant progress...
> Human: auth migration: staging is done, prod goes tomorrow 10am. only blocker is the redis config, @arjun can you check it today?

## 4. Work email

- Subject line says what it is ("Invoice #1042 due Friday").
- First line: purpose or ask. Then only the context the reader lacks.
- Normal greeting and sign-off ("Hi Priya," / "Thanks,") are human; "I hope this email finds you well" and "Please do not hesitate to reach out" are not.
- One clear ask, with a date if there is a deadline.
- Formality follows the relationship: a notch up for a new or senior external contact, close to chat for a teammate.
- Replies: answer first; do not restate their email or recap their work back at them.

## 5. Cold outreach and follow-ups

- First line: why them, using a real detail the user gave.
- The ask, small and concrete ("15 minutes Thursday?"). Under about 120 words.
- No flattery stacks ("I came across your profile and was really impressed"), no invented mutual connections, no "I'd love your perspective" as the entire ask.
- Follow-ups: one line of context, the ask, done. No "just circling back to touch base".

## 6. Freelance proposals and client messages (Upwork, Fiverr, direct)

- Open with their project, naming a specific requirement from the brief.
- Two or three concrete sentences on how you would do it (stack, approach, deliverable, rough timeline) from facts the user supplied.
- One or two relevant past examples with links, if provided.
- A clear next step or a sharp question about the project.
- Template giveaways clients see daily: "I am a highly skilled and experienced...", "I have carefully read your job description", "I will deliver high-quality work within your deadline", "Dear Hiring Manager".
- Clean grammar in the first proposal; small casual quirks only later, with a client you know.

## 7. LinkedIn and social

- LinkedIn has its own human clichés that AI amplifies: broetry (one sentence per line), "I'm thrilled to announce", "Here's what I learned:", numbered lessons with emoji, "Agree?", "Let that sink in", not-X-but-Y hooks, "This one is worth your time:", hashtag walls.
- A human post usually: says the news or thought plainly in line one, gives one or two specifics (what, who, a number, a moment), adds a real reaction, stops. Thank people by name if relevant. Zero to three hashtags.
- X/Threads/Bluesky: shorter, drier, often lowercase. No "🧵1/" bait.

## 8. Online comments and issue replies (Reddit, HN, GitHub, forums)

- Conversational, direct, often mid-thought. Human hedges: "iirc", "afaik", "could be wrong but".
- No headings, no bold lists, no closing summary in a comment.
- In GitHub issues, maintainers notice assisted replies by shape: a dense block, a recap of their own work, a re-derivation of what the thread established. Answer the question asked.

## 9. Cover letters, bios, résumés

- Plain and specific: what you built, for whom, with what result (only from the user's facts).
- Tie one or two experiences to what the role needs.
- Avoid: passionate, results-driven, dynamic, proven track record, "I am writing to express my interest", "I am confident that my skills make me an ideal fit".
- Bios: third person for conference and company pages, first person on personal sites.
- Résumé bullets: verb, object, result. "Cut p95 checkout latency from 1.8 s to 600 ms by moving pricing to an edge cache." Not "Leveraged cutting-edge technologies to drive impactful outcomes."

## 10. Blog posts and essays

Voice and a point of view are the reason these exist.
- Open on a specific claim, moment, number, or question. Not "In today's world", not a scenic time-and-weather opener.
- Avoid the SlopShape machine shape: title that promises the payoff, thesis stated before the first section, a paragraph announcing the structure, a closing recap, an editorial-explainer voice throughout. Human posts have rarer shapes: a story first, an argument that turns, sections of unequal size, an ending that just stops.
- Headings optional; if used, make them say something.
- Examples from the user's real experience, never invented.
- Keep the writer's stance, asides, doubts, and jokes.

## 11. Docs, READMEs, tutorials

- Neutral and precise. "You" and imperative steps.
- First lines: what it is and why you would use it. Then install, usage, caveats.
- Headings and lists are right here because readers scan; short declaratives are fine.
- No marketing adjectives ("powerful", "blazing-fast", "seamless") without a number.
- Describe the current behavior, not the history of the change ("This function was added to replace..." belongs in the changelog).
- Every command, path, flag, and identifier exact.

## 12. Commits, PRs, code review, tickets

- Commit: imperative summary under ~72 characters ("Fix token refresh race on logout"), body says why.
- PR: what changed, why, how to test, risks. No "This PR introduces a comprehensive enhancement". No emoji headers unless the team uses them. Do not re-explain the diff the reviewer can see.
- Review comment: direct and specific. "This re-renders on every keystroke; can we memo it?" beats praise-then-suggestion.
- Ticket: title says what is broken where; body has steps, expected, actual, environment, logs.

## 13. Reports and memos

- Executive summary is the decision and the two facts that justify it, not a table of contents in prose.
- Findings as statements ("Churn doubled in the Pro tier after the price change"), not labels ("Churn Analysis").
- One chart or table beats three paragraphs of numbers; one paragraph beats a two-row table.
- For revised versions, write for a fresh reader: no "Retracted", "What changed in v2", or findings phrased against a previous draft (see diff-anchored writing in the catalog).

## 14. Academic writing

- Formal, evidence-first, hedged where the evidence is uncertain and nowhere else.
- The post-2022 excess words are most visible here: delve, underscore, intricate, pivotal, showcase, notably, comprehensive, crucial, meticulous. Use the field's normal terms.
- Claims match citations. Never invent a reference. Page numbers for book claims.
- Keep required AI-use statements; many journals and universities require them.

## 15. Product, marketing, UI text

- One concrete benefit beats five adjectives: what it does, for whom, with a number if you have one.
- Avoid: seamless, empower, unlock, elevate, revolutionize, next-level, cutting-edge, world-class, all-in-one, game-changing, "Meet X, your new favorite...", "Think X meets Y".
- Fragment runs ("Fast. Simple. Powerful.") are the cliché, not the fix.
- UI text: short, literal, consistent; the button says what happens ("Delete project"), errors say what went wrong and what to do.

## 16. Speeches and scripts

- Written for the ear: shorter sentences, deliberate repetition, signposting ("Two things.") are legitimate.
- Triads and contrasts exist for speeches; use one or two, placed deliberately, not in every paragraph.
- Contractions, direct address, specific stories supplied by the speaker.

## 17. Language variety

- Keep the writer's variety consistent: American, British, Indian, Australian. Several LLMs default to American English, and a sudden shift into US spelling in an Indian or British writer's text is itself a tell (Wikipedia notes this for Indian topics).
- Indian English in professional contexts has its own natural phrasing (British spelling, "revert" for reply, "prepone", "kindly", "do the needful"). Keep what the writer uses; don't impose it.
- Code-mixing (Hinglish, Tanglish, Spanglish) in casual messages is normal; keep it, don't translate unless asked.
- For non-English text, write in that language's idiom, not translated English patterns. Every language has its own not-X-but-Y and stock-phrase equivalents; treat them the same way.
