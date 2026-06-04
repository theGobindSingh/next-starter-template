import type { ColorToken, ConfigStep, FeatureItem } from "./types";

export const COLOR_TOKENS: ColorToken[] = [
  {
    label: "Canvas",
    varName: "grey-100",
    hex: "#0f0f12",
    cssVar: "--color-grey-100",
    group: "neutral",
  },
  {
    label: "Surface",
    varName: "surface-200",
    hex: "#1b1a18",
    cssVar: "--color-surface-200",
    group: "neutral",
  },
  {
    label: "Text",
    varName: "text-800",
    hex: "#2a2725",
    cssVar: "--color-text-800",
    group: "neutral",
  },
  {
    label: "Elevated",
    varName: "grey-50",
    hex: "#252220",
    cssVar: "--color-grey-50",
    group: "neutral",
  },
  {
    label: "Border",
    varName: "grey-300",
    hex: "#3a3532",
    cssVar: "--color-grey-300",
    group: "neutral",
  },
  {
    label: "Ink",
    varName: "grey-900",
    hex: "#e0d8d0",
    cssVar: "--color-grey-900",
    group: "neutral",
  },
  {
    label: "Muted",
    varName: "grey-500",
    hex: "#88827c",
    cssVar: "--color-grey-500",
    group: "neutral",
  },
  {
    label: "Accent",
    varName: "accent-400",
    hex: "#fbbf24",
    cssVar: "--color-accent-400",
    group: "accent",
  },
  {
    label: "Signal Blue",
    varName: "primary",
    hex: "#3b82f6",
    cssVar: "--color-primary-500",
    group: "primary",
  },
  {
    label: "Signal Blue Deep",
    varName: "primary-deep",
    hex: "#1d4ed8",
    cssVar: "--color-primary-700",
    group: "primary",
  },
  {
    label: "Signal Blue Muted",
    varName: "primary-muted",
    hex: "#dbeafe",
    cssVar: "--color-primary-100",
    group: "primary",
  },
  {
    label: "Orchid Violet",
    varName: "secondary",
    hex: "#8b5cf6",
    cssVar: "--color-secondary-500",
    group: "secondary",
  },
  {
    label: "Orchid Deep",
    varName: "secondary-deep",
    hex: "#6d28d9",
    cssVar: "--color-secondary-700",
    group: "secondary",
  },
  {
    label: "Orchid Muted",
    varName: "secondary-muted",
    hex: "#ede9fe",
    cssVar: "--color-secondary-100",
    group: "secondary",
  },
  {
    label: "Warm Amber",
    varName: "accent",
    hex: "#f59e0b",
    cssVar: "--color-accent-500",
    group: "accent",
  },
  {
    label: "Amber Deep",
    varName: "accent-deep",
    hex: "#b45309",
    cssVar: "--color-accent-700",
    group: "accent",
  },
  {
    label: "Amber Muted",
    varName: "accent-muted",
    hex: "#fef3c7",
    cssVar: "--color-accent-100",
    group: "accent",
  },
  {
    label: "Viridian",
    varName: "success",
    hex: "#10b981",
    cssVar: "--color-success-500",
    group: "semantic",
  },
  {
    label: "Ember",
    varName: "caution",
    hex: "#f97316",
    cssVar: "--color-caution-500",
    group: "semantic",
  },
  {
    label: "Sky",
    varName: "info",
    hex: "#0ea5e9",
    cssVar: "--color-info-500",
    group: "semantic",
  },
  {
    label: "Coral",
    varName: "error",
    hex: "#ef4444",
    cssVar: "--color-error-500",
    group: "semantic",
  },
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Next.js 16 + React 19",
    description:
      "Latest App Router with server components, streaming, and React 19 concurrency features.",
    icon: "N",
  },
  {
    title: "TypeScript Strict",
    description:
      "@tsconfig/strictest presets enforce type safety across your entire codebase.",
    icon: "TS",
  },
  {
    title: "Tailwind v4",
    description:
      "Utility-first CSS with the new @theme directive, CSS-only configuration, and modern features.",
    icon: "TW",
  },
  {
    title: "Opinionated ESLint",
    description:
      "@kami-ui/eslint-config with typed linting, Prettier integration, and Next.js presets.",
    icon: "EL",
  },
  {
    title: "Agent Skills",
    description:
      "Curated AI coding skills — impeccable, ui-ux-pro-max, mem, and more — ready out of the box.",
    icon: "AI",
  },
  {
    title: "Design System Ready",
    description:
      "docs/PRODUCT.md + docs/DESIGN.md with full token set. Swap values to rebrand the entire system.",
    icon: "DS",
  },
];

export const CONFIG_STEPS: ConfigStep[] = [
  {
    title: "Product Identity",
    file: "docs/PRODUCT.md",
    description: "Define who this is for and how it should feel.",
    items: [
      "Register: brand or product?",
      "Users, purpose, brand personality",
      "Anti-references to avoid",
      "Accessibility target level",
    ],
  },
  {
    title: "Visual Tokens",
    file: "docs/DESIGN.md + globals.css",
    description: "Swap every color, font, and spacing value.",
    items: [
      "Replace color hex values and OKLCH values",
      "Swap Poppins / Inter / DM Mono for your brand fonts",
      "Adjust radii, shadows, motion tokens",
      "Update @theme block in globals.css",
    ],
  },
  {
    title: "Agent Configuration",
    file: "AGENTS.md",
    description: "Tell AI assistants how to work in your project.",
    items: [
      "Update product/domain context",
      "Add testing commands when configured",
      "Document deployment workflow",
      "Set security/compliance rules",
    ],
  },
  {
    title: "Project Metadata",
    file: "package.json + layout.tsx",
    description: "Rename and describe your project.",
    items: [
      "name and description in package.json",
      "metadata.title and metadata.description in layout.tsx",
      "Favicon and Open Graph images",
      "images.remotePatterns in next.config.js",
    ],
  },
  {
    title: "Design System Docs",
    file: "docs/DESIGN.md",
    description: "Refine the visual spec to match your brand.",
    items: [
      "Creative North Star metaphor",
      "Named color descriptions",
      "Component variant specs",
      "Do's and Don'ts guardrails",
    ],
  },
  {
    title: "Live Mode (Optional)",
    file: ".impeccable/live/config.json",
    description: "Configure in-browser visual iteration.",
    items: [
      "Verify framework detection",
      "Run $impeccable live to test",
      "Configure CSP if needed",
      "Start iterating in the browser",
    ],
  },
];
