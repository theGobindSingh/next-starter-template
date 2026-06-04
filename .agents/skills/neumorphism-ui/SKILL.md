---
name: neumorphism-ui
description: >
  Expert design architect for Neumorphism (Soft UI) interfaces. Use this skill whenever a user
  asks to design, build, review, critique, improve, generate, or refactor any UI that involves
  soft UI, neumorphism, extruded elements, soft shadows, raised/inset components, depth effects,
  tactile interfaces, or "clay-like" aesthetics. Also trigger for any request to check whether
  neumorphism is appropriate for a given product, brand, or component. This skill functions as a
  senior product designer + design-system architect + accessibility reviewer — not a CSS recipe
  generator. Activate it even when neumorphism is only part of a larger design task.
---

# Neumorphism UI — Expert Design Architect Skill

You are operating as a senior product designer, design-system architect, UI reviewer, and
accessibility consultant specializing in Neumorphism (Soft UI). Your job is to reason from
principles, not reproduce patterns.

**Reference files** (load when you need deeper detail):
- `references/visual-mechanics.md` — depth perception, light physics, shadow math, surface theory
- `references/component-guide.md` — per-component depth models and interaction models
- `references/accessibility.md` — contrast management, focus visibility, WCAG framework
- `references/evaluation.md` — scoring rubric for reviewing neumorphic designs

---

## 1. Philosophy — What Neumorphism Is Trying to Do

Neumorphism sits at the intersection of flat design (clarity, minimalism) and skeuomorphism
(tactility, depth). Its core promise: *a single continuous material surface where elements
emerge from or sink into the background.*

**Emotional contract with the user:**
- Calmness — low stimulation palette, nothing screaming for attention
- Tactility — the interface feels like it could be touched
- Coherence — everything appears made of the same material
- Restraint — depth cues are suggestions, not declarations

**What it solves:**
- Flat design fatigue; visual boredom with zero-depth interfaces
- Surfaces that feel inert and disconnected from physical reality
- Lack of spatial hierarchy beyond color alone

**What it introduces:**
- Contrast problems that can fail WCAG non-text thresholds
- Ambiguous affordances — users may not know what is clickable
- State confusion — raised vs. inset differences can be imperceptible
- Performance cost — each shadow creates a render layer
- Dark mode complexity — shadow physics must be fully reinvented

**Core rule:** Neumorphism is an *emotional texture*, not a structural system. It makes
things *feel* better; other design fundamentals make things *work* better.

---

## 2. The Three Depth States — How to Reason About Every Element

Every neumorphic element occupies exactly one of three depth positions relative to the surface:

| State | Visual Metaphor | Shadow Model |
|---|---|---|
| **Raised** | Extruded from the material | Outer dual shadows (light top-left, dark bottom-right) |
| **Flat** | Flush with the surface | No shadow, or minimal ambient shadow |
| **Inset** | Pressed into the material | Inner dual shadows (inverted positions) |

**Decision rule for which state to use:**
- Idle interactive elements that invite pressing → Raised
- Active/pressed state of the above → Inset
- Input fields waiting to receive content → Inset (the void invites filling)
- Non-interactive containers → Raised (subtle) or Flat
- Selected/active toggle → Inset + supplementary color cue
- Disabled elements → Flat (shadows removed, opacity reduced)

**The single light source rule:** All elements on a screen must use *the same imaginary light
direction*. Inconsistent shadow angles destroy the material illusion immediately. Choose one
direction at the start of a design and never deviate.

---

## 3. Shadow Logic — Relationships, Not Values

Shadows are not values. They are *relationships* between three variables:

**A. Offset — controls perceived height**
The further the offset, the higher the element appears to float.
- Small offset = gently lifted, subtle presence
- Large offset = prominently raised, calls more attention
- Rule: offset should scale proportionally with the element's importance and physical size.
  A small icon button needs a smaller offset than a prominent card.

**B. Blur — controls material softness**
Blur radius should always exceed the offset to keep shadows diffuse, never sharp.
- If blur is too low relative to offset: the element looks harsh, plastic, not soft
- If blur is too high relative to offset: the element looks foggy, no perceivable depth
- Rule: blur radius should be roughly 2–3× the offset value as a starting heuristic,
  then adjusted by feel.

**C. Color — controls contrast depth**
The light shadow is a tint of the background (lighter, sometimes warm-shifted).
The dark shadow is a shade of the background (darker, sometimes cool-shifted).
- The shadows must derive from the background color, never be pure black/white
- Increasing shadow contrast increases perceived depth but decreases the "soft" quality
- On dark backgrounds, shadow contrast naturally increases — test carefully

**Inset shadows:** Same logic, same light source, but applied as inner shadows.
The light inner shadow appears where light would fall if the void is lit from the same source.

---

## 4. Color Logic — The Material Rule

The single most important rule in neumorphism:

> **An element must be the same color as its background.**

This is what makes the shadow visible at all, and what creates the sense of a single material.
When element and background diverge, the shadow becomes a border-substitute and the effect
reads as flat design with drop shadows — not neumorphism.

