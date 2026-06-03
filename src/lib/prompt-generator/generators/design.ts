import {
  generateGreyHslBaseScale,
  generateHslBaseScale,
  generatePalette,
  type Palette,
} from "@/lib/color-palette";
import {
  DEFAULT_STATE,
  NORTH_STAR_INFO,
} from "@components/config-wizard/constants";
import type { WizardState } from "@components/config-wizard/types";

const COLOR_ENTRIES = [
  "grey-50",
  "grey-100",
  "grey-200",
  "grey-300",
  "grey-400",
  "grey-500",
  "grey-600",
  "grey-700",
  "grey-800",
  "grey-900",
  "grey-950",
  "primary-500",
  "primary-700",
  "primary-100",
  "secondary-500",
  "secondary-700",
  "secondary-100",
  "accent-500",
  "accent-700",
  "accent-100",
  "success-500",
  "caution-500",
  "info-500",
  "error-500",
  "black",
  "white",
] as const;

const generateDesignMD = (state: WizardState): string => {
  const frontMatter: string[] = [];
  const body: string[] = ["# Design System"];

  frontMatter.push("---");
  if (state.brandName) {
    frontMatter.push(`name: ${state.brandName}`);
  }
  if (state.productDescription) {
    frontMatter.push(`description: ${state.productDescription}`);
  }

  const palette = generatePalette(state.primaryColor, state.secondaryColor);
  const effectiveColors = { ...palette };
  for (const [key, hex] of Object.entries(state.overriddenColors)) {
    effectiveColors[key as keyof Palette] = hex;
  }

  const greyScale = generateGreyHslBaseScale();
  const primaryScale = generateHslBaseScale(effectiveColors.primary);
  const secondaryScale = generateHslBaseScale(effectiveColors.secondary);
  const accentScale = generateHslBaseScale(effectiveColors.accent, 45);
  const successScale = generateHslBaseScale(effectiveColors.success, 145, 63);
  const cautionScale = generateHslBaseScale(effectiveColors.caution, 30);
  const infoScale = generateHslBaseScale(effectiveColors.info, 200);
  const errorScale = generateHslBaseScale(effectiveColors.error, 0);

  const colorMap: Record<string, string | undefined> = {
    "grey-50": greyScale[50],
    "grey-100": greyScale[100],
    "grey-200": greyScale[200],
    "grey-300": greyScale[300],
    "grey-400": greyScale[400],
    "grey-500": greyScale[500],
    "grey-600": greyScale[600],
    "grey-700": greyScale[700],
    "grey-800": greyScale[800],
    "grey-900": greyScale[900],
    "grey-950": greyScale[950],
    "primary-500": primaryScale[500],
    "primary-700": primaryScale[700],
    "primary-100": primaryScale[100],
    "secondary-500": secondaryScale[500],
    "secondary-700": secondaryScale[700],
    "secondary-100": secondaryScale[100],
    "accent-500": accentScale[500],
    "accent-700": accentScale[700],
    "accent-100": accentScale[100],
    "success-500": successScale[500],
    "caution-500": cautionScale[500],
    "info-500": infoScale[500],
    "error-500": errorScale[500],
    black: "#000000",
    white: "#ffffff",
  };

  const colorLines: string[] = [];
  for (const entry of COLOR_ENTRIES) {
    const val = colorMap[entry];
    if (val) {
      colorLines.push(`  ${entry}: "${val}"`);
    }
  }
  if (colorLines.length > 0) {
    frontMatter.push("colors:");
    frontMatter.push(colorLines.join("\n"));
  }

  const typographyLines: string[] = [];
  if (state.fonts.display !== DEFAULT_STATE.fonts.display) {
    typographyLines.push(`  display:
    fontFamily: "${state.fonts.display}, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"`);
  }
  if (state.fonts.body !== DEFAULT_STATE.fonts.body) {
    typographyLines.push(`  body:
    fontFamily: "${state.fonts.body}, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6`);
  }
  if (typographyLines.length > 0) {
    frontMatter.push("typography:");
    frontMatter.push(typographyLines.join("\n"));
  }

  frontMatter.push("---");

  if (frontMatter.length > 1) {
    body.unshift(frontMatter.join("\n"));
  }

  if (state.creativeNorthStar) {
    const info = NORTH_STAR_INFO[state.creativeNorthStar];
    const starLine = info
      ? `**Creative North Star: "${state.creativeNorthStar}"**\n> ${info}`
      : `**Creative North Star: "${state.creativeNorthStar}"**`;
    body.push(
      `\n## 1. Overview\n\n${starLine}\n\n${state.designOverview || state.productDescription || "A clean, focused design system."}${state.brandPersonality ? `\n\n**Brand Personality:** ${state.brandPersonality}` : ""}`,
    );
  } else if (state.designOverview || state.productDescription) {
    body.push(
      `\n## 1. Overview\n\n${state.designOverview || state.productDescription}${state.brandPersonality ? `\n\n**Brand Personality:** ${state.brandPersonality}` : ""}`,
    );
  } else if (state.brandPersonality) {
    body.push(
      `\n## 1. Overview\n\n**Brand Personality:** ${state.brandPersonality}`,
    );
  }

  const typoParts: string[] = [];
  if (state.fonts.display !== DEFAULT_STATE.fonts.display) {
    typoParts.push(`**Display Font:** ${state.fonts.display}`);
  }
  if (state.fonts.body !== DEFAULT_STATE.fonts.body) {
    typoParts.push(`**Body Font:** ${state.fonts.body}`);
  }
  if (state.fonts.label !== DEFAULT_STATE.fonts.label) {
    typoParts.push(`**Label/Mono Font:** ${state.fonts.label}`);
  }
  if (typoParts.length > 0) {
    body.push(`\n## Typography\n\n${typoParts.join("\n")}`);
  }

  const hasElevationChanges =
    state.borderRadius !== DEFAULT_STATE.borderRadius ||
    state.shadowIntensity !== DEFAULT_STATE.shadowIntensity ||
    state.motionSpeed !== DEFAULT_STATE.motionSpeed;

  if (hasElevationChanges) {
    body.push(
      `\n## Elevation (default, unless specified)\n\nBorder-radius: ${state.borderRadius}px\nShadow intensity: ${state.shadowIntensity}/5\nMotion speed: ${state.motionSpeed}`,
    );
  }

  if (state.componentVariants) {
    body.push(`\n## Components\n\n${state.componentVariants}`);
  }

  if (state.dosAndDonts) {
    body.push(`\n## Do's and Don'ts\n\n${state.dosAndDonts}`);
  }

  return body.join("\n");
};

export { generateDesignMD };
