import type { ButtonColor, ButtonSize, ButtonVariant } from "./types";

export const cn = (
  ...classes: (string | undefined | false | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const sizeMap: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs rounded",
  s: "px-3 py-1.5 text-sm rounded",
  m: "px-4 py-2 text-sm rounded-md",
  l: "px-5 py-2.5 text-base rounded-md",
  xl: "px-6 py-3 text-lg rounded-lg",
};

const filledMap: Record<ButtonColor, string> = {
  primary:
    "bg-primary-500 text-grey-50 hover:bg-primary-700 focus-visible:ring-primary-500/50",
  secondary:
    "bg-secondary-500 text-grey-50 hover:bg-secondary-700 focus-visible:ring-secondary-500/50",
  accent:
    "bg-accent-500 text-grey-50 hover:bg-accent-700 focus-visible:ring-accent-500/50",
  success:
    "bg-success-500 text-grey-50 hover:bg-success-700 focus-visible:ring-success-500/50",
  caution:
    "bg-caution-500 text-grey-50 hover:bg-caution-700 focus-visible:ring-caution-500/50",
  info: "bg-info-500 text-grey-50 hover:bg-info-700 focus-visible:ring-info-500/50",
  error:
    "bg-error-500 text-grey-50 hover:bg-error-700 focus-visible:ring-error-500/50",
};

const outlinedMap: Record<ButtonColor, string> = {
  primary:
    "border border-primary-500 text-primary-500 hover:bg-primary-500/10 focus-visible:ring-primary-500/50",
  secondary:
    "border border-secondary-500 text-secondary-500 hover:bg-secondary-500/10 focus-visible:ring-secondary-500/50",
  accent:
    "border border-accent-500 text-accent-500 hover:bg-accent-500/10 focus-visible:ring-accent-500/50",
  success:
    "border border-success-500 text-success-500 hover:bg-success-500/10 focus-visible:ring-success-500/50",
  caution:
    "border border-caution-500 text-caution-500 hover:bg-caution-500/10 focus-visible:ring-caution-500/50",
  info: "border border-info-500 text-info-500 hover:bg-info-500/10 focus-visible:ring-info-500/50",
  error:
    "border border-error-500 text-error-500 hover:bg-error-500/10 focus-visible:ring-error-500/50",
};

const textMap: Record<ButtonColor, string> = {
  primary:
    "text-primary-500 hover:bg-primary-500/10 focus-visible:ring-primary-500/50",
  secondary:
    "text-secondary-500 hover:bg-secondary-500/10 focus-visible:ring-secondary-500/50",
  accent:
    "text-accent-500 hover:bg-accent-500/10 focus-visible:ring-accent-500/50",
  success:
    "text-success-500 hover:bg-success-500/10 focus-visible:ring-success-500/50",
  caution:
    "text-caution-500 hover:bg-caution-500/10 focus-visible:ring-caution-500/50",
  info: "text-info-500 hover:bg-info-500/10 focus-visible:ring-info-500/50",
  error: "text-error-500 hover:bg-error-500/10 focus-visible:ring-error-500/50",
};

export const variantMap: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: filledMap,
  outlined: outlinedMap,
  text: textMap,
};

export const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none focus-visible:outline-none focus-visible:ring-2";
