"use client";

import { Button } from "@components/button";
import { useWizard } from "../hooks/use-wizard";

export const Step8Review = () => {
  const { state, dispatch } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900">
          Review Your Configuration
        </h2>
        <p className="font-serif text-sm text-grey-500 mt-1">
          Verify everything before generating your prompt.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Product
          </p>
          <p className="font-sans text-sm font-semibold text-grey-900">
            {state.brandName || "—"}
          </p>
          {state.tagline && (
            <p className="font-serif text-xs text-grey-500 mt-0.5">
              {state.tagline}
            </p>
          )}
          <p className="font-mono text-[10px] text-grey-500/60 mt-1">
            WCAG 2.1 {state.accessibilityLevel}
          </p>
        </div>
        <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Typography
          </p>
          <p className="font-serif text-xs text-grey-500">
            Display:{" "}
            <span className="font-sans text-sm font-semibold text-grey-900">
              {state.fonts.display}
            </span>
          </p>
          <p className="font-serif text-xs text-grey-500">
            Body:{" "}
            <span className="font-sans text-sm text-grey-900">
              {state.fonts.body}
            </span>
          </p>
          <p className="font-serif text-xs text-grey-500">
            Label:{" "}
            <span className="font-sans text-sm text-grey-900">
              {state.fonts.label}
            </span>
          </p>
        </div>
        <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Tokens
          </p>
          <p className="font-serif text-xs text-grey-500">
            Radius:{" "}
            <span className="text-grey-900">{state.borderRadius}px</span>
          </p>
          <p className="font-serif text-xs text-grey-500">
            Shadow:{" "}
            <span className="text-grey-900">{state.shadowIntensity}/5</span>
          </p>
          <p className="font-serif text-xs text-grey-500">
            Motion: <span className="text-grey-900">{state.motionSpeed}</span>
          </p>
        </div>
        <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Agent
          </p>
          <p className="font-serif text-xs text-grey-500">
            Test:{" "}
            <span className="text-grey-900">{state.testingFramework}</span>
          </p>
          <p className="font-serif text-xs text-grey-500">
            Deploy:{" "}
            <span className="text-grey-900">{state.deploymentTarget}</span>
          </p>
          {state.compliance.length > 0 && (
            <p className="font-serif text-xs text-grey-500">
              Compliance:{" "}
              <span className="text-grey-900">
                {state.compliance.join(", ")}
              </span>
            </p>
          )}
        </div>
        <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Description
          </p>
          <p className="font-serif text-sm text-grey-500">
            {state.productDescription || "—"}
          </p>
        </div>
        <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Design Docs
          </p>
          <p className="font-serif text-xs text-grey-500">
            North Star:{" "}
            <span className="text-grey-900">{state.creativeNorthStar}</span>
          </p>
          {state.designOverview && (
            <p className="font-serif text-xs text-grey-500 mt-1">
              {state.designOverview}
            </p>
          )}
        </div>
        <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            Live Mode
          </p>
          <p className="font-serif text-xs text-grey-500">
            {state.liveMode ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="text"
          size="sm"
          className="font-mono tracking-widest uppercase text-grey-500 hover:text-error hover:bg-transparent"
          onClick={() => {
            return dispatch({ type: "RESET" });
          }}
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};
