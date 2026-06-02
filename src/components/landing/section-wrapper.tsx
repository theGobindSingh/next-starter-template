import type { ReactNode } from "react";
import OrnamentalDivider from "./ornamental-divider";
import type { SectionVariant } from "./types";

interface SectionWrapperProps {
  children: ReactNode;
  variant?: SectionVariant;
  id?: string;
  withDivider?: boolean;
  as?: "section" | "footer";
}

const SectionWrapper = ({
  children,
  variant = "default",
  id,
  withDivider = false,
  as: Tag = "section",
}: SectionWrapperProps) => {
  const bgClass = variant === "surface" ? "surface-bg" : "";

  return (
    <>
      {withDivider && <OrnamentalDivider />}
      <Tag id={id} className={bgClass}>
        <div className="mx-auto w-[85%] max-[1024px]:w-[90%]">{children}</div>
      </Tag>
    </>
  );
};

export default SectionWrapper;
