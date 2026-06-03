import {
  FIXED_COLOR_HUES,
  generateGreyHslBaseScale,
  generateHslBaseScale,
  generatePalette,
  SHADE_NUMBERS,
  type Palette,
} from "@/lib/color-palette";
import type { WizardState } from "../types";

const COLOR_FAMILIES = [
  "primary",
  "secondary",
  "accent",
  "success",
  "caution",
  "info",
  "error",
] as const;

// const SEMANTIC_ALIASES: { alias: string; shade: number }[] = [
//   { alias: "primary", shade: 500 },
//   { alias: "primary-deep", shade: 700 },
//   { alias: "primary-muted", shade: 100 },
//   { alias: "secondary", shade: 500 },
//   { alias: "secondary-deep", shade: 700 },
//   { alias: "secondary-muted", shade: 100 },
//   { alias: "accent", shade: 500 },
//   { alias: "accent-deep", shade: 700 },
//   { alias: "accent-muted", shade: 100 },
//   { alias: "success", shade: 500 },
//   { alias: "caution", shade: 500 },
//   { alias: "info", shade: 500 },
//   { alias: "error", shade: 500 },
// ];

export const generateColorCSS = (state: WizardState): string => {
  const palette = generatePalette(state.primaryColor, state.secondaryColor);
  const effectiveColors = { ...palette };
  for (const [key, hex] of Object.entries(state.overriddenColors)) {
    effectiveColors[key as keyof Palette] = hex;
  }

  const greyScale = generateGreyHslBaseScale();

  const familyScales: Record<string, Record<number, string>> = {};
  for (const family of COLOR_FAMILIES) {
    const hex = effectiveColors[family];
    const fixedHue = FIXED_COLOR_HUES[family];
    const hue = fixedHue && fixedHue >= 0 ? fixedHue : undefined;
    familyScales[family] = generateHslBaseScale(hex, hue);
  }

  const primaryScale = familyScales.primary!;
  const lines: string[] = [];

  lines.push(`@import "tailwindcss";\n`);
  lines.push(":root,");
  lines.push(".light {");
  lines.push("  --color-black: #000000;");
  lines.push("  --color-white: #ffffff;");
  lines.push("");
  lines.push(
    `  --shadow-hsl: ${primaryScale[400]!.split(",")[0]!.trim()} 100% 70%;`,
  );
  lines.push("");

  for (const shade of SHADE_NUMBERS) {
    lines.push(`  --color-grey-${shade}-base: ${greyScale[shade]};`);
    lines.push(
      `  --color-grey-${shade}: hsl(var(--color-grey-${shade}-base));`,
    );
  }
  lines.push("");

  for (const family of COLOR_FAMILIES) {
    const scale = familyScales[family]!;
    for (const shade of SHADE_NUMBERS) {
      lines.push(`  --color-${family}-${shade}-base: ${scale[shade]!};`);
      lines.push(
        `  --color-${family}-${shade}: hsl(var(--color-${family}-${shade}-base));`,
      );
    }
    lines.push("");
  }

  lines.push("  --fs-4xs: 0.75rem;");
  lines.push("  --fs-3xs: 0.875rem;");
  lines.push("  --fs-2xs: 1rem;");
  lines.push("  --fs-1xs: 1.125rem;");
  lines.push("  --fs-s: 1.25rem;");
  lines.push("  --fs-m: 1.5rem;");
  lines.push("  --fs-l: 1.875rem;");
  lines.push("  --fs-1xl: 2.25rem;");
  lines.push("  --fs-2xl: 2.75rem;");
  lines.push("  --fs-3xl: 3.25rem;");
  lines.push("  --fs-4xl: 3.75rem;");
  lines.push("}");
  lines.push("");

  lines.push(".dark {");
  lines.push("  --color-white: #000000;");
  lines.push("  --color-black: #ffffff;");
  lines.push("");
  lines.push(
    `  --shadow-hsl: ${primaryScale[400]!.split(",")[0]!.trim()} 100% 56%;`,
  );
  lines.push("");

  const reversed = [...SHADE_NUMBERS].reverse();
  for (const shade of reversed) {
    const mappedShade = SHADE_NUMBERS[reversed.indexOf(shade)] ?? shade;
    lines.push(`  --color-grey-${shade}-base: ${greyScale[mappedShade]};`);
    lines.push(
      `  --color-grey-${shade}: hsl(var(--color-grey-${shade}-base));`,
    );
  }
  lines.push("");

  for (const family of COLOR_FAMILIES) {
    const scale = familyScales[family]!;
    for (const shade of reversed) {
      const mappedShade = SHADE_NUMBERS[reversed.indexOf(shade)] ?? shade;
      lines.push(`  --color-${family}-${shade}-base: ${scale[mappedShade]!};`);
      lines.push(
        `  --color-${family}-${shade}: hsl(var(--color-${family}-${shade}-base));`,
      );
    }
    lines.push("");
  }

  lines.push("  --fs-4xs: 0.75rem;");
  lines.push("  --fs-3xs: 0.875rem;");
  lines.push("  --fs-2xs: 1rem;");
  lines.push("  --fs-1xs: 1.125rem;");
  lines.push("  --fs-s: 1.25rem;");
  lines.push("  --fs-m: 1.5rem;");
  lines.push("  --fs-l: 1.875rem;");
  lines.push("  --fs-1xl: 2.25rem;");
  lines.push("  --fs-2xl: 2.75rem;");
  lines.push("  --fs-3xl: 3.25rem;");
  lines.push("  --fs-4xl: 3.75rem;");
  lines.push("}");
  lines.push("");

  lines.push("@media (max-width: 1024px) {");
  lines.push("  :root {");
  lines.push("    --fs-4xs: 0.6875rem;");
  lines.push("    --fs-3xs: 0.75rem;");
  lines.push("    --fs-2xs: 0.875rem;");
  lines.push("    --fs-1xs: 1rem;");
  lines.push("    --fs-s: 1.125rem;");
  lines.push("    --fs-m: 1.25rem;");
  lines.push("    --fs-l: 1.5rem;");
  lines.push("    --fs-1xl: 1.875rem;");
  lines.push("    --fs-2xl: 2.25rem;");
  lines.push("    --fs-3xl: 2.75rem;");
  lines.push("    --fs-4xl: 3.25rem;");
  lines.push("  }");
  lines.push("}");

  lines.push(`
@theme {
  --font-sans: var(--font-poppins);
  --font-serif: var(--font-inter);
  --font-mono: var(--font-dm-mono);

  --color-grey-50: var(--color-grey-50);
  --color-grey-100: var(--color-grey-100);
  --color-grey-200: var(--color-grey-200);
  --color-grey-300: var(--color-grey-300);
  --color-grey-400: var(--color-grey-400);
  --color-grey-500: var(--color-grey-500);
  --color-grey-600: var(--color-grey-600);
  --color-grey-700: var(--color-grey-700);
  --color-grey-800: var(--color-grey-800);
  --color-grey-900: var(--color-grey-900);
  --color-grey-950: var(--color-grey-950);

  --color-primary-50: var(--color-primary-50);
  --color-primary-100: var(--color-primary-100);
  --color-primary-200: var(--color-primary-200);
  --color-primary-300: var(--color-primary-300);
  --color-primary-400: var(--color-primary-400);
  --color-primary-500: var(--color-primary-500);
  --color-primary-600: var(--color-primary-600);
  --color-primary-700: var(--color-primary-700);
  --color-primary-800: var(--color-primary-800);
  --color-primary-900: var(--color-primary-900);
  --color-primary-950: var(--color-primary-950);
  --color-primary: var(--color-primary-500);
  --color-primary-deep: var(--color-primary-700);
  --color-primary-muted: var(--color-primary-100);

  --color-secondary-50: var(--color-secondary-50);
  --color-secondary-100: var(--color-secondary-100);
  --color-secondary-200: var(--color-secondary-200);
  --color-secondary-300: var(--color-secondary-300);
  --color-secondary-400: var(--color-secondary-400);
  --color-secondary-500: var(--color-secondary-500);
  --color-secondary-600: var(--color-secondary-600);
  --color-secondary-700: var(--color-secondary-700);
  --color-secondary-800: var(--color-secondary-800);
  --color-secondary-900: var(--color-secondary-900);
  --color-secondary-950: var(--color-secondary-950);
  --color-secondary: var(--color-secondary-500);
  --color-secondary-deep: var(--color-secondary-700);
  --color-secondary-muted: var(--color-secondary-100);

  --color-accent-50: var(--color-accent-50);
  --color-accent-100: var(--color-accent-100);
  --color-accent-200: var(--color-accent-200);
  --color-accent-300: var(--color-accent-300);
  --color-accent-400: var(--color-accent-400);
  --color-accent-500: var(--color-accent-500);
  --color-accent-600: var(--color-accent-600);
  --color-accent-700: var(--color-accent-700);
  --color-accent-800: var(--color-accent-800);
  --color-accent-900: var(--color-accent-900);
  --color-accent-950: var(--color-accent-950);
  --color-accent: var(--color-accent-500);
  --color-accent-deep: var(--color-accent-700);
  --color-accent-muted: var(--color-accent-100);

  --color-success-50: var(--color-success-50);
  --color-success-100: var(--color-success-100);
  --color-success-200: var(--color-success-200);
  --color-success-300: var(--color-success-300);
  --color-success-400: var(--color-success-400);
  --color-success-500: var(--color-success-500);
  --color-success-600: var(--color-success-600);
  --color-success-700: var(--color-success-700);
  --color-success-800: var(--color-success-800);
  --color-success-900: var(--color-success-900);
  --color-success-950: var(--color-success-950);
  --color-success: var(--color-success-500);
  --color-success-deep: var(--color-success-700);
  --color-success-muted: var(--color-success-100);

  --color-caution-50: var(--color-caution-50);
  --color-caution-100: var(--color-caution-100);
  --color-caution-200: var(--color-caution-200);
  --color-caution-300: var(--color-caution-300);
  --color-caution-400: var(--color-caution-400);
  --color-caution-500: var(--color-caution-500);
  --color-caution-600: var(--color-caution-600);
  --color-caution-700: var(--color-caution-700);
  --color-caution-800: var(--color-caution-800);
  --color-caution-900: var(--color-caution-900);
  --color-caution-950: var(--color-caution-950);
  --color-caution: var(--color-caution-500);
  --color-caution-deep: var(--color-caution-700);
  --color-caution-muted: var(--color-caution-100);

  --color-info-50: var(--color-info-50);
  --color-info-100: var(--color-info-100);
  --color-info-200: var(--color-info-200);
  --color-info-300: var(--color-info-300);
  --color-info-400: var(--color-info-400);
  --color-info-500: var(--color-info-500);
  --color-info-600: var(--color-info-600);
  --color-info-700: var(--color-info-700);
  --color-info-800: var(--color-info-800);
  --color-info-900: var(--color-info-900);
  --color-info-950: var(--color-info-950);
  --color-info: var(--color-info-500);
  --color-info-deep: var(--color-info-700);
  --color-info-muted: var(--color-info-100);

  --color-error-50: var(--color-error-50);
  --color-error-100: var(--color-error-100);
  --color-error-200: var(--color-error-200);
  --color-error-300: var(--color-error-300);
  --color-error-400: var(--color-error-400);
  --color-error-500: var(--color-error-500);
  --color-error-600: var(--color-error-600);
  --color-error-700: var(--color-error-700);
  --color-error-800: var(--color-error-800);
  --color-error-900: var(--color-error-900);
  --color-error-950: var(--color-error-950);
  --color-error: var(--color-error-500);
  --color-error-deep: var(--color-error-700);
  --color-error-muted: var(--color-error-100);


  --text-headline: var(--fs-1xl);
  --text-title: var(--fs-m);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

html {
  color-scheme: light;
}

html.dark {
  color-scheme: dark;
}

body {
  background-color: var(--color-grey-50);
  color: var(--color-grey-900);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.65;
  position: relative;
}

a {
  text-decoration: none;
}

/* ─── Noise Grain ─── */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

html.dark body::before {
  opacity: 0.05;
}

/* ─── Desktop Scrollbar ─── */
@media (hover: hover) and (pointer: fine) {
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-500);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-grey-300) transparent;
  }
}

/* ─── Shared Ambient Glow Layer ─── */
.glow-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.glow-hero {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 45%;
  background:
    radial-gradient(
      ellipse 800px 500px at 70% 80%,
      var(--color-accent-400) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 500px 600px at 20% 20%,
      var(--color-secondary) 0%,
      transparent 65%
    );
  opacity: 0.12;
  animation: glow-drift-hero 25s ease-in-out infinite;
}

.glow-features {
  position: absolute;
  top: 30%;
  left: -10%;
  width: 60%;
  height: 35%;
  background: radial-gradient(
    ellipse 500px 500px at 30% 50%,
    var(--color-secondary) 0%,
    transparent 70%
  );
  opacity: 0.08;
  animation: glow-drift-features 30s ease-in-out infinite;
}

.glow-start {
  position: absolute;
  bottom: 5%;
  left: 15%;
  width: 70%;
  height: 25%;
  background: radial-gradient(
    ellipse 600px 400px at 50% 30%,
    var(--color-accent-400) 0%,
    transparent 70%
  );
  opacity: 0.06;
  animation: glow-drift-start 20s ease-in-out infinite;
}

@keyframes glow-drift-hero {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(2%, -1.5%);
  }
  50% {
    transform: translate(-1%, 1.5%);
  }
  75% {
    transform: translate(-1.5%, -1%);
  }
}

@keyframes glow-drift-features {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-2.5%, 1.5%) scale(1.05);
  }
  66% {
    transform: translate(1.5%, -1%) scale(0.95);
  }
}

@keyframes glow-drift-start {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(1.5%, 2%) scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow-hero,
  .glow-features,
  .glow-start {
    animation: none;
  }
}

.surface-bg {
  position: relative;
  background-color: var(--color-grey-100);
}

.surface-bg::before,
.surface-bg::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 4rem;
  pointer-events: none;
}

.surface-bg::before {
  top: -4rem;
  background: linear-gradient(to bottom, transparent, var(--color-grey-100));
}

.surface-bg::after {
  bottom: -4rem;
  background: linear-gradient(to top, transparent, var(--color-grey-100));
}

/* ─── Ornamental Divider ─── */
.ornamental-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 4rem 0;
}

.ornamental-divider .line {
  height: 1px;
  flex: 0 1 clamp(4rem, 15vw, 8rem);
  background-color: var(--color-grey-300);
}

.ornamental-divider .diamond {
  color: var(--color-accent-400);
  font-size: 0.5rem;
  line-height: 1;
  flex-shrink: 0;
}
    `);

  return lines.join("\n");
};

