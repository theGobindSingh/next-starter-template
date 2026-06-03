import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "filled" | "outlined" | "text";

export type ButtonSize = "xs" | "s" | "m" | "l" | "xl";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "caution"
  | "info"
  | "error";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  loading?: boolean;
  children?: ReactNode;
}
