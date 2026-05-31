# TypeScript Rules

## Rule T1: Use `interface` for props and domain contracts

- Default to `interface` for component props and object-shaped contracts.
- Use `type` for unions, utility compositions, and template literals.

```ts
export interface SectionProps {
  title?: string;
  items?: SectionItem[];
}

export type ButtonVariant = "filled" | "outlined" | "ghost";
```

## Rule T2: Type constants from props/contracts

- Keep constants linked to contracts with `Pick`, `Omit`, and `NonNullable`.

```ts
export const servicesSectionMeta: Pick<
  SectionProps,
  "title" | "description"
> = {
  title: "Services",
};

export const serviceItems: NonNullable<SectionProps["items"]> = [];
```

## Rule T3: Use indexed access types for mapper signatures

- Prefer `NonNullable<Props["items"]>[number]` to duplicate item declarations.

```ts
const itemMapper = (item: NonNullable<SectionProps["items"]>[number]) => {
  return item.title;
};
```

## Rule T4: Keep icon typing explicit

- Use strong icon component contracts from the host UI stack.
- Avoid `any` for icon values.

## Rule T5: Keep polymorphic primitives type-safe

- If a primitive can render as link or button, use discriminated unions.
- Avoid loose props that bypass contract checks.

## Rule T6: Prefer narrow utility types over broad `any`

- Use `Record`, mapped types, template literal types, and conditional types where they improve correctness.
- Reach for `unknown` before `any` when values are truly dynamic.

## Rule T7: Isolate generated code

- Treat generated artifacts as read-only.
- Do not use generated files as style baseline for authored code.

## Rule T8: `as any` is a last-resort escape hatch

- Allow only at known polymorphic edges where no better type can represent behavior.
- Keep casts local and documented.

## Rule T9: Keep strictness compatible with host config

- Write code that passes the host repository's strict TypeScript baseline.
- Do not relax strict settings unless explicitly requested.
