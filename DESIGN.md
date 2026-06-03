---
name: Next.js Starter Template
description: batteries-included Next.js foundation with a striking default look
colors:
  grey-50: "210, 20%, 98%"
  grey-100: "210, 16%, 93%"
  grey-200: "210, 14%, 90%"
  grey-300: "210, 12%, 85%"
  grey-400: "210, 10%, 70%"
  grey-500: "210, 8%, 50%"
  grey-600: "210, 6%, 40%"
  grey-700: "210, 4%, 30%"
  grey-800: "210, 2%, 20%"
  grey-900: "210, 1%, 10%"
  grey-950: "210, 1%, 5%"
  primary-500: "211, 100%, 56%"
  primary-700: "211, 100%, 28%"
  primary-100: "211, 100%, 96%"
  secondary-500: "248, 100%, 56%"
  secondary-700: "248, 100%, 28%"
  secondary-100: "248, 100%, 96%"
  accent-500: "45, 100%, 56%"
  accent-700: "45, 100%, 28%"
  accent-100: "45, 100%, 96%"
  success-500: "145, 63%, 50%"
  caution-500: "30, 100%, 56%"
  info-500: "200, 100%, 56%"
  error-500: "0, 100%, 56%"
  black: "#000000"
  white: "#ffffff"
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
    backgroundColor: "primary"
    textColor: "white"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "primary-deep"
    textColor: "white"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-ghost:
    backgroundColor: transparent
    textColor: "grey-900"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-ghost-hover:
    backgroundColor: "grey-100"
    textColor: "grey-900"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  card-default:
    backgroundColor: "white"
    textColor: "grey-900"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-elevated:
    backgroundColor: "grey-50"
    textColor: "grey-900"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  input-default:
    backgroundColor: "grey-50"
    textColor: "grey-900"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
  input-focus:
    backgroundColor: "white"
    textColor: "grey-900"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
---

# Design System: Next.js Starter Template

> **This is a template DESIGN.md.** It captures the starter's default visual system.
> End users: replace every token value, font, and description with your own brand identity.
> The structure follows the Google Stitch DESIGN.md format — keep the section headers
> and YAML keys intact when customizing.

<!-- Extracted from src/app/globals.css on 2026-06-03. -->

## 1. Overview

**Creative North Star: "The Monograph"**

A clean, white-space-focused brand identity where every component is a piece on the wall. The layout breathes; typography carries the voice; color is used with restraint and precision. This system rejects the saturated AI-generated web aesthetic — no gratuitous gradients, no glassmorphism by default, no over-rounded cards, no section eyebrow kickers in tracked uppercase. Instead, it earns attention through deliberate hierarchy, consistent rhythm, and the confidence of empty space.

A dark, tactile, architecturally-inspired book of record. Every surface feels like the page of a limited-edition art monograph printed on heavy matte stock. The texture is felt before it's seen. Gold foil accents are used sparingly — a single ruled line, a diamond divider, a key word. The light mode is the same book printed on bright white stock.

**Key Characteristics:**

- Bright white canvas in light mode / near-black dark with noise grain texture
- Typography-led hierarchy with Poppins for display and Inter for body
- Gold accent as the brand foil; primary/secondary colors used as cold-blue contrast against warm bases
- Textured surfaces at rest; interactive states shift color
- Ornamental diamond dividers between sections as architectural punctuation
- WCAG 2.1 AA contrast compliance throughout

## 2. Color System Architecture

A two-layer color system with HSL base variables consumed directly by CSS custom properties and exposed to Tailwind v4 via `@theme`.

### Layer 1: Raw HSL Tokens (`:root` / `.dark`)

All color values live as HSL base strings with companion `hsl()` wrapper variables. The raw `-base` variables store hue, saturation, and lightness as comma-separated values so they can be inspected and manipulated programmatically.

```css
--color-primary-500-base: 211, 100%, 56%;
--color-primary-500: hsl(var(--color-primary-500-base));
```

