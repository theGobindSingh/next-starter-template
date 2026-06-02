"use client";

import { useEffect } from "react";

export const useKeyboardNavigation = (
  currentStep: number,
  totalSteps: number,
  onNext: () => void,
  onPrev: () => void,
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (currentStep < totalSteps) onNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (currentStep > 0) onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      return window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, totalSteps, onNext, onPrev]);
};
