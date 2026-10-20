# Vocabulary

Word lists are the most perishable part of this skill. "Delve" peaked in 2023 to early 2024 and fell sharply in 2025; "load-bearing" and "quietly" rose in 2026. Use the lists to catch clusters, then fix the sentence around the point. Swapping "delve" for "dig into" keeps the shape of the tell.

Rules that outlast any list:
1. One listed word is normal. Several in one paragraph is a tell.
2. A synonym of a listed word is not automatically a tell (the Wikipedia guide asks readers to take the lists literally).
3. Technical senses are exempt: "robust" standard errors, a "key" in a database, "landscape" orientation, a test "harness", "underscore" the character, "leverage" in finance, "landscape" in ecology.
4. Fix by saying the concrete thing, not by picking a rarer word.

## Contents
1. Measured excess vocabulary (Kobak et al.)
2. Words by model era (Wikipedia, Economist)
3. Model idiolects
4. Tiered working list with replacements
5. Fiction slop vocabulary
6. Words and habits humans use that models underuse

---

## 1. Measured excess vocabulary

Kobak, González-Márquez, Horvát and Lause (Science Advances, 2025) tracked 15 million PubMed abstracts from 2010 to 2024. In 2024 the excess was almost entirely style words, not content words, and implied at least 13.5% of abstracts had been processed with an LLM. Ratios below are 2024 frequency divided by the frequency expected from the 2021 to 2022 trend, computed from their released data:

delves 29x · underscores 14x · delved 13x · meticulously 11x · showcasing 11x · delve 8x · intricate 8x · intricacies 8x · underscoring 8x · surpassing 7x · commendable 7x · underscore 7x · excels 6x · garnered 5x · realm 5x · renowned 5x · groundbreaking 5x · grappling 5x · encompassing 5x · emphasizing 5x · necessitating 4x · aligning 4x · revolutionizing 4x · formidable 4x · showcases 4x · bolstering 4x · heightened 4x · endeavors 4x · advancements 4x · unveiled 3.5x · notable 3.5x · fostering 3x · adept 3x · meticulous 3x · leveraging 3x · seamlessly 3x · pivotal 3x · transformative 3x · multifaceted 3x · nuanced 3x · interconnectedness 3x · notably 3x · paving 2.4x · akin 2.4x · culminating 2.4x · avenues 2.4x · elucidates 2.4x

Reinhart et al. (PNAS 2025) found GPT-4o and GPT-4o Mini used "camaraderie", "palpable", "tapestry", and "intricate" at over 100 times the human rate in continuations of human text; "tapestry" appeared in about 23% of GPT-4o outputs versus under 1% of human ones.

## 2. Words by model era

From the Wikipedia guide (revision of October 2026). Rough eras, not hard cutoffs:

