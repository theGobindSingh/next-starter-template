import { DEFAULT_STATE } from "@components/config-wizard/constants";
import type { WizardState } from "@components/config-wizard/types";

const generateAgentsMD = (state: WizardState): string => {
  const sections: string[] = [];

  if (state.namingConvention !== DEFAULT_STATE.namingConvention) {
    sections.push(
      `## Naming Convention\n\n- Files and folders: \`${state.namingConvention}\``,
    );
  }

  const placementDesc =
    state.componentPlacement === "hybrid"
      ? "global/reusable → `src/components/`, page-specific → `app/<route>/components/`"
      : state.componentPlacement === "all-global"
        ? "all components → `src/components/`"
        : "each route owns its components in `app/<route>/`";

  sections.push(`## File & Folder Conventions

- Naming: \`${state.namingConvention}\` for all files and folders
- Component placement: ${placementDesc}
- Folder-per-component: ${state.folderPerComponent ? "each component gets its own folder with `index.tsx` as entry point" : "components are single files"}
- Global components: \`src/components/\`
- Page-specific components: co-located alongside their route
- Modules: prefer directory pattern with \`index.tsx\` entry + sibling files`);

  if (state.productContext) {
    sections.push(`## Product Context\n\n${state.productContext}`);
  }

  if (state.testingFramework !== DEFAULT_STATE.testingFramework) {
    sections.push(
      `## Testing (Configure if not already - use a subagent)\n\n- Framework: ${state.testingFramework}\n- Run tests: \`pnpm test\``,
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
