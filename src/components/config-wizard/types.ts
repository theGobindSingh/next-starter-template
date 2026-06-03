import type { Dispatch } from "react";

export interface WizardState {
  brandName: string;
  tagline: string;
  productDescription: string;
  targetUsers: string;
  brandPersonality: string;
  antiReferences: string;
  accessibilityLevel: "AA" | "AAA";

  fonts: {
    display: string;
    body: string;
    label: string;
    cursive: string;
  };
  borderRadius: number;
  shadowIntensity: number;
  motionSpeed: "slow" | "normal" | "fast";

  primaryColor: string;
  secondaryColor: string;
  overriddenColors: Record<string, string>;

  productContext: string;
  testingFramework: "vitest" | "jest" | "playwright" | "none";
  deploymentTarget: "vercel" | "netlify" | "docker" | "other";
  compliance: string[];

  creativeNorthStar: string;
  designOverview: string;
  componentVariants: string;
  dosAndDonts: string;

  namingConvention: "kebab-case" | "camelCase" | "PascalCase";
  componentPlacement: "hybrid" | "all-global" | "page-only";
  folderPerComponent: boolean;

  liveMode: boolean;
}

export type Action =
  | { type: "SET_FIELD"; field: keyof WizardState; value: unknown }
  | {
      type: "SET_FONT";
      role: "display" | "body" | "label" | "cursive";
      value: string;
    }
  | { type: "SET_COMPLIANCE"; value: string[] }
  | { type: "RESET" }
  | { type: "RESTORE_STATE"; state: WizardState };

export interface WizardContextValue {
  state: WizardState;
  dispatch: Dispatch<Action>;
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
}
