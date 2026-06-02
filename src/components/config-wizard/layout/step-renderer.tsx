"use client";

import {
  Step1Product,
  Step2Visual,
  Step3Agent,
  Step4DesignDocs,
  Step5Live,
  Step6Review,
  WelcomeStep,
} from "../steps";

interface StepRendererProps {
  currentStep: number;
  onStart: () => void;
}

export const StepRenderer = ({ currentStep, onStart }: StepRendererProps) => {
  return (
    <div className="flex-1">
      {currentStep === 0 && <WelcomeStep onStart={onStart} />}
      {currentStep === 1 && <Step1Product />}
      {currentStep === 2 && <Step2Visual />}
      {currentStep === 3 && <Step3Agent />}
      {currentStep === 4 && <Step4DesignDocs />}
      {currentStep === 5 && <Step5Live />}
      {currentStep === 6 && <Step6Review />}
    </div>
  );
};
