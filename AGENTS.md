# AGENTS.md

This repository is a batteries-included Next.js starter template. Keep this file short, practical, and easy to extend.

## Scope

- Applies to the whole repository.
- Prefer links to existing docs instead of duplicating long explanations.
- For generated projects based on this starter, update this file early with product-specific rules.

## Skill Usage Guidelines

- At the start of every new chat/session, invoke `using-superpowers` first.
- `nextjs`, `react-best-practices` and `security-best-practices` are core skills that should be invoked later in every session before any implementation work, to ensure the agent is primed with the right knowledge and guardrails.
- Whenever implementing a new feauture that effects the whole system, use `system-design` to create a high-level design before starting implementation. This is especially important for features that touch multiple layers (e.g., API routes, database, and frontend) or require new architectural patterns.
- For cross-session context, use `mem` to both recall and save: search memory first before asking the user to repeat information, and persist important new decisions, preferences, and snippets.
- If the task touches any visual output (new components, layout changes, style updates, or new pages), load [PROJECT_STANDARD_CONSTANTS.md](PROJECT_STANDARD_CONSTANTS.md) first — if the file does not exist, notify the user and ask whether to create it or continue without it — then invoke these skills in order:
  1. `impeccable`
  2. `ui-ux-pro-max`
  3. `tailwind-design-system`
- For implementation work, invoke `subagent-driven-development` and enforce this execution policy:
  1. Break work into subtasks each completable in a single file or a single well-defined function change, unless a natural larger boundary exists (e.g., a full API route).
  2. Delegate as many subtasks as possible to fresh subagents.
  3. Prefer parallel subagents for independent subtasks; keep sequential order only where dependencies require it.
  4. Keep the main agent as coordinator/reviewer, not primary implementer, unless delegation is blocked.
- If a task qualifies as both UI/design and implementation work, run the UI skill sequence first (`impeccable`, `ui-ux-pro-max`, `tailwind-design-system`), then invoke `subagent-driven-development`. All branches still follow `using-superpowers` at session start.
- Use `caveman` as the default response style for this user (full intensity) unless the user asks to stop or switch level. Apply caveman style to prose responses only; all code, file edits, and structured output must remain precise and professional.
- Use `stop-slop` whenever the user requests to write text content for the website, product, or codebase but not actual code.

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

- `src/app`: Next.js App Router route segments, layouts, and route entry points
- `src/components`: reusable shared components
- `src/app/globals.css`: Tailwind v4 import, global layer styles, and app-wide defaults
- `src/app/*.module.css`: optional scoped styles for edge-case components/routes
- `public/assets`: static assets (fonts, images)

## Conventions

- Use the App Router pattern already in place; do not mix legacy router patterns unless intentionally migrating.
- Keep route files in `src/app` focused on route concerns; colocate route-specific UI and logic with each route segment, and share reusable pieces via `src/components`.
- Prefer path aliases from `tsconfig.json` (`@components/*`, `@hooks/*`, `@styles/*`, etc.) over deep relative imports.
- Follow the module file pattern where practical: `index.tsx`, `styles.ts`, `types.ts`.
- Tailwind v4 is available and is the primary styling path for routes and components.
- Use CSS modules optionally for edge cases where utility classes are not a good fit.

## Quality Gates

- Before finishing code changes, run at least: `pnpm lint`.
- If adding build-time or runtime behavior, verify with: `pnpm build`.
- If `pnpm lint` or `pnpm build` exits with errors, do not mark the task complete. Fix all reported errors before finishing, or explicitly surface the unresolved errors to the user with the full error output.

## Security

- Never commit secrets, API keys, or credentials to source files.
- Use `.env` for secrets; never commit `.env` to version control.
- Never read `.env` or `.env.*` files. If a secret needs to be present, updated, or verified, instruct the user to do it manually.
- If a secret is detected in code, halt and alert the user before proceeding.

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

## Design Context

- [PRODUCT.md](PRODUCT.md): Strategic brief — register, users, brand personality, anti-references, design principles. **Edit this for your product.**
- [DESIGN.md](DESIGN.md): Visual design system — colors, typography, elevation, components. **Swap tokens to rebrand.**
- `.impeccable/design.json`: Machine-readable sidecar for live panel rendering. (generate if not present)
- `.impeccable/live/config.json`: Live mode pre-config (Next.js App Router) (generate if not present)

## References

- [README](README.md)
- [TypeScript config](tsconfig.json)
- [ESLint config](eslint.config.mjs)
- [Next config](next.config.js)
- [Project standard constants](PROJECT_STANDARD_CONSTANTS.md)
