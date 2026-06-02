# Editorial Dark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the homepage design system from "The Gallery" (clean white) to "The Monograph" (dark mode + warm paper light mode, noise grain, ambient glows, gold accents, ornamental dividers).

**Architecture:** Single-page RSC layout with a client theme toggle. All backgrounds are CSS-only (SVG filter for grain, shared absolutely-positioned glow layer on `<main>` with three animated gradient blobs, pseudo-elements for dividers). Zero JS runtime for visual effects — only the theme toggle is a client component. Glow blobs drift via CSS `@keyframes` (20-30s cycles) and are disabled at `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 App Router, Tailwind v4 `@theme` directive, SVG `feTurbulence` for noise grain, CSS custom properties for theming.

---

## File Structure

### Create:
- `src/components/theme-toggle.tsx` — Client component: toggles `.dark`/`.light` class on `<html>`, syncs localStorage
- `src/components/landing/ornamental-divider.tsx` — Server component: renders the gold diamond divider line
- `src/components/landing/section-wrapper.tsx` — Server component: wraps sections with background variant (surface or default); glow is handled by shared layer, not per-section

### Modify:
- `src/app/globals.css` — Replace theme block with dark/light tokens, SVG noise filter, ornamental styles, glow classes, theme class definitions
- `src/app/layout.tsx` — Add dark/light default class, inline flash-prevention script, noise filter SVG
- `src/components/landing/hero.tsx` — Gradient background, ornamental top border, gold accent on key word
- `src/components/landing/features.tsx` — Ambient violet glow via section-wrapper
- `src/components/landing/tokens.tsx` — Surface background swap, ornamental dividers on specimen groups
- `src/components/landing/config.tsx` — No glow, clean grain background
- `src/components/landing/start.tsx` — Ambient bronze glow via section-wrapper
- `src/components/landing/footer.tsx` — Ornamental top divider
- `src/components/landing/data.ts` — Update color token hex values and labels
- `src/components/landing/types.ts` — Add SectionVariant type

### Update:
- `DESIGN.md` — Rebrand from "The Gallery" to "The Monograph"
- `PROJECT_STANDARD_CONSTANTS.md` — Update color and style constants

---

### Task 1: Types — Add SectionVariant

**Files:**
- Modify: `src/components/landing/types.ts`

- [ ] **Add SectionVariant type**

Edit `src/components/landing/types.ts`:
```typescript
export interface ColorToken {
  label: string;
  varName: string;
  hex: string;
  cssVar: string;
  group:
    | "primary"
    | "secondary"
    | "tertiary"
    | "accent"
    | "neutral"
    | "semantic";
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface ConfigStep {
  title: string;
  file: string;
  description: string;
  items: string[];
}

export type SectionVariant =
  | "default"
  | "glow-left"
  | "glow-bottom"
  | "gradient-hero"
  | "gradient-start"
  | "surface";
```

---

### Task 2: globals.css — New Theme Block + Noise + Glows + Dividers + Theme Classes

**Files:**
- Modify: `src/app/globals.css` — full rewrite of the file

- [ ] **Replace globals.css with the new theme system**

Write `src/app/globals.css`:

```css
@import "tailwindcss";

/* ─── Light Mode Default ─── */
:root {
  --color-black: #000000;
  --color-white: #ffffff;

  /* Warm paper palette (light) */
  --color-canvas: #f5f0eb;
  --color-surface: #e8dfd5;
  --color-elevated: #faf6f2;
  --color-border: #d0c5b8;
  --color-ink: #2a2520;
  --color-muted: #6b5a4d;

  /* Accent */
  --color-gold: #c9a84c;
  --color-gold-deep: #b8943a;
  --color-bronze: #6b5a4d;
  --color-gold-muted: #f0e6c8;

  /* Brand colors (carried forward, adjusted for warm bg) */
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;

  --color-secondary-100: #ede9fe;
  --color-secondary-200: #ddd6fe;
  --color-secondary-300: #c4b5fd;
  --color-secondary-400: #a78bfa;
  --color-secondary-500: #8b5cf6;
  --color-secondary-600: #7c3aed;
  --color-secondary-700: #6d28d9;
  --color-secondary-800: #5b21b6;

  --color-tertiary-100: #fce8e8;
  --color-tertiary-200: #f9d0d0;
  --color-tertiary-300: #f4a8a8;
  --color-tertiary-400: #e87a7a;
  --color-tertiary-500: #cd5c5c;
  --color-tertiary-600: #b94444;
  --color-tertiary-700: #a03030;
  --color-tertiary-800: #802020;

  --color-accent-100: #fef3c7;
  --color-accent-200: #fde68a;
  --color-accent-300: #fcd34d;
  --color-accent-400: #fbbf24;
  --color-accent-500: #f59e0b;
  --color-accent-600: #d97706;
  --color-accent-700: #b45309;
  --color-accent-800: #92400e;

  --color-success-100: #d1fae5;
  --color-success-200: #a7f3d0;
  --color-success-300: #6ee7b7;
  --color-success-400: #34d399;
  --color-success-500: #10b981;
  --color-success-600: #059669;
  --color-success-700: #047857;
  --color-success-800: #065f46;

  --color-caution-100: #ffedd5;
  --color-caution-200: #fed7aa;
  --color-caution-300: #fdba74;
  --color-caution-400: #fb923c;
  --color-caution-500: #f97316;
  --color-caution-600: #ea580c;
  --color-caution-700: #c2410c;
  --color-caution-800: #9a3412;

  --color-info-100: #e0f2fe;
  --color-info-200: #bae6fd;
  --color-info-300: #7dd3fc;
  --color-info-400: #38bdf8;
  --color-info-500: #0ea5e9;
  --color-info-600: #0284c7;
  --color-info-700: #0369a1;
  --color-info-800: #075985;

  --color-error-100: #fee2e2;
  --color-error-200: #fecaca;
  --color-error-300: #fca5a5;
  --color-error-400: #f87171;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
  --color-error-800: #991b1b;

  /* Type scale */
  --fs-4xs: 0.75rem;
  --fs-3xs: 0.875rem;
  --fs-2xs: 1rem;
  --fs-1xs: 1.125rem;
  --fs-s: 1.25rem;
  --fs-m: 1.5rem;
  --fs-l: 1.875rem;
  --fs-1xl: 2.25rem;
  --fs-2xl: 2.75rem;
  --fs-3xl: 3.25rem;
  --fs-4xl: 3.75rem;
}

@media (max-width: 1024px) {
  :root {
    --fs-4xs: 0.6875rem;
    --fs-3xs: 0.75rem;
    --fs-2xs: 0.875rem;
    --fs-1xs: 1rem;
    --fs-s: 1.125rem;
    --fs-m: 1.25rem;
    --fs-l: 1.5rem;
    --fs-1xl: 1.875rem;
    --fs-2xl: 2.25rem;
    --fs-3xl: 2.75rem;
    --fs-4xl: 3.25rem;
  }
}

/* ─── Dark Mode ─── */
.dark {
  --color-canvas: #0f0f12;
  --color-surface: #1a1817;
  --color-elevated: #252220;
  --color-border: #3a3532;
  --color-ink: #e0d8d0;
  --color-muted: #88827c;

  --color-gold: #c9a84c;
  --color-gold-deep: #d4b85c;
  --color-bronze: #8b7a6d;
  --color-gold-muted: #3a3520;

  --color-primary-100: #1e3a5a;
  --color-primary-200: #1e4a7a;
  --color-primary-300: #2563ab;
  --color-primary-400: #3b82f6;
  --color-primary-500: #60a5fa;
  --color-primary-600: #93c5fd;
  --color-primary-700: #bfdbfe;
  --color-primary-800: #dbeafe;

  --color-secondary-100: #2a1a4a;
  --color-secondary-200: #3a2a6a;
  --color-secondary-300: #5b3a9a;
  --color-secondary-400: #7c3aed;
  --color-secondary-500: #a78bfa;
  --color-secondary-600: #c4b5fd;
  --color-secondary-700: #ddd6fe;
  --color-secondary-800: #ede9fe;

  --color-tertiary-100: #3a1a1a;
  --color-tertiary-200: #5a2a2a;
  --color-tertiary-300: #8a3a3a;
  --color-tertiary-400: #b94444;
  --color-tertiary-500: #cd5c5c;
  --color-tertiary-600: #e87a7a;
  --color-tertiary-700: #f4a8a8;
  --color-tertiary-800: #fce8e8;

  --color-accent-100: #3a2a0a;
  --color-accent-200: #5a4a1a;
  --color-accent-300: #8a6a2a;
  --color-accent-400: #b8943a;
  --color-accent-500: #f59e0b;
  --color-accent-600: #fbbf24;
  --color-accent-700: #fcd34d;
  --color-accent-800: #fde68a;

  --color-success-100: #0a2a1a;
  --color-success-200: #0a4a2a;
  --color-success-300: #0a7a4a;
  --color-success-400: #059669;
  --color-success-500: #10b981;
  --color-success-600: #34d399;
  --color-success-700: #6ee7b7;
  --color-success-800: #a7f3d0;

  --color-caution-100: #2a1a0a;
  --color-caution-200: #4a2a0a;
  --color-caution-300: #7a4a1a;
  --color-caution-400: #ea580c;
  --color-caution-500: #f97316;
  --color-caution-600: #fb923c;
  --color-caution-700: #fdba74;
  --color-caution-800: #fed7aa;

  --color-info-100: #0a1a3a;
  --color-info-200: #0a2a5a;
  --color-info-300: #0a4a8a;
  --color-info-400: #0284c7;
  --color-info-500: #0ea5e9;
  --color-info-600: #38bdf8;
  --color-info-700: #7dd3fc;
  --color-info-800: #bae6fd;

  --color-error-100: #3a0a0a;
  --color-error-200: #5a1a1a;
  --color-error-300: #8a2a2a;
  --color-error-400: #dc2626;
  --color-error-500: #ef4444;
  --color-error-600: #f87171;
  --color-error-700: #fca5a5;
  --color-error-800: #fecaca;
}

@theme {
  --font-sans: var(--font-poppins);
  --font-serif: var(--font-inter);
  --font-mono: var(--font-dm-mono);
  --color-canvas: var(--color-canvas);
  --color-surface: var(--color-surface);
  --color-elevated: var(--color-elevated);
  --color-border: var(--color-border);
  --color-ink: var(--color-ink);
  --color-muted: var(--color-muted);
  --color-gold: var(--color-gold);
  --color-gold-deep: var(--color-gold-deep);
  --color-bronze: var(--color-bronze);
  --color-gold-muted: var(--color-gold-muted);
  --color-primary: var(--color-primary-500);
  --color-primary-deep: var(--color-primary-700);
  --color-primary-muted: var(--color-primary-100);
  --color-secondary: var(--color-secondary-500);
  --color-secondary-deep: var(--color-secondary-700);
  --color-secondary-muted: var(--color-secondary-100);
  --color-tertiary: var(--color-tertiary-500);
  --color-tertiary-deep: var(--color-tertiary-700);
  --color-tertiary-muted: var(--color-tertiary-100);
  --color-accent: var(--color-accent-500);
  --color-accent-deep: var(--color-accent-700);
  --color-accent-muted: var(--color-accent-100);
  --color-success: var(--color-success-500);
  --color-caution: var(--color-caution-500);
  --color-info: var(--color-info-500);
  --color-error: var(--color-error-500);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

html {
  color-scheme: light;
}

html.dark {
  color-scheme: dark;
}

body {
  background-color: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.65;
  position: relative;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ─── Noise Grain ─── */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

html.dark body::before {
  opacity: 0.05;
}

/* ─── Shared Ambient Glow Layer ─── */
.glow-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.glow-hero {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 45%;
  background:
    radial-gradient(ellipse 800px 500px at 70% 80%, var(--color-bronze) 0%, transparent 70%),
    radial-gradient(ellipse 500px 600px at 20% 20%, var(--color-secondary) 0%, transparent 65%);
  opacity: 0.12;
  animation: glow-drift-hero 25s ease-in-out infinite;
}

.glow-features {
  position: absolute;
  top: 30%;
  left: -10%;
  width: 60%;
  height: 35%;
  background: radial-gradient(ellipse 500px 500px at 30% 50%, var(--color-secondary) 0%, transparent 70%);
  opacity: 0.08;
  animation: glow-drift-features 30s ease-in-out infinite;
}

.glow-start {
  position: absolute;
  bottom: 5%;
  left: 15%;
  width: 70%;
  height: 25%;
  background: radial-gradient(ellipse 600px 400px at 50% 30%, var(--color-gold) 0%, transparent 70%);
  opacity: 0.06;
  animation: glow-drift-start 20s ease-in-out infinite;
}

@keyframes glow-drift-hero {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(2%, -1.5%); }
  50% { transform: translate(-1%, 1.5%); }
  75% { transform: translate(-1.5%, -1%); }
}

@keyframes glow-drift-features {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-2.5%, 1.5%) scale(1.05); }
  66% { transform: translate(1.5%, -1%) scale(0.95); }
}

