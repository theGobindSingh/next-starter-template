# Fiction craft (all genres)

Read for any fiction. Genre files add the specific promise; this file covers the machinery every story shares, with the places where AI drafts typically break.

## Contents
1. Story before prose · 2. Point of view · 3. Scenes · 4. Dialogue · 5. Description and detail · 6. Interiority · 7. Names and setting · 8. Openings · 9. Endings · 10. Revision pass · 11. Critique vocabulary (Turkey City Lexicon)

---

## 1. Story before prose

The deepest AI tell is structural (StoryScope 2026), so fix the story first.
- Someone wants something specific. Something stands in the way. It gets worse. A choice with a cost changes things. That's a story; mood alone is not.
- Give the protagonist a want that conflicts with a need or with another character's want. Let them choose wrong sometimes.
- Moral ambiguity: let the right choice cost something, or let it not be clearly right.
- More than one track: a second thread (a relationship, a debt, a lie) that complicates the main one.
- Time: use at least one non-linear move when it serves (a flashback, a skip, a compression, a slowed moment).
- At each planning decision, list the obvious option and pick a less obvious one that still fits. AI stories cluster in the same narrative space; the less-traveled choice is where human stories live.

## 2. Point of view

- Choose one POV and hold it. First person: the narrator can only know what they know. Close third: the camera sits in one head per scene. Head-hopping and a sudden first-person "I" in a third-person story are common AI slips.
- Tense: past is default; present works for immediacy. Don't switch without reason.
- Psychic distance: close POV means the character's words and perceptions, not the narrator's polished summary of them.

## 3. Scenes

- Enter late, leave early. Start when something is already happening; cut before the scene winds down.
- Each scene turns: something is different at the end (a value shifts from positive to negative or back, in Story Grid terms).
- Summary for time that doesn't matter; scene for moments that do. AI drafts summarize the climaxes and dramatize the transitions.
- Conflict doesn't evaporate because characters talk calmly and understand each other. People misread, deflect, lie, and want incompatible things.

## 4. Dialogue

- "Said" is invisible; use it and "asked". Said-bookisms (hissed, growled, breathed, exclaimed, "smiled" as a speech verb) and Tom Swifties ("she said softly") draw attention. Action beats can replace tags.
- Real speech: interruptions, non-answers, people talking past each other, half sentences, dialect and slang that fit the speaker, silence the narration doesn't explain.
- Each character sounds different: vocabulary, sentence length, what they avoid saying. AI drafts give everyone the same witty, articulate, emotionally literate voice.
- No "As you know, Bob" (characters telling each other what both know, for the reader's benefit). No therapy-speak unless the character would talk that way ("I hear you", "that's valid", "I need you to hold space for me").
- Don't put a line of dialogue at the end of a paragraph and then explain what it meant.

## 5. Description and detail

- One precise, unexpected concrete detail beats three atmospheric ones. Specific brand names, foods, songs, streets, era markers, the smell that is actually there (not "ozone" and "damp earth" every time).
- Match detail to POV: what would this character notice, and in what words?
- Kill filter words when the sensation can stand alone: "She heard the door creak" → "The door creaked." Keep them when the act of perceiving matters.
- Metaphor only when it clarifies; EQ-Bench's long-form rubric weights "forced poetry or metaphor" heavily because judges miss it. No mystical abstraction ("the weight of unspoken centuries") and no forced synesthesia.
- Avoid the spectral kit (whispers, echoes, shadows, hum, flicker, quiet) unless the scene is actually about those things.
- Present-participle pileups and triple adjectives are rhythm by rule. Break them.

## 6. Interiority

- Show feeling through action, choice, and the character's own idiom; don't name the emotion and then describe its physiology ("a wave of fear washed over her, her heart pounding"). Occasionally naming a feeling plainly is fine and human.
- Avoid the stock physical tells: jaw clenched, knuckles white, brow furrowed, breath hitched, stomach dropped, eyes widened.
- Let characters think wrong things. Unreliable, partial, petty thoughts are human.

## 7. Names and setting

- Names fit place, era, class, and family. A Tamil engineer in Chennai, a farmer in 1950s Iowa, and an elf in a secondary world need different naming logic. Avoid the AI defaults (Elara, Kael, Lyra, Thorne, Voss, Aris, Silas, Elias; Emily Chen, Sarah Thompson; Willowbrook, Oakhaven, Eldoria).
- Use real places accurately or invent them consistently. Real businesses and institutions shouldn't be defamed.
- Specific era markers (phones, prices, music, slang) anchor a story; AI stories float in a timeless nowhere.

## 8. Openings

- Start with a person doing something in a specific place, a voice with an attitude, or a strange concrete fact. Avoid the weather-and-light scene-setter ("On a drab November morning, the fog...") and the thesis opener.
- Avoid starting with a character waking up, a dream, or a mirror description.

## 9. Endings

- End where the story's tension resolves, or pointedly doesn't. Human stories turn sharply near the end; AI stories begin resolving around 70% and add coda after coda (Witte 2026).
- No moral, no stated theme, no epilogue that summarizes everyone's fate unless the genre demands it.
- Endings that are sad, strange, open, or abrupt are allowed and often better; the genre file says what the promise requires.
- Cut the last paragraph and see if the story is better. Often it is.

## 10. Revision pass

1. Scan: `humanize_scan.py story.md --genre <genre>`.
2. Reread for the narrative tells: stated theme, one track, clean morality, linear time, same-voice dialogue, early and long ending.
3. Reread for POV breaks and filter words.
4. Read dialogue aloud. Would a person say this?
5. For each paragraph: is there one detail no one else would have written? If not, find one or cut the paragraph.
6. Check the ending against the genre promise.
7. Run `finalize.py` on the final text (the required hidden-mark pass; `--fiction` is not needed here, it only cleans characters).

## 11. Critique vocabulary

From the Turkey City Lexicon (Shiner and Sterling, SF workshop primer, explicitly not copyrighted), useful for naming problems in feedback:
- **Said-bookism**: an artificial verb to avoid "said".
- **Tom Swifty**: "said" plus a colorful adverb.
- **Burly detective syndrome**: refusing to repeat a name, substituting "the burly detective", "the older woman".
- **As You Know, Bob**: exposition through characters telling each other what they both know.
- **Brenda Starr dialogue**: long talk with no physical setting.
- **Roget's disease**: piling far-fetched adjectives.
- **Eyeball kick**: the perfect telling detail (the good kind).
- **Info-dump**: a block of background halting the story.
- **Author needs you to know**: a clumsy attempt to smuggle in exposition.
