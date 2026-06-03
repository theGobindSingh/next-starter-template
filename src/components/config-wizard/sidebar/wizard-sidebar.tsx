"use client";

import { ColorCSSPanel } from "./color-css-panel";
import { LivePreview } from "./live-preview";

interface WizardSidebarProps {
  activeTab: "preview" | "colors";
  onTabChange: (tab: "preview" | "colors") => void;
}

export const WizardSidebar = ({
  activeTab,
  onTabChange,
}: WizardSidebarProps) => {
  return (
    <div className="hidden lg:flex w-96 shrink-0 self-start sticky top-4 flex-col rounded-xl border border-grey-300 bg-grey-200 overflow-hidden h-[calc(100dvh-8rem)]">
      <div className="flex border-b border-grey-300 shrink-0">
        <button
          onClick={() => {
            return onTabChange("preview");
          }}
          className={`flex-1 px-4 py-2.5 font-mono text-[10px] font-semibold tracking-widest uppercase transition-colors ${
            activeTab === "preview"
              ? "bg-accent/10 text-accent border-b-2 border-accent"
              : "text-grey-500 hover:text-grey-900"
          }`}
        >
          Live Preview
        </button>
        <button
          onClick={() => {
            return onTabChange("colors");
          }}
          className={`flex-1 px-4 py-2.5 font-mono text-[10px] font-semibold tracking-widest uppercase transition-colors ${
            activeTab === "colors"
              ? "bg-accent/10 text-accent border-b-2 border-accent"
              : "text-grey-500 hover:text-grey-900"
          }`}
        >
          Global CSS
        </button>
      </div>
      {activeTab === "preview" ? <LivePreview /> : <ColorCSSPanel />}
    </div>
  );
};
