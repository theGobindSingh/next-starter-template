# AGENTS.md

A lean Next.js starter (App Router, TypeScript strict, Tailwind v4, pnpm). It gives a solid base and stays out of the way — extend it however the product needs.

`CLAUDE.md` is a symlink to this file (created by `scripts/link-agents.js` on install). Edit this file only.

## Commands

- `pnpm install` — install deps and create agent symlinks
- `pnpm dev` — dev server
- `pnpm build` — auto-fixes lint, then builds; the main quality gate
- `pnpm lint` / `pnpm lint:fix` — Prettier + ESLint on `src/`

## Where things live

- `src/app` — routes and Next.js special files only; route-only UI sits beside its route, shared code lives in the folders below
- `src/components` — shared components
- `src/utils` — small framework-agnostic helpers
- `src/styles` — design tokens (`globals.css`), fonts, base styles, component CSS
- `src/site.ts` — site name, description and URL used by metadata and SEO files
- `docs/` — product, design and convention docs (below)

Discover the rest from the code; path aliases are in `tsconfig.json`.

## Rules

- Read [docs/CONVENTIONS.md](docs/CONVENTIONS.md) before writing code and [docs/DESIGN.md](docs/DESIGN.md) before visual work.
- Style through the tokens in `src/styles/globals.css`; no raw colors in components.
- No anonymous functions: name every callback/handler as a `const` before passing it.
- Never use `suppressHydrationWarning`; fix the cause.
- ESLint enforces a file-size limit. When it flags a file, split it into a folder (`index` + focused siblings) instead of disabling the rule.
- Never read, print or commit `.env` files or secrets. Ask the user to set them; document new variables in `.env.example`.
- When a change makes any doc wrong, update that doc in the same change.

## Every code change

Use the `ponytail` skill at level `full` (project default; `lite` or `ultra` only if the user asks): smallest complete change, reuse before writing. Use `ponytail-review` to review a change and `ponytail-audit` for the whole repo.

## Writing content

Use the `human-writing` skill whenever you write content people will read: UI copy, metadata, docs, READMEs, commit messages and PR descriptions.

## Done means

`pnpm build` passes with no lint errors. If it can't, report the full error output instead of marking the task complete.

## Tools and skills

- Playwright MCP is a project dependency, configured for Claude Code (`.mcp.json`, pre-approved in `.claude/settings.json`) and opencode (`opencode.jsonc`). Use it to check UI changes in a real browser. If it reports a missing browser, ask the user to run `pnpm browser:install`.
- Before writing code against a library, framework or CLI, fetch its current docs with the Context7 CLI (`npx ctx7@latest`) — see the `find-docs` skill. Don't rely on memory for APIs.
- Claude Code replies in the terse `caveman` output style (`.claude/output-styles/caveman.md`, set in `.claude/settings.json`). Switch it in `/config`.
- Skills live in `.agents/skills` (linked to `.claude/skills`). If a skill relevant to the task is available — here or in your environment — use it.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
