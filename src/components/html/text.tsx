import { tw } from "@utils/tw";
import { resolveTextStyles } from "./styles";
import type { TextDefaults, TextProps } from "./types";

export type TextTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface BaseTextProps extends TextProps {
  as: TextTag;
  defaults: TextDefaults;
}

/** Renders a text element whose `$`-props map onto the design tokens. */
const Text = ({
  as: Tag,
  defaults,
  className,
  children,
  style,
  $size,
  $weight,
  $color,
  $colorWeight,
  $margin,
  $lineHeight,
  $letterSpacing,
  ...rest
}: BaseTextProps) => {
  const textStyle = resolveTextStyles(
    {
      style,
      $size,
      $weight,
      $color,
      $colorWeight,
      $margin,
      $lineHeight,
      $letterSpacing,
    },
    defaults,
  );

  return (
    <Tag
      className={tw("leading-normal tracking-normal", className)}
      style={textStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Text;
