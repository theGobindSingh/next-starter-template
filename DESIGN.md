---
name: Next.js Starter Template
description: batteries-included Next.js foundation with a striking default look
colors:
  primary: "#3b82f6"
  primary-deep: "#1e40af"
  primary-muted: "#dbeafe"
  secondary: "#8b5cf6"
  secondary-deep: "#5b21b6"
  secondary-muted: "#ede9fe"
  tertiary: "#f43f5e"
  tertiary-deep: "#9f1239"
  tertiary-muted: "#ffe4e6"
  accent: "#f59e0b"
  accent-deep: "#92400e"
  accent-muted: "#fef3c7"
  neutral-bg: "#ffffff"
  neutral-surface: "#f3f4f6"
  neutral-border: "#e5e7eb"
  neutral-text: "#1f2937"
  neutral-muted: "#6b7280"
  success: "#10b981"
  caution: "#f97316"
  info: "#0ea5e9"
  error: "#ef4444"
typography:
  display:
    fontFamily: "Poppins, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Mono, 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  3xs: "0.25rem"
  2xs: "0.5rem"
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  2xl: "4rem"
  3xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-ghost-hover:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  card-default:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-elevated:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  input-default:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
  input-focus:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
---

# Design System: Next.js Starter Template

> **This is a template DESIGN.md.** It captures the starter's default visual system.
> End users: replace every token value, font, and description with your own brand identity.
> The structure follows the Google Stitch DESIGN.md format — keep the section headers
> and YAML keys intact when customizing.

<!-- Extracted from src/app/globals.css, src/components/html, and layout.tsx on 2026-06-02.
     Creative North Star confirmed by user: "The Gallery" — clean, white-space-focused,
     typography-forward brand identity. -->

## 1. Overview

**Creative North Star: "The Monograph"**

A clean, white-space-focused brand identity where every component is a piece on the wall. The layout breathes; typography carries the voice; color is used with restraint and precision. This system rejects the saturated AI-generated web aesthetic — no gratuitous gradients, no glassmorphism by default, no over-rounded cards, no section eyebrow kickers in tracked uppercase. Instead, it earns attention through deliberate hierarchy, consistent rhythm, and the confidence of empty space.

A dark, tactile, architecturally-inspired book of record. Every surface feels like the page of a limited-edition art monograph printed on heavy matte stock. The texture is felt before it's seen. Gold foil accents are used sparingly — a single ruled line, a diamond divider, a key word. The light mode is the same book printed on warm cream paper.

**Key Characteristics:**
- Warm-toned canvas (near-black dark / cream paper light) with noise grain texture
- Typography-led hierarchy with Poppins for display and Inter for body
- Gold foil accent as the brand foil; primary/secondary colors used as cold-blue contrast against warm bases
- Textured surfaces at rest; border shift to gold on interactive states
- Ornamental diamond dividers between sections as architectural punctuation
- WCAG 2.1 AA contrast compliance throughout

## 2. Colors

A restrained palette built for contrast and clarity. Neutrals are clean (zero-chroma near-whites and near-blacks). Accent colors are saturated but applied sparingly — their rarity is the point.

### Dark Mode Canvas
- **Canvas** (`#0f0f12`): Body background. Near-black with subtle warm-violet cast.
- **Surface** (`#1a1817`): Card backgrounds, secondary sections.
- **Elevated** (`#252220`): Elevated surfaces, terminal mockup.
- **Border** (`#3a3532`): Dividers, strokes, card borders.
- **Ink** (`#e0d8d0`): Body text, headings. Warm off-white, ≥11.5:1 contrast.
- **Muted** (`#88827c`): Secondary text, placeholders. ≥4.5:1 against canvas.

### Light Mode Canvas (Warm Paper)
- **Canvas** (`#f5f0eb`): Body background. Warm cream paper stock.
- **Surface** (`#e8dfd5`): Card backgrounds.
- **Border** (`#d0c5b8`): Dividers, strokes.
- **Ink** (`#2a2520`): Body text, headings. ~10:1 contrast.

### Accent
- **Gold** (`#c9a84c`): Brand foil. Decorative dividers, hover highlights, key-word emphasis. ≥6:1 on dark.
- **Bronze** (`#6b5a4d`): Secondary warmth. Ambient glow source in hero/CTA sections.

### Named Rules
**The Monograph Canvas Rule.** The canvas is no longer pure white — it is a warm-toned material surface. Dark mode: near-black with warm-violet cast. Light mode: warm cream paper. This intentional material feel replaces the previous Gallery White default.

