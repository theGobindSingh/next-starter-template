# Remove Emotion/Kami Runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Emotion and Kami runtime/theming usage, keep App Router with plain CSS, and preserve deleted component contracts for future Tailwind v4 rebuild while keeping `@kami-ui/eslint-config`.

**Architecture:** Convert app shell styling from Emotion provider flow to native App Router global CSS + CSS modules. Keep fonts via `next/font/google` in `src/app/layout.tsx`. Remove runtime components that depend on Emotion/Kami, but first snapshot their interfaces/behavior into a dedicated migration-notes document to guide a future Tailwind v4 rebuild.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, plain CSS/CSS modules, `@kami-ui/eslint-config`.

---

## File Structure Map

- **Create:**
  - `docs/superpowers/specs/2026-06-01-tailwind-v4-component-migration-notes.md`
  - `src/app/globals.css`
  - `src/app/page.module.css`
- **Modify:**
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `package.json`
  - `tsconfig.json`
  - `README.md`
  - `AGENTS.md`
  - `PROJECT_STANDARD_CONSTANTS.md`
- **Delete:**
  - `src/app/providers.tsx`
  - `src/app/page.styles.ts`
  - `src/styles/global.ts`
  - `src/styles/theme.ts`
  - `src/components/html/index.ts`
  - `src/components/common-full-width-wrapper/index.tsx`
  - `src/components/common-full-width-wrapper/styles.ts`
  - `src/components/common-full-width-wrapper/` (if empty)
  - `src/components/html/` (if empty)

## Subagent Assignment

- **Task 1 -> Subagent A** (component contract snapshot doc)
- **Task 2 -> Subagent B** (app shell + plain CSS migration)
- **Task 3 -> Subagent C** (delete runtime style/component files)
- **Task 4 -> Subagent D** (dependency + TypeScript config cleanup)
- **Task 5 -> Subagent E** (docs/constants updates)
- **Task 6 -> Subagent F** (validation + fixups)

### Task 1: Snapshot Component Contracts Before Deletion

**Files:**
- Create: `docs/superpowers/specs/2026-06-01-tailwind-v4-component-migration-notes.md`
- Read source: `src/components/html/index.ts`
- Read source: `src/components/common-full-width-wrapper/index.tsx`
- Read source: `src/components/common-full-width-wrapper/styles.ts`

- [ ] **Step 1: Create migration-notes document with heading and scope**

Document must begin with:

```md
# Tailwind v4 Component Migration Notes

Date: 2026-06-01
Source: Emotion/Kami runtime components removed during plain CSS stabilization.
Goal: Preserve component contracts for Tailwind v4 reimplementation.
```

- [ ] **Step 2: Capture original file tree and exports**

Include this section exactly:

```md
## Original File Tree

- src/components/html/index.ts
- src/components/common-full-width-wrapper/index.tsx
- src/components/common-full-width-wrapper/styles.ts

## Exported API Snapshot

### src/components/html/index.ts
- `CommonTextProps` interface
- `H1`, `H2`, `H3`, `P`, `Span`, `Hr`

### src/components/common-full-width-wrapper/index.tsx
- default export: `CommonFullWidthWrapper`
- props interface: `CommonFullWidthWrapperProps`

### src/components/common-full-width-wrapper/styles.ts
- `containerSize`, `tabletContainerSize`, `mobileContainerSize`
- `containerStyles`
- `wrapperStyles(bg?: string)`
```

- [ ] **Step 3: Capture prop/behavior details and responsive rules**

Add sections describing:
- typography size tokens and color behavior for `CommonTextProps`
- wrapper props (`element`, `wrapperCss`, `wrapperProps`, `bg`) and container behavior
- breakpoint behavior: tablet/mobile widths and full-width wrapper background behavior

- [ ] **Step 4: Add Tailwind v4 rebuild checklist and parity criteria**

Checklist must include:
- map typography tokens to Tailwind classes/theme extensions
- replicate semantic element rendering (`h1`, `h2`, `p`, etc.)
- recreate wrapper container width behavior at breakpoints
- keep optional background support
- validate API parity against props snapshot

- [ ] **Step 5: Save and verify note file includes all required sections**

Run: `rg "Original File Tree|Exported API Snapshot|Tailwind v4 rebuild checklist|parity" "docs/superpowers/specs/2026-06-01-tailwind-v4-component-migration-notes.md"`
Expected: All section markers present

