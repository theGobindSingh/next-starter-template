# Neumorphism UI

A coding-agent skill for designing, building, reviewing, and refactoring Neumorphic (Soft UI)
interfaces. Functions as a senior product designer + design-system architect + accessibility
reviewer — not a CSS recipe generator.

---

## What This Skill Does

When installed, this skill activates Claude's expertise in Neumorphism across six modes:

- **Generate** — Design neumorphic UIs from scratch, calibrated to your brand and product context
- **Review** — Audit existing designs against a structured 6-dimension rubric
- **Improve** — Diagnose specific problems and propose targeted corrections
- **Refactor** — Adapt an existing design system to incorporate Soft UI selectively
- **Explain** — Teach the reasoning behind any neumorphic design decision
- **Advise** — Determine whether neumorphism is even appropriate for a given context

The skill reasons from design principles rather than reproducing fixed patterns. It adapts
to any brand, color system, framework, or product type.

---

## When to Use It

Trigger this skill when you are:

- Building any UI with soft shadows, raised/inset elements, extruded components, or a
  "clay-like" / tactile aesthetic
- Evaluating whether neumorphism is appropriate for a product or component
- Reviewing a design for depth consistency, accessibility, or hierarchy clarity
- Integrating Soft UI into an existing design system without breaking it
- Asking why a neumorphic design looks off and how to fix it

---

## What It Will NOT Do

- Generate fixed CSS values without context ("use box-shadow: 8px 8px 15px #...")
- Apply neumorphism universally regardless of brand, context, or component type
- Ignore accessibility in favor of aesthetics
- Treat neumorphism as a replacement for a design system

---

## File Structure

```
neumorphism-ui/
├── SKILL.md                        Core principles, decision frameworks, behavior guide
└── references/
    ├── visual-mechanics.md         Depth perception, light physics, shadow composition
    ├── component-guide.md          Per-component depth and interaction models
    ├── accessibility.md            WCAG framework, focus visibility, ARIA requirements
    └── evaluation.md               6-dimension scoring rubric, review output template
```

`SKILL.md` is always loaded. Reference files are pulled in on demand based on the task.

---

## Key Concepts Inside

### The Three Depth States

Every element is Raised, Flat, or Inset — and the skill explains when and why to use each
based on the element's role and interaction model, not aesthetic preference.

### Shadow Logic as Relationships

Shadows are expressed as ratios and relationships (blur ≈ 2–3× offset; shadow color derives
from background hue) rather than fixed pixel values. Works for any project.

### The Material Rule

The most important neumorphic constraint — an element must match its background color — is
explained with full reasoning so you can apply it correctly in any context.

### The Criticality Test

A decision framework for determining which components should receive neumorphic treatment
and which must remain flat + high-contrast for usability reasons.

### Supplementary Cue Requirement

The skill enforces that interactive state changes (pressed, selected, active) must always
be communicated through a non-shadow signal (color, icon, label). Shadow-only states fail
real users.

### Accessibility as First Class

Every component section covers contrast compliance, focus visibility, ARIA requirements,
and keyboard navigation. The skill actively detects situations where pure neumorphism would
harm usability and recommends corrections.

---

## Example Prompts

```
Design a neumorphic settings card with a toggle and a slider for a wellness app.

Review this neumorphic dashboard design and tell me what's wrong with it.

Should I use neumorphism for my SaaS analytics product? Why or why not?

My neumorphic toggle looks identical in on and off states. How do I fix it?

How do I integrate soft UI into my existing design system without replacing it?

Build a neumorphic login form with email input, password input, and a submit button.
```

---

## Design Philosophy

This skill treats neumorphism as a **material language**, not a style trend. Applied
correctly, it makes interfaces feel calm, tactile, and coherent. Applied incorrectly, it
creates contrast failures, ambiguous affordances, and inaccessible products.

The goal is never "make it look neumorphic." The goal is always "make it feel right for
this user, in this context, on this product" — using Soft UI where it serves that purpose
and leaving it out where it doesn't.

> Neumorphism should be felt, not noticed. If a user comments on the shadows, the effect
> is too strong. If the interface simply feels nice, it's calibrated correctly.

---

## Compatibility

Framework-agnostic. Works with plain CSS, Tailwind, styled-components, CSS-in-JS, Figma,
or any implementation technology. The skill's knowledge is based on visual principles, not
framework APIs.
