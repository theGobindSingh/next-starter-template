"use client";

import { FONT_OPTIONS } from "@/lib/fonts/font-options";
import { SearchableSelect } from "@components/config-wizard/steps/searchable-select";
import { useWizard } from "../hooks/use-wizard";
import { Select } from "./form-elements";

export const Step2Visual = () => {
  const { state, dispatch } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900">
          Visual Tokens
        </h2>
        <p className="font-serif text-sm text-grey-500 mt-1">
          Customize typography and spacing for your brand.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-xs font-semibold tracking-widest uppercase text-accent">
          Typography
        </h3>
        {(["display", "body", "label", "cursive"] as const).map((role) => {
          return (
            <SearchableSelect
              key={role}
              label={`${role.charAt(0).toUpperCase() + role.slice(1)} Font`}
              value={state.fonts[role]}
              onChange={(v) => {
                return dispatch({ type: "SET_FONT", role, value: v });
              }}
              options={FONT_OPTIONS}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-xs font-semibold tracking-widest uppercase text-accent">
          Tokens
        </h3>

        <div className="flex justify-center py-6">
          <div
            className="h-24 w-48 bg-grey-50 border border-grey-300 flex items-center justify-center font-mono text-xs text-grey-500 transition-all duration-150"
            style={{
              borderRadius: `${state.borderRadius}px`,
              boxShadow: [
                "none",
                "1px 1px 3px hsl(var(--shadow-hsl) / 0.15)",
                "2px 2px 6px hsl(var(--shadow-hsl) / 0.2)",
                "3px 4px 10px hsl(var(--shadow-hsl) / 0.25)",
                "4px 6px 14px hsl(var(--shadow-hsl) / 0.3)",
                "6px 8px 20px hsl(var(--shadow-hsl) / 0.35)",
              ][state.shadowIntensity],
            }}
          >
            Radius {state.borderRadius}px · Shadow {state.shadowIntensity}/5
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
              Border Radius: {state.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={state.borderRadius}
              onChange={(e) => {
                return dispatch({
                  type: "SET_FIELD",
                  field: "borderRadius",
                  value: Number(e.target.value),
                });
              }}
              className="w-full accent-gold"
              aria-label="Border radius slider"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
              Shadow Intensity: {state.shadowIntensity}/5
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={state.shadowIntensity}
              onChange={(e) => {
                return dispatch({
                  type: "SET_FIELD",
                  field: "shadowIntensity",
                  value: Number(e.target.value),
                });
              }}
              className="w-full accent-gold"
              aria-label="Shadow intensity slider"
            />
          </div>
          <Select
            label="Motion Speed"
            value={state.motionSpeed}
            onChange={(v) => {
              return dispatch({
                type: "SET_FIELD",
                field: "motionSpeed",
                value: v,
              });
            }}
            options={[
              { value: "slow", label: "Slow" },
              { value: "normal", label: "Normal" },
              { value: "fast", label: "Fast" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
