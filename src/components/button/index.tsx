import { colorStyleVars, interactionStyles } from "./styles";
import type { ButtonProps } from "./types";

const Button = ({
  variant = "filled",
  size = "md",
  color = "accent",
  type = "button",
  className,
  style,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      style={{ ...colorStyleVars(color), ...style }}
      className={interactionStyles({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
