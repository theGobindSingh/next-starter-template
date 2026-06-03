const HEX_REGEX = /^([0-9a-fA-F]{6})$/;

const PARSERS: Record<string, (path: string) => string[] | null> = {
  "coolors.co": (path: string): string[] | null => {
    const parts = path.replace(/^\/+/, "").split("-");
    const valid = parts.filter((p) => {
      return HEX_REGEX.test(p);
    });
    if (valid.length < 1 || valid.length > 10) return null;
    return valid.map((h) => {
      return `#${h.toLowerCase()}`;
    });
  },
};

export interface ParseResult {
  source: string;
  colors: string[];
  error?: string;
}

export const parsePaletteUrl = (url: string): ParseResult => {
  const trimmed = url.trim();

  let urlObj: URL;
  try {
    urlObj = new URL(trimmed);
  } catch {
    return { source: "unknown", colors: [], error: "Invalid URL" };
  }

  const hostname = urlObj.hostname.replace(/^www\./, "");
  const { pathname } = urlObj;

  const parser = PARSERS[hostname];
  if (!parser) {
    return {
      source: "unknown",
      colors: [],
      error: `Unsupported palette service: ${hostname}`,
    };
  }

  const colors = parser(pathname);
  if (!colors) {
    return {
      source: hostname,
      colors: [],
      error: "Could not extract colors from URL",
    };
  }

  return { source: hostname, colors };
};
