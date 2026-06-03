import { DEFAULT_STATE } from "@components/config-wizard/constants";
import type { WizardState } from "@components/config-wizard/types";

const generateAgentsMD = (state: WizardState): string => {
  const sections: string[] = [];

  const hasStructureChanges =
    state.namingConvention !== DEFAULT_STATE.namingConvention ||
    state.componentPlacement !== DEFAULT_STATE.componentPlacement ||
    state.folderPerComponent !== DEFAULT_STATE.folderPerComponent;

  if (hasStructureChanges) {
    const placementDesc =
      state.componentPlacement === "hybrid"
        ? "global/reusable → `src/components/`, page-specific → `app/<route>/components/`"
        : state.componentPlacement === "all-global"
          ? "all components → `src/components/`"
          : "each route owns its components in `app/<route>/`";

    const structureParts: string[] = [];

    if (state.namingConvention !== DEFAULT_STATE.namingConvention) {
      structureParts.push(
        `- Naming: \`${state.namingConvention}\` for all files and folders`,
      );
    }

    if (state.componentPlacement !== DEFAULT_STATE.componentPlacement) {
      structureParts.push(`- Component placement: ${placementDesc}`);
    }

    if (state.folderPerComponent !== DEFAULT_STATE.folderPerComponent) {
      structureParts.push(
        `- Folder-per-component: ${state.folderPerComponent ? "each component gets its own folder with `index.tsx` as entry point" : "components are single files"}`,
      );
    }

    if (structureParts.length > 0) {
      sections.push(
        `## File & Folder Conventions\n\n${structureParts.join("\n")}`,
      );
    }
  }

  if (state.productContext) {
    sections.push(`## Product Context\n\n${state.productContext}`);
  }

  if (state.testingFramework !== DEFAULT_STATE.testingFramework) {
    sections.push(
      `## Testing\n\n- Framework: ${state.testingFramework}\n- Run tests: \`pnpm test\``,
    );
  }

  if (state.deploymentTarget !== DEFAULT_STATE.deploymentTarget) {
    sections.push(`## Deployment\n\n- Target: ${state.deploymentTarget}`);
  }

  if (state.compliance.length > 0) {
    sections.push(
      `## Security & Compliance\n\n- ${state.compliance.join("\n- ")}`,
    );
  }

  return sections.join("\n\n");
};

export { generateAgentsMD };
