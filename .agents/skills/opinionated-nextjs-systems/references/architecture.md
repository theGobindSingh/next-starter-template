# Architecture Rules

Apply these rules when generating or refactoring feature code.

## Rule A1: Enforce layer order

- Preferred order: `components -> layouts -> modules -> pages`.
- Keep lower layers reusable and higher layers orchestration-focused.
- Do not import deep leaf components directly into route files.

```tsx
import HomeModule from "../modules/home";

const HomePage = () => {
  return <HomeModule />;
};

export default HomePage;
```

## Rule A2: Keep module shape consistent

Each mature module should target this structure:

- `index.tsx`
- `types.ts`
- `constants.ts`
- `styles.ts`
- section files (for example `hero.tsx`, `overview.tsx`, `faq.tsx`)

```txt
modules/
  feature-name/
    index.tsx
    types.ts
    constants.ts
    styles.ts
    overview.tsx
```

## Rule A3: Keep module root composition-only

- `index.tsx` should compose sections and pass props.
- Static objects/arrays belong in `constants.ts`.
- Heavy transforms belong in helper files or hooks.

## Rule A4: Standardize non-hero section wrappers

- Use one shared section layout wrapper for non-hero sections.
- If your project already has a wrapper (for example `StandardSectionLayout`), use it consistently.
- If no wrapper exists, create one and use it across modules.

## Rule A5: Keep full-width wrappers consistent

- Prefer one reusable full-width wrapper abstraction.
- For section variants, extend that wrapper rather than creating ad-hoc containers.

## Rule A6: Keep app shell concerns centralized

- Global providers, theme, metadata shell, and top-level layout belong in app entry files (`_app.tsx`, root layouts, or host equivalent).
- Modules should not duplicate global provider logic.

## Rule A7: Prefer constants-driven content

- Treat `constants.ts` as the default source for static section content.
- Use route-level data methods only when data truly depends on files, APIs, or build-time input.

## Rule A8: Preserve conversion-aware composition

- Section order should guide users toward a clear next action.
- Keep visible CTA paths in major sections.

## Rule A9: Avoid architecture drift propagation

When touched files contain legacy drift:

- keep behavior-compatible edits
- do not spread drift to untouched files
- report drift explicitly in handoff
