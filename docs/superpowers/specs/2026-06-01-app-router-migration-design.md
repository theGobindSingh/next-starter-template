## App Router Migration Design

Date: 2026-06-01
Scope: Migrate starter template from Next.js Pages Router to App Router, remove modules directory, move static assets to root public directory, and update docs/config references.

## Goals

- Replace `src/pages` routing with `src/app` routing.
- Co-locate route implementation in `src/app` and remove `src/modules`.
- Move static assets from `src/public` to root `public`.
- Remove Pages Router-specific aliases and documentation.
- Keep existing theme/global style behavior unchanged.

## Non-Goals

- No UI redesign beyond preserving current home page behavior.
- No API route introduction.
- No dependency or framework version changes.

## Current State

- Global providers/styles currently configured in `src/pages/_app.tsx`.
- HTML document shell currently configured in `src/pages/_document.tsx`.
- Home page route in `src/pages/index.tsx`, delegating to `src/modules/home`.
- Static assets currently under `src/public`.
- Documentation and constants explicitly describe Pages Router.

## Target Architecture

- Routing entrypoint: `src/app`.
- Root shell: `src/app/layout.tsx` with `<html lang="en">` and `<body>`.
- Global providers: `src/app/providers.tsx` (client component) wrapping children with:
  - `ThemeProvider` from `@kami-ui/next-theme`
  - `Global` from `@emotion/react` using `globalStyles`
- Home page route: `src/app/page.tsx` with co-located route UI.
- Static assets served from root `public/`.

## Migration Plan (Option 1: In-place)

1. Create App Router files:
   - `src/app/layout.tsx`
   - `src/app/providers.tsx`
   - `src/app/page.tsx`
2. Remove legacy Pages Router files:
   - `src/pages/_app.tsx`
   - `src/pages/_document.tsx`
   - `src/pages/index.tsx`
3. Remove modules home example files:
   - `src/modules/home/index.tsx`
   - `src/modules/home/styles.ts`
   - `src/modules/home/types.ts`
4. Move static assets:
   - `src/public/*` -> `public/*`
   - remove `src/public/` after move
5. Update TypeScript aliases in `tsconfig.json`:
   - remove `@pages/*`
   - repoint `@public/*`, `@assets/*`, and `@images/*` to `./public/*` paths
6. Update docs and constants:
   - `AGENTS.md`
   - `PROJECT_STANDARD_CONSTANTS.md`
   - `README.md`

## Execution Model

Per user request, execution uses subagent-driven structure with one fresh subagent per isolated migration task:

- A: App Router core files
- B: Remove Pages Router/modules files
- C: Move public assets
- D: Update TypeScript aliases
- E: Update `AGENTS.md`
- F: Update `PROJECT_STANDARD_CONSTANTS.md`
- G: Update `README.md`
- H: Validation and fixups (`pnpm lint`, `pnpm build`)

Main agent remains coordinator/reviewer between subagent steps.

## Risk and Mitigation

- Risk: Emotion/Kami provider behavior changes during migration.
  - Mitigation: keep provider stack identical; only relocate into `providers.tsx`.
- Risk: stale references to Pages Router paths/aliases.
  - Mitigation: grep checks for `src/pages`, `_app.tsx`, `_document.tsx`, and `@pages/*` after migration.
- Risk: static asset path mismatch after move.
  - Mitigation: move entire tree and validate with build.

## Validation Plan

- Run `pnpm lint`.
- Run `pnpm build`.
- Confirm no remaining Pages Router references in source/docs (except skill internals).

## Acceptance Criteria

- App renders via `src/app` with no `src/pages` runtime dependency.
- `src/modules/home` removed and home route lives in `src/app`.
- Static assets are under root `public/`.
- `@pages/*` alias removed; `@public/*`, `@assets/*`, `@images/*` point to root `public`.
- Docs describe App Router conventions.
- Lint and build pass.
