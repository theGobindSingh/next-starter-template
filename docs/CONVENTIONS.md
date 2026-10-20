# Conventions

How code in this repo is shaped. Principles only — the code is the reference for specifics.

## Files and folders

- Everything on disk is `kebab-case`. Identifiers keep normal TS/React casing.
- One folder per unit: `button/index.tsx`, plus `types.ts`, `styles.ts` or helpers beside it when needed.
- Shared components go in `src/components/`. Components used by one route live in that route's folder (`src/app/<route>/components/`). Promote a component to `src/components/` only when a second route needs it.
- The root of `src/app` holds only Next.js special files (layout, page, error, 404, SEO). Keep them thin: compose, don't implement. Shared UI goes in `src/components`, fonts in `src/styles`.

## Code

- Components are `const` arrow functions with a default export.
- Server Components by default. Add `"use client"` only at the smallest leaf that needs state, effects or browser APIs.
- Name every function, including callbacks and handlers (`useEffect(syncTheme, [])`, `onClick={handleToggle}`).
- Types are strict (`@tsconfig/strictest`). No `any`, no `!` assertions, no lint-disables without a written reason.
- Import with path aliases (`@components/*`, `@utils/*`, …) rather than `../..` chains.

## Styling

- Tailwind utilities first. Use the token-backed classes (`bg-bg`, `text-fg`, `bg-accent-600`), never raw hex or Tailwind's built-in palette.
- Build or merge class strings with `tw` from `@utils/tw`, as a tag (``tw`flex gap-2` ``) or a call (`tw("flex", isActive && "text-fg", className)`). It drops falsy values, and the editor and ESLint check classes in both forms.
- For typography, use the text components in `@components/html` (`H1`–`H3`, `P`, `Span`, `Hr`) or plain elements with utilities. Pick one style per project.
- When a component's CSS outgrows utilities, put it in a co-located `<name>.css` written with `@utility`, and register it in `src/styles/components.css`. `button/button.css` is the example.
- Dark mode comes from the theme (below); components don't branch on theme in JS. Use the `dark:` variant only for things tokens can't express (e.g. swapping icons).

## Theme

An inline script in the root layout's `<head>` adds `<meta name="color-scheme">` before the page paints: the saved choice from localStorage first, then the OS preference. CSS keys dark mode off that meta tag with `:root:has(...)`. Pages stay static because the server never reads the theme. It's an injected meta tag because React owns `<html>`, and any attribute change there before hydration causes a mismatch. `@utils/theme` holds that script and the helpers for changing the theme; reuse them rather than re-implementing.

## Pages, SEO and security

- Site name, description and URL live in `src/site.ts`; metadata, `robots.ts`, `sitemap.ts` and `opengraph-image.tsx` read from it. Give each page its own `metadata.title`, and add public routes to `sitemap.ts`.
- `not-found.tsx`, `error.tsx` and `global-error.tsx` are thin wrappers around `@components/status-page` and `@components/error-content`.
- Security headers, including a static CSP, are set in `next.config.js`. When adding a third-party script, font, image host or API, allow its origin in the CSP.
- Scrolling is smoothed by Lenis (`@components/smooth-scroll`). Mark nested scroll containers (modals, menus) with `data-lenis-prevent`.

## Git

Conventional Commits (`feat:`, `fix:`, `docs:`, …). Commit `pnpm-lock.yaml`.
