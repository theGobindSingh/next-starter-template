"use client";

import { CheckmarkIcon, CopyIcon } from "@/icons";
import { useCallback, useState } from "react";
import { CSS_ELEMENTS, ROOT_CSS } from "./color-css-data";

export const ColorCSSPanel = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(ROOT_CSS)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          return setCopied(false);
        }, 2000);
      })
      .catch(() => {
        const ta = document.createElement("textarea");
        ta.value = ROOT_CSS;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => {
          return setCopied(false);
        }, 2000);
      });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface shrink-0">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
          :root Colors
        </p>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-border text-ink hover:bg-elevated transition-colors"
        >
          {copied ? (
            <>
              <CheckmarkIcon />
              Copied
            </>
          ) : (
            <>
              <CopyIcon />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="font-mono text-xs leading-relaxed text-ink whitespace-pre-wrap break-all">
          {CSS_ELEMENTS}
        </pre>
      </div>
    </div>
  );
};