**The Foil Rule.** Gold is used sparingly (≤5% of any surface) so it reads as precious. When gold appears — a diamond divider, a key word in the hero, a hover border — it is the only accent on that surface. Restraint makes it feel like foil stamping.

## 3. Typography

**Display Font:** Poppins (geometric sans-serif)
**Body Font:** Inter (neo-grotesque sans-serif)
**Label/Mono Font:** DM Mono (monospace)

**Character:** Clean, geometric confidence for display paired with neutral readability for body. Poppins supplies the brand's vertical presence — tight letter-spacing, high weight contrast, modern proportions. Inter handles the dense work of body copy with quiet efficiency. The pairing is all-sans but on a contrast axis: geometric + neo-grotesque, not two humanist or two geometric faces.

### Hierarchy

- **Display** (700, `clamp(2.5rem, 5vw, 3.75rem)` / 40–60px, 1.1 line-height, -0.02em letter-spacing): Hero headlines. Use sparingly — one per page. Apply `text-wrap: balance`.
- **Headline** (700, `clamp(1.875rem, 3.5vw, 2.75rem)` / 30–44px, 1.2 line-height, -0.01em letter-spacing): Section headings. One per section. Apply `text-wrap: balance`.
- **Title** (600, `clamp(1.25rem, 2.5vw, 1.5rem)` / 20–24px, 1.3 line-height): Card headings, sub-sections, dialog titles.
- **Body** (400, `1rem` / 16px, 1.6 line-height): Paragraphs, descriptions. Max line length 65–75ch. Use `text-wrap: pretty` to reduce orphans.
- **Label** (500, `0.875rem` / 14px, 1.4 line-height, 0.02em letter-spacing, uppercase): Buttons, form labels, badges, table headers, metadata. DM Mono gives code-adjacent clarity.

### Type Scale (Desktop)
`0.75rem` (12px) · `0.875rem` (14px) · `1rem` (16px) · `1.125rem` (18px) · `1.25rem` (20px) · `1.5rem` (24px) · `1.875rem` (30px) · `2.25rem` (36px) · `2.75rem` (44px) · `3.25rem` (52px) · `3.75rem` (60px)

### Named Rules
**The Gallery Plinth Rule.** Display and headline sizes are reserved for the page's primary architectural elements — hero, major section intros, full-bleed banners. Do not use Display scale for card headings, sidebar titles, or modal headers. That is the training-data reflex; the gallery plinth is for the main exhibit only.

## 4. Elevation

Hybrid model: flat surfaces at rest, subtle shadow elevation on interactive states. The system does not simulate depth at rest beyond tonal layering (surface/background separation via color). Shadows appear only as a response to user action — hover, focus, active, or programmatic elevation.

### Shadow Vocabulary
- **Gold Border Hover** (`border-color: var(--color-gold)` at 40% opacity): Card and interactive element hover state. A warm glow replaces the cold shadow.
- **Focus Ring** (`0 0 0 2px var(--color-gold)`): Keyboard focus indicator.
- **Ambient Glow** (shared layer of CSS radial gradients): Page-level atmosphere, not per-section elevation. Three gradient blobs on a shared `<main>` layer that span across section boundaries with no clipping. Each blob drifts via 20-30s CSS keyframe animation.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows must be earned through interaction. A card that casts a shadow at rest invites the user to wonder what is interactive about it; the answer should be obvious.

## 5. Texture

### Texture
- **Noise Grain:** A subtle SVG feTurbulence film grain overlay on the body background. ~3% opacity in dark mode, ~2% opacity in light. Static — no animation. Applied via CSS `::before` pseudo-element with zero JavaScript.
- **Ambient Glows:** Soft radial gradients rendered on a shared layer inside `<main>` spanning all sections. Three gradient blobs positioned at key zones (hero, features, start) — they naturally overlap and blend across section boundaries with no hard clipping. Each blob has a slow 20-30s CSS keyframe animation (translate + scale) for a barely-perceptible living drift. Disabled when `prefers-reduced-motion` is set.
- **Cross-Section Blending:** Sections with alternate backgrounds (e.g., the tokens section on `--color-surface`) use `::before` and `::after` pseudo-elements that extend 4rem beyond the section bounds, filled with linear gradients (transparent → surface color). This eliminates hard color transitions where sections meet.
- **Ornamental Dividers:** 1px ruled lines in border color flanking a gold diamond (◆). Used between major sections as architectural punctuation — replaces the eyebrow-kicker pattern entirely.

