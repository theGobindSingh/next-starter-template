import {
  DEFAULT_STATE,
  NORTH_STAR_INFO,
} from "@components/config-wizard/constants";
import type { WizardState } from "@components/config-wizard/types";
import {
  hasAgentChanges,
  hasDesignComponentsChanges,
  hasDesignDosDontsChanges,
  hasDesignElevationChanges,
  hasDesignOverviewChanges,
  hasFontChanges,
  hasMetadataChanges,
  hasPackageChanges,
  hasProductChanges,
  hasStructureChanges,
} from "./detect-changes";
import { generateAgentsMD } from "./generators/agents";
import { generateLayoutMetadata, generateLayoutTSX } from "./generators/layout";
import { generateLiveConfig } from "./generators/live-config";
import { generatePackageJSON } from "./generators/package";
import { generateProductMD } from "./generators/product";
import { appendSection } from "./utils";

const generatePrompt = (state: WizardState): string => {
  const sections: string[] = [];

  const order = { value: 1 };

  if (hasMetadataChanges(state) && !hasFontChanges(state)) {
    appendSection(
      sections,
      order,
      `\`src/app/layout.tsx\` — update metadata`,
      "tsx",
      generateLayoutMetadata(state),
    );
  } else if (hasFontChanges(state)) {
    const fontInstructions = generateLayoutTSX(state);
    const metaInstruction = hasMetadataChanges(state)
      ? `\n\nAlso update the \`metadata\` export: set \`title\` to "${state.brandName || "next-starter-template"}" and \`description\` to "${state.productDescription || "My app description"}".`
      : "";
    sections.push(
      `\n${order.value}. \`src/app/layout.tsx\` — update fonts${hasMetadataChanges(state) ? " and metadata" : ""}`,
    );
    sections.push(`\n${fontInstructions}${metaInstruction}`);
    order.value++;
  }

  if (hasPackageChanges(state)) {
    appendSection(
      sections,
      order,
      `\`package.json\` — update project metadata`,
      "",
      generatePackageJSON(state),
    );
  }

  if (hasProductChanges(state)) {
    appendSection(
      sections,
      order,
      `\`docs/PRODUCT.md\` — update product identity`,
      "markdown",
      generateProductMD(state),
    );
  }

  const designMDUpdates: string[] = [];

  if (hasFontChanges(state)) {
    const fontParts: string[] = [];

    if (state.fonts.display !== DEFAULT_STATE.fonts.display) {
      fontParts.push(
        `Update the \`typography:\` frontmatter: set \`display.fontFamily\` to \`"${state.fonts.display}, 'Segoe UI', Roboto, sans-serif"\``,
      );
      fontParts.push(
        `Update the **## Typography** section: set **Display Font** to **${state.fonts.display}**`,
      );
    }

    if (state.fonts.body !== DEFAULT_STATE.fonts.body) {
      fontParts.push(
        `Update the \`typography:\` frontmatter: set \`body.fontFamily\` to \`"${state.fonts.body}, 'Segoe UI', Roboto, sans-serif"\``,
      );
      fontParts.push(
        `Update the **## Typography** section: set **Body Font** to **${state.fonts.body}**`,
      );
    }

    if (state.fonts.label !== DEFAULT_STATE.fonts.label) {
      fontParts.push(
        `Update the **## Typography** section: set **Label/Mono Font** to **${state.fonts.label}**`,
      );
    }

    if (fontParts.length > 0) {
      designMDUpdates.push(fontParts.join("\n\n"));
    }
  }

  if (hasMetadataChanges(state)) {
    designMDUpdates.push(
      `Update \`docs/DESIGN.md\` frontmatter:\n- \`name\`: "${state.brandName || ""}"\n- \`description\`: "${state.productDescription || ""}"`,
    );
  }

  if (hasDesignOverviewChanges(state)) {
    const info = state.creativeNorthStar
      ? NORTH_STAR_INFO[state.creativeNorthStar]
      : undefined;
    const starLine = info
      ? `**Creative North Star: "${state.creativeNorthStar}"**\n> ${info}`
      : state.creativeNorthStar
        ? `**Creative North Star: "${state.creativeNorthStar}"**`
        : undefined;
    const overviewParts = [
      "Update the **## 1. Overview** section in `docs/DESIGN.md`.",
    ];
    if (starLine) {
      overviewParts.push(`\nSet the creative north star:\n\n${starLine}`);
    }
    if (state.designOverview) {
      overviewParts.push(
        `\nSet the design overview text:\n\n${state.designOverview}`,
      );
    }
    if (state.brandPersonality) {
      overviewParts.push(
        `\nSet the brand personality:\n\n**Brand Personality:** ${state.brandPersonality}`,
      );
    }
    designMDUpdates.push(overviewParts.join("\n\n"));
  }

  if (hasDesignComponentsChanges(state)) {
    designMDUpdates.push(
      `Update the **## 6. Components** section in \`docs/DESIGN.md\`.\n\n${state.componentVariants}`,
    );
  }

  if (hasDesignDosDontsChanges(state)) {
    designMDUpdates.push(
      `Update the **## 7. Do's and Don'ts** section in \`docs/DESIGN.md\`.\n\n${state.dosAndDonts}`,
    );
  }

  if (hasDesignElevationChanges(state)) {
    const halfR = Math.round(state.borderRadius / 2);
    const oneAndHalfR = Math.round(state.borderRadius * 1.5);
    designMDUpdates.push(
      `Update the \`rounded:\` frontmatter and **## Elevation** section in \`docs/DESIGN.md\`:\n\n- Set \`rounded.sm\` to \`${halfR}px\`\n- Set \`rounded.md\` to \`${state.borderRadius}px\` (base)\n- Set \`rounded.lg\` to \`${oneAndHalfR}px\`\n- Set \`rounded.full\` to \`9999px\` (unchanged)\n- Shadow intensity: ${state.shadowIntensity}/5\n- Motion speed: ${state.motionSpeed}\n- Update any component \`rounded:\` references in the frontmatter to match the new scale`,
    );
  }

  if (designMDUpdates.length > 0) {
    sections.push(
      `\n${order.value}. \`docs/DESIGN.md\` — update design content`,
    );
    sections.push(
      `\n**Colors:** Do not modify the existing \`colors:\` frontmatter block. It documents available color families and must stay in sync with \`src/app/globals.css\`.\n`,
    );
    sections.push("```markdown");
    sections.push(designMDUpdates.join("\n\n---\n\n"));
    sections.push("```");
    order.value++;
  }

  if (hasAgentChanges(state) || hasStructureChanges(state)) {
    appendSection(
      sections,
      order,
      `\`AGENTS.md\` — update agent configuration and project conventions\n
Note: Do not change other rules apart from what is mentioned here. Preserve all existing content in AGENTS.md that is not explicitly listed below.
      `,
      "markdown",
      generateAgentsMD(state),
    );
  }

  if (state.liveMode) {
    appendSection(
      sections,
      order,
      `\`.impeccable/live/config.json\` — enable live mode`,
      "json",
      generateLiveConfig(),
    );
  }

  if (sections.length != 0) {
    sections.push(`\n## README.md
Update the README.md to reflect the new project identity and instructions. Use the existing README.md content as much as possible, but update sections related to project description, setup instructions, and any references to the old project name or template nature.
  `);
    sections.push(`\n## Final verification
\`\`\`
pnpm install
pnpm build
\`\`\`
Confirm no errors.
  `);
    sections.unshift(
      `Update AGENTS.md and the following files (and related configurations) (Use sub-agents for each edit/file if possible):`,
    );
    if (state.brandName) {
      sections.unshift(
        `This project is now "${state.brandName}" and not a template. This prompt is meant to update the project. Follow this prompt very closely to ensure the best results. Do not skip any instructions. This will also update the config for agent SKILLs. Don't be rigid, update related configurations as needed.\n`,
      );
    }
    if (state.tagline) {
      sections.unshift(`> ${state.tagline}\n`);
    }
    if (state.brandName) {
      sections.unshift(`# Configure "${state.brandName}" with these settings`);
    }
  }

  return sections.join("\n");
};

export { generatePrompt };
