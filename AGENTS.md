# AGENTS.md

This repository is a batteries-included Next.js starter template. Keep this file short, practical, and easy to extend.
If you have been instructed to update this file/project, then make sure you update ALL the relevant files associated with the new rules or conventions you are adding. For example, if you changing the project name, make sure to update the README, DESIGN, PRODUCT, Package.json, and any other relevant files to reflect the new name consistently across the codebase and documentation.

## Scope

- Applies to the whole repository.
- Prefer links to existing docs instead of duplicating long explanations.
- For generated projects based on this starter, update this file early with product-specific rules.

## Skill Usage Guidelines

- At the start of every new chat/session, invoke `using-superpowers` first; NEVER skip it; ONLY after using this skill, proceed with other tasks.
- For any new non-trivial implementation task, ALWAYS invoke `brainstorming` before starting work to generate a wide range of ideas and approaches, even if the solution seems straightforward. This helps ensure creativity and thoroughness.
- `nextjs`, `react-best-practices` and `security-best-practices` are core skills that should be invoked later in every session before any implementation work, to ensure the agent is primed with the right knowledge and guardrails.
- Whenever implementing a new feature that affects the whole system, use `system-design` to create a high-level design before starting implementation. This is especially important for features that touch multiple layers (e.g., API routes, database, and frontend) or require new architectural patterns.
- For cross-session context, use `mem` to both recall and save: search memory first before asking the user to repeat information, and persist important new decisions, preferences, and snippets. After every important decision/output, save a very concise summary to memory with `mem` for future recall. Persist only long-term architectural decisions, user preferences, and project-wide conventions.
- If the task touches any visual output (new components, layout changes, style updates, or new pages), load [PROJECT_STANDARD_CONSTANTS.md](docs/PROJECT_STANDARD_CONSTANTS.md) first — if the file does not exist, notify the user and ask whether to create it or continue without it — then MUST invoke these skills (ALL) in order:
  1. `impeccable`
  2. `ui-ux-pro-max`
  3. `tailwind-design-system`
- Before starting any implementation work, ALWAYS invoke `subagent-driven-development` and enforce this execution policy:
  1. Break work into subtasks each completable in a single file or a single well-defined function change, unless a natural larger boundary exists (e.g., a full API route).
  2. Delegate as many subtasks as possible to fresh subagents.
  3. Prefer parallel subagents for independent subtasks; keep sequential order only where dependencies require it.
  4. Keep the main agent as coordinator/reviewer, not primary implementer, unless delegation is blocked.
- Use `caveman` as the default response style for this user (full intensity) unless the user asks to stop or switch level. Apply caveman style to prose responses only; all code, file edits, and structured output must remain precise and professional.
- **English only** — all agent communication must be in English unless the user explicitly requests otherwise.
- Use `stop-slop` whenever the user requests to write text content for the website, product, or codebase but not actual code.
- If the user asks for a design related to neomorphism or neumorphism, load the `neumorphism-ui` skill and use it along with other design-related skills to ensure the design adheres to neumorphic principles and best practices.

## Commands

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Production build: `pnpm build`
- Start production server: `pnpm start`
- Lint check: `pnpm lint`
- Lint and auto-fix: `pnpm lint:fix`

Notes:

- `pnpm build` runs `pnpm lint:fix` first via `prebuild`; so prefer `pnpm build` over `pnpm lint` for a more comprehensive check that also attempts auto-fixes.
- There is no test script yet. If tests are added, document and enforce the command here.

## Project Shape

- `src/app`: Next.js App Router route segments, layouts, and route entry points
- `src/components`: reusable global shared components
- `src/app/globals.css`: Tailwind v4 import, global layer styles, and app-wide defaults
- `src/app/*.module.css`: optional scoped styles for edge-case components/routes
- `public/assets`: static assets (fonts, images)

## Conventions

- Use the App Router pattern already in place; do not mix legacy router patterns unless intentionally migrating.
- Keep route files in `src/app` focused on route concerns; colocate route-specific UI and logic with each route segment, and share reusable pieces via `src/components`.
- Use `kebab-case` for all file and folder names.
- **Component placement** — global/reusable components live in `src/components/`, page-specific components are co-located in `app/<route>/components/`.
- **Folder-per-component** — each component gets its own directory with `index.tsx` as the component entry point and co-located types.
- Prefer path aliases from `tsconfig.json` (`@components/*`, `@hooks/*`, `@styles/*`, etc.) over deep relative imports.
- Follow the module file pattern where practical: `index.tsx`, `styles.ts` and `types.ts`.
- Tailwind v4 is available and is the primary styling path for routes and components.
- Use CSS modules optionally for edge cases where utility classes are not a good fit.
- NEVER use anonymous/unnamed functions. Every function must be assigned to a named `const` declaration before being passed as a callback or handler. For example, `onClick={() => { return onTabChange("preview"); }}` is forbidden — extract to `const handleTabChange = () => onTabChange("preview")` first, then pass `onClick={handleTabChange}`.
- NEVER suppress Hydration Warnings with `suppressHydrationWarning`. If a hydration warning occurs, fix the underlying cause instead of silencing it.

## Quality Gates

- If adding build-time or runtime behavior, verify with: `pnpm build`.
- If `pnpm lint` or `pnpm build` exits with errors, do not mark the task complete. Fix all reported errors before finishing, or explicitly surface the unresolved errors to the user with the full error output.
- No generated or modified file shall exceed 150 lines of code. If a file exceeds 150 LOC, split it into a modular folder structure (index.tsx entry + focused sibling files). Apply this proactively — before writing, break large outputs into modules; after writing, audit and refactor any file that exceeds the limit.

## Security

- Never commit secrets, API keys, or credentials to source files.
- Use `.env` for secrets; never commit `.env` to version control.
- Never read `.env` or `.env.*` files. If a secret needs to be present, updated, or verified, instruct the user to do it manually.
- If a secret is detected in code, halt and alert the user before proceeding.

## Known Pitfalls

- Lint scripts target `src/**/*.{ts,js,tsx,jsx}`; files outside `src/` may not be covered.
- `next.config.js` currently has `images.remotePatterns` empty; remote image sources must be explicitly added.
- TypeScript is strict via `@tsconfig/strictest` + `@tsconfig/next`; keep types explicit and avoid bypass patterns.

## Design Context

- [PRODUCT.md](docs/PRODUCT.md): Strategic brief — register, users, brand personality, anti-references, design principles. **Edit this for your product.**
- [DESIGN.md](docs/DESIGN.md): Visual design system — colors, typography, elevation, components. **Swap tokens to rebrand.**

## References

- [README](README.md)
- [TypeScript config](tsconfig.json)
- [ESLint config](eslint.config.mjs)
- [Next config](next.config.js)
- [Project standard constants](docs/PROJECT_STANDARD_CONSTANTS.md)
- [Design system](docs/DESIGN.md)
- [Product brief](docs/PRODUCT.md)
