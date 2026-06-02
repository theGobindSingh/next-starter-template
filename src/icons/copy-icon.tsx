import type { SVGProps } from "react";

export const CopyIcon = ({
  width = "1em",
  height = "1em",
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <rect
        x="3.5"
        y="3.5"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M8.5 3.5V2a1 1 0 00-1-1H3a1 1 0 00-1 1v4.5a1 1 0 001 1h1.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
};
