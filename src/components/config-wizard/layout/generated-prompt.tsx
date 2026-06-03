"use client";

import type { RefObject } from "react";

interface GeneratedPromptProps {
  prompt: string;
  promptRef: RefObject<HTMLPreElement | null>;
}

export const GeneratedPrompt = ({
  prompt,
  promptRef,
}: GeneratedPromptProps) => {
  return (
    <div className="mt-6 rounded-lg border border-grey-300 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-grey-200 border-b border-grey-300">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
          Generated Prompt
        </p>
      </div>
      <pre
        ref={promptRef}
        className="p-4 font-mono text-xs leading-relaxed text-grey-900 whitespace-pre-wrap max-h-[400px] overflow-auto bg-grey-100"
      >
        {prompt}
      </pre>
    </div>
  );
};
