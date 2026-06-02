"use client";

import { generatePrompt } from "@/lib/prompt-generator";
import { copyToClipboard } from "@utils/clipboard";
import { useCallback, useMemo, useRef, useState } from "react";
import { useKeyboardNavigation } from "../hooks/use-keyboard-navigation";
import { useWizard } from "../hooks/use-wizard";
import { WizardSidebar } from "../sidebar/wizard-sidebar";
import { GeneratedPrompt } from "./generated-prompt";
import { ProgressBar } from "./progress-bar";
import { StepRenderer } from "./step-renderer";
import { UnsavedWarning } from "./unsaved-warning";
import { WizardNavigation } from "./wizard-navigation";

const ConfigWizard = () => {
  const {
    currentStep,
    dispatch,
    nextStep,
    prevStep,
    setStep,
    state,
    totalSteps,
  } = useWizard();
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [sidebarTab, setSidebarTab] = useState<"preview" | "colors">("preview");
  const [showUnsaved, setShowUnsaved] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
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

  useKeyboardNavigation(currentStep, totalSteps, nextStep, prevStep);

  const hasChanges = useMemo(() => {
    return state.brandName !== "" || state.productDescription !== "";
  }, [state]);

  const handleGenerate = useCallback(() => {
    setGeneratedPrompt(generatePrompt(state));
  }, [state]);

  const handleStepClick = useCallback(
    (step: number) => {
      if (hasChanges && step !== currentStep) {
        setShowUnsaved(true);
        setPendingStep(step);
      } else {
        setStep(step);
      }
    },
    [hasChanges, currentStep, setStep],
  );

  const handleNavigate = useCallback(() => {
    // reset state to discard current form changes
    dispatch({ type: "RESET" });
    if (pendingStep !== null) {
      setStep(pendingStep);
    }
    setShowUnsaved(false);
    setPendingStep(null);
  }, [pendingStep, setStep, dispatch]);

  const handleSaveAndNavigate = useCallback(() => {
    // data is already persisted in wizard state via dispatch
    if (pendingStep !== null) {
      setStep(pendingStep);
    }
    setShowUnsaved(false);
    setPendingStep(null);
  }, [pendingStep, setStep]);

  const handleCancel = useCallback(() => {
    setShowUnsaved(false);
    setPendingStep(null);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100dvh-2rem)] gap-4">
      <div className="flex-1 flex flex-col">
        <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />

        <UnsavedWarning
          show={showUnsaved}
          onNavigate={handleNavigate}
          onSaveAndNavigate={handleSaveAndNavigate}
          onCancel={handleCancel}
        />

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
