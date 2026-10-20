import type { InteractionProps } from "@components/button/types";
import type NextLink from "next/link";
import type { ComponentProps } from "react";

export interface LinkProps
  extends
    InteractionProps,
    Omit<ComponentProps<typeof NextLink>, "href" | "color"> {
  href: string;
}
