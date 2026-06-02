# Next.js Starter Template

A minimal starter for building apps with [Next.js](https://nextjs.org/)
and [TypeScript](https://www.typescriptlang.org/).

This repository is set up with the **App Router** (`src/app`) and provides an
opinionated structure for co-located routes, shared components, and a Tailwind
v4-first styling baseline.

## Features

- **Next.js 16** with **React 19**
- **App Router** structure with route files in `src/app`
- **TypeScript** with strict config presets
- **Tailwind v4** baseline for utility-first app styling
- **Global styling entry** in `src/app/globals.css` for app-wide defaults
- **All-batteries-included ESLint config** via [`@kami-ui/eslint-config`](https://www.npmjs.com/package/@kami-ui/eslint-config)
- Path aliases such as `@components/*`, `@hooks/*`, and `@styles/*`

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

## Migration Checklist (After Cloning Template)

- Rename app metadata and project title defaults (for example in `src/app/layout.tsx`, `package.json`, and this README).
- Update `AGENTS.md` with your product context, testing stack, deployment workflow, and security/compliance constraints.
- Validate local runtime matches requirements: Node.js `>=22` and `pnpm` `11.5.0`.
- Replace the starter home route implementation in `src/app/page.tsx` with your product entry experience.
- Define `images.remotePatterns` in `next.config.js` if your app loads remote image hosts.

## Working with AI Assistants

This template ships with a curated set of agent skills and workflow rules that make AI coding assistants substantially more useful out of the box. Here is what you need to know.

**Start here:** [AGENTS.md](AGENTS.md) is the single source of truth for how AI agents should behave in this repo. Read it when onboarding, and update it early when this template becomes a real product — the more context you add there, the better the AI output gets.

The project also includes [PROJECT_STANDARD_CONSTANTS.md](PROJECT_STANDARD_CONSTANTS.md), a reference file that captures breakpoints, type scales, font choices, path aliases, and layout constants in one place. For design and architecture tasks, read this file first so skill execution stays aligned with the current codebase.

### Skills

Skills are modular instruction sets that extend AI behavior for specific kinds of work. They live in [.agents/skills/](.agents/skills/) and activate based on the task at hand:

| Situation                                            | Skills that activate                                     |
| ---------------------------------------------------- | -------------------------------------------------------- |
| Starting a new session                               | `using-superpowers`                                      |
| Recalling or saving context across sessions          | `mem`                                                    |
| Building or changing UI                              | `impeccable`, `ui-ux-pro-max`                    |
| Adding new files, modules, or architectural patterns | `opinionated-nextjs-systems`                             |
| Executing any multi-step implementation              | `subagent-driven-development`                            |

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
    globals.css
    layout.tsx
    page.tsx
  components/
  hooks/
  styles/
```

## Key Files

- `src/app/layout.tsx` — root layout for the App Router tree
- `src/app/page.tsx` — home route entry in the App Router
- `src/app/globals.css` — Tailwind v4 import and global app layer styles

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
- Build route UI with Tailwind utility classes directly in route/components
- Adjust global defaults and shared layers in `src/app/globals.css`
- Place reusable UI pieces in `src/components/`

## Notes

- This starter uses the **App Router** via `src/app`.
- Static assets in this repo live at the project root under `public/`.
- Tailwind v4 is active baseline styling approach in this template.
- The formatting and lint scripts target the `src/` directory structure used by
  this template.
