export type Theme = "light" | "dark";

/** localStorage key holding the user's explicit choice. */
export const THEME_KEY = "theme";

/*
 * The active theme is a <meta name="color-scheme"> that the head script injects;
 * CSS selects on it with :root:has(...). React renders every attribute on <html>,
 * so a class or data-attribute set before hydration causes a hydration mismatch,
 * while React 19 skips extra <head> elements. The meta also sets the browser's
 * scheme for scrollbars and form controls.
 */
const getSchemeMeta = (): HTMLMetaElement | null => {
  return document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
};

export const getActiveTheme = (): Theme => {
  return getSchemeMeta()?.content === "dark" ? "dark" : "light";
};

/** Switches the theme and remembers the choice. */
export const applyTheme = (theme: Theme): void => {
  const meta = getSchemeMeta();
  if (meta) meta.content = theme;
  localStorage.setItem(THEME_KEY, theme);
};

/**
 * Inline script for <head>: runs before <body> paints, so there is no flash.
 * Saved choice first, then the OS preference. Doesn't write to storage, so
 * users who never toggle keep following their OS setting.
 */
export const THEME_INIT_SCRIPT = `(function initTheme() {
  var theme = "light";
  try {
    theme = localStorage.getItem("${THEME_KEY}");
    if (theme !== "light" && theme !== "dark") {
      theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
  } catch (error) {}
  var meta = document.createElement("meta");
  meta.name = "color-scheme";
  meta.content = theme;
  document.head.appendChild(meta);
})();`;
