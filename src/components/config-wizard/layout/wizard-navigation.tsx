"use client";

import {
  CheckmarkThinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
} from "@/icons";
import { Button } from "@components/button";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  generatedPrompt: string;
  copied: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGenerate: () => void;
  onCopy: () => void;
  onReset: () => void;
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
  onReset,
}: WizardNavigationProps) => {
  if (currentStep === 0) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-grey-300">
      <Button
        variant="outlined"
        size="lg"
        className="text-xs font-mono tracking-widest uppercase border-grey-300 text-grey-900 hover:bg-grey-200"
        onClick={onPrev}
      >
        <ChevronLeftIcon />
        Back
      </Button>

      <Button
        variant="text"
        size="sm"
        className="text-[11px] font-mono tracking-widest uppercase text-grey-500 hover:text-red-500"
        onClick={onReset}
      >
        Reset
      </Button>

      <div className="flex items-center gap-3">
        {currentStep === totalSteps ? (
          <>
            <Button
              variant="filled"
              color="accent"
              size="lg"
              className="px-6 text-xs font-mono tracking-widest uppercase"
              onClick={onGenerate}
            >
              Generate Prompt
            </Button>
            {generatedPrompt && (
              <Button
                variant="outlined"
                size="lg"
                className="px-6 text-xs font-mono tracking-widest uppercase border-grey-300 text-grey-900 hover:bg-grey-200"
                onClick={onCopy}
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
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="filled"
            color="accent"
            size="lg"
            className="px-6 text-xs font-mono tracking-widest uppercase"
            onClick={onNext}
          >
            Next
            <ChevronRightIcon />
          </Button>
        )}
      </div>
    </div>
  );
};
