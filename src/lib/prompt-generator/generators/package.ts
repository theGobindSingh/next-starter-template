import type { WizardState } from "@components/config-wizard/types";
import { toKebabCase } from "../utils";

const generatePackageJSON = (state: WizardState): string => {
  const lines: string[] = [];

  if (state.brandName) {
    lines.push(`- Change "name" to "${toKebabCase(state.brandName)}"`);
  }
  if (state.productDescription) {
    lines.push(`- Change "description" to "${state.productDescription}"`);
  }

  return lines.join("\n");
};

export { generatePackageJSON };
