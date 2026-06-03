import type { WizardState } from "@components/config-wizard/types";

const DEFAULT_DISPLAY_FONT = "Poppins";
const DEFAULT_BODY_FONT = "Inter";

const generateLayoutTSX = (state: WizardState): string => {
  const fontImports: string[] = [];
  const fontVars: string[] = [];

  if (state.fonts.display && state.fonts.display !== DEFAULT_DISPLAY_FONT) {
    const fontName = state.fonts.display.replace(/\s+/g, "");
    fontImports.push(`import ${fontName} from "next/font/google";`);
    fontVars.push(`const ${fontName.toLowerCase()} = ${fontName}({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});`);
  }

  if (state.fonts.body && state.fonts.body !== DEFAULT_BODY_FONT) {
    const fontName = state.fonts.body.replace(/\s+/g, "");
    fontImports.push(`import ${fontName} from "next/font/google";`);
    fontVars.push(`const ${fontName.toLowerCase()} = ${fontName}({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});`);
  }

  const name = state.brandName || "next-starter-template";
  const desc = state.productDescription || "My app description";

  return `import type { Metadata } from "next";
${
  state.fonts.display === DEFAULT_DISPLAY_FONT &&
  state.fonts.body === DEFAULT_BODY_FONT
    ? `import {
  DM_Mono as DmMono,
  Inter,
  Nothing_You_Could_Do as NothingYouCouldDo,
  Poppins,
} from "next/font/google";`
    : fontImports.join("\n")
}
import type { ReactNode } from "react";
import "./globals.css";

${
  state.fonts.display === DEFAULT_DISPLAY_FONT &&
  state.fonts.body === DEFAULT_BODY_FONT
    ? `const fontSansSerif = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontMono = DmMono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

const fontSans = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontCursive = NothingYouCouldDo({
  variable: "--font-cursive",
  weight: ["400"],
  subsets: ["latin"],
});`
    : fontVars.join("\n\n")
}

export const metadata: Metadata = {
  title: "${name}",
  description:
    "${desc}",
};

interface RootLayoutProps {
  children: ReactNode;
}

const THEME_SCRIPT = \`
(function() {
  var theme = localStorage.getItem('theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
\`;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body
        className={\`\${fontSansSerif.variable} \${fontMono.variable} \${fontSans.variable} \${fontCursive.variable}\`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;`;
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
