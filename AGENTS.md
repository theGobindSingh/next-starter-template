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

- `src/app`: Next.js App Router route segments, layouts, and route entry points
- `src/components`: reusable shared components
- `src/app/*.css + *.module.css`: global CSS and route-scoped CSS modules
- `public/assets`: static assets (fonts, images)

## Conventions

- Use the App Router pattern already in place; do not mix legacy router patterns unless intentionally migrating.
- Keep route files in `src/app` focused on route concerns; colocate route-specific UI and logic with each route segment, and share reusable pieces via `src/components`.
- Prefer path aliases from `tsconfig.json` (`@components/*`, `@hooks/*`, `@styles/*`, etc.) over deep relative imports.
- Follow the module file pattern where practical: `index.tsx`, `styles.ts`, `types.ts`.
- Use plain CSS for global styling and CSS modules for route/component-scoped styles.
- Tailwind v4 is a planned follow-up after stabilization; do not assume it is available yet.

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
