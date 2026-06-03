"use client";

import { useCallback, useEffect, useReducer, type ReactNode } from "react";
import { DEFAULT_STATE } from "./constants";
import { WizardContext } from "./hooks/use-wizard";
import type { Action, WizardState } from "./types";

const WIZARD_KEY = "wizard-state";
const WIZARD_STEP_KEY = "wizard-step";

const wizardReducer = (state: WizardState, action: Action): WizardState => {
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

    case "RESTORE_STATE":
      return {
        ...DEFAULT_STATE,
        ...action.state,
        fonts: { ...DEFAULT_STATE.fonts, ...action.state.fonts },
        overriddenColors: {
          ...DEFAULT_STATE.overriddenColors,
          ...action.state.overriddenColors,
        },
        compliance: Array.isArray(action.state.compliance)
          ? action.state.compliance
          : DEFAULT_STATE.compliance,
      };

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
      return Math.max(0, Math.min(next, 8));
    },
    0,
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WIZARD_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<WizardState>;
        dispatch({ type: "RESTORE_STATE", state: parsed as WizardState });
      }
    } catch {
      /* ignore parse errors */
    }
    try {
      const saved = localStorage.getItem(WIZARD_STEP_KEY);
      if (saved !== null) {
        setCurrentStep(Math.max(0, Math.min(Number(saved), 8)));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WIZARD_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem(WIZARD_STEP_KEY, String(currentStep));
  }, [currentStep]);

  const nextStep = useCallback(() => {
    setCurrentStep(Math.min(currentStep + 1, 8));
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
        totalSteps: 8,
      }}
    >
      {children}
    </WizardContext>
  );
};
