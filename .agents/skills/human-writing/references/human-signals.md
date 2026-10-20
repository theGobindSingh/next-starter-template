# Human signals

What human writing has that model output flattens, what to never fake, and how over-correcting creates a second set of tells.

The governing rule: **preserve** these signals when the writer's text has them, and **allow** them when writing for someone, using only material they gave you. Fabricated texture is worse than flat text because it is false.

## Contents
1. The core tests
2. Ten signals of human writing
3. Never inject
4. Over-correction: the second way to sound fake
5. Imperfection rules (writing on someone's behalf)
6. Indicators that do not work

---

## 1. The core tests

Apply to every sentence you keep:

- **Adds something?** If it restates, announces, or decorates, cut it.
- **Horoscope test.** Could anyone have written this, about anything? Then it needs a specific from the source, or it goes.
- **Say it aloud** to the actual reader. If it sounds like a slogan, a pitch deck, or a LinkedIn post (and the medium is not one), rewrite it.
- **Literal first.** When a plain phrase works, use it. Metaphor is for when the plain phrase fails. Mannered prose ("a dial worth turning" for "a parameter worth varying", "earns its keep", "the real story") displays the writer instead of the idea.
- **Structure test.** Does the piece announce its thesis, preview its sections, and recap at the end? Humans rarely do all three. Remove whichever the reader does not need.

## 2. Ten signals of human writing

1. **Specifics that do not generalize.** Names, places, brands, prices, versions, dates, error messages, the weather that day because it mattered. Humans also include real detail that is slightly off-topic: a brand in passing, a local reference, a recent event, an in-joke. AI writing has a lower density of checkable claims.
2. **A person with a view.** Opinions, preferences, a recommendation, a complaint, one-sided framing, a doubt left standing ("mostly good, and it still bugs me").
3. **Plain words.** "Said", "got", "a lot", "pretty", "kind of", simple average vocabulary, vivid physical words (messy, squished, janky).
4. **Uneven rhythm with more punctuation.** Very short lead-ins next to long sentences shaped with commas, semicolons, parentheses, colons (and dashes, for writers who use them). "And", "But", "So" at sentence starts. Past perfect ("I'd been working on it for weeks").
5. **Grammar that fits the register.** Careful in formal writing; loose in chat (no final period, lowercase, dropped subjects, comma splices). Agentless passive where it is natural ("the server got restarted").
6. **Structure that follows content.** Pieces end when there is nothing more to say. Headings that are questions or specific statements. Callbacks to earlier points. Quotes woven into sentences, partial quotes, text continuing after a quote.
7. **Humor and surprise.** Attempts at jokes, some of them bad; unexpected comparisons; sad or abrupt endings; a twist.
8. **Willingness to touch real life.** Money trouble, injury, family friction, mild swearing, strong feeling. Do not add these; keep them when present.
9. **Traces of thinking.** Self-corrections ("well, it was Tuesday"), parenthetical doubts, a digression that returns.
10. **Consistent personal variety.** One regional spelling throughout, the writer's own abbreviations, code-mixing (Hinglish, Spanglish) kept as written.

## 3. Never inject

These fail even when the scanner comes back clean, because they trade AI voice for "humanizer voice":

- **Fabricated experience.** "I've seen this a hundred times", "in my experience", "I have one on my desk", "I'll admit" with no source for it.
- **Invented specifics.** Any number, name, date, tool, quote, study, or anecdote not supplied. Specificity is the most tempting fix and a fabricated specific is worse than the vague phrase it replaced.
- **Manufactured stakes.** "Now more than ever", "the stakes have never been higher", "in a world where".
- **Forced contrarianism.** "Everyone says X, but they're wrong" when the source argued no such thing.
- **Performed candor.** "Let's be honest", "real talk", "Honestly?", "here's the thing".
- **Staccato conversion.** Chopping ordinary sentences into fragments to fake rhythm.
- **Dash theatrics.** Adding dashes for drama.
- **Fake-casual props.** "*checks notes*", "(yes, really)", "wild.", "hot take:", "because of course it does", unless that is the writer's established voice.
- **Fake typos** in names, numbers, dates, terms, or anything the reader acts on.

A test for every edit: did its information and its stance come from the source or the user? Subtracting and sharpening are allowed. Adding personality, facts, or certainty is not.

## 4. Over-correction: the second way to sound fake

- **Choppy staccato.** Deleting every dash and conjunction leaves strings of short declaratives. Humans write compound and complex sentences too.
- **Banning the passive.** GPT-4o uses agentless passives at about half the human rate. Use the passive when the actor is unknown or irrelevant.
- **Banning adverbs, "just", "really", "actually".** Humans use them a lot; models underuse "pretty", "quite", "really". Cut them only when they are empty emphasis.
- **Synonym swapping.** Replacing a flagged word with its thesaurus neighbor keeps the tell. Rewrite the sentence.
- **Elegant variation.** "The developer... the engineer... the coder" for one person. Repeat the plain word.
- **Voice stripping.** Sanding every opinion and joke leaves committee prose, also a tell.
- **Punctuation starvation.** Removing dashes by deleting punctuation creates long run-ons; sparse punctuation over long sentences is now a stronger machine signal than dashes.
- **Paragraph uniformity in reverse.** Making every paragraph one line (the LinkedIn "broetry" look) is its own tell.
- **Polishing a human.** Correcting a person's casual typos, contractions, and odd capitalization erases the fingerprint that makes the text theirs.

## 5. Imperfection rules (writing on someone's behalf)

When the user asks for text under their own name and wants it to feel natural:

- Only in casual registers: texts, chats, quick emails to people they know, comments.
- One or two per message, taken from how the person actually writes: lowercase start, no final period on a one-line text (a period there can read cold; Gunraj et al. 2016 found period-final texts rated less sincere), a dropped subject ("Sounds good, will send tonight"), a comma splice, an abbreviation they use (tmrw, btw, lmk), "gonna", a trailing thought.
- Never alter names, numbers, dates, addresses, technical terms, or anything the reader must act on.
- Never add errors to formal, legal, academic, or first-contact client text. There, clean, plain, specific prose is what reads human.
- Quirks do not rescue template structure. A message with a typo and three bold-labelled bullets still reads as generated. Fix structure first.
- No cursing unless the user asks. No invented shared history, compliments, or feelings.

## 6. Indicators that do not work

From the Wikipedia guide's "ineffective indicators" and the detection literature. Do not "fix" these in human text or cite them as evidence:

- Perfect grammar alone (many writers are professionals).
- Mixed casual and formal registers, or prose that is "clinical" and "emotional" at once (common in technical people, young writers, neurodivergent writers, multi-author pages).
- "Bland" or "robotic" prose (modern models are effusive, not bland).
- Fancy, academic, or rare words in general (only specific words are overused; rare words are actually less likely from a model).
- Transition words in isolation.
- Unsourced content (most pre-2022 writing is unsourced).
- Formal letter conventions.
- Non-native English. Detectors flag non-native writers at far higher false-positive rates (Liang et al. 2023 measured over 60% on some tools).
