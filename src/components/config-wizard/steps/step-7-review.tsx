"use client";

import { useWizard } from "../hooks/use-wizard";

export const Step6Review = () => {
  const { state, dispatch } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-ink">
          Review Your Configuration
        </h2>
        <p className="font-serif text-sm text-muted mt-1">
          Verify everything before generating your prompt.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border p-4 bg-surface">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-gold mb-2">
            Product
          </p>
          <p className="font-sans text-sm font-semibold text-ink">
            {state.brandName || "—"}
          </p>
          {state.tagline && (
            <p className="font-serif text-xs text-muted mt-0.5">
              {state.tagline}
            </p>
          )}
          <p className="font-mono text-[10px] text-muted/60 mt-1">
            WCAG 2.1 {state.accessibilityLevel}
          </p>
        </div>
        <div className="rounded-lg border border-border p-4 bg-surface">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-gold mb-2">
            Typography
          </p>
          <p className="font-serif text-xs text-muted">
            Display:{" "}
            <span className="font-sans text-sm font-semibold text-ink">
              {state.fonts.display}
            </span>
          </p>
          <p className="font-serif text-xs text-muted">
            Body:{" "}
            <span className="font-sans text-sm text-ink">
              {state.fonts.body}
            </span>
          </p>
          <p className="font-serif text-xs text-muted">
            Label:{" "}
            <span className="font-sans text-sm text-ink">
              {state.fonts.label}
            </span>
          </p>
        </div>
        <div className="rounded-lg border border-border p-4 bg-surface">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-gold mb-2">
            Tokens
          </p>
          <p className="font-serif text-xs text-muted">
            Radius: <span className="text-ink">{state.borderRadius}px</span>
          </p>
          <p className="font-serif text-xs text-muted">
            Shadow: <span className="text-ink">{state.shadowIntensity}/5</span>
          </p>
          <p className="font-serif text-xs text-muted">
            Motion: <span className="text-ink">{state.motionSpeed}</span>
          </p>
        </div>
        <div className="rounded-lg border border-border p-4 bg-surface">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-gold mb-2">
            Agent
          </p>
          <p className="font-serif text-xs text-muted">
            Test: <span className="text-ink">{state.testingFramework}</span>
          </p>
          <p className="font-serif text-xs text-muted">
            Deploy: <span className="text-ink">{state.deploymentTarget}</span>
          </p>
          {state.compliance.length > 0 && (
            <p className="font-serif text-xs text-muted">
              Compliance:{" "}
              <span className="text-ink">{state.compliance.join(", ")}</span>
            </p>
          )}
        </div>
        <div className="rounded-lg border border-border p-4 bg-surface">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-gold mb-2">
            Description
          </p>
          <p className="font-serif text-sm text-muted">
            {state.productDescription || "—"}
          </p>
        </div>
        <div className="rounded-lg border border-border p-4 bg-surface">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-gold mb-2">
            Design Docs
          </p>
          <p className="font-serif text-xs text-muted">
            North Star:{" "}
            <span className="text-ink">{state.creativeNorthStar}</span>
          </p>
          {state.designOverview && (
            <p className="font-serif text-xs text-muted mt-1">
              {state.designOverview}
            </p>
          )}
        </div>
        <div className="rounded-lg border border-border p-4 bg-surface">
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-gold mb-2">
            Live Mode
          </p>
          <p className="font-serif text-xs text-muted">
            {state.liveMode ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            return dispatch({ type: "RESET" });
          }}
          className="font-mono text-xs font-semibold tracking-widest uppercase text-muted hover:text-error transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};
