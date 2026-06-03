"use client";

import {
  generateLightHexScale,
  generatePalette,
  SHADE_NUMBERS,
  type Palette,
} from "@/lib/color-palette";
import { useCallback, useMemo, useRef } from "react";
import { useWizard } from "../hooks/use-wizard";
import { PaletteImporter } from "./palette-importer";

interface PaletteItem {
  key: keyof Palette;
  label: string;
}

const PALETTE_GROUPS: { title: string; items: PaletteItem[] }[] = [
  {
    title: "Main Colors",
    items: [
      { key: "primary", label: "Primary" },
      { key: "secondary", label: "Secondary" },
      { key: "accent", label: "Accent" },
    ],
  },
  {
    title: "Surface, Backgrounds & Text",
    items: [
      { key: "surface", label: "Surface" },
      { key: "text", label: "Text" },
    ],
  },
  {
    title: "States",
    items: [
      { key: "success", label: "Success" },
      { key: "caution", label: "Caution" },
      { key: "info", label: "Info" },
      { key: "error", label: "Error" },
    ],
  },
];

export const Step3Color = () => {
  const { state, dispatch } = useWizard();

  const autoPalette = useMemo(() => {
    return generatePalette(state.primaryColor, state.secondaryColor);
  }, [state.primaryColor, state.secondaryColor]);

  const effectiveColors = useMemo(() => {
    const result = { ...autoPalette };
    for (const [key, hex] of Object.entries(state.overriddenColors)) {
      result[key as keyof Palette] = hex;
    }
    return result;
  }, [autoPalette, state.overriddenColors]);

  const hexScales = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const [key, hex] of Object.entries(effectiveColors)) {
      result[key] = generateLightHexScale(hex);
    }
    return result;
  }, [effectiveColors]);

  const primaryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const secondaryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overrideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePrimaryChange = useCallback(
    (hex: string) => {
      if (primaryTimerRef.current) clearTimeout(primaryTimerRef.current);
      primaryTimerRef.current = setTimeout(() => {
        dispatch({ type: "SET_FIELD", field: "primaryColor", value: hex });
        dispatch({ type: "SET_FIELD", field: "overriddenColors", value: {} });
      }, 120);
    },
    [dispatch],
  );

  const handleSecondaryChange = useCallback(
    (hex: string) => {
      if (secondaryTimerRef.current) clearTimeout(secondaryTimerRef.current);
      secondaryTimerRef.current = setTimeout(() => {
        dispatch({ type: "SET_FIELD", field: "secondaryColor", value: hex });
        dispatch({ type: "SET_FIELD", field: "overriddenColors", value: {} });
      }, 120);
    },
    [dispatch],
  );

  const handleColorOverride = useCallback(
    (key: keyof Palette, hex: string) => {
      if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);
      overrideTimerRef.current = setTimeout(() => {
        const next = { ...state.overriddenColors, [key]: hex };
        dispatch({ type: "SET_FIELD", field: "overriddenColors", value: next });
      }, 120);
    },
    [state.overriddenColors, dispatch],
  );

  const handleReset = useCallback(
    (key: keyof Palette) => {
      const next = { ...state.overriddenColors };
      delete next[key];
      dispatch({ type: "SET_FIELD", field: "overriddenColors", value: next });
    },
    [state.overriddenColors, dispatch],
  );

  const isOverridden = useCallback(
    (key: keyof Palette) => {
      return key in state.overriddenColors;
    },
    [state.overriddenColors],
  );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-headline font-semibold text-grey-900">
          Color System
        </h2>
        <p className="text-grey-500 mt-1">
          All 11 shades per color family. Pick any main color to customize.
        </p>
      </div>

      <PaletteImporter />

      {PALETTE_GROUPS.map((group) => {
        return (
          <div key={group.title}>
            <h3 className="text-title font-semibold text-grey-900 mb-3">
              {group.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.items.map(({ key, label }) => {
                const scale = hexScales[key]!;
                const overridden = isOverridden(key);

                return (
                  <div
                    key={key}
                    className="relative rounded-xl border border-grey-300 bg-grey-200 p-4 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold tracking-widest uppercase text-grey-500">
                        {label}
                      </span>
                      <div className="flex items-center gap-2">
                        {overridden && (
                          <button
                            onClick={() => {
                              return handleReset(key);
                            }}
                            className="text-[10px] font-mono text-caution hover:text-error transition-colors"
                            aria-label={`Reset ${label} to auto`}
                          >
                            Reset
                          </button>
                        )}
                        <input
                          type="color"
                          value={effectiveColors[key]}
                          onChange={(e) => {
                            if (key === "primary") {
                              handlePrimaryChange(e.target.value);
                            } else if (key === "secondary") {
                              handleSecondaryChange(e.target.value);
                            } else {
                              handleColorOverride(key, e.target.value);
                            }
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-grey-300"
                          aria-label={`${label} color picker`}
                        />
                      </div>
                    </div>

                    <div className="flex gap-px rounded-lg overflow-hidden border border-grey-300/50">
                      {scale.map((hex, i) => {
                        const shade = SHADE_NUMBERS[i];
                        return (
                          <button
                            key={shade}
                            className="flex-1 h-10 relative group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent"
                            style={{ backgroundColor: hex }}
                            aria-label={`${label} ${shade}`}
                            title={`${shade}: ${hex}`}
                          >
                            {shade === 500 && overridden && (
                              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                            )}
                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[7px] font-mono bg-black/40 text-white/90 px-0.5 rounded">
                                {shade}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
