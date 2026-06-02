# App Router Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate this starter from Pages Router to App Router, remove the `src/modules` pattern, move static assets to root `public/`, and update config/docs accordingly.

**Architecture:** Move global shell concerns from `_app.tsx` and `_document.tsx` into `src/app/layout.tsx` plus a client `src/app/providers.tsx`. Keep route-local implementation co-located in `src/app` (starting with home route). Clean up all Pages Router references and aliases so the repository is App Router-first.

**Tech Stack:** Next.js 16, React 19, TypeScript, Emotion, Kami UI theme provider, pnpm.

---

## File Structure Map

- **Create:**
  - `src/app/layout.tsx` (App Router root layout + metadata)
  - `src/app/providers.tsx` (client-side global providers)
  - `src/app/page.tsx` (home route)
  - `src/app/page.styles.ts` (co-located route styles)
- **Delete:**
  - `src/pages/_app.tsx`
  - `src/pages/_document.tsx`
  - `src/pages/index.tsx`
  - `src/modules/home/index.tsx`
  - `src/modules/home/styles.ts`
  - `src/modules/home/types.ts`
- **Move:**
  - `src/public/**` -> `public/**`
- **Modify:**
  - `tsconfig.json`
  - `AGENTS.md`
  - `PROJECT_STANDARD_CONSTANTS.md`
  - `README.md`

## Subagent Assignment

- **Task 1 -> Subagent A**
- **Task 2 -> Subagent B**
- **Task 3 -> Subagent C**
- **Task 4 -> Subagent D**
- **Task 5 -> Subagent E**
- **Task 6 -> Subagent F**
- **Task 7 -> Subagent G**
- **Task 8 -> Subagent H**

### Task 1: Create App Router Core Files

**Files:**
- Create: `src/app/providers.tsx`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.styles.ts`
- Create: `src/app/page.tsx`
- Test: `pnpm lint`

- [ ] **Step 1: Capture baseline lint status before new files**

Run: `pnpm lint`
Expected: PASS (or existing unrelated failures noted before proceeding)

- [ ] **Step 2: Create `src/app/providers.tsx`**

```tsx
"use client";

import { Global } from "@emotion/react";
import { ThemeProvider } from "@kami-ui/next-theme";
import { globalStyles } from "@styles/global";
import theme from "@styles/theme";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
```

- [ ] **Step 3: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description:
    "A minimal Next.js App Router starter with TypeScript, Emotion, and Kami UI.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
```

- [ ] **Step 4: Create `src/app/page.styles.ts`**

```ts
import styled from "@emotion/styled";

export const HomeWrapper = styled.main``;
```

- [ ] **Step 5: Create `src/app/page.tsx`**

```tsx
import { HomeWrapper } from "./page.styles";

const HomePage = () => {
  return <HomeWrapper>Hello Home</HomeWrapper>;
};

export default HomePage;
```

- [ ] **Step 6: Verify lint passes after app files creation**

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx src/app/providers.tsx src/app/page.tsx src/app/page.styles.ts
git commit -m "feat: scaffold app router entry files"
```

### Task 2: Remove Pages Router and Home Module Files

**Files:**
- Delete: `src/pages/_app.tsx`
- Delete: `src/pages/_document.tsx`
- Delete: `src/pages/index.tsx`
- Delete: `src/modules/home/index.tsx`
- Delete: `src/modules/home/styles.ts`
- Delete: `src/modules/home/types.ts`
- Test: `pnpm lint`

- [ ] **Step 1: Delete legacy Pages Router files**

```bash
rm "src/pages/_app.tsx" "src/pages/_document.tsx" "src/pages/index.tsx"
```

- [ ] **Step 2: Delete old home module files**

```bash
rm "src/modules/home/index.tsx" "src/modules/home/styles.ts" "src/modules/home/types.ts"
```

- [ ] **Step 3: Verify no route conflict files remain**

Run: `rg "_app\.tsx|_document\.tsx|src/modules/home" src`
Expected: No matches

- [ ] **Step 4: Verify lint passes**

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages src/modules
git commit -m "refactor: remove pages router and home module files"
```

### Task 3: Move Static Assets to Root `public/`