## 6. Components

### Buttons

- **Shape:** Gently curved corners (8px). Pill (`rounded-full`) reserved for tags and badges.
- **Primary:** Signal Blue background, white text, 12px 24px padding. Hover: Signal Blue Deep. Transition: background 200ms ease.
- **Focus:** 3px focus ring in Signal Blue at 30% opacity, offset by 2px.
- **Ghost:** Transparent background, Ink text. Hover: Stone Surface fill. Active: slightly darker fill.
- **Disabled:** 40% opacity on both variants. No shadow, no hover effect.

**States covered:** default, hover, focus-visible, active, disabled, loading (pulse animation on opacity).

### Cards / Containers

- **Corner Style:** Gentle curve (12px) for standalone cards. 8px for in-grid cards.
- **Background:** Gallery White at rest. Stone Surface for secondary/callout variants.
- **Border:** 1px solid Stone Border. Removed on elevated state (shadow replaces it).
- **Shadow Strategy:** None at rest. Hover Glow (`0 4px 12px rgba(0,0,0,0.08)`) on hover.
- **Internal Padding:** `--spacing-lg` (2rem) for hero cards, `--spacing-md` (1.5rem) for grid cards.

### Inputs / Fields

- **Style:** 1px solid Stone Border, Gallery White background, 8px radius. 10px 14px internal padding.
- **Focus:** Border shifts to Signal Blue. Focus ring applied. Transition: border-color 200ms ease.
- **Placeholder:** Ink Muted (`#6b7280`). Minimum 4.5:1 contrast against white.
- **Error:** Border shifts to Coral. Error text in Coral below the field.
- **Disabled:** 40% opacity background, no border shift.

### Navigation

- **Style:** Ink text, no background at rest. Hover: subtle background tint. Active/current: Signal Blue text or underline indicator.
- **Mobile:** Standard hamburger with slide-in overlay at tablet breakpoint (641–1024px). Modal Lift shadow on overlay.

### Common Layout Wrapper

- **Behavior:** Full-width background container with centered content at 85% width (90% on tablet/mobile). Configurable element type (defaults to `<section>`). Background color passed as prop.

### Named Rules
**The Card Indifference Rule.** Nested cards are strictly prohibited. A card inside a card means the layout hierarchy is wrong. Restructure into a single card with internal sections, or use tonal layering (two different surfaces) instead.

## 7. Do's and Don'ts

### Do:
- **Do** use warm-toned canvases — #f5f0eb for light mode, #0f0f12 for dark mode
- **Do** use gold accent sparingly (≤5%) so it reads as foil stamping
- **Do** use `text-wrap: balance` on h1–h3 headings and `text-wrap: pretty` on body paragraphs.
- **Do** respect `prefers-reduced-motion` on every animation — provide instant crossfade as the alternative.
- **Do** use semantic HTML: proper heading order (`h1` → `h2` → `h3`), landmark elements (`<nav>`, `<main>`, `<footer>`), and descriptive alt text on images.
- **Do** test every color pair for WCAG 2.1 AA contrast (≥4.5:1 body, ≥3:1 large text).
- **Do** use gold border transitions on hover instead of shadows for interactive elements

### Don't:
- **Don't** use gradient text (`background-clip: text` with a gradient). Solid colors only.
- **Don't** use glassmorphism (blur + semi-transparent backgrounds) as a default treatment. Only with explicit brief-driven consent.
- **Don't** apply eyebrow kickers (small tracked uppercase text like "ABOUT" / "PROCESS" / "PRICING") above every section. If used, at most one per page, and it must be a deliberate brand choice.
- **Don't** use numbered section markers (01 / 02 / 03) as default scaffolding. Numbers only when the sequence carries information (a real step-by-step process, not section decoration).
- **Don't** render identical card grids (same-sized cards with icon + heading + text repeated endlessly). Vary content blocks by purpose.
- **Don't** use hand-drawn or sketchy SVG illustrations. If you cannot render a scene with real assets, ship no illustration.
- **Don't** use `border-left` or `border-right` > 1px as a colored accent stripe. Use full borders, background tints, or leading numbers/icons instead.
- **Don't** use over-rounded corners on cards/sections (≥16px is too much). Cards cap at 12px; inputs and buttons at 8px; pill radius reserved for tags and badges only.
- **Don't** use AI-generated default backgrounds (cream/sand/parchment/linen tones). The canvas is white; warmth lives in accents and imagery.
