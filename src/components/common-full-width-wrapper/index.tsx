import {
  containerSize,
  containerStyles,
  wrapperStyles,
} from "@components/common-full-width-wrapper/styles";
import {
  FullWidthWrapper,
  FullWidthWrapperProps,
} from "@kami-ui/react-components";
import { PropsWithChildren, Ref, RefObject } from "react";

interface CommonFullWidthWrapperProps {
  className?: string;
  element?: FullWidthWrapperProps["element"];
  wrapperCss?: FullWidthWrapperProps["wrapperCss"];
  wrapperProps?: FullWidthWrapperProps["wrapperProps"];
  bg?: string;
  ref?: RefObject<HTMLElement>;
}

const CommonFullWidthWrapper = (
  {
    className,
    children,
    element = "section",
    wrapperCss,
    wrapperProps,
    bg,
  }: PropsWithChildren<CommonFullWidthWrapperProps>,
  ref: Ref<HTMLElement>,
) => {
  return (
    <FullWidthWrapper
      wrapperProps={wrapperProps!}
      className={className}
      css={containerStyles}
      wrapperCss={[wrapperStyles(bg), wrapperCss] as any}
      containerSize={containerSize}
      element={element}
      ref={ref}
    >
      {children}
    </FullWidthWrapper>
  );
};

export default CommonFullWidthWrapper;
