import fallbackData from "./font-options.fallback.json";

let entries: { value: string; label: string }[];

try {
  const { googleFontsMetadata } =
    await import("next/dist/compiled/@next/font/dist/google/google-fonts-metadata");
  entries = Object.keys(googleFontsMetadata)
    .map((name) => {
      return { value: name, label: name };
    })
    .sort((a, b) => {
      return a.value.localeCompare(b.value);
    });
} catch {
  entries = fallbackData as { value: string; label: string }[];
}

export const FONT_OPTIONS = entries;
export const FONT_NAMES = entries.map((f) => {
  return f.value;
});
