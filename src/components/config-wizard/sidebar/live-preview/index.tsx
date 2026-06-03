"use client";

import { CheckmarkIcon, CopyIcon } from "@/icons";
import { estimateTokens, generatePrompt } from "@/lib/prompt-generator";
import { copyToClipboard } from "@/utils/clipboard";
import { Button } from "@components/button";
import { useCallback, useMemo, useState } from "react";
import { useWizard } from "../../hooks/use-wizard";
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-grey-300 bg-grey-200 shrink-0">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
          Live Preview
        </p>
        <div className="flex items-center gap-2">
          <p className="font-mono text-[10px] text-grey-500/60">
            ~{tokens} tokens
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
      </div>
      <div className="flex-1 overflow-auto px-4 pb-8 pt-4">
        <pre className="font-mono text-xs leading-relaxed text-grey-900 whitespace-pre-wrap break-words">
          <PromptHighlighter text={prompt} />
        </pre>
      </div>
    </div>
  );
};
