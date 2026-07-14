"use client";

import { CheckmarkIcon, CopyIcon } from "@/icons";
import { copyToClipboard } from "@/utils/clipboard";
import { Button } from "@components/button";
import { useCallback, useMemo, useState } from "react";
import { useWizard } from "../hooks/use-wizard";
import { generateColorCSS, generateCSSElements } from "./color-css-data";
import { PanelShell } from "./panel-shell";

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
    copyToClipboard(css)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          return setCopied(false);
        }, 2000);
      })
      .catch(() => {
        return undefined;
      });
  }, [css]);

  return (
    <PanelShell
      title="Global CSS"
      headerRight={
        <Button
          variant="outlined"
          size="sm"
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
      }
    >
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
    </PanelShell>
  );
};
