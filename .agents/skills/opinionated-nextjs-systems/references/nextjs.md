# React / Next.js Rules

## Rule X1: Detect router mode before generating structure

- If host repo uses Pages Router, follow `pages/*` patterns.
- If host repo uses App Router, adapt the same architectural intent to `app/*`.
- Do not mix router paradigms in one feature unless requested.

## Rule X2: Keep route files thin

- Route files should import module roots and connect route-level data methods only when needed.
- Business logic belongs in modules, hooks, or helpers.

```tsx
import ContactModule from "../modules/contact";

const ContactPage = () => {
  return <ContactModule />;
};

export default ContactPage;
```

## Rule X3: Centralize global app composition

- Place top-level providers and global wrappers in the project's app entry points.
- Do not recreate providers in feature modules.

## Rule X4: Keep navigation side-effects centralized

- Route transition behaviors (scroll restore, analytics events, global progress indicators) should live in app shell code.

## Rule X5: Centralize metadata strategy

- Keep title/description/OG logic in one reusable metadata layer.
- Avoid ad-hoc metadata duplication across routes.

## Rule X6: Use framework-native image optimization

- In Next.js, prefer `next/image` over raw `img` for content images.
- Keep accessibility labels and size behavior explicit.

## Rule X7: Keep shell responsibilities in layout primitives

- Global layout primitives should own persistent frame elements such as header/footer/nav containers.
- Feature modules should focus on route-specific content.

## Rule X8: Respect host build/deploy mode

- Keep generated paths, static assets, and routing behavior compatible with the host deployment target.

## Rule X9: Prefer compatibility over ideology

- If host code already follows a stable Next.js pattern, match it.
- Apply this skill's structure without breaking existing runtime behavior.
