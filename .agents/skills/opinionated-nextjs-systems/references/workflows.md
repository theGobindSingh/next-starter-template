# Execution Playbooks

## Playbook W1: Create a New Module Route

### Steps (W1)

1. Create `modules/<name>/` files:
   - `index.tsx`
   - `styles.ts`
   - `types.ts`
   - `constants.ts`
   - section files (`<section>.tsx`)
2. Place static arrays/config in `constants.ts`, typed from `types.ts`.
3. Implement section components with shared wrappers and style patterns.
4. Keep module `index.tsx` composition-only.
5. Add route file that imports module root only.

### Done when (W1)

- No static data in module `index.tsx`.
- Route page has no unrelated business logic.
- Layering remains consistent.

## Playbook W2: Add a Standard Section to Existing Module

### Steps (W2)

1. Extend section prop types in `types.ts`.
2. Add section content/config in `constants.ts`.
3. Build section component with the standard section wrapper.
4. Add styles in module `styles.ts`.
5. Wire section into module composition order.

### Done when (W2)

- Section layout matches module rhythm.
- Mapper functions are extracted and typed.
- CTA hierarchy is preserved.

## Playbook W3: Card Interactions (Desktop hover + Phone active)

### Steps (W3)

1. Define reusable hover block in `styles.ts` via `css`.
2. Apply hover block to desktop/tablet `:hover`.
3. Add `.active` selector for phone parity.
4. Use IntersectionObserver in component logic to toggle `.active`.
5. Clean up observer on unmount.

### Done when (W3)

- Desktop hover works.
- Phone active state mirrors hover intent.
- No leaked observers.

## Playbook W4: Wire a Lead/Contact Form

### Steps (W4)

1. Add field + mapping config to module `constants.ts`.
2. Build form with `formRef` + memoized submit params.
3. Create submit handler from submit adapter hook.
4. Add config guard if IDs/endpoints can be unset.
5. Reset form and show success feedback on successful submit.

### Done when (W4)

- Required fields use browser validation.
- Success/pending-config feedback is clear.
- No duplicated hardcoded schema in JSX.

## Playbook W5: Route-Level Static Data Assets

### Steps (W5)

1. Add/update static assets under the route's expected asset directory.
2. Filter files by supported extension set.
3. Build/refresh route-level static data mapping.
4. Verify categories map to safe render structures.

### Done when (W5)

- Assets appear in the intended route.
- Unknown/empty categories fail safely.

## Playbook W6: Final Validation Before Handoff

### Steps (W6)

1. Run host lint command.
2. Run host build/typecheck command.
3. Run targeted tests if available.
4. Manual QA for changed routes/sections on desktop and phone.

### Done when (W6)

- Validation commands pass or failures are clearly reported.
- No new violations of canonical style intent.
- Handoff includes applied rules and residual risk.
