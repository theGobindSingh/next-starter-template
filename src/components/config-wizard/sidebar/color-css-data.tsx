import { type ReactNode } from "react";

export const ROOT_CSS = `:root {
  --color-black: #000000;
  --color-white: #ffffff;

  --color-canvas: #f5f0eb;
  --color-surface: #e8dfd5;
  --color-elevated: #faf6f2;
  --color-border: #d0c5b8;
  --color-ink: #2a2520;
  --color-muted: #6b5a4d;

  --color-gold: #c9a84c;
  --color-gold-deep: #b8943a;
  --color-bronze: #6b5a4d;
  --color-gold-muted: #f0e6c8;

  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;

  --color-secondary-100: #ede9fe;
  --color-secondary-200: #ddd6fe;
  --color-secondary-300: #c4b5fd;
  --color-secondary-400: #a78bfa;
  --color-secondary-500: #8b5cf6;
  --color-secondary-600: #7c3aed;
  --color-secondary-700: #6d28d9;
  --color-secondary-800: #5b21b6;

  --color-tertiary-100: #fce8e8;
  --color-tertiary-200: #f9d0d0;
  --color-tertiary-300: #f4a8a8;
  --color-tertiary-400: #e87a7a;
  --color-tertiary-500: #cd5c5c;
  --color-tertiary-600: #b94444;
  --color-tertiary-700: #a03030;
  --color-tertiary-800: #802020;

  --color-accent-100: #fef3c7;
  --color-accent-200: #fde68a;
  --color-accent-300: #fcd34d;
  --color-accent-400: #fbbf24;
  --color-accent-500: #f59e0b;
  --color-accent-600: #d97706;
  --color-accent-700: #b45309;
  --color-accent-800: #92400e;

  --color-success-100: #d1fae5;
  --color-success-200: #a7f3d0;
  --color-success-300: #6ee7b7;
  --color-success-400: #34d399;
  --color-success-500: #10b981;
  --color-success-600: #059669;
  --color-success-700: #047857;
  --color-success-800: #065f46;

  --color-caution-100: #ffedd5;
  --color-caution-200: #fed7aa;
  --color-caution-300: #fdba74;
  --color-caution-400: #fb923c;
  --color-caution-500: #f97316;
  --color-caution-600: #ea580c;
  --color-caution-700: #c2410c;
  --color-caution-800: #9a3412;

  --color-info-100: #e0f2fe;
  --color-info-200: #bae6fd;
  --color-info-300: #7dd3fc;
  --color-info-400: #38bdf8;
  --color-info-500: #0ea5e9;
  --color-info-600: #0284c7;
  --color-info-700: #0369a1;
  --color-info-800: #075985;

  --color-error-100: #fee2e2;
  --color-error-200: #fecaca;
  --color-error-300: #fca5a5;
  --color-error-400: #f87171;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
  --color-error-800: #991b1b;

  --fs-4xs: 0.75rem;
  --fs-3xs: 0.875rem;
  --fs-2xs: 1rem;
  --fs-1xs: 1.125rem;
  --fs-s: 1.25rem;
  --fs-m: 1.5rem;
  --fs-l: 1.875rem;
  --fs-1xl: 2.25rem;
  --fs-2xl: 2.75rem;
  --fs-3xl: 3.25rem;
  --fs-4xl: 3.75rem;
}`;

const CSS_LINES = ROOT_CSS.split("\n");

export const CSS_ELEMENTS: ReactNode[] = [];
let emptyIndex = 0;
for (const line of CSS_LINES) {
  const key = line.trim() ? line : `empty-${++emptyIndex}`;
  if (line.startsWith(":root")) {
    CSS_ELEMENTS.push(
      <span key={key} className="block text-gold font-bold text-sm mb-1">
        {line}
      </span>,
    );
  } else if (line.trim().startsWith("--")) {
    const [prop, val] = line.split(":");
    CSS_ELEMENTS.push(
      <span key={key} className="block">
        <span className="text-primary">{prop}:</span>
        <span className="text-caution">{val}</span>
      </span>,
    );
  } else if (line.trim() === "}" || line.trim() === "{") {
    CSS_ELEMENTS.push(
      <span key={key} className="block text-muted/60">
        {line}
      </span>,
    );
  } else if (line.trim() === "") {
    CSS_ELEMENTS.push(
      <span key={key} className="block">
        &nbsp;
      </span>,
    );
  } else {
    CSS_ELEMENTS.push(
      <span key={key} className="block text-muted">
        {line}
      </span>,
    );
  }
}
