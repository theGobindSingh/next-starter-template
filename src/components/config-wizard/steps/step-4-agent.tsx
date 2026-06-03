"use client";

import { CheckmarkSmallIcon } from "@/icons";
import { useCallback } from "react";
import { useWizard } from "../hooks/use-wizard";
import { Select, Textarea } from "./form-elements";

const TESTING_OPTIONS = [
  { value: "none", label: "None" },
  { value: "vitest", label: "Vitest" },
  { value: "jest", label: "Jest" },
  { value: "playwright", label: "Playwright" },
];

const DEPLOY_OPTIONS = [
  { value: "vercel", label: "Vercel" },
  { value: "netlify", label: "Netlify" },
  { value: "docker", label: "Docker" },
  { value: "other", label: "Other" },
];

const COMPLIANCE_OPTIONS = [
  { value: "SOC2", label: "SOC 2" },
  { value: "HIPAA", label: "HIPAA" },
  { value: "GDPR", label: "GDPR" },
];

export const Step4Agent = () => {
  const { state, dispatch } = useWizard();

  const toggleCompliance = useCallback(
    (value: string) => {
      const current = state.compliance;
      const next = current.includes(value)
        ? current.filter((v) => {
            return v !== value;
          })
        : [...current, value];
      dispatch({ type: "SET_COMPLIANCE", value: next });
    },
    [state.compliance, dispatch],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900">
          Agent Configuration
        </h2>
        <p className="font-serif text-sm text-grey-500 mt-1">
          Tell AI assistants how to work in your project.
        </p>
      </div>

      <Textarea
        label="Product/Domain Context"
        value={state.productContext}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "productContext",
            value: v,
          });
        }}
        placeholder="Describe your product domain and glossary for AI agents."
        rows={4}
      />
      <Select
        label="Testing Framework"
        value={state.testingFramework}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "testingFramework",
            value: v,
          });
        }}
        options={TESTING_OPTIONS}
      />
      <Select
        label="Deployment Target"
        value={state.deploymentTarget}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "deploymentTarget",
            value: v,
          });
        }}
        options={DEPLOY_OPTIONS}
      />

      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
          Security & Compliance
        </p>
        <div className="flex flex-wrap gap-3">
          {COMPLIANCE_OPTIONS.map((opt) => {
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                  state.compliance.includes(opt.value)
                    ? "border-accent bg-accent/10 text-grey-900"
                    : "border-grey-300 bg-grey-100 text-grey-500 hover:border-accent/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={state.compliance.includes(opt.value)}
                  onChange={() => {
                    return toggleCompliance(opt.value);
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    state.compliance.includes(opt.value)
                      ? "bg-accent border-accent"
                      : "border-grey-300"
                  }`}
                >
                  {state.compliance.includes(opt.value) && (
                    <CheckmarkSmallIcon stroke="white" />
                  )}
                </div>
                <span className="font-mono text-xs font-medium">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