@keyframes glow-drift-start {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(1.5%, 2%) scale(1.04); }
}

@media (prefers-reduced-motion: reduce) {
  .glow-hero,
  .glow-features,
  .glow-start {
    animation: none;
  }
}

.surface-bg {
  background-color: var(--color-surface);
}

/* ─── Ornamental Divider ─── */
.ornamental-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 4rem 0;
}

.ornamental-divider .line {
  height: 1px;
  flex: 0 1 clamp(4rem, 15vw, 8rem);
  background-color: var(--color-border);
}

.ornamental-divider .diamond {
  color: var(--color-gold);
  font-size: 0.5rem;
  line-height: 1;
  flex-shrink: 0;
}
```

- [ ] **Run lint to check**

```bash
pnpm lint
```
Expected: no errors

---

### Task 3: layout.tsx — Theme Script + Noise SVG + Default Theme

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Add flash-prevention script and default theme class**

Edit `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import {
  DM_Mono as DmMono,
  Inter,
  Nothing_You_Could_Do as NothingYouCouldDo,
  Poppins,
} from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const fontSansSerif = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontMono = DmMono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

const fontSans = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontCursive = NothingYouCouldDo({
  variable: "--font-cursive",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description:
    "Starter template with Next.js, TypeScript, and Tailwind baseline.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const THEME_SCRIPT = `
(function() {
  var theme = localStorage.getItem('theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
`;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body
        className={`${fontSansSerif.variable} ${fontMono.variable} ${fontSans.variable} ${fontCursive.variable}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
```

- [ ] **Run lint to check**

```bash
pnpm lint
```
Expected: no errors

---

### Task 4: Ornamental Divider Component

**Files:**
- Create: `src/components/landing/ornamental-divider.tsx`

- [ ] **Create OrnamentalDivider component**

Write `src/components/landing/ornamental-divider.tsx`:
```typescript
const OrnamentalDivider = () => {
  return (
    <div className="ornamental-divider" aria-hidden="true">
      <span className="line" />
      <span className="diamond">&#9670;</span>
      <span className="line" />
    </div>
  );
};

export default OrnamentalDivider;
```

---

### Task 5: Section Wrapper Component

**Files:**
- Create: `src/components/landing/section-wrapper.tsx`

- [ ] **Create SectionWrapper component**

Write `src/components/landing/section-wrapper.tsx`:
```typescript
import type { ReactNode } from "react";
import OrnamentalDivider from "./ornamental-divider";
import type { SectionVariant } from "./types";

interface SectionWrapperProps {
  children: ReactNode;
  variant?: SectionVariant;
  id?: string;
  withDivider?: boolean;
  as?: "section" | "footer";
}

const SectionWrapper = ({
  children,
  variant = "default",
  id,
  withDivider = false,
  as: Tag = "section",
}: SectionWrapperProps) => {
  const bgClass = variant === "surface" ? "surface-bg" : "";

  return (
    <>
      {withDivider && <OrnamentalDivider />}
      <Tag id={id} className={bgClass}>
        <div className="mx-auto w-[85%] max-[1024px]:w-[90%]">
          {children}
        </div>
      </Tag>
    </>
  );
};

export default SectionWrapper;
```

---

### Task 6: Theme Toggle Component

**Files:**
- Create: `src/components/theme-toggle.tsx`

- [ ] **Create ThemeToggle client component**

Write `src/components/theme-toggle.tsx`:
```typescript
"use client";

import { useCallback, useEffect, useState } from "react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [dark]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-border bg-surface text-ink transition-all duration-200 hover:border-gold hover:shadow-[0_0_20px_-4px_var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        /* sun icon */
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* moon icon */
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
```

---

### Task 7: data.ts — Update Color Tokens

**Files:**
- Modify: `src/components/landing/data.ts`

- [ ] **Update COLOR_TOKENS array with new values**

Replace the COLOR_TOKENS array in `src/components/landing/data.ts`:

```typescript
export const COLOR_TOKENS: ColorToken[] = [
  {
    label: "Canvas",
    varName: "canvas",
    hex: "#0f0f12",
    cssVar: "--color-canvas",
    group: "neutral",
  },
  {
    label: "Surface",
    varName: "surface",
    hex: "#1a1817",
    cssVar: "--color-surface",
    group: "neutral",
  },
  {
    label: "Elevated",
    varName: "elevated",
    hex: "#252220",
    cssVar: "--color-elevated",
    group: "neutral",
  },
  {
    label: "Border",
    varName: "border",
    hex: "#3a3532",
    cssVar: "--color-border",
    group: "neutral",
  },
  {
    label: "Ink",
    varName: "ink",
    hex: "#e0d8d0",
    cssVar: "--color-ink",
    group: "neutral",
  },
  {
    label: "Muted",
    varName: "muted",
    hex: "#88827c",
    cssVar: "--color-muted",
    group: "neutral",
  },
  {
    label: "Gold",
    varName: "gold",
    hex: "#c9a84c",
    cssVar: "--color-gold",
    group: "accent",
  },
  {
    label: "Bronze",
    varName: "bronze",
    hex: "#6b5a4d",
    cssVar: "--color-bronze",
    group: "accent",
  },
  {
    label: "Signal Blue",
    varName: "primary",
    hex: "#3b82f6",
    cssVar: "--color-primary-500",
    group: "primary",
  },
  {
    label: "Signal Blue Deep",
    varName: "primary-deep",
    hex: "#1d4ed8",
    cssVar: "--color-primary-700",
    group: "primary",
  },
  {
    label: "Signal Blue Muted",
    varName: "primary-muted",
    hex: "#dbeafe",
    cssVar: "--color-primary-100",
    group: "primary",
  },
  {
    label: "Orchid Violet",
    varName: "secondary",
    hex: "#8b5cf6",
    cssVar: "--color-secondary-500",
    group: "secondary",
  },
  {
    label: "Orchid Deep",
    varName: "secondary-deep",
    hex: "#6d28d9",
    cssVar: "--color-secondary-700",
    group: "secondary",
  },
  {
    label: "Orchid Muted",
    varName: "secondary-muted",
    hex: "#ede9fe",
    cssVar: "--color-secondary-100",
    group: "secondary",
  },
  {
    label: "Bloom Rose",
    varName: "tertiary",
    hex: "#cd5c5c",
    cssVar: "--color-tertiary-500",
    group: "tertiary",
  },
  {
    label: "Bloom Deep",
    varName: "tertiary-deep",
    hex: "#a03030",
    cssVar: "--color-tertiary-700",
    group: "tertiary",
  },
  {
    label: "Bloom Muted",
    varName: "tertiary-muted",
    hex: "#fce8e8",
    cssVar: "--color-tertiary-100",
    group: "tertiary",
  },
  {
    label: "Warm Amber",
    varName: "accent",
    hex: "#f59e0b",
    cssVar: "--color-accent-500",
    group: "accent",
  },
  {
    label: "Amber Deep",
    varName: "accent-deep",
    hex: "#b45309",
    cssVar: "--color-accent-700",
    group: "accent",
  },
  {
    label: "Amber Muted",
    varName: "accent-muted",
    hex: "#fef3c7",
    cssVar: "--color-accent-100",
    group: "accent",
  },
  {
    label: "Viridian",
    varName: "success",
    hex: "#10b981",
    cssVar: "--color-success-500",
    group: "semantic",
  },
  {
    label: "Ember",
    varName: "caution",
    hex: "#f97316",
    cssVar: "--color-caution-500",
    group: "semantic",
  },
  {
    label: "Sky",
    varName: "info",
    hex: "#0ea5e9",
    cssVar: "--color-info-500",
    group: "semantic",
  },
  {
    label: "Coral",
    varName: "error",
    hex: "#ef4444",
    cssVar: "--color-error-500",
    group: "semantic",
  },
];
```

---

### Task 8: Hero — Gradient Background + Ornamental Border + Gold Accent

**Files:**
- Modify: `src/components/landing/hero.tsx`

- [ ] **Rewrite hero with new design**

Write `src/components/landing/hero.tsx`:
```typescript
import type { ReactNode } from "react";
import SectionWrapper from "./section-wrapper";

interface HeroButtonProps {
  href: string;
  variant: "primary" | "ghost" | "gold";
  children: ReactNode;
}

const HeroButton = ({ href, variant, children }: HeroButtonProps) => {
  const base =
    "inline-flex items-center gap-2 font-mono text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-lg transition-all duration-200";
  const styles = {
    primary:
      "bg-primary text-white hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30",
    ghost:
      "bg-transparent text-ink border border-border hover:bg-surface focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/30",
    gold:
      "bg-gold text-black hover:bg-gold-deep focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/30",
  };

  return (
    <a href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </a>
  );
};

const LandingHero = () => {
  return (
    <SectionWrapper variant="gradient-hero">
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--color-gold)" }}
        >
          Next.js Starter Template
        </p>

        <h1
          className="font-sans font-bold leading-[1.1] tracking-[-0.02em] max-w-4xl mt-8 text-balance"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            color: "var(--color-ink)",
          }}
        >
          Build extraordinary apps from a{" "}
          <span style={{ color: "var(--color-gold)" }}>
            remarkable foundation
          </span>
        </h1>

        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mt-6"
          style={{ color: "var(--color-muted)" }}
        >
          A batteries-included Next.js starter with TypeScript, Tailwind v4,
          strict ESLint, and a striking default design system. Clone,
          configure, ship.
        </p>

        <div className="flex flex-wrap gap-4 mt-12">
          <HeroButton href="#start" variant="gold">
            Get Started
          </HeroButton>
          <HeroButton
            href="https://github.com/anomalyco/next-starter-template"
            variant="ghost"
          >
            View on GitHub
          </HeroButton>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingHero;
```

---

### Task 9: Features — Ambient Glow

**Files:**
- Modify: `src/components/landing/features.tsx`

- [ ] **Update features with SectionWrapper glow**

Write `src/components/landing/features.tsx`:
```typescript
import { FEATURES } from "./data";
import SectionWrapper from "./section-wrapper";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-surface p-8 transition-all duration-200 hover:border-gold/40">
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-lg font-mono text-sm font-bold mb-6"
        style={{
          backgroundColor: "var(--color-gold-muted)",
          color: "var(--color-gold)",
        }}
      >
        {icon}
      </div>
      <h3
        className="font-sans text-xl font-semibold leading-snug mb-3"
        style={{ color: "var(--color-ink)" }}
      >
        {title}
      </h3>
      <p
        className="font-serif text-base leading-relaxed"
        style={{ color: "var(--color-muted)" }}
      >
        {description}
      </p>
    </div>
  );
};

const LandingFeatures = () => {
  return (
    <SectionWrapper variant="glow-left">
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-gold)" }}
        >
          What&rsquo;s Inside
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] max-w-2xl mb-16 text-balance"
          style={{ color: "var(--color-ink)" }}
        >
          Everything you need to start building&mdash;nothing you don&rsquo;t
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            return <FeatureCard key={feature.title} {...feature} />;
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingFeatures;
```

---

### Task 10: Tokens — Surface Background + Ornamental Dividers on Specimens

**Files:**
- Modify: `src/components/landing/tokens.tsx`

- [ ] **Update tokens section with new styling**

Write `src/components/landing/tokens.tsx`:
```typescript
import { COLOR_TOKENS } from "./data";
import SectionWrapper from "./section-wrapper";

interface SwatchProps {
  label: string;
  hex: string;
  cssVar: string;
}

const Swatch = ({ label, hex, cssVar }: SwatchProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-canvas">
      <div
        className="shrink-0 w-10 h-10 rounded-md border border-border"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="min-w-0">
        <p
          className="font-sans text-sm font-semibold truncate"
          style={{ color: "var(--color-ink)" }}
        >
          {label}
        </p>
        <p
          className="font-mono text-xs"
          style={{ color: "var(--color-muted)" }}
        >
          {hex}
        </p>
      </div>
    </div>
  );
};

const GROUP_LABELS: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  accent: "Accent",
  neutral: "Neutral",
  semantic: "Semantic",
};

