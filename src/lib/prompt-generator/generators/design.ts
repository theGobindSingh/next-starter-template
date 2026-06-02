import {
  DEFAULT_STATE,
  NORTH_STAR_INFO,
} from "@components/config-wizard/constants";
import type { WizardState } from "@components/config-wizard/types";

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
