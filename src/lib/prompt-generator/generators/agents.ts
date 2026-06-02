import { DEFAULT_STATE } from "@components/config-wizard/constants";
import type { WizardState } from "@components/config-wizard/types";

const generateAgentsMD = (state: WizardState): string => {
  const sections: string[] = [];

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
