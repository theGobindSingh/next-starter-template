"use client";

import { BUTTON_BASE, cn, sizeMap, variantMap } from "@components/button";
import NextLink, { LinkProps } from "next/link";
import type { ButtonLinkProps } from "./types";

const Link = ({
  href,
  variant = "filled",
  size = "m",
  color = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) => {
  const classes = cn(
    BUTTON_BASE,
    variantMap[variant][color],
    sizeMap[size],
    className,
  );

  if (typeof href === "string" && href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={classes}
      {...(props as Omit<LinkProps, "href">)}
    >
      {children}
    </NextLink>
  );
};

Link.displayName = "Link";

export default Link;

export type { ButtonLinkProps } from "./types";
