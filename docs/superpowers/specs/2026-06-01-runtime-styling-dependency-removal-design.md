## Runtime Styling Dependency Removal Design

Date: 2026-06-01
Scope: Remove Emotion and Kami UI runtime/theming dependencies from the migrated App Router starter, switch to plain CSS, preserve component contracts for future Tailwind v4 rebuild, and keep `@kami-ui/eslint-config`.

## Goals

- Remove all runtime usage of Emotion and Kami UI packages.
- Keep App Router (`src/app`) architecture intact.
- Replace runtime styling with plain CSS (`globals.css` + CSS modules).
- Keep existing Google fonts via `next/font`.
- Preserve deleted component contracts in a migration-notes document for future Tailwind v4 reimplementation.
- Keep lint config package `@kami-ui/eslint-config` in place.

## Non-Goals

- Do not adopt Tailwind v4 in this change.
- Do not redesign UI beyond preserving current behavior.
- Do not alter repository workflow/skill policy beyond style-stack docs updates.

## Current State

- App Router files exist (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/providers.tsx`, `src/app/page.styles.ts`).
- Runtime style/theming currently depends on:
  - `@emotion/react`
  - `@emotion/styled`
  - `@kami-ui/next-theme`
  - `@kami-ui/theme-shop`
  - `@kami-ui/react-components`
  - `@kami-ui/types`
- Component folders still tied to Emotion/Kami runtime APIs:
  - `src/components/html`
  - `src/components/common-full-width-wrapper`

## Target Architecture

- Plain CSS stack:
  - `src/app/globals.css` for root/global styles
  - `src/app/page.module.css` for route-local styles
- `src/app/layout.tsx` becomes root style/font shell:
  - keeps `html`/`body`
  - loads fonts via `next/font/google`
  - no runtime provider wrapper
- Remove `src/app/providers.tsx`.
- Remove Emotion/Kami runtime theme files (`src/styles/global.ts`, `src/styles/theme.ts`).
- Delete Emotion/Kami-dependent component folders after documenting their contracts.

## Component Contract Preservation

Before deletion, capture component details in:

- `docs/superpowers/specs/2026-06-01-tailwind-v4-component-migration-notes.md`

Required contents:

- Original file tree and file paths
- Exported component/function/type names
- Prop interfaces and semantic intent
- Current styling behaviors and responsive rules
- Tailwind v4 rebuild checklist
- Parity acceptance criteria for future replacement

## Migration Plan

1. Snapshot component structures and contracts in Tailwind notes doc.
2. Migrate app shell to plain CSS:
   - Update `src/app/layout.tsx`
   - Add `src/app/globals.css`
   - Update `src/app/page.tsx` to CSS module class usage
   - Replace `src/app/page.styles.ts` with `src/app/page.module.css`
   - Delete `src/app/providers.tsx`
3. Remove runtime style/theme files and old component implementations:
   - Delete `src/styles/global.ts`
   - Delete `src/styles/theme.ts`
   - Delete `src/components/html/index.ts`
   - Delete `src/components/common-full-width-wrapper/index.tsx`
   - Delete `src/components/common-full-width-wrapper/styles.ts`
4. Update dependencies and docs:
   - `package.json`: remove Emotion/Kami runtime packages, keep `@kami-ui/eslint-config`
   - `README.md`, `AGENTS.md`, `PROJECT_STANDARD_CONSTANTS.md`: reflect plain CSS baseline and Tailwind v4 follow-up
5. Validate:
   - `pnpm lint`
   - `pnpm build`
   - grep for removed runtime imports/usages in active source files

## Execution Model

Per user instruction, perform migration with one fresh subagent per unit:

- A: snapshot component structures/contracts doc
- B: app shell + plain CSS migration
- C: delete runtime files/components
- D: dependency cleanup
- E: docs/constants cleanup
- F: validation and fixups

Main agent remains coordinator/reviewer only.

## Risk and Mitigation

- Risk: build/runtime regressions from removing provider/theme setup.
  - Mitigation: move required baseline styles into `globals.css` and keep scope minimal.
- Risk: future Tailwind rebuild loses component API details.
  - Mitigation: dedicated migration notes with prop and behavior-level parity checklist.
- Risk: accidental removal of lint tooling package.
  - Mitigation: explicitly preserve `@kami-ui/eslint-config`.

## Validation Plan

- Lint passes (`pnpm lint`) with no new errors.
- Build passes (`pnpm build`).
- No runtime imports remain for:
  - `@emotion/react`
  - `@emotion/styled`
  - `@kami-ui/next-theme`
  - `@kami-ui/react-components`
  - `@kami-ui/theme-shop`
  - `@kami-ui/types`

## Acceptance Criteria

- App runs with plain CSS and App Router only.
- Emotion/Kami runtime dependencies removed from source and package dependencies.
- `@kami-ui/eslint-config` remains configured.
- Tailwind v4 migration-notes document exists with preserved component contracts.
- Lint and build succeed.