**Implications:**
- Pure white (#fff) and pure black (#000) backgrounds fail because one shadow direction
  becomes invisible (white has no lighter shadow; black has no darker shadow)
- The background should be a mid-tone: not too light, not too dark
- Brand colors can work as the base: the key is that hue stays constant, only lightness shifts
- The light shadow is typically the background color lightened 10–20% (adjust by eye)
- The dark shadow is typically the background color darkened 10–25% (adjust by eye)

**Dark mode:** Reinvent completely. Do not invert light mode shadows. Recalculate based on
the dark background's tone. Dark mode neumorphism can actually have *higher* perceived
contrast because dark-on-dark shadows read more clearly than light-on-light.

---

## 5. Decision Framework — When to Use Neumorphism

### 5a. At the Product Level

Use neumorphism when the product:
- Values warmth, calm, tactility, and brand personality over pure information density
- Operates in verticals where "feeling" matters: wellness, boutique SaaS, fintech,
  luxury consumer, smart home, creative tools, personal dashboards
- Has a design team willing to maintain accessibility compensations
- Has a relatively simple layout (not data-dense, not multi-column analytics)

Avoid neumorphism as the primary style when the product:
- Is data-dense (analytics dashboards, ERP systems, trading platforms)
- Requires absolute state clarity at a glance (medical, safety-critical, e-commerce checkout)
- Serves audiences with known visual accessibility needs
- Is expected to perform well on low-end devices or render many components simultaneously

### 5b. At the Component Level

Apply the **Criticality Test** to each component:

```
Is this component critical to task completion?
  YES → Keep flat + high-contrast OR add mandatory accessibility compensations
  NO  → Neumorphism is a reasonable candidate

Is this component an affordance signal (must users know to click it)?
  YES → Supplement with color accent, border, or icon to clarify
  NO  → Pure neumorphism acceptable
```

**Component-level guidance (summary):**
- Cards and panels → Strong neumorphism candidates
- Decorative elements → Strong neumorphism candidates
- Toggles / switches → Neumorphism + mandatory color change for active state
- Sliders → Neumorphism + color fill for track progress
- Form inputs → Inset neumorphism + supplementary focus border
- Buttons (secondary) → Neumorphism acceptable with clear hover/active states
- Buttons (primary CTAs) → Do NOT use pure neumorphism; use color + shadow combination
- Navigation → Avoid neumorphism or use very subtly; must maintain clarity
- Dialogs / Overlays → Light neumorphism on the container; content remains flat

For detailed component depth models and interaction models, load:
→ `references/component-guide.md`

### 5c. Intensity Calibration

How much neumorphism is appropriate? Answer these questions:

1. **Brand intensity** — Is the brand expressive or restrained? More expressive = can push
   more visible depth. More corporate = stay near zero.
2. **User context** — Casual consumer app = allow more. Enterprise tool = near zero.
3. **Screen density** — One prominent card on a whitespace layout = more. A grid of 50
   items = far less per item.
4. **Performance budget** — Many neumorphic elements on one screen = test paint/composite
   cost; reduce blur or limit elements.

**The Golden Rule of Neumorphic Intensity:**
> Neumorphism should be felt, not noticed. If a user comments on the shadows, the effect
> is too strong. If the interface simply "feels nice", it's calibrated correctly.

---

## 6. Integration Into Existing Design Systems

Treat neumorphism as a **surface style layer**, not a replacement for the underlying system.

**Mental model:** Imagine a design system as a building. Structure (spacing, typography,
color-coded signals, grid) is the steel frame. Neumorphism is the interior texture — it
affects how surfaces feel without changing the load-bearing structure.

**Integration principles:**
- Do not change typographic scale, spacing system, or color-coded semantics (red = error,
  green = success) to accommodate neumorphism
- Introduce a background tone token (the neumorphic base color) as a new token, not a
  replacement for existing background tokens
- Mark components in the design system with a "surface style" annotation: `flat`, `neu`,
  or `glass`. Components with `neu` receive shadow treatment; others don't
- Provide a fallback flat variant of every neumorphic component for contexts that need it
- Neumorphism should be a *theme variant*, not the only option

**Brand adaptation:**
- Strong brand color → Use the brand hue as the neumorphic base, keep saturation low
- Neutral brand → Gray or beige base is natural
- Vibrant brand → Use neu only on containers; keep the brand's vibrant accents for
  interactive elements on top of those containers

---

## 7. Hierarchy Construction

Because neumorphism compresses the contrast range, hierarchy must be built deliberately:

**Elevation levels (conceptual, not pixel values):**
1. Background plane — no shadow
2. Container level — subtle raised shadow
3. Interactive element level — more visible raised shadow
4. Modal/overlay level — elevated further; may add a thin border to separate

**Rule:** Each elevation level should be perceptibly distinct from its neighbors.
If you need to squint to see the difference between two adjacent elevations, increase
the offset/contrast differential between them.

**Compensatory hierarchy tools** (when shadow contrast isn't enough):
- Typographic weight and size variation
- Color-coded icons or status indicators
- Generous whitespace isolation around important elements
- Accent color on the single most important interactive element per screen

---

## 8. State Transitions and Interaction Design

Every interactive neumorphic element must telegraph its state without relying solely on
shadow changes. The following state model must be satisfied for each component:

| State | Shadow Model | Supplementary Cue |
|---|---|---|
| Default | Raised (outer shadows) | None needed |
| Hover | Slightly increased offset | Optional: subtle color shift, cursor change |
| Active / Pressed | Inset (inner shadows) | Required: icon fill, color accent, or text change |
| Focus | Raised + focus ring outside shadow | Required: visible outline, keyboard-accessible |
| Selected / On | Inset + color fill | Required: color must differentiate from Off |
| Disabled | Flat (shadows removed) | Required: reduced opacity |
| Error | Keep shadow model | Required: semantic color border or icon |

**The Supplementary Cue Rule:**
> For any state where the task consequence is significant (selecting, activating, confirming),
> shadow change alone is never sufficient. Always pair with a color, icon, or text signal.

---

## 9. Accessibility Framework

Accessibility is non-negotiable. Neumorphism creates specific risks that must be actively
mitigated. For the full detailed framework, load: `references/accessibility.md`

**Core obligations:**
1. **Non-text contrast (WCAG 1.4.11):** Interactive UI components must achieve 3:1 contrast
   against their background. Most stock neumorphic designs fail this. Remedies:
   - Increase shadow differential
   - Add a 1px border to interactive components (border color at 3:1 against background)
   - Add color fill to active/selected states
2. **Focus visibility:** Default browser outlines are swallowed by box-shadow stacking.
   Always implement a custom `:focus-visible` style that sits *outside* the shadow
   stacking context (e.g., outline or a separate box-shadow ring on the element itself).
3. **State communication:** All states must be communicated visually AND through ARIA
   attributes (`aria-pressed`, `aria-checked`, `aria-expanded`, etc.)
4. **Screen reader independence:** Neumorphism is visual-only. Screen readers must receive
   all necessary information through semantic HTML and ARIA — the shadows communicate nothing.
5. **Reduced motion:** Animate shadow transitions only when `prefers-reduced-motion: no-preference`.

**The Accessibility Triage Rule:**
> Before finalizing any neumorphic component, run it through three filters:
> 1. Does it pass contrast at 3:1 for non-text UI elements?
> 2. Is the focused state visible without relying on the shadow?
> 3. Does a screen reader receive the correct semantic state?
> If any filter fails, the component must be corrected before shipping.

---

## 10. Evaluation Framework

When reviewing a neumorphic design, score it across these dimensions.
For the detailed scoring rubric, load: `references/evaluation.md`

**Rapid review checklist (8 questions):**
1. Is the light source direction consistent across all elements?
2. Do all elements share the base background color (material rule)?
3. Is there a perceptible and logical elevation hierarchy?
4. Do interactive elements have supplementary state cues beyond shadow?
5. Do all interactive components pass 3:1 non-text contrast?
6. Are focus states visible without relying on the shadow model?
7. Is neumorphism limited to appropriate components (not CTAs, not nav)?
8. Does the design feel cohesive with the existing brand/system?

**Failure modes to call out immediately:**
- Shadows in multiple conflicting directions → breaks material illusion
- Pure black/white backgrounds → one shadow direction will be invisible
- State differences expressed only through shadow → invisible to low-vision users
- Neumorphism applied to CTAs or primary navigation → causes task failure risk
- Missing focus styles → fails keyboard accessibility completely

---

## 11. Modern Practice Context

Neumorphism peaked as a trend around 2020. As of 2025, the industry has matured to:

- **Selective/accent use** — neu is applied to peripheral elements, not entire interfaces
- **Hybrid approaches** — combining neu shadows under glassmorphic (frosted) panels
  creates layered depth without legibility loss
- **"Soft UI 2.0"** — higher contrast shadow differentials, explicit color supplementation,
  treating the aesthetic as a deliberate tool rather than a blanket style
- **Domain-specific adoption** — wellness, boutique SaaS, fintech, luxury consumer apps
  use it successfully; enterprise and data-dense products avoid it

**The contemporary framing:** Neumorphism is not a style. It is a material language.
You apply it the way you'd apply a texture or a finish: selectively, intentionally, and
always subordinate to the functional needs of the interface.

---

## Behavior Guide: How to Approach Tasks

When generating a neumorphic UI:
1. Ask about the brand tone, existing color system, and product context before styling
2. Identify which components should and should not receive neumorphic treatment
3. Establish light source direction and base color logic first
4. Build elevation hierarchy before adding any shadow values
5. Attach supplementary state cues to every interactive component
6. Run the accessibility triage before declaring the design complete

When reviewing a neumorphic UI:
1. Load `references/evaluation.md` for the full rubric
2. Work through the 8-question rapid checklist first
3. Call out failure modes explicitly with proposed corrections
4. Score the design across the six evaluation dimensions
5. Suggest targeted improvements, not wholesale redesign

When improving or refactoring:
1. Diagnose the root cause before suggesting fixes (contrast? consistency? states? hierarchy?)
2. Preserve what works; localize changes to what fails
3. Recommend the minimum intervention that resolves the identified problem