const LandingTokens = () => {
  const groups: Record<string, typeof COLOR_TOKENS> = {};

  for (const token of COLOR_TOKENS) {
    const group = groups[token.group];
    if (group) {
      group.push(token);
    } else {
      groups[token.group] = [token];
    }
  }

  return (
    <SectionWrapper variant="surface">
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-gold)" }}
        >
          Design System
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] max-w-2xl mb-6 text-balance"
          style={{ color: "var(--color-ink)" }}
        >
          Your palette, documented
        </h2>
        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mb-16"
          style={{ color: "var(--color-muted)" }}
        >
          Every color token used across the system, captured in DESIGN.md as CSS
          custom properties. Swap the hex values to rebrand the entire
          interface.
        </p>

        {Object.entries(groups).map(([group, tokens]) => {
          return (
            <div key={group} className="mb-12 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px flex-1" style={{ backgroundColor: "var(--color-border)" }} />
                <span
                  className="font-mono text-sm font-semibold tracking-widest uppercase shrink-0"
                  style={{ color: "var(--color-gold)" }}
                >
                  {GROUP_LABELS[group]}
                </span>
                <span className="h-px flex-1" style={{ backgroundColor: "var(--color-border)" }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {tokens.map((token) => {
                  return (
                    <Swatch
                      key={token.varName}
                      label={token.label}
                      hex={token.hex}
                      cssVar={token.cssVar}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-16 rounded-xl border border-border bg-surface p-8">
          <h3
            className="font-sans text-xl font-semibold mb-4"
            style={{ color: "var(--color-ink)" }}
          >
            Typography
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p
                className="font-mono text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--color-muted)" }}
              >
                Display &mdash; Poppins
              </p>
              <p
                className="font-sans text-4xl font-bold leading-tight tracking-tight"
                style={{ color: "var(--color-ink)" }}
              >
                Aa
              </p>
              <p
                className="font-sans text-lg mt-2"
                style={{ color: "var(--color-muted)" }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div>
              <p
                className="font-mono text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--color-muted)" }}
              >
                Body &mdash; Inter
              </p>
              <p
                className="font-serif text-2xl font-normal leading-snug"
                style={{ color: "var(--color-ink)" }}
              >
                Aa
              </p>
              <p
                className="font-serif text-base mt-2"
                style={{ color: "var(--color-muted)" }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div>
              <p
                className="font-mono text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--color-muted)" }}
              >
                Label &mdash; DM Mono
              </p>
              <p
                className="font-mono text-2xl font-medium leading-snug"
                style={{ color: "var(--color-ink)" }}
              >
                Aa
              </p>
              <p
                className="font-mono text-base mt-2"
                style={{ color: "var(--color-muted)" }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingTokens;
```

---

### Task 11: Config — Clean Section

**Files:**
- Modify: `src/components/landing/config.tsx`

- [ ] **Update config section with new styling**

Write `src/components/landing/config.tsx`:
```typescript
import { CONFIG_STEPS } from "./data";
import SectionWrapper from "./section-wrapper";

interface ConfigCardProps {
  title: string;
  file: string;
  description: string;
  items: string[];
}

const ConfigCard = ({ title, file, description, items }: ConfigCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-surface p-8 transition-all duration-200 hover:border-gold/40">
      <p
        className="font-mono text-xs font-semibold tracking-widest uppercase mb-2"
        style={{ color: "var(--color-gold)" }}
      >
        {file}
      </p>
      <h3
        className="font-sans text-xl font-semibold leading-snug mb-2"
        style={{ color: "var(--color-ink)" }}
      >
        {title}
      </h3>
      <p
        className="font-serif text-sm leading-relaxed mb-5"
        style={{ color: "var(--color-muted)" }}
      >
        {description}
      </p>
      <ul className="space-y-2">
        {items.map((item) => {
          return (
            <li
              key={item}
              className="flex items-start gap-2 font-serif text-sm"
              style={{ color: "var(--color-ink)" }}
            >
              <span
                className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-gold)" }}
              />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const LandingConfig = () => {
  return (
    <SectionWrapper variant="default" id="config" withDivider>
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-gold)" }}
        >
          Before You Code
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] max-w-3xl mb-6 text-balance"
          style={{ color: "var(--color-ink)" }}
        >
          Configure these files to make this template yours
        </h2>
        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mb-16"
          style={{ color: "var(--color-muted)" }}
        >
          This template ships with sensible defaults, but every value is meant
          to be changed. Work through these files in order.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG_STEPS.map((step) => {
            return <ConfigCard key={step.title} {...step} />;
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingConfig;
```

---

### Task 12: Start — Gradient Background

**Files:**
- Modify: `src/components/landing/start.tsx`

- [ ] **Update start section with gradient background**

Write `src/components/landing/start.tsx`:
```typescript
import SectionWrapper from "./section-wrapper";

const LandingStart = () => {
  return (
    <SectionWrapper variant="gradient-start" id="start" withDivider>
      <div className="relative z-10 py-24 md:py-32 text-center">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-gold)" }}
        >
          Quick Start
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] mb-6 text-balance"
          style={{ color: "var(--color-ink)" }}
        >
          Clone, install, and go
        </h2>
        <p
          className="font-serif text-lg leading-relaxed max-w-xl mx-auto mb-12"
          style={{ color: "var(--color-muted)" }}
        >
          Get up and running in under a minute. Then configure your brand tokens
          and start building.
        </p>

        <div className="max-w-xl mx-auto rounded-xl border border-border bg-elevated p-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--color-error)" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--color-caution)" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--color-success)" }}
            />
            <span
              className="font-mono text-xs ml-2"
              style={{ color: "var(--color-muted)" }}
            >
              terminal
            </span>
          </div>
          <pre
            className="font-mono text-sm leading-relaxed overflow-x-auto"
            style={{ color: "var(--color-ink)" }}
          >
            <span style={{ color: "var(--color-gold)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>
              git clone
            </span>{" "}
            https://github.com/anomalyco/next-starter-template.git
            <br />
            <span style={{ color: "var(--color-gold)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>cd</span>{" "}
            next-starter-template
            <br />
            <span style={{ color: "var(--color-gold)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>pnpm install</span>
            <br />
            <span style={{ color: "var(--color-gold)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>pnpm dev</span>
            <br />
            <span
              className="block mt-4"
              style={{ color: "var(--color-muted)" }}
            >
              {">"} http://localhost:3000
            </span>
          </pre>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#config"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-lg bg-gold text-black hover:bg-gold-deep transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/30"
          >
            Configure Your Brand
          </a>
          <a
            href="https://github.com/anomalyco/next-starter-template"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-lg bg-transparent text-ink border border-border hover:bg-surface transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/30"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingStart;
```

---

### Task 13: Footer — Ornamental Top Divider

**Files:**
- Modify: `src/components/landing/footer.tsx`

- [ ] **Update footer with ornamental top divider**

Write `src/components/landing/footer.tsx`:
```typescript
import OrnamentalDivider from "./ornamental-divider";

const LandingFooter = () => {
  return (
    <footer>
      <OrnamentalDivider />
      <div className="mx-auto w-[85%] max-[1024px]:w-[90%] flex flex-col md:flex-row items-center justify-between gap-4 pb-12">
        <p
          className="font-serif text-sm"
          style={{ color: "var(--color-muted)" }}
        >
          Built with{" "}
          <a
            href="https://nextjs.org"
            className="font-semibold underline underline-offset-2 transition-colors duration-200"
            style={{ color: "var(--color-primary)" }}
          >
            Next.js
          </a>
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/anomalyco/next-starter-template"
            className="font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--color-muted)" }}
          >
            GitHub
          </a>
          <a
            href="https://opencode.ai"
            className="font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--color-muted)" }}
          >
            opencode
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
```

---

### Task 14: page.tsx — Add Theme Toggle

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Add ThemeToggle and glow layer to the page**

Write `src/app/page.tsx`:
```typescript
import ThemeToggle from "@components/theme-toggle";
import LandingConfig from "@components/landing/config";
import LandingFeatures from "@components/landing/features";
import LandingFooter from "@components/landing/footer";
import LandingHero from "@components/landing/hero";
import LandingStart from "@components/landing/start";
import LandingTokens from "@components/landing/tokens";

const HomePage = () => {
  return (
    <main className="relative">
      <div className="glow-layer" aria-hidden="true">
        <div className="glow-hero" />
        <div className="glow-features" />
        <div className="glow-start" />
      </div>
      <div className="relative z-10">
        <LandingHero />
        <LandingFeatures />
        <LandingTokens />
        <LandingConfig />
        <LandingStart />
        <LandingFooter />
      </div>
      <ThemeToggle />
    </main>
  );
};

export default HomePage;
```

---

### Task 15: DESIGN.md — Rebrand from "The Gallery" to "The Monograph"

**Files:**
- Modify: `DESIGN.md`

- [ ] **Rebrand DESIGN.md**

Replace the Overview, Colors, and Elevation sections in `DESIGN.md` to match the new Editorial Dark system. Update all color hex values to the new palette. Replace "Creative North Star: The Gallery" with "Creative North Star: The Monograph". Update the Elevation section for dark mode. Update Do's and Don'ts to reflect the new warm-canvas approach.

Key changes:
- Creative North Star: "The Monograph"
- Canvas is now warm near-black (dark) or cream paper (light), not Gallery White
- Add noise grain as a background layer
- Add ornamental dividers (gold diamond + ruled lines)
- Add section glow treatments
- Update all color hex values

---

### Task 16: PROJECT_STANDARD_CONSTANTS.md — Update Color Constants

**Files:**
- Modify: `PROJECT_STANDARD_CONSTANTS.md`

- [ ] **Update color references**

Change the body default text color reference:
```
- `body_default_text_color`: `var(--color-ink)`
```

Add a note about dark mode support:
```
- `dark_mode_supported`: `true`
- `theme_toggle_location`: `src/components/theme-toggle.tsx`
```

---

### Task 17: Build & Verify

- [ ] **Run lint**

```bash
pnpm lint
```
Expected: no errors

- [ ] **Run build**

```bash
pnpm build
```
Expected: successful build with no errors

- [ ] **Visual check**

```bash
pnpm dev
```
Expected: homepage renders in both dark and light mode. Noise grain visible. Ambient glows visible on hero (bronze), features (violet), and start (bronze). Gold accents visible. Ornamental dividers between major sections. Theme toggle in bottom-right corner toggles between modes.
