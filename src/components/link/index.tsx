import { colorStyleVars, interactionStyles } from "@components/button/styles";
import NextLink from "next/link";
import type { LinkProps } from "./types";

const isExternal = (href: string): boolean => {
  return /^(https?:)?\/\//.test(href);
};

/** next/link for every href; external ones also open in a new tab safely. */
const Link = ({
  variant = "text",
  size = "md",
  color = "accent",
  href,
  className,
  style,
  children,
  ...rest
}: LinkProps) => {
  const externalProps = isExternal(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <NextLink
      href={href}
      style={{ ...colorStyleVars(color), ...style }}
      className={interactionStyles({ variant, size, className })}
      {...externalProps}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

export default Link;
