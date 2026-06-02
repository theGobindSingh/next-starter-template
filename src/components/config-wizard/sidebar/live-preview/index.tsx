"use client";

import { CheckmarkIcon, CopyIcon } from "@/icons";
import { estimateTokens, generatePrompt } from "@/lib/prompt-generator";
import { copyToClipboard } from "@/utils/clipboard";
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface shrink-0">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
          Live Preview
        </p>
        <div className="flex items-center gap-2">
          <p className="font-mono text-[10px] text-muted/60">
            ~{tokens} tokens
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
      </div>
      <div className="flex-1 overflow-auto px-4 pb-8 pt-4">
        <pre className="font-mono text-xs leading-relaxed text-ink whitespace-pre-wrap break-words">
          <PromptHighlighter text={prompt} />
        </pre>
      </div>
    </div>
  );
};
