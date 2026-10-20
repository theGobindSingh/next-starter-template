# Next.js Starter Template

A lean, batteries-included starter for [Next.js](https://nextjs.org/) apps. It sets up the parts every project needs and leaves the rest to you.

## What's inside

- Next.js 16 (App Router) and React 19
- TypeScript in strict mode (`@tsconfig/strictest`)
- Tailwind CSS v4 with a small token system and light/dark themes
- ESLint ([`@webadeva/eslint-config`](https://www.npmjs.com/package/@webadeva/eslint-config)) and Prettier
- Husky and commitlint check commit messages against Conventional Commits
- [Lucide](https://lucide.dev/) icons and [Lenis](https://lenis.darkroom.engineering/) smooth scrolling
- [Payload CMS](https://payloadcms.com/) with a SQLite database, admin at `/admin`
- Error and 404 pages, SEO basics (metadata, sitemap, robots, generated Open Graph image) and security headers
- Rules, skills and tools for AI coding agents (see [AI agents](#ai-agents))

## Requirements

Node.js and pnpm versions are pinned in `package.json` (`engines`, `packageManager`). With [Corepack](https://nodejs.org/api/corepack.html) enabled, the right pnpm is picked up automatically.

## Getting started

```bash
pnpm install
cp .env.example .env   # then set PAYLOAD_SECRET, e.g. from `openssl rand -hex 32`
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/admin](http://localhost:3000/admin) to create the first Payload user. Data goes in `payload.db`, which git ignores.

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `pnpm dev`             | Start the dev server                          |
| `pnpm build`           | Auto-fix lint, then production build          |
| `pnpm start`           | Serve the production build                    |
| `pnpm lint`            | Check formatting and lint                     |
| `pnpm lint:fix`        | Fix formatting and lint                       |
| `pnpm browser:install` | Download Chromium for Playwright MCP          |
| `pnpm generate:types`  | Regenerate Payload types after schema changes |
| `pnpm payload`         | Payload CLI, e.g. `pnpm payload migrate`      |

## AI agents

`AGENTS.md` holds the rules every agent follows. `pnpm install` links `CLAUDE.md` to it and `.claude/skills` to `.agents/skills`, so Claude Code, GitHub Copilot and opencode all read the same files.

What comes with it:

- [Playwright MCP](https://github.com/microsoft/playwright-mcp), so agents can check pages in a real browser (Claude Code and opencode). Run `pnpm browser:install` once to download its Chromium, about 120 MB.
- Skills in `.agents/skills`: `find-docs` fetches current library docs from [Context7](https://context7.com/), [`ponytail`](https://github.com/dietrichgebert/ponytail) keeps code changes small (with `ponytail-review` and `ponytail-audit`), and [`human-writing`](https://github.com/webadeva/webadeva-skills) keeps docs, copy and commit messages from reading like a chatbot wrote them.
- A terse [caveman](https://github.com/juliusbrussee/caveman) output style for Claude Code replies, set in `.claude/settings.json`. Pick another one with `/config`.

Context7 works without an account. For higher rate limits, run `npx ctx7@latest login` or set `CONTEXT7_API_KEY` in your shell.

## Make it yours

1. Rename the project in `package.json`, `src/site.ts` and this README. Set `SITE_URL` and `PAYLOAD_SECRET` in production (see `.env.example`).
2. Replace `src/app/(frontend)/page.tsx` with your own home page, and add collections in `src/collections`.
3. Set your colors and fonts. See [docs/DESIGN.md](docs/DESIGN.md).
4. Fill in [docs/PRODUCT.md](docs/PRODUCT.md) and add product-specific rules to [AGENTS.md](AGENTS.md).
5. Add remote image hosts to `images.remotePatterns`, and any third-party origins to the CSP, in `next.config.js`.

## Docs

- [AGENTS.md](AGENTS.md): commands and rules for people and AI agents
- [docs/CONVENTIONS.md](docs/CONVENTIONS.md): how code is structured
- [docs/DESIGN.md](docs/DESIGN.md): tokens and visual system
- [docs/PRODUCT.md](docs/PRODUCT.md): what the product is
