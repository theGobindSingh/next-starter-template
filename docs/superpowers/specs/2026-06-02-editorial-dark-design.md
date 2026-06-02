# Editorial Dark: Design System Overhaul

**Date:** 2026-06-02
**Status:** Approved
**Register:** brand

## Summary

Overhaul the starter template's visual system from "The Gallery" (clean, white-space-focused, restrained) to **Editorial Dark** — a rich, warm dark-mode-first system with a warm-paper light mode counterpart. The new direction adds texture (noise grain), depth (ambient glows, spot gradients), and editorial refinement (ornamental dividers, gold accent) while preserving the existing typography stack (Poppins + Inter + DM Mono) and structure.

## Creative North Star

**"The Monograph"** — A dark, tactile, architecturally-inspired book of record. Every surface feels like the page of a limited-edition art monograph printed on heavy matte stock. The texture is felt before it's seen. Gold foil accents are used sparingly — a single ruled line, a diamond divider, a key word. The light mode is the same book printed on warm cream paper. Together, they are two editions of the same volume.

## Color Strategy

**Strategy: Committed** — one saturated accent (gold) on a warm tonal base. Color is restrained in volume but carries weight through material warmth.

### Dark Mode Palette

| Token | Value | Role |
|-------|-------|------|
| `canvas` | `#0f0f12` | Body background. Near-black with a subtle warm-violet cast. |
| `surface` | `#1a1817` | Secondary surface — card backgrounds, tinted sections. |
| `elevated` | `#252220` | Elevated surfaces — hover states, modal backgrounds. |
| `border` | `#3a3532` | Dividers, input strokes, card borders. Warm dark gray. |
| `ink` | `#e0d8d0` | Body text, headings. High-emphasis content. Warm off-white. |
| `muted` | `#88827c` | Secondary text, placeholders. Warm gray, ≥4.5:1 against canvas. |
| `gold` | `#c9a84c` | Primary accent — decorative dividers, hover highlights, key-word emphasis. |
| `bronze` | `#6b5a4d` | Warmth accent — ambient glow source color, secondary warm tone. |
| `primary` | `#3b82f6` | Signal Blue — buttons, links (unchanged from current). |
| `secondary` | `#8b5cf6` | Violet (unchanged). |
| `tertiary` | `#cd5c5c` | Rose (adjusted slightly warmer). |

### Light Mode Palette (Inverse — Warm Paper)

| Token | Value | Role |
|-------|-------|------|
| `canvas` | `#f5f0eb` | Body background. Warm cream paper, like heavy art-stock. |
| `surface` | `#e8dfd5` | Secondary surface — card backgrounds. |
| `border` | `#d0c5b8` | Dividers, strokes. |
| `ink` | `#2a2520` | Body text, headings. Warm near-black. |
| `muted` | `#6b5a4d` | Secondary text. |
| `gold` | `#c9a84c` | Accent (same as dark — gold works on both). |

### Canvas Rule (revised)

The Gallery Rule is retired. The canvas is no longer pure white; it is now a warm-toned surface (dark warm charcoal or cream paper) with an intentional material feel. Light mode's canvas targets `#f5f0eb` — not Gallery White, not AI-cream, but a deliberate warm paper stock that supports the monograph metaphor.

## Background System

### Layer 1: Noise Grain (Base)

A subtle SVG-based film grain overlay on the body background. Applied via a CSS `::before` pseudo-element with an SVG `<filter>` — zero JavaScript, zero network request, zero runtime cost. The grain is opaque enough to feel tactile (~3% opacity in dark mode, ~2% in light) but transparent enough to not interfere with readability.

Implementation approach:
- SVG `feTurbulence` + `feColorMatrix` filter
- Applied via `filter: url(#noise)` on a pseudo-element
- Dark mode: warm-white grain on near-black canvas
- Light mode: charcoal grain on cream paper canvas

### Layer 2: Shared Ambient Glow Layer

A single absolutely-positioned layer on `<main>` holds three gradient blobs that span across section boundaries — no per-section `::before` pseudo-elements, no clipping. Each blob is a large radial gradient that fades to transparent at its edges, so they naturally overlap and blend:

- **Hero blob** — bronze + secondary dual radial gradient, positioned top (~45% of page height). Drifts via 25s CSS keyframe.
- **Features blob** — violet glow from the left, positioned mid-page (~30-65%). Drifts via 30s CSS keyframe.
- **Start blob** — gold ambient halo, positioned near the bottom (~75%+). Drifts via 20s CSS keyframe.

All three have slow (`translate` + `scale`) CSS `@keyframes` at 20-30s intervals for a living but imperceptible drift. Disabled at `prefers-reduced-motion: reduce`.

### Layer 3: Cross-Section Blending

Sections with alternate backgrounds (e.g., tokens section on `--color-surface`) get `::before` and `::after` pseudo-elements extending 4rem beyond the section bounds. These are filled with linear gradients that fade from transparent to the surface color (top edge) and surface to transparent (bottom edge). This eliminates hard color seams where a different-background section meets adjacent canvas-background sections. The gradients fall within each section's padding zone, so content is never overlayed.

### Layer 4: Ornamental Dividers (Between Major Sections)

Fine 1px horizontal ruled lines in muted bronze/gold, centered with a small gold diamond character (`◆`). Applied as `::before` or `::after` on `<section>` elements. The divider is the only decoration between sections — no spaced repetition, no heading kickers.

