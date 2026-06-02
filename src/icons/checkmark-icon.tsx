import type { SVGProps } from "react";

export const CheckmarkIcon = ({
  width = "1em",
  height = "1em",
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 10"
      fill="none"
      {...props}
    >
      <path
        d="M1 5l3.5 4L11 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
