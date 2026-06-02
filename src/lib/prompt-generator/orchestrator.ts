import type { WizardState } from "@components/config-wizard/types";
import {
  hasAgentChanges,
  hasDesignChanges,
  hasFontChanges,
  hasMetadataChanges,
  hasPackageChanges,
  hasProductChanges,
} from "./detect-changes";
import { generateAgentsMD } from "./generators/agents";
import { generateDesignMD } from "./generators/design";
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
      `\`src/app/layout.tsx\` — update metadata only`,
      "tsx",
      generateLayoutMetadata(state),
    );
  } else if (hasFontChanges(state)) {
    appendSection(
      sections,
      order,
      `\`src/app/layout.tsx\` — update fonts${hasMetadataChanges(state) ? " and metadata" : ""}`,
      "tsx",
      generateLayoutTSX(state),
    );
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
      `\`PRODUCT.md\` — update product identity`,
      "markdown",
      generateProductMD(state),
    );
  }

  if (hasDesignChanges(state)) {
    appendSection(
      sections,
      order,
      `\`DESIGN.md\` — update design system documentation`,
      "markdown",
      generateDesignMD(state),
    );
  }

  if (hasAgentChanges(state)) {
    appendSection(
      sections,
      order,
      `\`AGENTS.md\` — update agent configuration`,
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
    sections.push(`\n## Final verification
\`\`\`
pnpm install
pnpm build
\`\`\`
Confirm no errors.
  `);
    sections.unshift(
      `Update these files (and related configurations) (Use sub-agents for each edit/file if possible):`,
    );
    if (state.brandName) {
      sections.unshift(
        `This project is now "${state.brandName}" and not a template. This prompt is meant to update the project. Follow this prompt very closely to ensure the best results. Do not skip any instructions. This will also update the config for agent SKILLs.\n`,
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