- **2023 to mid-2024 (GPT-4):** additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate/intricacies, interplay, key, landscape, meticulous/meticulously, pivotal, underscore, tapestry, testament, valuable, vibrant
- **Mid-2024 to mid-2025 (GPT-4o):** align with, bolstered, crucial, emphasizing, enhance, enduring, fostering, highlighting, pivotal, showcasing, underscore, vibrant
- **Mid-2025 on (GPT-5):** emphasizing, enhance, highlighting, showcasing, plus notability phrases ("independent coverage", "active social media presence")
- **2026 (The Economist's study of ChatGPT, Claude, Gemini, Grok):** ordinary-looking polysyllables at high density: significant, increasingly, consequences, implications, framework, considerations; rare compounds like interdependence and reindustrialisation. "Increasingly" was among the most overused words across all four models. The subtler 2026 tell is density of long, Latinate, abstract words, not any single word.
- **tropes.fyi 2026 risers:** quietly, deeply, fundamentally, remarkably, arguably, load-bearing (for "important"), gated (for "restricted"), paradigm, framework, ecosystem.

## 3. Model idiolects

Each model family has its own habits (Sun et al., "Idiosyncrasies in LLMs", 2025; Rudnicka 2025), so there is no single AI style.

- **ChatGPT/GPT family:** broader-context framing, "tapestry" era words (older), curly quotes, em dashes in older versions and markedly fewer than humans by 2026, the rule of three more than any other model, "it's not X but Y".
- **Claude:** the only 2026 model above human em-dash rates; "honest(ly)", "genuinely", "the one thing", "load-bearing", "where X actually lives", "worth naming", "sit with that", "real X, not Y", compressed noun-stacked half-sentences ("Claudish"), → arrows, bold-first bullets, diff-anchored rewrites, reasoning spilling into prose, scientific register in non-technical text; tends toward concise answers and straight quotes.
- **Gemini:** concise, scientific register (with Claude), `[cite: N]` leaks, straight quotes, external physical description of characters in fiction.
- **Grok:** very long outputs, "Y rather than X" reversed contrasts, "causal", "empirical", "correlate", persistent "underscore" into 2026.
- **DeepSeek:** curly quotes, `【N†L…】` citation leaks.

## 4. Tiered working list

**Tier A: flag every hit (strong frequency markers)**

| Word | Usually means / write instead |
| --- | --- |
| delve (into) | look at, examine, cover; or just start |
| tapestry, rich tapestry | name the actual mix of things |
| testament to, stands as a testament | shows; or cut the clause |
| underscore(s) | shows; often cut |
| pivotal, crucial (in clusters) | important, or say what depends on it |
| meticulous(ly) | careful, detailed; or describe the care |
| intricate, intricacies | complex, detailed; name the complexity |
| showcase, showcasing | shows, has |
| realm | area, field |
| multifaceted | name the facets |
| seamless(ly) | say what does not break or need doing |
| vibrant, bustling, nestled, breathtaking | describe what is there |
| embark (on a journey) | start |
| beacon, symphony, dance (figurative) | say what it is |
| camaraderie, palpable, solace, amidst | friendship, obvious/felt, comfort, among |
| unwavering, enduring, indelible | steady, lasting; or cite duration |
| game-changer, groundbreaking, revolutionary | say what changed, with a number if you have one |
| landscape (abstract), ever-evolving | field, market; say how it changed |
| synergy, holistic, actionable, impactful, learnings | combined effect, whole, practical, effective, lessons |
| garner(ed) | got, won, drew |
| commendable | good; or cut |
| load-bearing (figurative), gated (figurative) | essential, restricted |

**Tier B: flag when two or more share a paragraph**

additionally, furthermore, moreover, notably, significantly, key, vital, essential, robust, comprehensive, enhance, foster, leverage, utilize, facilitate, streamline, empower, navigate, harness, unlock, elevate, ecosystem, framework, journey, insights, nuanced, align(s) with, cultivate, profound, dynamic, innovative, cutting-edge, state-of-the-art, remarkable, notable, exceptional, increasingly, implications, considerations, consequences, quietly, deeply, genuinely, truly, arguably, fundamentally, precisely, honest(ly), straightforward, valuable, highlight(ing), emphasize(ing), ensure(ing), commitment to, intersection of, integration of, mechanism, methodology, parameter, empirical, causal

**Tier C: clarity edits (not authorship evidence)**

These are wordy in anyone's hands. Fix them for clarity and never cite them as proof of AI: utilize → use, in order to → to, due to the fact that → because, commence → start, ascertain → find out, endeavor → try, facilitate → help, approximately → about, prior to → before, subsequently → later, demonstrate → show, a number of → some/several, at this point in time → now.

**Phrases**

- Significance: plays a pivotal/crucial/vital role, marks a new chapter, setting the stage, paving the way, reflects a broader trend, indelible mark, enduring legacy, deeply rooted, evolving landscape, focal point, key turning point
- Openers: in today's fast-paced world, in an era of, in a world where, when it comes to, imagine a world where, let's dive in, here's the thing, it's worth noting
- Closers: in conclusion, overall, ultimately, the future looks bright, only time will tell, one thing is certain, exciting times ahead, a step in the right direction
- Hedges: could potentially, may possibly, it's important to note, it goes without saying
- Marketing: unlock the full potential, take it to the next level, all-in-one, best-in-class, whether you're X or Y
- Social: I'm thrilled to announce, here's what I learned, agree?, thank me later, this one is worth your time, the line I keep coming back to

## 5. Fiction slop vocabulary

From EQ-Bench's over-representation lists (Paech) and the antislop project, words and phrases models over-produce in stories relative to human fiction:

- **Words:** whisper(ed), echo(ed), shadows, flicker(ed), shimmer(ing), hum(ming), gaze, trembling, faint, scent, glint, etched, crimson, obsidian, ozone, tendrils, palpable, unspoken, ethereal, void, liminal, symphony, tapestry, testament, newfound, unwavering, amidst, cacophony, bustling, cobblestones, dimly (lit), wry, knowing (smile), practiced (ease)
- **Stock beats:** took a deep breath; voice barely above a whisper; couldn't help but feel; couldn't shake the feeling; a shiver ran down her spine; heart pounding in his chest; breath she didn't know she was holding; the words hung in the air; the air was thick with; a flicker of something akin to; eyes filled with a mixture of; a small smile playing on her lips; brow furrowed in concentration; knuckles turning white; days turned into weeks; dust motes danced; the sun dipped below the horizon, casting long shadows; ready to face whatever lay ahead; a renewed/newfound sense of purpose; for the first time in a long time
- **Names:** Elara (and Elara Voss), Voss, Vance, Kael, Kaelen, Lyra, Aria, Nova, Luna, Sage, Kai, Elias, Silas, Thorne, Aris Thorne and Lena Petrova (Gemini picked Aris Thorne about 93% of the time in one test), Seraphina, Mira, Nyx, Orion, Aldric, Eldric, Evelyn, Clara, Elena; Emily Chen, Sarah Chen, Sarah Thompson, Emily Carter, Marcus Reynolds; places like Eldoria, Aetheria, Oakhaven, Willowbrook, Ravenswood, Whisperwood, Blackwood. Russell et al. also note that a western first name paired with a non-western surname, and every expert being "Dr.", are frequent AI habits.

## 6. What humans use that models underuse

From Russell et al.'s expert-detector guide and the Wikipedia "signs of human writing" section:

- Plain verbs: says, said, tells, got, made, went, is, has, died (not "passed away"), wrote (not "authored"), moved (not "relocated"), used (not "utilized"), tried (not "attempted")
- Small hedges and intensifiers: pretty, quite, really, actually, kind of, a bit, probably, I think, tends to, very
- Real superlatives and absolutes when true: the only, the first, one of the best
- Wordy human habits: "as a result of", "all of the", "the fact that" (humans write these more than models do)
- Casual forms in casual text: yeah, nope, gonna, wanna, stuff, a bunch, a lot
- Physical, slightly silly descriptors: messy, squished, chunky, janky, gross, nerdy
- Idioms used naturally, coinages, adapted words ("Brooklynites", "Americanized")
- Colons, semicolons, parentheses, partial quotes, mixed numerals ("3" and "three"), inconsistent Oxford commas, regional spelling (colour, favour; "revert" and "prepone" in Indian English)
