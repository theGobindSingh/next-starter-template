import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** Keys of the `--fs-*` scale in globals.css. */
export type TextSizeToken =
  | "4xs"
  | "3xs"
  | "2xs"
  | "1xs"
  | "s"
  | "m"
  | "l"
  | "1xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type WeightToken =
  "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800";

export type ColorToken =
  | "grey"
  | "accent"
  | "success"
  | "caution"
  | "info"
  | "error"
  | "black"
  | "white";

export type ColorStop =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export interface CommonTextProps {
  children?: ReactNode;
  className?: string | undefined;
  style?: CSSProperties | undefined;
  $size?: TextSizeToken | undefined;
  $weight?: WeightToken | undefined;
  $color?: ColorToken | undefined;
  $colorWeight?: ColorStop | undefined;
  $margin?: CSSProperties["margin"] | undefined;
  $lineHeight?: CSSProperties["lineHeight"] | undefined;
  $letterSpacing?: CSSProperties["letterSpacing"] | undefined;
}

export interface TextDefaults {
  size: TextSizeToken;
  weight: WeightToken;
  margin: CSSProperties["margin"];
}

export type TextProps = HTMLAttributes<HTMLElement> & CommonTextProps;
export type HrProps = HTMLAttributes<HTMLHRElement> &
  Pick<CommonTextProps, "$margin" | "style" | "className">;
