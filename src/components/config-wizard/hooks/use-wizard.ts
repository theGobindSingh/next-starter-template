"use client";

import { createContext, use } from "react";
import type { WizardContextValue } from "../types";

export const WizardContext = createContext<WizardContextValue | null>(null);

export const useWizard = (): WizardContextValue => {
  const ctx = use(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
};
