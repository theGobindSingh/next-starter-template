"use client";

import {
  Step1Product,
  Step2Visual,
  Step3Color,
  Step4Agent,
  Step5Structure,
  Step6DesignDocs,
  Step7Live,
  Step8Review,
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
      {currentStep === 3 && <Step3Color />}
      {currentStep === 4 && <Step4Agent />}
      {currentStep === 5 && <Step5Structure />}
      {currentStep === 6 && <Step6DesignDocs />}
      {currentStep === 7 && <Step7Live />}
      {currentStep === 8 && <Step8Review />}
    </div>
  );
};
