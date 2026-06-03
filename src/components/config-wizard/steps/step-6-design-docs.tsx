"use client";

import { useCallback, useId, useMemo } from "react";
import { NORTH_STAR_INFO } from "../constants";
import { useWizard } from "../hooks/use-wizard";
import { Textarea } from "./form-elements";

const NORTH_STAR_OPTIONS = [
  { value: "The Monograph", label: "The Monograph" },
  { value: "The Gallery", label: "The Gallery" },
  { value: "The Editorial Sanctuary", label: "The Editorial Sanctuary" },
  { value: "The Golden State Curator", label: "The Golden State Curator" },
  { value: "The Lab Notebook", label: "The Lab Notebook" },
  { value: "The Studio", label: "The Studio" },
  { value: "The Archive", label: "The Archive" },
  { value: "The Workshop", label: "The Workshop" },
  { value: "The Canvas", label: "The Canvas" },
  { value: "The Atelier", label: "The Atelier" },
  { value: "The Blueprint", label: "The Blueprint" },
  { value: "The Library", label: "The Library" },
  { value: "__custom__", label: "Write your own…" },
] as const;

const CUSTOM_VALUE = "__custom__";

export const Step6DesignDocs = () => {
  const { state, dispatch } = useWizard();
  const selectId = useId();
  const inputId = useId();

  const selectedPreset = useMemo(() => {
    if (!state.creativeNorthStar) {
      return "";
    }
    const found = NORTH_STAR_OPTIONS.find((opt) => {
      return opt.value === state.creativeNorthStar;
    });
    return found ? found.value : CUSTOM_VALUE;
  }, [state.creativeNorthStar]);

  const isCustom = selectedPreset === CUSTOM_VALUE;

  const handleSelect = useCallback(
    (value: string) => {
      if (value === CUSTOM_VALUE) {
        dispatch({
          type: "SET_FIELD",
          field: "creativeNorthStar",
          value: "",
        });
      } else {
        dispatch({
          type: "SET_FIELD",
          field: "creativeNorthStar",
          value,
        });
      }
    },
    [dispatch],
  );

  const handleCustomChange = useCallback(
    (v: string) => {
      dispatch({
        type: "SET_FIELD",
        field: "creativeNorthStar",
        value: v,
      });
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900">
          Design System Docs
        </h2>
        <p className="font-serif text-sm text-grey-500 mt-1">
          Define your visual direction and guardrails.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={selectId}
            className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500"
          >
            Creative North Star Metaphor
          </label>
          <select
            id={selectId}
            value={selectedPreset}
            onChange={(e) => {
              return handleSelect(e.target.value);
            }}
            className="w-full px-3 py-2.5 rounded-lg border border-grey-300 bg-grey-100 text-grey-900 font-serif text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          >
            <option value="" disabled>
              Select a north star…
            </option>
            {NORTH_STAR_OPTIONS.map((opt) => {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              );
            })}
          </select>
        </div>
        {isCustom && (
          <input
            id={inputId}
            type="text"
            value={state.creativeNorthStar}
            onChange={(e) => {
              return handleCustomChange(e.target.value);
            }}
            placeholder='e.g. "The Monograph", "The Gallery"'
            className="w-full px-3 py-2.5 rounded-lg border border-grey-300 bg-grey-100 text-grey-900 font-serif text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors placeholder:text-grey-500/60"
          />
        )}
        {state.creativeNorthStar && !isCustom && (
          <p className="font-serif text-xs text-grey-500 italic leading-relaxed">
            {NORTH_STAR_INFO[state.creativeNorthStar]}
          </p>
        )}
      </div>

      <Textarea
        label="Design System Overview"
        value={state.designOverview}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "designOverview",
            value: v,
          });
        }}
        placeholder="Describe the overall design approach, philosophy, or key experience goals…"
        rows={3}
      />
      <Textarea
        label="Component Variant Specs"
        value={state.componentVariants}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "componentVariants",
            value: v,
          });
        }}
        placeholder="Describe button variants, card styles, input states…"
        rows={4}
      />
      <Textarea
        label="Do's and Don'ts"
        value={state.dosAndDonts}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "dosAndDonts",
            value: v,
          });
        }}
        placeholder="List design guardrails — what to do and what to avoid."
        rows={4}
      />
    </div>
  );
};
