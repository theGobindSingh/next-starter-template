---
name: "opinionated-nextjs-systems"
description: "Generate and refactor code using a strict, conversion-aware front-end style: layered architecture, composition-first modules, typed constants, tokenized Emotion styling, and predictable handoff quality gates."
argument-hint: "Task to implement using Opinionated Next.js Systems conventions"
---

# Opinionated Next.js Systems Engineering Skill

Use this skill when writing or editing TypeScript React/Next.js code that should follow the conventions in this package.

## Source Of Truth Priority

Apply rules in this order:

1. User request.
2. Host repository requirements and existing architecture.
3. This skill package (`references/architecture.md`, `references/naming.md`, and related docs).
4. Local patterns in touched files.

If there is a conflict, preserve host-repo correctness first and then apply this skill's intent as far as possible.

## Required Skill Documents

This package expects rule lookup from:

- `./references/architecture.md`
- `./references/naming.md`
- `./references/typescript.md`
- `./references/nextjs.md`
- `./references/styling.md`
- `./references/api.md`
- `./references/testing.md`
- `./references/workflows.md`
- `./references/examples/component-example.tsx`
- `./references/examples/hook-example.ts`
- `./references/examples/api-example.ts`
- `./references/examples/feature-structure.txt`

## Agent Workflow

1. Classify the task type.
2. Load only relevant rule files.
3. Implement with canonical rules first.
4. Adapt imports, aliases, and package usage to the host project.
5. Preserve public API behavior unless a breaking change is requested.
6. Run diagnostics and applicable validation commands.
7. Report canonical rules followed and any intentional drift.

## Hard Constraints For Code Generation

- Layering: `components -> layouts -> modules -> pages`.
- Route files should remain thin; business logic lives in modules/helpers.
- Module structure target: `index.tsx`, `types.ts`, `constants.ts`, `styles.ts`, and section files.
- `index.tsx` stays composition-only.
- Use standardized section wrappers for non-hero sections.
- Keep static content in `constants.ts`, typed from props/contracts.
- Prefer tokenized Emotion styling over inline styles or hardcoded colors.
- Keep CTA and next-action affordances explicit in section composition.

## Portability Rules

- Do not assume specific alias names; use host aliases if present, otherwise relative imports.
- Do not assume a specific package manager; use host scripts (`npm`, `pnpm`, `yarn`, or `bun`).
- Do not reference private repo docs, CI workflows, or internal file paths.
- Treat example code as pattern references, not mandatory package requirements.

## Drift Handling

When drift exists in touched files:

- Keep behavior-compatible edits.
- Do not spread drift into unrelated files.
- Mark deviations in summary as:
  - `canonical` for this skill's rules
  - `observed drift` for host code exceptions

## Definition Of Done

- Output matches these skill conventions while staying host-repo compatible.
- New code is typed, concise, and structured by module boundaries.
- No new diagnostics in touched files.
- Handoff includes applied rules, validation, and any remaining risk.
