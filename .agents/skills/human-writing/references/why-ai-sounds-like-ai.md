# Why AI prose sounds like AI

Use this file to understand the causes, and to explain findings to a user without hand-waving. Fixing causes prevents new tells; chasing symptoms produces new ones.

## 1. Regression to the mean

A model predicts the most probable continuation over its training data. For any subject, the probable description is the generic one. The Wikipedia guide's image: the model shouts louder and louder that a portrait shows a uniquely important person while the portrait itself fades from a sharp photograph into a blurry sketch. "Inventor of the first train-coupling device" becomes "a revolutionary titan of industry". The subject gets less specific and more exaggerated at the same time.

This is also why AI text is praised as fluent and still feels empty: low information per sentence, high confidence per sentence.

**Fix:** put back the specific, true, slightly odd detail from the source. If there is none, the sentence probably should not exist.

## 2. Instruction tuning collapses genre

Reinhart et al. (PNAS 2025) gave GPT-4o and Llama 3 the first 500 words of human texts across six genres (academic, news, fiction, spoken, blogs, TV scripts) and asked for continuations in the same style. Base models stayed close to the human originals. Instruction-tuned models drifted into one dense, noun-heavy register regardless of genre:

- present-participial clauses at 2 to 5 times the human rate (GPT-4o 5.3x)
- nominalizations at 1.5 to 2 times
- "that" clauses as subjects at 2.6 times
- phrasal coordination at 1.9 times
- agentless passive at about half the human rate (so do not "fix" every passive)
- words like tapestry, camaraderie, palpable at over 100 times the human rate

A classifier told human from GPT-4o text at 93 to 98% accuracy using grammar features alone. The lesson: an assistant writing a text message, a horror story, and a grant report in the same voice is the tell. Match the register.

## 3. Reward for looking good

Preference training rewards text that looks insightful, balanced, and helpful at a glance. That produces:

- contrasts that manufacture a reveal ("not X, but Y")
- closers that announce the point ("That's the real win.")
- importance words ("crucial", "pivotal") in place of shown importance
- balance and hedging where a view is warranted
- upbeat endings, in essays and in stories
- helpful-teacher framing ("Think of it as...", "Let's break this down")

Juzek and Ward (2025) trace much of the excess vocabulary to learning from human feedback: raters preferred the words, so models learned them. Sam Kriss's summary (NYT Magazine, December 2025): the model knows good writing involves subtlety, so it announces at the top of its voice that everything is shadowy, subtle, and quiet.

## 4. Rhythm by rule

Triads, dashes, parallel clauses, and one-line kickers work in some places, so the model uses them everywhere. The Economist's 2026 study measured sentence-length variation in AI text at roughly half to three-quarters of human journalism's. Some older models also had repetition penalties that forced synonym cycling (the "elegant variation" tell).

## 5. Semantic ablation in editing loops

When a model "polishes" a draft it tends to replace the high-information parts: an unusual metaphor becomes a safe cliché, precise jargon becomes generic wording, a non-linear argument gets forced into a template. Vocabulary diversity drops with each pass (Nastruzzi, The Register, February 2026). A rewrite must protect the writer's distinctive choices, not sand them off.

## 6. Structure is the deepest layer

Two 2026 studies show the strongest signal is not in words at all:

- **StoryScope** (Russell, Rajendhran, Pham, Iyyer, Wieting; 61,608 stories of about 5,000 words from 10,272 prompts, each written by a human and five LLMs) separated human from AI fiction at 93.2% macro-F1 using only narrative features, with style removed. AI narrators state the theme outright in 77% of stories against 52% for humans; human stories frame the protagonist's choices as morally ambiguous more often (59% vs 38%); human stories have more temporal complexity, more locations, more dialogue relative to narration, and occupy rarer regions of narrative space. AI stories from five different models cluster together.
- **SlopShape** (Madler, September 2026) replicated this on 2,250 pre-ChatGPT company blog posts against 11,250 AI mirrors from GPT-5.4, Claude Sonnet 4.6, Gemini 3 Flash, DeepSeek v3.2, and Kimi k2.5. Structural features alone detected AI posts at about 97 to 98% macro-F1, and the score barely moved when each AI post was reworded by its own model. AI posts promise the payoff in the title, state the thesis before the first section, announce the flow, close with a summary, and speak in an editorial-explainer voice. Human posts occupy rare structural configurations.

The consequence for this skill: rewording is not enough. A humanized post that still has title-promise, thesis-up-front, announced structure, and a recap ending keeps the machine shape. Change the structure: open on the specific, let sections earn their order, end when the content ends.

## 7. Model style changes; habits persist

Word tells rotate with each release (delve faded in 2025; em dashes reversed for ChatGPT by 2026). Structural habits persist: staging, triads, inflation, tidy endings, writing for no one in particular. The Economist's 2026 finding that AI writing is getting closer to human prose with every update means surface lists will keep decaying; the causes in this file will not.

## 8. People are drifting toward the machine

Human speech and writing are picking up model habits (Yakura et al. 2024 on podcasts; Geng and Trotta 2025 on academic writing). And writers now avoid dashes or certain words to escape accusations. Both effects make single-word detection less reliable and make false accusations more likely. Expert readers who use LLMs daily are accurate (a five-person majority vote misclassified 1 of 300 articles in Russell et al. 2025), but untrained readers are near chance.
