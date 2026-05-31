# Next.js Starter Template

A minimal starter for building apps with [Next.js](https://nextjs.org/),
[TypeScript](https://www.typescriptlang.org/),
[Emotion](https://emotion.sh/docs/introduction), and
[Kami UI](https://www.npmjs.com/package/@kami-ui/next-theme).

This repository is set up with the **Pages Router** (`src/pages`) and provides
an opinionated structure for modules, shared components, global styles, and
responsive theming.

## Features

- **Next.js 16** with **React 19**
- **TypeScript** with strict config presets
- **Emotion** for styling and global CSS
- **Kami UI** theme provider integration
- **Google font** setup in the shared theme
- **All-batteries-included ESLint config** via [`@kami-ui/eslint-config`](https://www.npmjs.com/package/@kami-ui/eslint-config)
- Path aliases such as `@components/*`, `@modules/*`, and `@styles/*`

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

| Situation                                            | Skills that activate                                     |
| ---------------------------------------------------- | -------------------------------------------------------- |
| Starting a new session                               | `using-superpowers`                                      |
| Recalling or saving context across sessions          | `mem`                                                    |
| Building or changing UI                              | `impeccable`, `emil-design-eng`, `design-taste-frontend` |
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
src/
  components/
    common-full-width-wrapper/
    html/
  hooks/
  modules/
    home/
  pages/
    _app.tsx
    _document.tsx
    index.tsx
  public/
    assets/
      fonts/
      images/
  styles/
    global.ts
    theme.ts
```

## Key Files

- `src/pages/_app.tsx` — wires in `ThemeProvider` and global styles
- `src/pages/_document.tsx` — base HTML document setup
- `src/modules/home/` — example home page module
- `src/styles/theme.ts` — Kami UI theme and font configuration
- `src/styles/global.ts` — global CSS, breakpoints, and media helpers
- `src/components/common-full-width-wrapper/` — reusable layout wrapper

## Path Aliases

The project includes aliases configured in `tsconfig.json`:

- `@components/*`
- `@modules/*`
- `@hooks/*`
- `@styles/*`
- `@assets/*`
- `@images/*`
- `@public/*`

## Customization Tips

- Update `src/modules/home/index.tsx` to replace the starter home screen
- Adjust typography and fonts in `src/styles/theme.ts`
- Add shared design tokens or helpers in `src/styles/global.ts`
- Place reusable UI pieces in `src/components/`

## Notes

- This starter currently uses the **Pages Router**, not the App Router.
- Static assets in this repo live under `src/public/`.
- The formatting and lint scripts target the `src/` directory structure used by
  this template.
