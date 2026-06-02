import {
  createElement,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

type WrapperElementProps = HTMLAttributes<HTMLElement>;

export interface CommonFullWidthWrapperProps {
  children?: ReactNode;
  className?: string;
  element?: ElementType;
  wrapperCss?: CSSProperties;
  wrapperProps?: WrapperElementProps;
  bg?: string;
  ref?: Ref<HTMLElement>;
}

type WrapperStyle = CSSProperties;

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const CommonFullWidthWrapper = ({
  children,
  className,
  element = "section",
  wrapperCss,
  wrapperProps,
  bg,
  ref,
}: CommonFullWidthWrapperProps) => {
  const {
    className: wrapperClassName,
    style: wrapperStyle,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const mergedWrapperStyle: WrapperStyle = bg
    ? {
        width: "100%",
        background: bg,
        ...wrapperCss,
        ...wrapperStyle,
      }
    : {
        width: "100%",
        ...wrapperCss,
        ...wrapperStyle,
      };

  return (
    <div
      className={cn(className, wrapperClassName)}
      style={mergedWrapperStyle}
      {...restWrapperProps}
    >
      {createElement(
        element,
        {
          ref,
          className: "mx-auto w-[85%] max-[1024px]:w-[90%]",
        },
        children,
      )}
    </div>
  );
};

CommonFullWidthWrapper.displayName = "CommonFullWidthWrapper";

export default CommonFullWidthWrapper;
