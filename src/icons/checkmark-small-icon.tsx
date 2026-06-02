import type { SVGProps } from "react";

export const CheckmarkSmallIcon = ({
  width = "1em",
  height = "1em",
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 8"
      fill="none"
      {...props}
    >
      <path
        d="M1 4l2.5 3L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
