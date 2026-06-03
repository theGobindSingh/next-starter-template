"use client";

import { BUTTON_BASE, cn, sizeMap, variantMap } from "./styles";
import type { ButtonProps } from "./types";

const Button = ({
  variant = "filled",
  size = "m",
  color = "primary",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        BUTTON_BASE,
        variantMap[variant][color],
        sizeMap[size],
        className,
      )}
      disabled={disabled! || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
