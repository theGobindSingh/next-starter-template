# True stories: memoir, personal essay, true crime, true-story horror

This file covers the **actually true** and **based on true events** states of the truth axis (see `routing.md`). Fiction framed as real (nosleep, creepypasta) lives in `frames.md`.

## The contract

Readers of nonfiction trust that events happened. The famous breach (James Frey's *A Million Little Pieces*, 2003, exposed in 2006) shows the cost. Rules:

- **Invent nothing** as fact: events, people, dialogue presented as verbatim, motives, sensory details you don't have, timelines.
- **Reconstructed dialogue** is normal in memoir, but it should be faithful to the gist and marked as memory where it matters ("something like", "I remember her saying").
- **Composites and changed names** must be disclosed (an author's note or a line in the text). If the user wants invented scenes, the piece moves to "based on true events" and says so.
- **Ask for missing specifics.** A true piece without its specifics is where AI inflation creeps in ("a transformative experience that taught me resilience"). The specifics come from the user: ask what the room looked like, what was said, what they did next.
- **Keep the writer's uncertainty.** "I think it was March" is more trustworthy than a confident invented date.

## Memoir and personal essay

- The story is the event; the essay is what the writer makes of it now. Both voices (then and now) are allowed; the gap between them is often the point.
- Specific, unflattering detail builds trust. Let the narrator be wrong, petty, or confused.
- Avoid the AI arc: struggle, lesson, gratitude, "and that's when I learned that...". Real essays often end unresolved or on a small concrete moment.
- Other people in the story are real. Portray them fairly; changing identifying details for private individuals is often kind. The writer's truth is theirs to tell, but deliberate cruelty or exposure of third-party secrets (health, sexuality, immigration status) deserves a pause and a question to the user.
- Avoid therapy-speak as narration ("I was holding space for my inner child") unless that is genuinely the writer's voice.

## True crime

Ethical true crime is victim-centered. Practices drawn from journalism ethics and victim-advocacy guidance:

- **Victims are people, not props.** Introduce them as whole people before they are victims. Don't open with the body.
- **Center victims and survivors, not the killer's mystique.** No glamorizing, no "genius killer" framing, no fan-fiction interiority for a real perpetrator.
- **No invented details about real people.** No made-up dialogue, thoughts, or scenes for real victims, suspects, or families. Speculation is labelled as speculation.
- **Accuracy and sourcing.** Dates, charges, verdicts, and names must be right. Distinguish arrested, charged, convicted, acquitted. Never name an unconvicted suspect as guilty; this is also defamation risk.
- **Restraint with violence.** Describe what happened as needed for understanding, not for thrill. Would the victim's family recognize their person and not be retraumatized by the telling?
- **Consent and privacy.** Respect known wishes of families; avoid identifying minors and surviving victims of sexual violence.
- **Test before including any detail:** would this victim's family think this detail was necessary?

AI tells in true crime: the cinematic cold open ("On a quiet autumn night in 1987, the small town of Millbrook would never be the same"), atmospheric invention, "a chilling reminder", "the case that shocked a nation", killer-centric suspense, invented quotes from investigators, and the closing reflection on "the darkness that lurks in ordinary places".

## True-story horror retellings

When the user tells a real frightening experience (a haunting they believe happened, a stalker, a near-death moment):

- Keep it in "actually true" unless they say otherwise. The fear comes from their real details, pacing, and honesty about what they don't know.
- Horror craft (dread, withholding, the three not-knowing layers in `horror.md`) still applies to **ordering and pacing** true events. Craft shapes the telling; it does not add events.
- Keep their uncertainty. "I still don't know what I saw" is stronger than an explanation you invent.
- If the user wants it "scarier" by adding events, switch to "based on true events" and label it, or move it to fiction framed as real (and then platform rules apply: nosleep treats everything as fiction-framed-as-real anyway).

## Checklist

- [ ] Truth state confirmed: actually true or based on true (labelled).
- [ ] Every event, name, date, and quote comes from the user or a source.
- [ ] Gaps asked about or left honest, never filled.
- [ ] Real people portrayed fairly; victims centered; suspects' legal status accurate.
- [ ] No lesson-and-gratitude arc unless it's genuinely the writer's.
- [ ] `preserve_check.py notes.md draft.md` run against the user's raw account (not `--fiction`).
