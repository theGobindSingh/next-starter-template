"use client";

import {
  CheckmarkThinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
} from "@/icons";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  generatedPrompt: string;
  copied: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGenerate: () => void;
  onCopy: () => void;
}

export const WizardNavigation = ({
  currentStep,
  totalSteps,
  generatedPrompt,
  copied,
  onPrev,
  onNext,
  onGenerate,
  onCopy,
}: WizardNavigationProps) => {
  if (currentStep === 0) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
      <button
        onClick={onPrev}
        className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-lg border border-border text-ink hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
      >
        <ChevronLeftIcon />
        Back
      </button>

      <div className="flex items-center gap-3">
        {currentStep === totalSteps ? (
          <>
            <button
              onClick={onGenerate}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-lg bg-gold text-black hover:bg-gold-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
            >
              Generate Prompt
            </button>
            {generatedPrompt && (
              <button
                onClick={onCopy}
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-lg border border-border text-ink hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
              >
                {copied ? (
                  <>
                    <CheckmarkThinIcon />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon />
                    Copy
                  </>
                )}
              </button>
            )}
          </>
        ) : (
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-lg bg-gold text-black hover:bg-gold-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
          >
            Next
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};
