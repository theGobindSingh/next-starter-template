import type { WizardState } from "@components/config-wizard/types";

const FONT_DEFAULTS: Record<string, string> = {
  display: "Poppins",
  body: "Inter",
  label: "DM Mono",
  cursive: "Nothing You Could Do",
};

const FONT_CSS_VARS: Record<string, string> = {
  display: "--font-poppins",
  body: "--font-inter",
  label: "--font-dm-mono",
  cursive: "--font-cursive",
};

const generateLayoutTSX = (state: WizardState): string => {
  const instructions: string[] = [];

  for (const [role, defaultFont] of Object.entries(FONT_DEFAULTS)) {
    const selected = state.fonts[role as keyof typeof state.fonts];
    if (selected && selected !== defaultFont) {
      instructions.push(
        `- Change the **${role}** font from \`${defaultFont}\` to \`${selected}\` (CSS variable: \`${FONT_CSS_VARS[role]}\`). Update the import from \`next/font/google\`, the font variable declaration, and the body \`className\`.`,
      );
    }
  }

  instructions.push(
    `- Keep all other font declarations, the \`metadata\` export, the \`RootLayout\` component structure, and the theme script unchanged.`,
  );

  return instructions.join("\n");
};

const generateLayoutMetadata = (state: WizardState): string => {
  const name = state.brandName || "next-starter-template";
  const desc = state.productDescription || "My app description";

  return `export const metadata: Metadata = {
  title: "${name}",
  description:
    "${desc}",
};`;
};

export { generateLayoutMetadata, generateLayoutTSX };