Each color family (grey, primary, secondary, accent, success, caution, info, error) supports shades 50–950.

**Light mode** (`:root, .light`): shade number increases as color darkens (50=lightest, 950=darkest).

**Dark mode** (`.dark`): shade scale inverts — what was shade 50 in light becomes shade 950 in dark, keeping the same perceived hierarchy.

```css
/* Light mode */
:root {
  --color-grey-50-base: 210, 20%, 98%;
}

/* Dark mode — same visual role, inverted shade */
.dark {
  --color-grey-950-base: 210, 20%, 98%;
}
```

### Layer 2: Tailwind Theme (`@theme`)

Generic variables are mapped to Tailwind v4 via `@theme` for utility class usage. Semantic aliases (`--color-primary`, `--color-primary-deep`, `--color-primary-muted`) point to specific shade numbers so components use intention-based names.

```css
@theme {
  --color-primary: var(--color-primary-500);
  --color-primary-deep: var(--color-primary-700);
  --color-primary-muted: var(--color-primary-100);
}
```

### Data Flow

```
HSL Base Values (-base)
     ↓
hsl() Wrapper Variables
     ↓
@theme Block  →  Components (bg-primary, text-grey-900)
```

### One-Line Rules

1. All color values → `:root` / `.dark` only
2. Light/dark defined separately with inverted shade numbers
3. Components → semantic aliases or Tailwind utilities
4. All colors → HSL with comma-separated `-base` string
5. Every scale → shades 50–950
6. Naming: `--color-{family}-{shade}[-base]`
7. `--color-black` / `--color-white` swap in dark mode

### Color Values

#### Grey Scale (Neutral)

Hue `210`. Saturation decreases from 20% (lightest) to 1% (darkest) for a subtle cool-neutral cast. Lightness ranges from 98% to 5%.

| Shade | HSL             |
| ----- | --------------- |
| 50    | `210, 20%, 98%` |
| 100   | `210, 16%, 93%` |
| 200   | `210, 14%, 90%` |
| 300   | `210, 12%, 85%` |
| 400   | `210, 10%, 70%` |
| 500   | `210, 8%, 50%`  |
| 600   | `210, 6%, 40%`  |
| 700   | `210, 4%, 30%`  |
| 800   | `210, 2%, 20%`  |
| 900   | `210, 1%, 10%`  |
| 950   | `210, 1%, 5%`   |

#### Primary (Blue) — `211` hue

Full saturation (100%). Lightness ranges from 98% (50) to 2% (950). Midpoint (500): `211, 100%, 56%`.

#### Secondary (Violet) — `248` hue

Full saturation. Midpoint (500): `248, 100%, 56%`.

#### Accent (Gold) — `45` hue

Full saturation. Midpoint (500): `45, 100%, 56%`.

#### Success — `145` hue, `63%` saturation

Midpoint (500): `145, 63%, 50%`.

#### Caution — `30` hue, full saturation

Midpoint (500): `30, 100%, 56%`.

#### Info — `200` hue, full saturation

Midpoint (500): `200, 100%, 56%`.

#### Error — `0` hue, full saturation

Midpoint (500): `0, 100%, 56%`.

#### Special Tokens

- `--color-black`: `#000000` (light), `#ffffff` (dark)
- `--color-white`: `#ffffff` (light), `#000000` (dark)
- `--shadow-hsl`: `211 100% 70%` (light), `211 100% 56%` (dark) — shadow color, not opacity

### Semantic Aliases (@theme)

