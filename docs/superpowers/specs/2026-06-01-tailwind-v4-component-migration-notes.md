# Tailwind v4 Component Migration Notes

Date: 2026-06-01
Source: Emotion/Kami runtime components removed during plain CSS stabilization.
Goal: Preserve component contracts for Tailwind v4 reimplementation.

## Original File Tree

- src/components/html/index.ts
- src/components/common-full-width-wrapper/index.tsx
- src/components/common-full-width-wrapper/styles.ts

## Exported API Snapshot

### src/components/html/index.ts
- `CommonTextProps` interface
- `H1`, `H2`, `H3`, `P`, `Span`, `Hr`

### src/components/common-full-width-wrapper/index.tsx
- default export: `CommonFullWidthWrapper`
- props interface: `CommonFullWidthWrapperProps`

### src/components/common-full-width-wrapper/styles.ts
- `containerSize`, `tabletContainerSize`, `mobileContainerSize`
- `containerStyles`
- `wrapperStyles(bg?: string)`

## Component Contract Notes

### Typography (`CommonTextProps` + exported text primitives)
- Supported size tokens map to CSS variables: `4xs|3xs|2xs|1xs|s|m|l|1xl|2xl|3xl|4xl` -> `var(--fs-*)`.
- Color behavior uses semantic tokens via `$color` and optional `$colorWeight`:
  - no `$color` -> `inherit`
  - `$color` is `black` or `white` -> `var(--color-black)` / `var(--color-white)`
  - all other colors -> `var(--color-<name>-<weight>)` with default weight `400`
- Weight token contract for `$weight` and `$colorWeight`: string literals from `100` through `800` (step 100).
- Margin behavior:
  - `H1` default margin `0 0 0.75em 0`
  - `H2` default margin `0 0 0.5em 0`
  - `H3` default margin `0 0 0.25em 0`
  - `P`, `Span`, `Hr` default margin `0`
  - any `$margin` override is passed through as-is
- Line-height behavior: default `normal` unless `$lineHeight` supplied.
- Letter-spacing behavior: default `normal` unless `$letterSpacing` supplied.
- Element-specific defaults:
  - `H1`: size `4xl`, weight `700`
  - `H2`: size `2xl`, weight `700`
  - `H3`: size `m`, weight `500`
  - `P`: size `2xs`, weight `400`
  - `Span`: size `1xs`, weight `400`
  - `Hr`: `border: 1px solid var(--color-gray-100)`, `width: 100%`

### Wrapper (`CommonFullWidthWrapperProps`)
- Props:
  - `className?: string`
  - `element?: FullWidthWrapperProps["element"]` (default `section`)
  - `wrapperCss?: FullWidthWrapperProps["wrapperCss"]`
  - `wrapperProps?: FullWidthWrapperProps["wrapperProps"]`
  - `bg?: string`
  - `ref?: RefObject<HTMLElement>`
- `className` target contract must be preserved: class is forwarded to `FullWidthWrapper` root component.
- Legacy ref behavior: props allowed `ref?: RefObject<HTMLElement>` while component also used forwarded `Ref<HTMLElement>` parameter; treat as compatibility quirk and explicitly decide in Tailwind version whether to keep both or standardize to forwardRef-only API (with migration note).
- Render behavior:
  - wraps children with `FullWidthWrapper` from `@kami-ui/react-components`
  - passes `css={containerStyles}` for container-level responsive widths
  - passes `containerSize={containerSize}` (base container width token)
  - combines wrapper styles in order: `[wrapperStyles(bg), wrapperCss]`
  - uses non-null assertion for `wrapperProps` (`wrapperProps!`) when forwarding

### Responsive container + full-width background behavior
- Width tokens in styles module:
  - `containerSize = "85%"`
  - `tabletContainerSize = "90%"`
  - `mobileContainerSize = "90%"`
- Responsive rules (`containerStyles`):
  - tablet breakpoint -> `width: 90%`
  - phone breakpoint -> `width: 90%`
  - desktop/base uses `containerSize` passed to `FullWidthWrapper` (`85%`)
- Breakpoint source of truth for migration parity:
  - phone: `0px-640px`
  - tablet: `641px-1024px`
  - desktop: `1025px+`
- Wrapper background behavior (`wrapperStyles(bg?)`):
  - always enforces `width: 100%` for outer wrapper
  - applies `background: <bg>` only when `bg` is truthy
  - no background declaration emitted when `bg` is absent

## Tailwind v4 rebuild checklist

- [ ] Map typography tokens (`--fs-*`, `--color-*`) into Tailwind v4 theme/extensions or CSS variable-backed utilities.
- [ ] Recreate semantic text primitives preserving element tags (`h1`, `h2`, `h3`, `p`, `span`, `hr`) and default size/weight/margin behaviors.
- [ ] Preserve optional override props for margin, line-height, letter-spacing, and color weight without breaking defaults.
- [ ] Rebuild full-width wrapper API with `element`, `wrapperCss`-equivalent escape hatch, `wrapperProps`, and optional `bg`.
- [ ] Recreate container width behavior: desktop/base `85%`, tablet `90%`, mobile `90%`.
- [ ] Ensure full-width outer wrapper remains `width: 100%` and supports optional background fill.
- [ ] Validate API parity against this snapshot before removing compatibility notes.

## Parity acceptance criteria

- All exported names from snapshot remain available in replacement modules or documented compatibility aliases.
- Default typography output matches prior behavior for element type, size token, weight, margin, line-height, and letter-spacing.
- Color resolution preserves `inherit`, black/white direct token behavior, and weighted semantic token behavior.
- Wrapper maintains semantic element override, pass-through wrapper props, responsive container widths, and optional background behavior.
- Style precedence remains identical: background wrapper styles apply first, consumer `wrapperCss` applies second (consumer override wins), and `wrapperProps` passthrough attributes remain intact.
- Smoke usage examples in app compile without prop-type regressions against captured interfaces.