### Task 2: Migrate App Shell and Route Styling to Plain CSS

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.module.css`
- Delete: `src/app/providers.tsx`
- Delete: `src/app/page.styles.ts`

- [ ] **Step 1: Replace `src/app/layout.tsx` with font + globals App Router layout**

Use this exact file content:

```tsx
import type { Metadata } from "next";
import { DM_Mono, Inter, Nothing_You_Could_Do, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const fontSansSerif = Inter({
  variable: "--font-serif",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

const fontSans = Poppins({
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontCursive = Nothing_You_Could_Do({
  variable: "--font-cursive",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description: "Starter template with Next.js, TypeScript, and plain CSS.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
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

- [ ] **Step 2: Create `src/app/globals.css`**

Use this exact file content:

```css
:root {
  --breakpoint-phone-min: 0px;
  --breakpoint-phone-max: 640px;
  --breakpoint-tablet-min: 641px;
  --breakpoint-tablet-max: 1024px;
  --breakpoint-desktop-min: 1025px;

  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-800: #1f2937;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  color: var(--color-gray-800);
  font-family: var(--font-sans), sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 3: Replace route styling with CSS module**

Create `src/app/page.module.css` with:

```css
.home {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
```

Replace `src/app/page.tsx` with:

```tsx
import styles from "./page.module.css";

const HomePage = () => {
  return <main className={styles.home}>Hello Home</main>;
};

export default HomePage;
```

- [ ] **Step 4: Delete Emotion-based app files**

Delete:
- `src/app/providers.tsx`
- `src/app/page.styles.ts`

- [ ] **Step 5: Verify app files compile under lint**

Run: `pnpm lint`
Expected: PASS (warnings acceptable if pre-existing non-blocking)

### Task 3: Delete Runtime Emotion/Kami Style and Component Files

**Files:**
- Delete: `src/styles/global.ts`
- Delete: `src/styles/theme.ts`
- Delete: `src/components/html/index.ts`
- Delete: `src/components/common-full-width-wrapper/index.tsx`
- Delete: `src/components/common-full-width-wrapper/styles.ts`

- [ ] **Step 1: Delete obsolete style runtime files**

Run:

```bash
rm "src/styles/global.ts" "src/styles/theme.ts"
```

- [ ] **Step 2: Delete Emotion/Kami component files**

Run:

```bash
rm "src/components/html/index.ts" "src/components/common-full-width-wrapper/index.tsx" "src/components/common-full-width-wrapper/styles.ts"
```

- [ ] **Step 3: Remove empty component folders if empty**

Run:

```bash
rmdir "src/components/html" 2>/dev/null || true
rmdir "src/components/common-full-width-wrapper" 2>/dev/null || true
```

- [ ] **Step 4: Verify no lingering imports to deleted files**

Run: `rg "@styles/global|@styles/theme|@components/html|common-full-width-wrapper|@emotion/|@kami-ui/next-theme|@kami-ui/react-components|@kami-ui/theme-shop" src`
Expected: No matches

### Task 4: Dependency and TypeScript Cleanup

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`

- [ ] **Step 1: Remove runtime dependencies from `package.json`**

Delete these dependency entries:
- `@emotion/react`
- `@emotion/styled`
- `@kami-ui/next-theme`
- `@kami-ui/react-components`
- `@kami-ui/theme-shop`

Delete this dev dependency entry:
- `@kami-ui/types`

Keep:
- `@kami-ui/eslint-config`

- [ ] **Step 2: Remove Emotion JSX transform override from tsconfig**

In `tsconfig.json` remove:

```json
"jsxImportSource": "@emotion/react"
```

Do not change other compiler options unnecessarily.

- [ ] **Step 3: Reinstall lockfile to sync removed packages**

Run: `pnpm install`
Expected: lockfile updated, removed packages no longer listed as direct deps

- [ ] **Step 4: Verify removed deps are not present in direct deps**

Run: `pnpm list --depth 0`
Expected: none of removed runtime packages are direct project dependencies

### Task 5: Documentation and Constants Updates

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `PROJECT_STANDARD_CONSTANTS.md`

- [ ] **Step 1: Update `README.md` stack references**

Apply these content changes:
- Replace intro mention of Emotion/Kami runtime with plain CSS wording
- Keep ESLint section referencing `@kami-ui/eslint-config`
- Update features list to mention plain CSS + CSS modules
- Update project structure to show:
  - `src/app/globals.css`
  - `src/app/page.module.css`
  - no `providers.tsx`
  - no old Emotion/Kami component folders
- Add note under Notes section:
  - `Tailwind v4 planned follow-up after plain CSS stabilization`

- [ ] **Step 2: Update `AGENTS.md` conventions and project shape**

Apply these content changes:
- In Project Shape, remove stale references to theme/global helpers tied to deleted files.
- In Conventions, remove Emotion-specific instruction and replace with plain CSS + CSS module guidance.
- Add one line noting Tailwind v4 migration is planned after stabilization.
- Keep command section and skill order unchanged.

- [ ] **Step 3: Update `PROJECT_STANDARD_CONSTANTS.md` style stack section**

Apply these content changes:
- Replace Core Styling Stack entries from Emotion/Kami runtime to:
  - `styling_baseline`: `plain-css`
  - `route_styles`: `css-modules`
  - `global_styles_entry`: `src/app/globals.css`
  - `tailwind_v4_plan`: `post-stabilization`
- Keep font constants unchanged (still Inter/Poppins/DM Mono/Nothing You Could Do)
- Remove references to deleted files (`src/styles/theme.ts`, `src/styles/global.ts`) from constants text

- [ ] **Step 4: Verify docs have no removed runtime package references (except eslint package)**

Run: `rg "@emotion/|@kami-ui/next-theme|@kami-ui/react-components|@kami-ui/theme-shop|@kami-ui/types|Emotion|Kami UI theme" README.md AGENTS.md PROJECT_STANDARD_CONSTANTS.md`
Expected: no runtime references remain; `@kami-ui/eslint-config` references still present where relevant

### Task 6: Final Validation and Cleanup

**Files:**
- Verify all touched files and cleanup leftovers

- [ ] **Step 1: Verify App Router-only active structure**

Run: `ls src`
Expected: contains `app`, `components`, `hooks`, `styles` (and no `pages`, no `modules`)

- [ ] **Step 2: Verify no removed runtime imports in source**

Run: `rg "@emotion/|@kami-ui/next-theme|@kami-ui/react-components|@kami-ui/theme-shop|@kami-ui/types|@styles/global|@styles/theme" src`
Expected: No matches

- [ ] **Step 3: Run lint**

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 4: Run production build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Final sanity grep for legacy router references in active project files**

Run: `rg "src/pages|@pages/|_app\.tsx|_document\.tsx" src README.md AGENTS.md PROJECT_STANDARD_CONSTANTS.md tsconfig.json`
Expected: No matches