| Variable                  | Points to               |
| ------------------------- | ----------------------- |
| `--color-primary`         | `--color-primary-500`   |
| `--color-primary-deep`    | `--color-primary-700`   |
| `--color-primary-muted`   | `--color-primary-100`   |
| `--color-secondary`       | `--color-secondary-500` |
| `--color-secondary-deep`  | `--color-secondary-700` |
| `--color-secondary-muted` | `--color-secondary-100` |
| `--color-accent`          | `--color-accent-500`    |
| `--color-accent-deep`     | `--color-accent-700`    |
| `--color-accent-muted`    | `--color-accent-100`    |
| `--color-success`         | `--color-success-500`   |
| `--color-caution`         | `--color-caution-500`   |
| `--color-info`            | `--color-info-500`      |
| `--color-error`           | `--color-error-500`     |

### Named Rules

**The Inverted Shade Rule.** Dark mode inverts the shade scale — the lightest shade in light mode (50) becomes the darkest shade in dark mode (950), and vice versa. This ensures the same variable name (`--color-grey-50`) serves the same visual role (lightest background) regardless of theme.

**The HSL Base Rule.** Every color variable has a companion `-base` variable storing only the comma-separated HSL triple. This enables theme switching and programmatic color manipulation without duplicating HSL values.

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

The type scale is defined as CSS custom properties (`--fs-4xs` through `--fs-4xl`) at `:root` and scales down at the `1024px` breakpoint. Tailwind utilities `text-headline` and `text-title` map to the headline and title sizes.

### Named Rules

**The Gallery Plinth Rule.** Display and headline sizes are reserved for the page's primary architectural elements — hero, major section intros, full-bleed banners. Do not use Display scale for card headings, sidebar titles, or modal headers. That is the training-data reflex; the gallery plinth is for the main exhibit only.

## 4. Elevation

Hybrid model: flat surfaces at rest, subtle shadow elevation on interactive states. The system does not simulate depth at rest beyond tonal layering (surface/background separation via color). Shadows appear only as a response to user action — hover, focus, active, or programmatic elevation.

### Shadow Vocabulary

- **Hover Shadow** (`box-shadow` using `--shadow-hsl` at low opacity): Card and interactive element hover state. Defined via `--shadow-hsl` so the shadow picks up the primary hue.
- **Focus Ring** (`0 0 0 2px var(--color-primary-500)`): Keyboard focus indicator.
- **Ambient Glow** (shared layer of CSS radial gradients): Page-level atmosphere, not per-section elevation. Three gradient blobs on a shared `<main>` layer that span across section boundaries with no clipping. Each blob drifts via 20-30s CSS keyframe animation.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows must be earned through interaction. A card that casts a shadow at rest invites the user to wonder what is interactive about it; the answer should be obvious.

## 5. Texture

### Texture

- **Noise Grain:** A subtle SVG feTurbulence film grain overlay on the body background. ~5% opacity in dark mode, ~3.5% opacity in light. Static — no animation. Applied via CSS `::before` pseudo-element with zero JavaScript.
- **Ambient Glows:** Soft radial gradients rendered on a shared layer inside `<main>` spanning all sections. Three gradient blobs positioned at key zones (hero, features, start) — they naturally overlap and blend across section boundaries with no hard clipping. Each blob has a slow 20-30s CSS keyframe animation (translate + scale) for a barely-perceptible living drift. Disabled when `prefers-reduced-motion` is set.
- **Cross-Section Blending:** Sections with alternate backgrounds (e.g., `.surface-bg`) use `::before` and `::after` pseudo-elements that extend 4rem beyond the section bounds, filled with linear gradients (transparent → surface color). This eliminates hard color transitions where sections meet.
- **Ornamental Dividers:** 1px ruled lines in `--color-grey-300` flanking a gold diamond (◆). Used between major sections as architectural punctuation — replaces the eyebrow-kicker pattern entirely.

## 6. Components

### Buttons

- **Shape:** Gently curved corners (8px). Pill (`rounded-full`) reserved for tags and badges.
- **Primary:** `--color-primary` background, white text, 12px 24px padding. Hover: `--color-primary-deep`. Transition: background 200ms ease.
- **Focus:** 2px focus ring in `--color-primary-500`.
- **Ghost:** Transparent background, `--color-grey-900` text. Hover: `--color-grey-100` fill.
- **Disabled:** 40% opacity on both variants. No shadow, no hover effect.