**Files:**
- Move: `src/public/**` -> `public/**`
- Delete directory: `src/public`
- Test: verify files exist under `public/`

- [ ] **Step 1: Create root `public/` directory**

Run: `mkdir -p "public"`
Expected: directory exists

- [ ] **Step 2: Move all assets including hidden placeholders**

```bash
cp -a "src/public/." "public/"
```

- [ ] **Step 3: Remove old `src/public` directory**

Run: `rm -rf "src/public"`
Expected: `src/public` no longer exists

- [ ] **Step 4: Verify moved files are present**

Run: `ls -la "public" "public/assets" "public/assets/fonts" "public/assets/images"`
Expected: `favicon.ico` and assets folders present

- [ ] **Step 5: Commit**

```bash
git add public src/public
git commit -m "chore: move static assets to root public directory"
```

### Task 4: Update TypeScript Path Aliases for App Router + Root Public

**Files:**
- Modify: `tsconfig.json`
- Test: `pnpm lint`

- [ ] **Step 1: Replace alias section in `tsconfig.json`**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": [
    "@tsconfig/strictest/tsconfig.json",
    "@tsconfig/next/tsconfig.json"
  ],
  "compilerOptions": {
    "target": "es6",
    "forceConsistentCasingInFileNames": true,
    "jsxImportSource": "@emotion/react",
    "paths": {
      "@assets/*": ["./public/assets/*"],
      "@images/*": ["./public/assets/images/*"],
      "@public/*": ["./public/*"],
      "@components/*": ["./src/components/*"],
      "@modules/*": ["./src/modules/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@styles/*": ["./src/styles/*"],
      "@/*": ["./src/*"]
    },
    "noPropertyAccessFromIndexSignature": false,
    "ignoreDeprecations": "5.0",
    "verbatimModuleSyntax": false,
    "allowUnusedLabels": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "eslint.config.mjs",
    "next.config.js"
  ],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Verify alias cleanup**

Run: `rg "@pages/|src/pages" tsconfig.json`
Expected: No matches

- [ ] **Step 3: Verify lint passes**

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json
git commit -m "chore: update path aliases for app router and root public"
```

### Task 5: Update Agent Guidance to App Router Conventions

**Files:**
- Modify: `AGENTS.md`
- Test: markdown sanity check by reading file

- [ ] **Step 1: Replace `AGENTS.md` with App Router version**

```md
# AGENTS.md

This repository is a batteries-included Next.js starter template. Keep this file short, practical, and easy to extend.

## Scope

- Applies to the whole repository.
- Prefer links to existing docs instead of duplicating long explanations.
- For generated projects based on this starter, update this file early with product-specific rules.

## Skill Boot Order

- At the start of every new chat/session, invoke `using-superpowers` first.
- For cross-session context, use `mem` to both recall and save: search memory first before asking the user to repeat information, and persist important new decisions, preferences, and snippets.
- If the task includes new or changed UI/design implementation, load [PROJECT_STANDARD_CONSTANTS.md](PROJECT_STANDARD_CONSTANTS.md) first, then invoke these skills in order:
  1. `impeccable`
  2. `ui-ux-pro-max`
- If the task includes new files/folders, architecture, or pattern decisions, invoke `opinionated-nextjs-systems` before implementation.
- For implementation work, invoke `subagent-driven-development` and enforce this execution policy:
  1. Break work into the smallest practical independent subtasks.
  2. Delegate as many subtasks as possible to fresh subagents.
  3. Prefer parallel subagents for independent subtasks; keep sequential order only where dependencies require it.
  4. Keep the main agent as coordinator/reviewer, not primary implementer, unless delegation is blocked.
- Use `caveman` as the default response style for this user (full intensity) unless the user asks to stop or switch level.

## Commands

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Production build: `pnpm build`
- Start production server: `pnpm start`
- Lint check: `pnpm lint`
- Lint and auto-fix: `pnpm lint:fix`

Notes:

- `pnpm build` runs `pnpm lint:fix` first via `prebuild`.
- There is no test script yet. If tests are added, document and enforce the command here.

## Project Shape

- `src/app`: Next.js App Router entry points (`layout.tsx`, `page.tsx`, route segments)
- `src/components`: reusable shared components
- `src/styles`: theme, global styles, breakpoints, media helpers
- `public/assets`: static assets (fonts, images)

## Conventions

- Use the App Router pattern already in place; do not mix Pages Router patterns unless intentionally migrating.
- Keep route files in `src/app` focused; colocate route-specific UI and logic in their segment directories.
- Use `src/components` for reusable pieces shared across routes.
- Prefer path aliases from `tsconfig.json` (`@components/*`, `@styles/*`, etc.) over deep relative imports.
- For route-local decomposition, prefer small co-located files (for example: `page.tsx`, `styles.ts`, `types.ts`).
- Use Emotion (`@emotion/styled`, `@emotion/react`) and existing helpers from `src/styles/global.ts` (`breakpoints`, `mediaQuery`).

## Quality Gates

- Before finishing code changes, run at least: `pnpm lint`.
- If adding build-time or runtime behavior, verify with: `pnpm build`.

## Known Pitfalls

- Lint scripts target `src/**/*.{ts,js,tsx,jsx}`; files outside `src/` may not be covered.
- `next.config.js` currently has `images.remotePatterns` empty; remote image sources must be explicitly added.
- TypeScript is strict via `@tsconfig/strictest` + `@tsconfig/next`; keep types explicit and avoid bypass patterns.

## Template User: Update This File

If you are using this starter for a real project, update this file in your repo with:

1. Product/domain context and glossary.
2. Testing stack and required test commands.
3. Deployment workflow and environment requirements.
4. Any security/compliance constraints.
5. Feature-specific architecture notes.

Treat this file as the first-stop guide for AI coding agents in your project.

## References

- [README](README.md)
- [TypeScript config](tsconfig.json)
- [ESLint config](eslint.config.mjs)
- [Next config](next.config.js)
- [Project standard constants](PROJECT_STANDARD_CONSTANTS.md)
```

- [ ] **Step 2: Verify App Router wording present**

Run: `rg "App Router|src/app" AGENTS.md`
Expected: matches found

- [ ] **Step 3: Verify Pages Router wording removed**

Run: `rg "Pages Router|src/pages|_app\.tsx|_document\.tsx" AGENTS.md`
Expected: No matches

- [ ] **Step 4: Commit**

```bash
git add AGENTS.md
git commit -m "docs: update agent guidance for app router"
```

### Task 6: Update Project Constants to App Router + Root Public

**Files:**
- Modify: `PROJECT_STANDARD_CONSTANTS.md`
- Test: markdown sanity check by reading file

- [ ] **Step 1: Replace `PROJECT_STANDARD_CONSTANTS.md` content**

```md
# PROJECT_STANDARD_CONSTANTS

Shared source-of-truth constants for design and architecture workflows.

## Runtime + Tooling

- `node_version`: `>=24`
- `package_manager`: `pnpm@11.5.0`
- `router_mode`: `next-app-router`

## Core Styling Stack

- `css_in_js`: `@emotion/react`, `@emotion/styled`
- `theme_provider`: `@kami-ui/next-theme`
- `theme_base`: `@kami-ui/theme-shop` (`defaultLightTheme`)
- `theme_entry`: `src/styles/theme.ts`
- `global_styles_entry`: `src/styles/global.ts`

## Responsive Constants

- `breakpoints.phone`: `0-640`
- `breakpoints.tablet`: `641-1024`
- `breakpoints.desktop`: `1025+`
- `media_query.phone`: `@media (min-width: 0px) and (max-width: 640px)`
- `media_query.tablet`: `@media (min-width: 641px) and (max-width: 1024px)`
- `media_query.desktop`: `@media (min-width: 1025px)`

## Layout Constants

- `container_size.default`: `85%`
- `container_size.tablet`: `90%`
- `container_size.mobile`: `90%`
- `full_width_wrapper_component`: `src/components/common-full-width-wrapper`

## Typography Constants

- `font_family.serif`: `Inter`
- `font_family.sans`: `Poppins`
- `font_family.mono`: `DM Mono`
- `font_family.cursive`: `Nothing You Could Do`
- `body_default_font`: `var(--font-sans)`
- `body_default_font_size`: `var(--fs-2xs)`
- `body_default_text_color`: `var(--color-gray-800)`

Desktop type scale (`src/styles/theme.ts`):

- `12, 14, 16, 18, 20, 24, 30, 36, 44, 52, 60` px

Phone/tablet type scale (`src/styles/theme.ts`):

- `11, 12, 14, 16, 18, 20, 24, 30, 36, 44, 52` px

## Path Alias Constants

- `@assets/* -> ./public/assets/*`
- `@images/* -> ./public/assets/images/*`
- `@public/* -> ./public/*`
- `@components/* -> ./src/components/*`
- `@modules/* -> ./src/modules/*`
- `@hooks/* -> ./src/hooks/*`
- `@styles/* -> ./src/styles/*`
- `@/* -> ./src/*`

## Structural Constraints

- Keep route files in `src/app` focused.
- Co-locate route-specific UI and page logic in route segment directories under `src/app`.
- Reusable pieces belong in `src/components`.
- For route-local decomposition, prefer small co-located files (for example: `page.tsx`, `styles.ts`, `types.ts`).
- Do not mix Pages Router patterns unless migration is intentional.

## Usage Rule For Skills

- For design implementation tasks, read this file before invoking `impeccable` and `ui-ux-pro-max`.
- For file/folder/architecture/pattern decisions, combine this file with `opinionated-nextjs-systems` guidance.
```

- [ ] **Step 2: Verify constants no longer mention `@pages/*`**

Run: `rg "@pages/|src/pages" PROJECT_STANDARD_CONSTANTS.md`
Expected: No matches

- [ ] **Step 3: Commit**

```bash
git add PROJECT_STANDARD_CONSTANTS.md
git commit -m "docs: switch project constants to app router"
```

### Task 7: Update README to App Router + Co-located Route Structure

**Files:**
- Modify: `README.md`
- Test: markdown sanity check by reading file

- [ ] **Step 1: Replace `README.md` with App Router version**

```md
# Next.js Starter Template

A minimal starter for building apps with [Next.js](https://nextjs.org/),
[TypeScript](https://www.typescriptlang.org/),
[Emotion](https://emotion.sh/docs/introduction), and
[Kami UI](https://www.npmjs.com/package/@kami-ui/next-theme).

This repository is set up with the **App Router** (`src/app`) and provides
an opinionated structure for co-located routes, shared components,
global styles, and responsive theming.

## Features

- **Next.js 16** with **React 19**
- **TypeScript** with strict config presets
- **App Router** structure under `src/app`
- **Emotion** for styling and global CSS
- **Kami UI** theme provider integration
- **Google font** setup in the shared theme
- **All-batteries-included ESLint config** via [`@kami-ui/eslint-config`](https://www.npmjs.com/package/@kami-ui/eslint-config)
- Path aliases such as `@components/*`, `@styles/*`, and `@public/*`

## ESLint Setup

This template uses
[`@kami-ui/eslint-config`](https://www.npmjs.com/package/@kami-ui/eslint-config),
an all-batteries-included **flat ESLint config** package that can be used in
any TypeScript or JavaScript project.

It provides ready-to-use presets for:

- base TypeScript / JavaScript projects
- React apps and component libraries
- Next.js applications
- Storybook projects

It also includes opinionated rules and integrations such as:

- typed TypeScript linting
- Prettier integration
- import rules
- ESLint comments rules
- arrow function preference rules

In this repo, `eslint.config.mjs` uses the **Next.js preset**:

```js
import config from "@kami-ui/eslint-config/next";

export default config;
```

## Requirements

- **Node.js** `>=22`
- **pnpm** `11.5.0`

> The required Node version comes from `package.json`. Using an older version may
> show engine warnings.

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Working with AI Assistants

This template ships with a curated set of agent skills and workflow rules that make AI coding assistants substantially more useful out of the box. Here is what you need to know.

**Start here:** [AGENTS.md](AGENTS.md) is the single source of truth for how AI agents should behave in this repo. Read it when onboarding, and update it early when this template becomes a real product — the more context you add there, the better the AI output gets.

The project also includes [PROJECT_STANDARD_CONSTANTS.md](PROJECT_STANDARD_CONSTANTS.md), a reference file that captures breakpoints, type scales, font choices, path aliases, and layout constants in one place. Design and architecture-focused skills read this automatically so they stay aligned with the actual codebase.

### Skills

Skills are modular instruction sets that extend AI behavior for specific kinds of work. They live in [.agents/skills/](.agents/skills/) and activate based on the task at hand:

| Situation                                            | Skills that activate          |
| ---------------------------------------------------- | ----------------------------- |
| Starting a new session                               | `using-superpowers`           |
| Recalling or saving context across sessions          | `mem`                         |
| Building or changing UI                              | `impeccable`, `ui-ux-pro-max` |
| Adding new files, modules, or architectural patterns | `opinionated-nextjs-systems`  |
| Executing any multi-step implementation              | `subagent-driven-development` |

The `subagent-driven-development` skill enforces a specific execution style: the main agent acts as coordinator, breaks work into the smallest practical independent pieces, and delegates as much as possible to focused subagents running in parallel. This keeps quality high and context clean.

`mem` gives the AI persistent memory across sessions — it searches stored decisions and preferences before asking you to repeat yourself, and saves important new context automatically.

## Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `pnpm dev`      | Start the local development server      |
| `pnpm build`    | Create a production build               |
| `pnpm start`    | Run the production server               |
| `pnpm lint`     | Run Prettier and ESLint                 |
| `pnpm lint:fix` | Run Prettier and ESLint with auto-fixes |

## Project Structure

```text
public/
  assets/
    fonts/
    images/
  favicon.ico
src/
  app/
    layout.tsx
    page.styles.ts
    page.tsx
    providers.tsx
  components/
    common-full-width-wrapper/
    html/
  hooks/
  styles/
    global.ts
    theme.ts
```

## Key Files

- `src/app/layout.tsx` — root App Router layout + metadata
- `src/app/providers.tsx` — wires in `ThemeProvider` and global styles
- `src/app/page.tsx` — starter home route
- `src/styles/theme.ts` — Kami UI theme and font configuration
- `src/styles/global.ts` — global CSS, breakpoints, and media helpers
- `src/components/common-full-width-wrapper/` — reusable layout wrapper

## Path Aliases

The project includes aliases configured in `tsconfig.json`:

- `@components/*`
- `@hooks/*`
- `@styles/*`
- `@assets/*`
- `@images/*`
- `@public/*`

## Customization Tips

- Update `src/app/page.tsx` to replace the starter home screen
- Add route-local helpers/styles next to each route segment in `src/app`
- Adjust typography and fonts in `src/styles/theme.ts`
- Add shared design tokens or helpers in `src/styles/global.ts`
- Place reusable UI pieces in `src/components/`

## Notes

- This starter uses the **App Router**.
- Static assets in this repo live under root `public/`.
- The formatting and lint scripts target the `src/` directory structure used by
  this template.
```

- [ ] **Step 2: Verify README references App Router**

Run: `rg "App Router|src/app|public/" README.md`
Expected: matches found

- [ ] **Step 3: Verify README has no Pages Router leftovers**

Run: `rg "Pages Router|src/pages|_app\.tsx|_document\.tsx" README.md`
Expected: No matches

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: migrate readme to app router structure"
```

### Task 8: Full Validation and Cleanup Sweep

**Files:**
- Verify all touched files
- Optional fixups if command output reveals issues
- Test: `pnpm lint`, `pnpm build`

- [ ] **Step 1: Verify no Pages Router references remain in project files**

Run: `rg "src/pages|@pages/|_app\.tsx|_document\.tsx" src README.md AGENTS.md PROJECT_STANDARD_CONSTANTS.md tsconfig.json`
Expected: No matches

- [ ] **Step 2: Verify app entry files exist and legacy files do not**

Run: `ls "src/app" && ls "src/pages"`
Expected: `src/app` lists files; `src/pages` reports no such file/directory

- [ ] **Step 3: Run final lint**

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 4: Run final production build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Commit final fixups (only if files changed during validation)**

```bash
git add -A
git commit -m "chore: finalize app router migration validation"
```
