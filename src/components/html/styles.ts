import type { CSSProperties } from "react";
import type {
  ColorStop,
  ColorToken,
  CommonTextProps,
  TextDefaults,
} from "./types";

const resolveColor = (color?: ColorToken, stop?: ColorStop): string => {
  if (!color) return "inherit";
  if (color === "black" || color === "white") return `var(--color-${color})`;
  return `var(--color-${color}-${stop ?? "400"})`;
};

export const resolveTextStyles = (
  props: Omit<CommonTextProps, "children" | "className">,
  defaults: TextDefaults,
): CSSProperties => {
  return {
    color: resolveColor(props.$color, props.$colorWeight),
    fontSize: `var(--fs-${props.$size ?? defaults.size})`,
    fontWeight: props.$weight ?? defaults.weight,
    margin: props.$margin ?? defaults.margin,
    lineHeight: props.$lineHeight ?? "normal",
    letterSpacing: props.$letterSpacing ?? "normal",
    ...props.style,
  };
};
