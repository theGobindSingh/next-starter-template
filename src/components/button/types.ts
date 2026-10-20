import type { ButtonHTMLAttributes } from "react";

export type InteractionVariant = "filled" | "outlined" | "text";
export type InteractionSize = "sm" | "md" | "lg";
export type ColorFamily =
  "grey" | "accent" | "success" | "caution" | "info" | "error";

export interface InteractionProps {
  variant?: InteractionVariant | undefined;
  size?: InteractionSize | undefined;
  color?: ColorFamily | undefined;
}

export interface ButtonProps
  extends
    InteractionProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {}
