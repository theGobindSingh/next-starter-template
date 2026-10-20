# Literary fiction, comedy, and poetry

## Literary fiction

**Promise:** interior change, precise observation, and language that means more than it says. Plot can be quiet; attention cannot be.

- **Subtext over statement.** StoryScope found AI narrators state the theme in 77% of stories versus 52% for humans. In literary fiction the gap matters most: never explain what the story meant. End on an image or action that holds the meaning.
- **Moral ambiguity.** Characters make choices that are not clearly right and pay for them.
- **Time.** Non-linear structure, memory, compression, and expansion are tools of the form.
- **Precision.** The exact word, the unexpected true observation (the eyeball kick), not the lush word. Literary is not purple: EQ-Bench penalizes "purple prose", "overwrought", and "forced poetry or metaphor" separately, and judges consistently prefer control.
- **Endings** can be open, but open is not vague. Something has shifted.

AI tells specific to literary work: the epiphany sentence ("She realized that home was never a place..."), the lyrical abstraction ("the grammar of grief", "the architecture of absence"), everything quiet and liminal and humming, the tidy reconciliation, the final line that tries to be a quote.

## Comedy and humor writing

**Promise:** laughter or delight. Being "fun" in tone is not the same as being funny.

- **Specificity is funny; generality is not.** "A 2011 Honda Civic with one working speaker" beats "an old car". The strangest true-feeling detail wins.
- **Rule of three is legitimate here:** setup, setup, twist. The third item breaks the pattern. This is the one place triads are the point, but the third must actually turn.
- **Rhythm and word order:** the funny word goes last in the sentence. Cut every word between the setup and the punchline.
- **Commitment:** characters take absurd situations seriously. Winking at the reader ("because of course it did", "(yes, really)") kills the joke.
- **Comic premise:** the gap between the character's view of reality and actual reality; escalate that gap.
- **Callbacks:** a joke that returns changed later is one of the strongest human signals (Russell et al. note callbacks as human).
- **Surprise over cleverness:** AI humor is safe puns and mild observational quips. Humans risk being wrong, rude (within reason), or strange.

AI tells: announced jokes ("Plot twist:", "Spoiler alert:"), self-QA volleys ("Is it fast? Yes. Is it cheap? Also yes."), one-word verdict closers ("Wild."), puns stacked three deep, jokes explained after they land, relentless whimsy, and "hilarious" things that are just quirky.

Overrides: triads allowed; fragments allowed for timing; punchline one-line paragraphs allowed if each is a real joke.

## Poetry

**Promise:** compression, sound, and an image or turn the reader couldn't have predicted.

- **Concrete images over abstractions.** "My father's reading glasses on the dashboard" over "the weight of memory".
- **A specific occasion.** Poems about "time", "love", and "the universe" in general are where AI lives.
- **Sound and line.** Line breaks are decisions: break where the meaning pivots or the breath catches. Uneven lines when the meaning pushes against form. If rhyming, avoid forced inversions and filler words chosen for the rhyme ("indeed", "so bright").
- **The turn (volta).** Something shifts: a new angle, a contradiction, a reveal. Don't resolve into a neat epiphany.
- **Resist closure.** AI poems end on a hopeful, summarizing couplet. End on the image.

AI tells: abstraction (whispers, echoes, tapestry, symphony, dance, the void, liminal, threads), "In the quiet of..." openings, default rhyming quatrains with sing-song meter, every stanza the same length and shape, synesthesia by formula ("the taste of silence"), a final moral. Readers sometimes prefer AI poems for exactly this accessibility, which is why they feel generic.

Overrides: line breaks, fragments, repetition, and anaphora are structural tools here, not tells. The scanner's `--genre poetry` skips the one-line-paragraph check.

## Checklist

- [ ] Literary: theme never stated; one precise observation per paragraph; ending shifts something.
- [ ] Comedy: the most specific detail possible; funny word last; third item turns; no winks.
- [ ] Poetry: a real occasion; concrete images; a turn; no closing moral.
- [ ] `humanize_scan.py piece.md --genre literary|comedy|poetry`.
