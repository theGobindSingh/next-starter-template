"use client";

import { useCallback } from "react";
import { useWizard } from "../hooks/use-wizard";
import { Select } from "./form-elements";

type NamingValue = "kebab-case" | "camelCase" | "PascalCase";
type PlacementValue = "hybrid" | "all-global" | "page-only";

const NAMING_OPTIONS = [
  {
    value: "kebab-case" satisfies NamingValue,
    label: "kebab-case (recommended)",
  },
  { value: "camelCase" satisfies NamingValue, label: "camelCase" },
  { value: "PascalCase" satisfies NamingValue, label: "PascalCase" },
];

const PLACEMENT_OPTIONS = [
  {
    value: "hybrid" satisfies PlacementValue,
    label: "Hybrid (recommended)",
  },
  { value: "all-global" satisfies PlacementValue, label: "All Global" },
  { value: "page-only" satisfies PlacementValue, label: "All Co-located" },
];

export const Step5Structure = () => {
  const { state, dispatch } = useWizard();

  const toggleBoolean = useCallback(
    (field: "folderPerComponent") => {
      dispatch({
        type: "SET_FIELD",
        field,
        value: !state[field],
      });
    },
    [state, dispatch],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900">
          Project Structure &amp; Conventions
        </h2>
        <p className="font-serif text-sm text-grey-500 mt-1">
          Define how files, folders, and components are organised.
        </p>
      </div>

      <Select
        label="Naming Convention"
        value={state.namingConvention}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "namingConvention",
            value: v,
          });
        }}
        options={NAMING_OPTIONS}
      />
      <div className="rounded-lg border border-grey-300/50 bg-grey-200/50 p-3">
        <p className="font-serif text-xs text-grey-500 leading-relaxed">
          All file and folder names use this convention —{" "}
          <code className="font-mono text-[11px] bg-grey-100 px-1 py-0.5 rounded text-grey-900">
            my-component.tsx
          </code>{" "}
          vs{" "}
          <code className="font-mono text-[11px] bg-grey-100 px-1 py-0.5 rounded text-grey-900">
            myComponent.tsx
          </code>{" "}
          vs{" "}
          <code className="font-mono text-[11px] bg-grey-100 px-1 py-0.5 rounded text-grey-900">
            MyComponent.tsx
          </code>
          .
        </p>
      </div>

      <Select
        label="Component Placement"
        value={state.componentPlacement}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "componentPlacement",
            value: v,
          });
        }}
        options={PLACEMENT_OPTIONS}
      />
      <div className="rounded-lg border border-grey-300/50 bg-grey-200/50 p-3">
        {state.componentPlacement === "hybrid" && (
          <p className="font-serif text-xs text-grey-500 leading-relaxed">
            Global/reusable components live in{" "}
            <code className="font-mono text-[11px] bg-grey-100 px-1 py-0.5 rounded text-grey-900">
              src/components/
            </code>
            . Page-specific components are co-located in{" "}
            <code className="font-mono text-[11px] bg-grey-100 px-1 py-0.5 rounded text-grey-900">
              app/&lt;route&gt;/components/
            </code>
            .
          </p>
        )}
        {state.componentPlacement === "all-global" && (
          <p className="font-serif text-xs text-grey-500 leading-relaxed">
            Every component lives in{" "}
            <code className="font-mono text-[11px] bg-grey-100 px-1 py-0.5 rounded text-grey-900">
              src/components/
            </code>
            , organised by feature or domain subfolder.
          </p>
        )}
        {state.componentPlacement === "page-only" && (
          <p className="font-serif text-xs text-grey-500 leading-relaxed">
            Each route owns its components in{" "}
            <code className="font-mono text-[11px] bg-grey-100 px-1 py-0.5 rounded text-grey-900">
              app/&lt;route&gt;/
            </code>
            . No global shared component folder.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
          Module Patterns
        </p>

        <label className="flex items-center gap-3 cursor-pointer">
          <button
            role="switch"
            aria-checked={state.folderPerComponent}
            onClick={() => {
              return toggleBoolean("folderPerComponent");
            }}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors shrink-0 ${
              state.folderPerComponent ? "bg-accent" : "bg-border"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                state.folderPerComponent
                  ? "translate-x-[22px]"
                  : "translate-x-[2px]"
              } mt-[2px]`}
            />
          </button>
          <div>
            <span className="font-serif text-sm text-grey-900">
              Folder-per-Component
            </span>
            <p className="font-serif text-[11px] text-grey-500">
              Each component gets its own folder with co-located styles, types,
              and tests
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};
