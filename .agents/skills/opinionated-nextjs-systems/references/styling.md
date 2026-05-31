# Styling Rules

## Rule S1: Use Emotion consistently (`styled` + `css`)

- Keep component styles in `styles.ts`.
- Use `css` blocks for reusable interaction fragments.

## Rule S2: Prefer tokenized colors and spacing

- Use design tokens/CSS variables instead of hardcoded literals when tokens exist.
- If the host repo has no token system, define one before expanding new styles.

```ts
background: rgba(var(--color-primary-100-base), 0.9);
color: var(--color-neutral-1000);
```

## Rule S3: Keep typography token-driven

- Use host typography tokens or primitives for font, size, and weight.
- Avoid scattering one-off typographic values.

## Rule S4: Use shared breakpoint helpers

- Reuse one breakpoint/media query utility module across features.
- Avoid ad-hoc breakpoints sprinkled through files.

```ts
${mediaQuery.phone} {
  grid-template-columns: 1fr;
}
```

## Rule S5: Full-width sections should share one wrapper strategy

- Extend a common full-width wrapper for section-level containers.
- Keep spacing rhythm predictable.

## Rule S6: Use `$` transient props + prop forwarding guards

- Prefix style-only props with `$`.
- Prevent transient props from leaking to DOM attributes.

```ts
const Item = styled("li", { shouldForwardProp })<{ $side: "left" | "right" }>`
  text-align: ${({ $side }) => ($side === "left" ? "left" : "right")};
`;
```

## Rule S7: Local CSS custom properties use `--_` prefix

- Use `--_` for component-scoped variables to avoid global token collisions.

## Rule S8: Hover interactions should use reusable `css` blocks

- Define hover behavior once and apply to `:hover` and any equivalent state classes.
- Keep transitions declared on both container and affected descendants.

```ts
const cardHoverStyles = css`
  .icon {
    color: var(--color-secondary-700);
  }
`;
```

## Rule S9: Phone parity can use `.active` class

- Keep desktop hover behavior.
- Add `.active` for touch contexts, driven by viewport-aware logic.

## Rule S10: Use semantic HTML as styled bases

- Prefer `article`, `section`, `blockquote`, `footer`, `ol`, `ul`, and `li` where semantics match content.

## Rule S11: Use horizontal scroll pattern for crowded mobile grids

- Typical phone pattern:
  - `display: flex`
  - `flex-wrap: nowrap`
  - `overflow-x: auto`
  - `scroll-snap-type: x mandatory`

## Rule S12: Keep large style files readable

- Group long `styles.ts` files with clear section separators.
- Keep naming predictable and section-scoped.

## Rule S13: Avoid style drift in new code

- Do not add new inline styles unless unavoidable.
- Do not introduce new hardcoded colors when token alternatives exist.
