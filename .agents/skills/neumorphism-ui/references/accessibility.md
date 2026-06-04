# Accessibility Framework for Neumorphic Interfaces

Neumorphism introduces specific, systematic accessibility risks. This framework addresses
each risk with principles and decision logic, not workarounds.

---

## Why Neumorphism and Accessibility Are in Natural Tension

The visual language of neumorphism depends on *minimal contrast* — the whole aesthetic
collapses if shadows are too dark or too light. But accessibility requirements demand
*minimum contrast* for interactive components. These are in direct opposition.

The resolution: **Accept that pure neumorphism and full accessibility cannot coexist
without deliberate compensatory design.** Neumorphism in production requires active
accessibility engineering, not default shadow values.

---

## WCAG Compliance Requirements

### Non-text contrast (WCAG 1.4.11 — Level AA)
Requirement: UI components (interactive elements) must have a 3:1 contrast ratio between
the element's boundary and the adjacent background.

Neumorphic risk: Elements have NO conventional boundary. Their "boundary" is defined
entirely by shadows, which typically fail 3:1.

Resolution strategies (apply at least one):
1. **Shadow differential correction** — Increase the dark shadow darkness until the
   perimeter of the element achieves 3:1 against the background. This may compromise
   the "soft" aesthetic but ensures compliance.
2. **Thin border** — Add a 1px border to interactive components at a color that achieves
   3:1 against the background. The border can be subtle but must be measurable.
3. **Color fill compensation** — Use a background color for the element that differs from
   the parent enough to achieve 3:1. This effectively breaks the material rule for that
   specific element in service of accessibility.

**Which strategy to use:**
- Decorative, non-interactive elements → No WCAG requirement applies; pure neu acceptable
- Interactive elements where the brand demands the softest possible look → thin border
- Interactive elements that benefit from color anyway (toggles, active states) → color fill
- Interactive elements where the soft look is paramount → shadow differential correction

### Text contrast (WCAG 1.4.3 — Level AA)
Requirement: Text must achieve 4.5:1 against its background (normal text) or 3:1 (large text).

Neumorphic risk: Text sits on a near-background-colored element. Since element color ≈
background color, text contrast is roughly the same as if it were on the background
directly. This is actually manageable — measure text against the element color, not the background.

If the element color equals the background, measure text against the background.

---

## Focus Visibility

### The problem
CSS `box-shadow` stacks. When a neumorphic element has outer box-shadows, a default browser
focus outline (itself a box-shadow in some browsers) may be buried under the existing shadows
or may visually disappear against the soft surface.

### Solution principles
1. Always implement custom `:focus-visible` styles — never rely on browser defaults
2. The focus indicator must be *outside* the element's box-shadow stacking context
   (use `outline` with `outline-offset`, not an additional inner `box-shadow`)
3. The focus ring must achieve 3:1 contrast against the surface it overlaps
4. The focus ring must be perceivable in size — a 2–3px ring with adequate offset

### Focus ring strategy
Two valid approaches:
- **Outline approach**: Use `outline` property with `outline-offset` to push the ring
  outside the shadow. This creates a visible ring that is not affected by box-shadow stacking.
- **Double-ring approach**: Add a visible outer glow on top of the existing shadows using
  a contrasting color (e.g., a brand accent). This is more visually integrated but requires
  more careful calibration.

The chosen approach must be consistent across all interactive elements in the system.

---

## Keyboard Navigation

### Tab order
Neumorphic styling has no effect on tab order. However, neumorphic designs often use
`div` elements with click handlers for custom components (toggles, cards). These must
be made keyboard-accessible:
- Add `tabindex="0"` to any non-native interactive element
- Add `onKeyDown` handler to support `Enter` and `Space` activation
- Ensure logical reading order matches visual order

### Invisible interactive elements
Pure neumorphic elements with no supplementary cues (color, border, label) may be
*invisible to keyboard users who rely on focus style alone*. A keyboard user tabbing
through a neumorphic form who sees no focus indicator is completely lost.

Rule: If you cannot see a focused neumorphic element in both light and dark mode without
relying on the shadow, the focus style is insufficient.

---

## Screen Reader Considerations

### Neumorphism communicates nothing to screen readers
All depth, shadow, and elevation information is visual-only. A screen reader user receives
zero information from neumorphic styling. This is fine — it means neumorphism is neutral
for screen readers when semantics are correct.

However, neumorphic design often encourages use of non-semantic elements for aesthetics.
Common mistakes that DO harm screen readers:

- A `div` styled as a button with no `role="button"` → not discoverable
- A toggle with no `aria-checked` → state invisible to screen readers
- A neumorphic "card" that's clickable but has no accessible name → announced as "group"
- Icon-only buttons with neumorphic styling and no `aria-label` → not usable

### Required ARIA attributes by component
- Buttons: `role="button"` if not a native `<button>` element
- Toggles: `role="switch"`, `aria-checked="true|false"`
- Checkboxes: `role="checkbox"`, `aria-checked="true|false|mixed"`
- Radio: `role="radio"`, `aria-checked`, within `role="radiogroup"`
- Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap
- Expandable panels: `aria-expanded`, `aria-controls`

---

## Color Blindness Considerations

Neumorphism is monochromatic by nature. This is both a risk and a mitigation:

**Risk:** If the only differentiator between states is a shadow change, *and* that shadow
is already low contrast, colorblind users may have even less distinguishable states than
standard users (because colorblindness reduces perceived contrast further).

**Mitigation:** Because neumorphism doesn't rely on color to encode information (it uses
shadows), colorblind users aren't disadvantaged *relative to the shadow itself* — everyone
sees the same low-contrast shadow. The real problem is the shadow is already insufficient
for everyone, not uniquely for colorblind users.

**What to test:** Simulate protanopia and deuteranopia on your neumorphic designs.
The question is not "does color still work?" but "do the supplementary cues (icons, labels,
borders) still communicate state when isolated from color?"

---

## Reduced Motion

Neumorphic designs often animate shadow transitions (raise/press, hover lifts).
These animations can cause motion sensitivity issues.

Implement:
```
@media (prefers-reduced-motion: reduce) {
  /* Disable all shadow transitions */
  * { transition: none !important; }
}
```

The element should still change state (raised → inset) — only the transition animation
is disabled. The end state shadow values are not affected.

---

## Accessibility Checklist (Production Gates)

Before shipping any neumorphic component, verify all of the following:

**Contrast:**
☐ Interactive element boundaries achieve 3:1 contrast (via shadow, border, or fill)
☐ All text within neumorphic elements meets 4.5:1 (normal) or 3:1 (large text)
☐ Focus indicator achieves 3:1 against surrounding surface

**Interaction states:**
☐ Hover state is distinguishable from default
☐ Active/pressed state has supplementary cue (not shadow only)
☐ Focus state is visible with custom `:focus-visible` implementation
☐ Disabled state is clearly distinct (flat, reduced opacity)
☐ Error state has semantic color or icon signal

**Keyboard:**
☐ All interactive elements reachable via Tab in logical order
☐ Enter and Space activate button-like elements
☐ Focus ring visible in both light and dark mode

**Screen reader:**
☐ Semantic HTML or ARIA role present on all interactive components
☐ Accessible names (label, aria-label, or aria-labelledby) on all controls
☐ All states reflected in ARIA attributes (aria-checked, aria-expanded, etc.)
☐ Decorative neumorphic elements use aria-hidden="true"

**Motion:**
☐ Shadow animations disabled when prefers-reduced-motion is set
☐ State changes still occur (only transitions disabled, not state itself)
