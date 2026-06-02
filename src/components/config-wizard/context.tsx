"use client";

import { useCallback, useReducer, type ReactNode } from "react";
import { DEFAULT_STATE } from "./constants";
import { WizardContext } from "./hooks/use-wizard";
import type { Action } from "./types";

const wizardReducer = (
  state: typeof DEFAULT_STATE,
  action: Action,
): typeof DEFAULT_STATE => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_FONT":
      return {
        ...state,
        fonts: { ...state.fonts, [action.role]: action.value },
      };

    case "SET_COMPLIANCE":
      return { ...state, compliance: action.value };

    case "RESET":
      return DEFAULT_STATE;

    default:
      return state;
  }
};

interface WizardProviderProps {
  children: ReactNode;
}

export const WizardProvider = ({ children }: WizardProviderProps) => {
  const [state, dispatch] = useReducer(wizardReducer, DEFAULT_STATE);
  const [currentStep, setCurrentStep] = useReducer(
    (_prev: number, next: number) => {
      return Math.max(0, Math.min(next, 5));
    },
    0,
  );

  const nextStep = useCallback(() => {
    setCurrentStep(Math.min(currentStep + 1, 5));
  }, [currentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  }, [currentStep]);

  return (
    <WizardContext
      value={{
        state,
        dispatch,
        currentStep,
        setStep: setCurrentStep,
        nextStep,
        prevStep,
        totalSteps: 6,
      }}
    >
      {children}
    </WizardContext>
  );
};
