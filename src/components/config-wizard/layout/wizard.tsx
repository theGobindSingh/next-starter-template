"use client";

import { generatePrompt } from "@/lib/prompt-generator";
import { copyToClipboard } from "@utils/clipboard";
import { useCallback, useRef, useState } from "react";
import { useWizard } from "../hooks/use-wizard";
import { WizardSidebar } from "../sidebar/wizard-sidebar";
import { GeneratedPrompt } from "./generated-prompt";
import { ProgressBar } from "./progress-bar";
import { StepRenderer } from "./step-renderer";
import { WizardNavigation } from "./wizard-navigation";

const ConfigWizard = () => {
  const {
    currentStep,
    state,
    dispatch,
    nextStep,
    prevStep,
    setStep,
    totalSteps,
  } = useWizard();
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [sidebarTab, setSidebarTab] = useState<"preview" | "colors">("preview");
  const promptRef = useRef<HTMLPreElement>(null);

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = generatedPrompt || generatePrompt(state);
    copyToClipboard(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          return setCopied(false);
        }, 2000);
      })
      .catch(() => {
        return undefined;
      });
  }, [generatedPrompt, state]);

  const handleGenerate = useCallback(() => {
    setGeneratedPrompt(generatePrompt(state));
  }, [state]);

  const handleReset = useCallback(() => {
    if (!window.confirm("Reset all wizard settings?")) return;
    dispatch({ type: "RESET" });
    setStep(0);
    setGeneratedPrompt("");
  }, [dispatch, setStep]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100dvh-2rem)] gap-4">
      <div className="flex-1 flex flex-col">
        <ProgressBar currentStep={currentStep} onStepClick={setStep} />

        <StepRenderer currentStep={currentStep} onStart={nextStep} />

        <WizardNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          generatedPrompt={generatedPrompt}
          copied={copied}
          onPrev={prevStep}
          onNext={nextStep}
          onGenerate={handleGenerate}
          onCopy={handleCopy}
          onReset={handleReset}
        />

        {generatedPrompt && currentStep === totalSteps && (
          <GeneratedPrompt prompt={generatedPrompt} promptRef={promptRef} />
        )}
      </div>

      <WizardSidebar activeTab={sidebarTab} onTabChange={setSidebarTab} />
    </div>
  );
};

export default ConfigWizard;
