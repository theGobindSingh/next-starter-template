"use client";

import { CheckmarkSmallIcon } from "@/icons";
import { STEP_LABELS } from "../constants";

interface ProgressBarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const ProgressBar = ({ currentStep, onStepClick }: ProgressBarProps) => {
  return (
    <div className="flex items-center gap-1 mb-6 px-1 overflow-x-auto">
      {STEP_LABELS.map((label, i) => {
        const isActive = i === currentStep;
        const isComplete = i < currentStep;
        return (
          <button
            key={label}
            onClick={() => {
              return onStepClick(i);
            }}
            className={`flex items-center gap-1.5 shrink-0 px-2 py-1.5 rounded-lg transition-colors ${
              isActive
                ? "bg-accent/10 text-accent"
                : isComplete
                  ? "text-grey-900"
                  : "text-grey-500/40"
            }`}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono font-bold border ${
                isActive
                  ? "border-accent bg-accent text-black"
                  : isComplete
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-grey-300"
              }`}
            >
              {isComplete ? <CheckmarkSmallIcon /> : i}
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-widest uppercase hidden sm:inline">
              {i === 0 ? "Start" : label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
