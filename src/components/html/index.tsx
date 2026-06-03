import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type TextSizeToken =
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

type WeightToken =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800";

type ColorToken =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "caution"
  | "info"
  | "error"
  | "gray"
  | "black"
  | "white";

export interface CommonTextProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  $size?: TextSizeToken;
  $weight?: WeightToken;
  $color?: ColorToken;
  $colorWeight?: WeightToken;
  $margin?: CSSProperties["margin"];
  $lineHeight?: CSSProperties["lineHeight"];
  $letterSpacing?: CSSProperties["letterSpacing"];
}

interface TextDefaults {
  size: TextSizeToken;
  weight: WeightToken;
  margin: CSSProperties["margin"];
}

interface TextStyleOptions {
  $size: TextSizeToken | undefined;
  $weight: WeightToken | undefined;
  $color: ColorToken | undefined;
  $colorWeight: WeightToken | undefined;
  $margin: CSSProperties["margin"] | undefined;
  $lineHeight: CSSProperties["lineHeight"] | undefined;
  $letterSpacing: CSSProperties["letterSpacing"] | undefined;
  style: CSSProperties | undefined;
}

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const resolveColor = (color?: ColorToken, colorWeight?: WeightToken) => {
  if (!color) {
    return "inherit";
  }

  if (color === "black" || color === "white") {
    return `var(--color-${color})`;
  }

  const resolvedWeight = colorWeight ?? "400";

  return `var(--color-${color}-${resolvedWeight})`;
};

const resolveTextStyles = (
  props: TextStyleOptions,
  defaults: TextDefaults,
): CSSProperties => {
  return {
    color: resolveColor(props.$color, props.$colorWeight),
    fontSize: `var(--fs-${props.$size ?? defaults.size})`,
    fontWeight: props.$weight ?? defaults.weight,
    margin: props.$margin ?? defaults.margin,
    lineHeight: props.$lineHeight ?? "normal",
    letterSpacing: props.$letterSpacing ?? "normal",
    ...props.style,
  };
};

type HTagProps = HTMLAttributes<HTMLHeadingElement> & CommonTextProps;
type PTagProps = HTMLAttributes<HTMLParagraphElement> & CommonTextProps;
type SpanTagProps = HTMLAttributes<HTMLSpanElement> & CommonTextProps;
type HrTagProps = HTMLAttributes<HTMLHRElement> & CommonTextProps;

export const H1 = ({ className, children, ...props }: HTagProps) => {
  const {
    $size,
    $weight,
    $color,
    $colorWeight,
    $margin,
    $lineHeight,
    $letterSpacing,
    style,
    ...rest
  } = props;

  return (
    <h1
      className={cn("leading-normal tracking-normal", className)}
      style={resolveTextStyles(
        {
          $size,
          $weight,
          $color,
          $colorWeight,
          $margin,
          $lineHeight,
          $letterSpacing,
          style,
        },
        {
          size: "4xl",
          weight: "700",
          margin: "0 0 0.75em 0",
        },
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ className, children, ...props }: HTagProps) => {
  const {
    $size,
    $weight,
    $color,
    $colorWeight,
    $margin,
    $lineHeight,
    $letterSpacing,
    style,
    ...rest
  } = props;

  return (
    <h2
      className={cn("leading-normal tracking-normal", className)}
      style={resolveTextStyles(
        {
          $size,
          $weight,
          $color,
          $colorWeight,
          $margin,
          $lineHeight,
          $letterSpacing,
          style,
        },
        {
          size: "2xl",
          weight: "700",
          margin: "0 0 0.5em 0",
        },
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ className, children, ...props }: HTagProps) => {
  const {
    $size,
    $weight,
    $color,
    $colorWeight,
    $margin,
    $lineHeight,
    $letterSpacing,
    style,
    ...rest
  } = props;

  return (
    <h3
      className={cn("leading-normal tracking-normal", className)}
      style={resolveTextStyles(
        {
          $size,
          $weight,
          $color,
          $colorWeight,
          $margin,
          $lineHeight,
          $letterSpacing,
          style,
        },
        {
          size: "m",
          weight: "500",
          margin: "0 0 0.25em 0",
        },
      )}
      {...rest}
    >
      {children}
    </h3>
  );
};

export const P = ({ className, children, ...props }: PTagProps) => {
  const {
    $size,
    $weight,
    $color,
    $colorWeight,
    $margin,
    $lineHeight,
    $letterSpacing,
    style,
    ...rest
  } = props;

  return (
    <p
      className={cn("leading-normal tracking-normal", className)}
      style={resolveTextStyles(
        {
          $size,
          $weight,
          $color,
          $colorWeight,
          $margin,
          $lineHeight,
          $letterSpacing,
          style,
        },
        {
          size: "2xs",
          weight: "400",
          margin: "0",
        },
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export const Span = ({ className, children, ...props }: SpanTagProps) => {
  const {
    $size,
    $weight,
    $color,
    $colorWeight,
    $margin,
    $lineHeight,
    $letterSpacing,
    style,
    ...rest
  } = props;

  return (
    <span
      className={cn("leading-normal tracking-normal", className)}
      style={resolveTextStyles(
        {
          $size,
          $weight,
          $color,
          $colorWeight,
          $margin,
          $lineHeight,
          $letterSpacing,
          style,
        },
        {
          size: "1xs",
          weight: "400",
          margin: "0",
        },
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export const Hr = ({ className, ...props }: HrTagProps) => {
  const { $margin, style, ...rest } = props;

  return (
    <hr
      className={cn("w-full border-0", className)}
      style={{
        margin: $margin ?? "0",
        border: "1px solid var(--color-gray-100)",
        ...style,
      }}
      {...rest}
    />
  );
};