**States covered:** default, hover, focus-visible, active, disabled, loading (pulse animation on opacity).

### Cards / Containers

- **Corner Style:** Gentle curve (12px) for standalone cards. 8px for in-grid cards.
- **Background:** White at rest. `--color-grey-50` for secondary/callout variants.
- **Border:** 1px solid `--color-grey-300`. Removed on elevated state.
- **Shadow Strategy:** None at rest. Hover shadow (`--shadow-hsl` at 15% opacity) on hover.
- **Internal Padding:** `--spacing-lg` (2rem) for hero cards, `--spacing-md` (1.5rem) for grid cards.

### Inputs / Fields

- **Style:** 1px solid `--color-grey-300`, `--color-grey-50` background, 8px radius. 10px 14px internal padding.
- **Focus:** Border shifts to `--color-primary-500`. Focus ring applied. Transition: border-color 200ms ease.
- **Placeholder:** `--color-grey-400`. Minimum 4.5:1 contrast against white.
- **Error:** Border shifts to `--color-error`. Error text in `--color-error`.
- **Disabled:** 40% opacity background, no border shift.

### Navigation

- **Style:** `--color-grey-900` text, no background at rest. Hover: subtle `--color-grey-100` tint. Active/current: `--color-primary` text or underline indicator.
- **Mobile:** Standard hamburger with slide-in overlay at tablet breakpoint (641–1024px).

### Common Layout Wrapper

- **Behavior:** Full-width background container with centered content at 85% width (90% on tablet/mobile). Configurable element type (defaults to `<section>`). Background color passed as prop.

### Named Rules

**The Card Indifference Rule.** Nested cards are strictly prohibited. A card inside a card means the layout hierarchy is wrong. Restructure into a single card with internal sections, or use tonal layering (two different surfaces) instead.

## 7. Do's and Don'ts

### Do

- **Do** use HSL base variables (`--color-*-base`) for all color values
- **Do** invert shade numbers in dark mode (50→950, 100→900, etc.)
- **Do** use `text-wrap: balance` on h1–h3 headings and `text-wrap: pretty` on body paragraphs
- **Do** respect `prefers-reduced-motion` on every animation — provide instant crossfade as the alternative
- **Do** use semantic HTML: proper heading order (`h1` → `h2` → `h3`), landmark elements (`<nav>`, `<main>`, `<footer>`), and descriptive alt text on images
- **Do** test every color pair for WCAG 2.1 AA contrast (≥4.5:1 body, ≥3:1 large text)
- **Do** use `border-grey-300` for default borders and `border-primary` for interactive states

### Don't

- **Don't** use gradient text (`background-clip: text` with a gradient). Solid colors only
- **Don't** use glassmorphism (blur + semi-transparent backgrounds) as a default treatment. Only with explicit brief-driven consent
- **Don't** apply eyebrow kickers (small tracked uppercase text like "ABOUT" / "PROCESS" / "PRICING") above every section. If used, at most one per page, and it must be a deliberate brand choice
- **Don't** use numbered section markers (01 / 02 / 03) as default scaffolding. Numbers only when the sequence carries information (a real step-by-step process, not section decoration)
- **Don't** render identical card grids (same-sized cards with icon + heading + text repeated endlessly). Vary content blocks by purpose
- **Don't** use hand-drawn or sketchy SVG illustrations. If you cannot render a scene with real assets, ship no illustration
- **Don't** use `border-left` or `border-right` > 1px as a colored accent stripe. Use full borders, background tints, or leading numbers/icons instead
- **Don't** use over-rounded corners on cards/sections (≥16px is too much). Cards cap at 12px; inputs and buttons at 8px; pill radius reserved for tags and badges only
