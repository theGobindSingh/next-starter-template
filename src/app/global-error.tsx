"use client";

import ErrorContent, { type ErrorProps } from "@components/error-content";
import { fontVariables } from "@styles/fonts";
import "@styles/globals.css";
import { THEME_INIT_SCRIPT } from "@utils/theme";

/** Replaces the root layout when it throws, so it renders its own document. */
const GlobalError = (props: ErrorProps) => {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <title>Something went wrong</title>
        <script>{THEME_INIT_SCRIPT}</script>
      </head>
      <body>
        <ErrorContent {...props} />
      </body>
    </html>
  );
};

export default GlobalError;