interface CSSElement {
  key: string;
  className: string;
  text: string;
  prop?: string;
  val?: string;
}

export const generateCSSElements = (css: string): CSSElement[] => {
  const lines = css.split("\n");
  const elements: CSSElement[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const key = `css-line-${i}`;
    if (line.startsWith(":root") || line.startsWith(".light")) {
      elements.push({
        key,
        className: "block text-primary font-bold text-sm mb-1",
        text: line,
      });
    } else if (
      line.startsWith(".dark") ||
      line.startsWith("@theme") ||
      line.startsWith("@media")
    ) {
      elements.push({
        key,
        className: "block text-accent font-bold text-sm mb-1",
        text: line,
      });
    } else if (line.trim().startsWith("--")) {
      const colonIdx = line.indexOf(":");
      const prop = line.slice(0, colonIdx + 1);
      const val = line.slice(colonIdx + 1);
      elements.push({
        key,
        className: "block",
        text: "",
        prop,
        val,
      });
    } else if (line.trim() === "}" || line.trim() === "{") {
      elements.push({
        key,
        className: "block text-grey-500/60",
        text: line,
      });
    } else if (line.trim() === "") {
      elements.push({
        key,
        className: "block",
        text: "\u00A0",
      });
    } else {
      elements.push({
        key,
        className: "block text-grey-500",
        text: line,
      });
    }
  }
  return elements;
};
