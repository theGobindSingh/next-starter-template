"use client";

import { CheckmarkIcon, CopyIcon } from "@/icons";
import { Button } from "@components/button";
import { useCallback, useMemo, useState } from "react";
import { useWizard } from "../hooks/use-wizard";
import { generateColorCSS, generateCSSElements } from "./color-css-data";

export const ColorCSSPanel = () => {
  const { state } = useWizard();
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => {
    return generateColorCSS(state);
  }, [state]);

  const cssElements = useMemo(() => {
    return generateCSSElements(css);
  }, [css]);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(css)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          return setCopied(false);
        }, 2000);
      })
      .catch(() => {
        const ta = document.createElement("textarea");
        ta.value = css;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => {
          return setCopied(false);
        }, 2000);
      });
  }, [css]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-grey-300 bg-grey-100 shrink-0">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
          Global CSS
        </p>
        <Button
          variant="outlined"
          size="xs"
          className="text-[10px] font-mono tracking-widest uppercase px-3 border-grey-300 text-grey-900 hover:bg-grey-50"
          onClick={handleCopy}
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
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="font-mono text-xs leading-relaxed text-grey-900 whitespace-pre-wrap break-all">
          {cssElements.map((el) => {
            if (el.prop !== undefined) {
              return (
                <span key={el.key} className={el.className}>
                  <span className="text-primary">{el.prop}</span>
                  <span className="text-caution">{el.val}</span>
                </span>
              );
            }
            return (
              <span key={el.key} className={el.className}>
                {el.text}
              </span>
            );
          })}
        </pre>
      </div>
    </div>
  );
};
