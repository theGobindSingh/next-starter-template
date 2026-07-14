"use client";

import { CheckmarkIcon, CopyIcon } from "@/icons";
import { estimateTokens, generatePrompt } from "@/lib/prompt-generator";
import { copyToClipboard } from "@/utils/clipboard";
import { Button } from "@components/button";
import { useCallback, useMemo, useState } from "react";
import { useWizard } from "../../hooks/use-wizard";
import { PanelShell } from "../panel-shell";
import { PromptHighlighter } from "./prompt-highlighter";

export const LivePreview = () => {
  const { state } = useWizard();
  const prompt = useMemo(() => {
    return generatePrompt(state);
  }, [state]);
  const tokens = useMemo(() => {
    return estimateTokens(prompt);
  }, [prompt]);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copyToClipboard(prompt)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          return setCopied(false);
        }, 2000);
      })
      .catch(() => {
        return undefined;
      });
  }, [prompt]);

  return (
    <PanelShell
      title="Live Preview"
      headerRight={
        <>
          <p className="font-mono text-[10px] text-grey-500/60">
            ~{tokens} tokens
          </p>
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
        </>
      }
    >
      <PromptHighlighter text={prompt} />
    </PanelShell>
  );
};
