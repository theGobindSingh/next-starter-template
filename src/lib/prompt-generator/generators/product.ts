import type { WizardState } from "@components/config-wizard/types";

const DEFAULT_ACCESSIBILITY_LEVEL = "AA";

const generateProductMD = (state: WizardState): string => {
  const parts: string[] = ["# Product"];

  if (state.brandName) {
    const taglineLine = state.tagline ? `\n> ${state.tagline}` : "";
    parts.push(`\n## Register\n\n${state.brandName}${taglineLine}`);
  }

  if (state.targetUsers) {
    parts.push(`\n## Users\n\n${state.targetUsers}`);
  }

  if (state.productDescription) {
    parts.push(`\n## Product Purpose\n\n${state.productDescription}`);
  }

  if (state.brandPersonality) {
    parts.push(`\n## Brand Personality\n\n${state.brandPersonality}`);
  }

  if (state.antiReferences) {
    parts.push(`\n## Anti-references\n\n${state.antiReferences}`);
  }

  if (state.accessibilityLevel !== DEFAULT_ACCESSIBILITY_LEVEL) {
    parts.push(
      `\n## Design Principles\n\n1. **Accessibility is not optional** — WCAG 2.1 ${state.accessibilityLevel} is the floor.\n\n## Accessibility & Inclusion\n\n**Target**: WCAG 2.1 ${state.accessibilityLevel} minimum\n- Body text contrast ≥ 4.5:1; large text (≥18px / bold ≥14px) ≥ 3:1\n- All interactive elements keyboard-focusable with visible focus rings\n- prefers-reduced-motion respected on every animation\n- Semantic HTML structure (headings in order, landmark elements, proper alt text)\n- Color not used as sole indicator for state or meaning\n- Screen reader support: ARIA labels where native semantics are insufficient`,
    );
  }

  return parts.join("\n");
};

export { generateProductMD };
