import chroma from "chroma-js";

export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  caution: string;
  info: string;
  error: string;
  surface: string;
  text: string;
}

const FIXED_HUES = {
  success: 152,
  caution: 25,
  info: 199,
  error: 0,
};

export const generatePalette = (
  primaryHex: string,
  secondaryHex: string,
): Palette => {
  const primary = chroma(primaryHex);
  const secondary = chroma(secondaryHex);
  const pL = primary.luminance();

  const makeColor = (hue: number, ref: chroma.Color): string => {
    const s = Math.min(95, Math.max(40, ref.get("hsl.s") * 100));
    const adjustedL = clampLightnessForHue(hue, pL, s);
    return chroma.hsl(hue, s / 100, adjustedL / 100).hex();
  };

  const makeSemantic = (hue: number): string => {
    const avgSat =
      (primary.get("hsl.s") * 100 + secondary.get("hsl.s") * 100) / 2;
    const s = Math.min(90, Math.max(50, avgSat));
    const l = clampLightnessForHue(hue, pL, s);
    return chroma.hsl(hue, s / 100, l / 100).hex();
  };

  const accentHue =
    ((primary.get("hsl.h") + secondary.get("hsl.h")) / 2 + 30) % 360;

  const primaryHueDeg = primary.get("hsl.h");
  const neutralHue = Number.isNaN(primaryHueDeg) ? 30 : primaryHueDeg;

  const surface = chroma.hsl(neutralHue, 0.1, 0.87).hex();
  const text = chroma.hsl(neutralHue, 0.15, 0.15).hex();

  return {
    primary: primaryHex,
    secondary: secondaryHex,
    accent: makeColor(accentHue, secondary),
    success: makeSemantic(FIXED_HUES.success),
    caution: makeSemantic(FIXED_HUES.caution),
    info: makeSemantic(FIXED_HUES.info),
    error: makeSemantic(FIXED_HUES.error),
    surface,
    text,
  };
};

const clampLightnessForHue = (
  _hue: number,
  _refLuminance: number,
  saturation: number,
): number => {
  return Math.max(35, Math.min(55, 55 - saturation * 0.15));
};

export const hexToHslStr = (hex: string): string => {
  const c = chroma(hex);
  const [h, s, l] = c.hsl();
  return `${Math.round(h)}deg ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

type ShadeScale = Record<number, string>;

export const SHADE_NUMBERS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

const SHADE_STEPS: { shade: number; mixWhite: number; mixBlack: number }[] = [
  { shade: 50, mixWhite: 0.95, mixBlack: 0 },
  { shade: 100, mixWhite: 0.9, mixBlack: 0 },
  { shade: 200, mixWhite: 0.75, mixBlack: 0 },
  { shade: 300, mixWhite: 0.5, mixBlack: 0 },
  { shade: 400, mixWhite: 0.25, mixBlack: 0 },
  { shade: 500, mixWhite: 0, mixBlack: 0 },
  { shade: 600, mixWhite: 0, mixBlack: 0.25 },
  { shade: 700, mixWhite: 0, mixBlack: 0.5 },
  { shade: 800, mixWhite: 0, mixBlack: 0.75 },
  { shade: 900, mixWhite: 0, mixBlack: 0.9 },
  { shade: 950, mixWhite: 0, mixBlack: 0.95 },
];

export const generateShadeScale = (hex: string): ShadeScale => {
  const base = chroma(hex);
  const white = chroma("#ffffff");
  const black = chroma("#000000");
  const result: ShadeScale = {} as ShadeScale;
  for (const { shade, mixWhite, mixBlack } of SHADE_STEPS) {
    let mixed: chroma.Color;
    if (mixWhite > 0) {
      mixed = base.mix(white, mixWhite, "rgb");
    } else if (mixBlack > 0) {
      mixed = base.mix(black, mixBlack, "rgb");
    } else {
      mixed = base;
    }
    result[shade] = hexToHslStr(mixed.hex());
  }
  return result;
};

export const generateLightHexScale = (hex: string): string[] => {
  const base = chroma(hex);
  const white = chroma("#ffffff");
  const black = chroma("#000000");
  return SHADE_STEPS.map(({ mixWhite, mixBlack }) => {
    let mixed: chroma.Color;
    if (mixWhite > 0) {
      mixed = base.mix(white, mixWhite, "rgb");
    } else if (mixBlack > 0) {
      mixed = base.mix(black, mixBlack, "rgb");
    } else {
      mixed = base;
    }
    return mixed.hex();
  });
};

export const hslStr = (h: number, s: number, l: number): string => {
  return `${Math.round(h)}deg ${Math.round(s)}% ${Math.round(l)}%`;
};

export const GREY_HUE = 210;

const STANDARD_LIGHTNESS: Record<number, number> = {
  50: 98,
  100: 96,
  200: 93,
  300: 85,
  400: 70,
  500: 56,
  600: 42,
  700: 28,
  800: 14,
  900: 5,
  950: 2,
};

const GREY_SATURATION: Record<number, number> = {
  50: 20,
  100: 16,
  200: 14,
  300: 12,
  400: 10,
  500: 8,
  600: 6,
  700: 4,
  800: 2,
  900: 1,
  950: 1,
};

export const FIXED_COLOR_HUES: Record<string, number> = {
  primary: -1,
  secondary: -1,
  accent: -1,
  success: 145,
  caution: 30,
  info: 200,
  error: 0,
};

export const generateHslBaseScale = (
  hex: string,
  fixedHue?: number,
  fixedSaturation?: number,
): Record<number, string> => {
  const c = chroma(hex);
  const h = fixedHue ?? Math.round(c.get("hsl.h"));
  const s = fixedSaturation ?? Math.round(c.get("hsl.s") * 100);
  const result: Record<number, string> = {} as Record<number, string>;
  for (const shade of SHADE_NUMBERS) {
    const l = STANDARD_LIGHTNESS[shade];
    result[shade] = `${h}, ${s}%, ${l}%`;
  }
  return result;
};

export const generateGreyHslBaseScale = (): Record<number, string> => {
  const result: Record<number, string> = {} as Record<number, string>;
  for (const shade of SHADE_NUMBERS) {
    result[shade] =
      `${GREY_HUE}, ${GREY_SATURATION[shade]}%, ${STANDARD_LIGHTNESS[shade]}%`;
  }
  return result;
};
