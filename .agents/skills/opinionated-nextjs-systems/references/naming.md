# Naming Rules

## Rule N1: File and folder naming

- Use kebab-case for multi-word files and folders.
- Keep canonical module files exact: `index.tsx`, `types.ts`, `constants.ts`, `styles.ts`.

## Rule N2: Component and contract symbols use PascalCase

- Components: `ServicesSection`, `HeroSection`, `ContactForm`.
- Contracts: `...Props`, `...Item`, `...Config`.

```ts
export interface ContactFormProps {
  submitText: string;
}

const ContactForm = ({ submitText }: ContactFormProps) => {
  return <form>{submitText}</form>;
};
```

## Rule N3: Mapper helper naming uses `...Mapper`

- Name list callbacks with `Mapper` suffix.
- Keep mapper outside render body unless closure is required.
- Use `useCallback` only when mapper depends on local state/props.

```tsx
const testimonialMapper = (item: TestimonialItem) => {
  return <article key={item.name}>{item.quote}</article>;
};
```

## Rule N4: Icon prop naming pattern

- Use `icon` in data/contracts.
- Rename in mapper destructuring to `Icon`.

```tsx
const pointMapper = ({ icon: Icon, title }: PointItem) => {
  return <Icon aria-label={title} />;
};
```

## Rule N5: Styling-only props use `$` prefix

- Prefix transient style props with `$`.
- Pair with `shouldForwardProp` or host equivalent.

```ts
type CardProps = {
  $active: boolean;
};
```

## Rule N6: Class selectors are descriptive kebab-case

- Prefer names like `service-card`, `card-icon`, `form-actions`, `section-grid`.

## Rule N7: Constants naming is intent-oriented camelCase

- Prefer suffixes by purpose:
  - `...Meta`
  - `...Items`
  - `...Props`
  - `...SectionMeta`

```ts
export const servicesSectionMeta = {
  title: "Services",
};

export const serviceItems = [];
```

## Rule N8: Import path style follows host conventions

- Use host aliases if configured.
- If aliases are absent, use clear relative imports.
- Do not introduce new alias schemes mid-feature unless requested.
