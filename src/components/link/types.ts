import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@components/button";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { UrlObject } from "url";

export interface ButtonLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href: string | UrlObject;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  children?: ReactNode;
}