Design:
- 1px solid `--color-border`
- Width: `clamp(4rem, 15vw, 8rem)`
- Center: gold `◆` 4px from each side
- Vertical margin: 4rem from content

## Section Treatment Map

| Section | Background | Effects | Notes |
|---------|-----------|---------|-------|
| Hero | Grain + Shared Layer | Hero gradient blob from shared layer. Ornamental top border line, gold accent on key word | Most dramatic section |
| Features | Grain + Shared Layer | Features gradient blob from shared layer. Clean cards | Cards use border-only definition |
| Tokens | Grain + Surface solid bg | No glow — color swatches are the visual focus | Surface background to differentiate from canvas |
| Config | Grain only | No glow, no surface swap | Ornamental divider above |
| Start | Grain + Shared Layer | Start gradient blob from shared layer | Bookends with hero |
| Footer | Grain only | Ornamental top divider, smaller type | Quiet conclusion |

## Typography

### Stack (Unchanged)
- **Display:** Poppins 700 (geometric sans-serif)
- **Body:** Inter 400 (neo-grotesque sans-serif)
- **Mono:** DM Mono 500

### Refinements
- Body line-height increased by +0.05 in dark mode (light reads as lighter weight on dark backgrounds)
- Display headings: key brand words highlighted in `--color-gold` (hero only, max 2 words per heading)
- Ornamental rule above `h2` section headings: 1px line + gold diamond + 1px line, centered, 4rem above heading
- No eyebrow kickers on any section. The ornamental divider IS the section transition.
- `text-wrap: balance` on h1–h3 (carried forward)
- `text-wrap: pretty` on body (carried forward)

## Component Updates

### Cards (Features, Config)
- Dark mode: `--color-surface` background (`#1a1817`), `--color-border` border
- Light mode: `--color-surface` background (`#e8dfd5`), `--color-border` border
- Hover: border shifts to `--color-gold` at 40% opacity, subtle ambient glow
- Remove the `box-shadow` hover pattern (carried forward from current elevation rules)

### Buttons
- Primary: `--color-primary` (Signal Blue) — unchanged, the "cold" accent against warm backgrounds creates intentional tension
- Ghost: transparent, `--color-ink` text. Hover: `--color-surface` (`#252220` dark / `#d0c5b8` light)
- CTA (hero): `--color-gold` as alternative primary when placed on the hero's warm gradient

### Terminal Mockup (Start Section)
- Dark: `--color-elevated` background (`#252220`), `--color-border` border
- Light: white background, `--color-border` border
- Gold accent on prompt symbol and command names
- Noise grain overlay on the mockup itself for consistency

### Typography Specimens (Tokens Section)
- Font specimen blocks use `--color-surface` background
- Ornamental top rule (1px gold centered line + diamond) above each specimen group heading

## Responsive Behavior

- Grain and shared glow layer persist at all breakpoints
- Animated glow blobs scale proportionally — no layout shift on mobile
- Ornamental dividers remain visible at tablet/mobile but at reduced width (`clamp(2rem, 10vw, 4rem)`)
- Section stack collapses to single column at mobile with standard padding

## Accessibility

- WCAG 2.1 AA maintained throughout
- Dark mode: `#e0d8d0` on `#0f0f12` = contrast ratio ~11.5:1 (exceeds AA)
- Light mode: `#2a2520` on `#f5f0eb` = contrast ratio ~10:1 (exceeds AA)
- Gold accent `#c9a84c` on dark canvas = ~6:1 (meets AA for large text)
- Noise grain at 3% opacity does not measurably reduce readability
- `prefers-reduced-motion`: all glow animations disabled; grain is static
- Light/dark toggle respects `prefers-color-scheme` with manual override via class toggle

## Files to Modify

| File | Change |
|------|--------|
| `src/app/globals.css` | Replace `:root` theme block with dark/light tokens, add noise grain SVG filter, add ornamental divider styles, add section glow classes |
| `PROJECT_STANDARD_CONSTANTS.md` | Update color constants |
| `DESIGN.md` | Rebrand from "The Gallery" to "The Monograph", update all color values, update elevation rules |
| `src/components/landing/data.ts` | Update color token data |
| `src/components/landing/tokens.tsx` | Update swatch rendering for new palette |
| `src/components/landing/hero.tsx` | Add gradient background + ornamental border + gold key-word accent |
| `src/components/landing/features.tsx` | Add ambient glow to section |
| `src/components/landing/tokens.tsx` | Add surface background + gold accent border on specimens |
| `src/components/landing/config.tsx` | Add ornamental divider above section |
| `src/components/landing/start.tsx` | Add gradient background |
| `src/components/landing/footer.tsx` | Add ornamental divider |
| `src/app/layout.tsx` | Add theme toggle script/component if needed |

## File to Create

- `src/components/theme-toggle.tsx` — Client component for light/dark mode toggle
- `src/components/landing/section-wrapper.tsx` — Reusable section wrapper with divider option; no per-section glow (now handled by shared layer)

## Non-Goals

- No JavaScript for animations — glow drift is CSS `@keyframes` only
- No new font families — Poppins + Inter + DM Mono retained
- No card layout restructuring — only visual refresh
- No new pages or routes — homepage only
- No full glassmorphism anywhere
- No gradient text (`background-clip: text`)
- No hand-drawn SVG illustrations
