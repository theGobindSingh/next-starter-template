import { tw } from "@utils/tw";
import type { CSSProperties } from "react";
import type { ColorFamily, InteractionSize, InteractionVariant } from "./types";

// Tailwind only generates classes it finds as literal strings, so these maps
// must stay literal (no template-string class names).
const variantClassName: Record<InteractionVariant, string> = {
  filled: "btn-filled",
  outlined: "btn-outlined",
  text: "btn-text",
};

const sizeClassName: Record<InteractionSize, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

interface InteractionStyleOptions {
  variant: InteractionVariant;
  size: InteractionSize;
  className?: string | undefined;
}

export const interactionStyles = ({
  variant,
  size,
  className,
}: InteractionStyleOptions): string => {
  const sizeClass = variant !== "text" && sizeClassName[size];
  return tw("btn", variantClassName[variant], sizeClass, className);
};

export const colorStyleVars = (color: ColorFamily): CSSProperties => {
  return {
    "--c": `var(--color-${color}-600)`,
    "--c-hover": `var(--color-${color}-700)`,
  } as CSSProperties;
};
