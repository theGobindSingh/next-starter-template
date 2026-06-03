"use client";

import { useWizard } from "../hooks/use-wizard";

export const Step7Live = () => {
  const { state, dispatch } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900">
          Live Mode
        </h2>
        <p className="font-serif text-sm text-grey-500 mt-1">
          Configure in-browser visual iteration.
        </p>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <button
          role="switch"
          aria-checked={state.liveMode}
          onClick={() => {
            return dispatch({
              type: "SET_FIELD",
              field: "liveMode",
              value: !state.liveMode,
            });
          }}
          className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
            state.liveMode ? "bg-accent" : "bg-grey-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
              state.liveMode ? "translate-x-[22px]" : "translate-x-[2px]"
            } mt-[2px]`}
          />
        </button>
        <span className="font-serif text-sm text-grey-900">
          Enable Live Mode
        </span>
      </label>

      <div className="rounded-lg border border-grey-300 p-4 bg-grey-200">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500 mb-2">
          Framework Detection
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span className="font-mono text-sm text-grey-900">
            Next.js App Router
          </span>
          <span className="font-mono text-[10px] text-grey-500 ml-auto">
            auto-detected
          </span>
        </div>
      </div>

      {state.liveMode && (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
          <p className="font-serif text-sm text-grey-900">
            Live mode will be enabled. The AI agent will create{" "}
            <code className="font-mono text-xs bg-grey-200 px-1.5 py-0.5 rounded text-accent">
              .impeccable/live/config.json
            </code>{" "}
            with the appropriate configuration.
          </p>
        </div>
      )}
    </div>
  );
};
