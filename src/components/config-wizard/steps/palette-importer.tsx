"use client";

import type { Palette } from "@/lib/color-palette";
import { parsePaletteUrl } from "@/lib/parse-palette-url";
import { useCallback, useMemo, useState } from "react";
import { useWizard } from "../hooks/use-wizard";

const IMPORT_CATEGORIES: { key: keyof Palette; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "surface", label: "Surface" },
  { key: "text", label: "Text" },
];

type Mapping = Record<string, number>;

const DEFAULT_MAPPING: Mapping = {
  primary: 0,
  secondary: 1,
  accent: 2,
  surface: 3,
  text: 4,
};

export const PaletteImporter = () => {
  const { dispatch } = useWizard();
  const [url, setUrl] = useState("");
  const [mapping, setMapping] = useState<Mapping>(DEFAULT_MAPPING);
  const [imported, setImported] = useState(false);

  const parsed = useMemo(() => {
    if (!url.trim()) return null;
    return parsePaletteUrl(url);
  }, [url]);

  const colors = useMemo(() => {
    return parsed?.colors ?? [];
  }, [parsed]);

  const handleUrlChange = useCallback((value: string) => {
    setUrl(value);
    setImported(false);
  }, []);

  const handleMappingChange = useCallback((category: string, index: number) => {
    setMapping((prev) => {
      return { ...prev, [category]: index };
    });
    setImported(false);
  }, []);

  const handleApply = useCallback(() => {
    const primaryHex = colors[mapping.primary!]!;
    const secondaryHex = colors[mapping.secondary!]!;

    const overrides: Record<string, string> = {};
    for (const { key } of IMPORT_CATEGORIES) {
      if (key === "primary" || key === "secondary") continue;
      const idx = mapping[key];
      if (idx !== undefined) {
        overrides[key] = colors[idx]!;
      }
    }

    dispatch({ type: "SET_FIELD", field: "primaryColor", value: primaryHex });
    dispatch({
      type: "SET_FIELD",
      field: "secondaryColor",
      value: secondaryHex,
    });
    dispatch({
      type: "SET_FIELD",
      field: "overriddenColors",
      value: overrides,
    });
    setImported(true);
  }, [colors, mapping, dispatch]);

  const canApply = colors.length >= 5;

  return (
    <div className="rounded-xl border border-grey-300 bg-grey-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
          Import Palette from URL
        </h3>
        {imported && (
          <span className="text-[10px] font-mono text-success font-semibold">
            ✓ Imported
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 mb-4">
        <label className="font-mono text-[10px] font-semibold tracking-widest uppercase text-grey-500">
          Palette URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              return handleUrlChange(e.target.value);
            }}
            placeholder="https://coolors.co/063336-548e8b-eb4e57-f27f60-b9a66c"
            className="flex-1 px-3 py-2 rounded-lg border border-grey-300 bg-grey-100 text-grey-900 font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors placeholder:text-grey-500/60"
          />
        </div>
      </div>

      {parsed?.error && (
        <p className="text-[11px] font-mono text-error mb-3">{parsed.error}</p>
      )}

      {canApply && (
        <div className="space-y-3">
          <div className="flex gap-1 rounded-lg overflow-hidden border border-grey-300/50">
            {colors.slice(0, 5).map((hex, i) => {
              return (
                <div
                  key={hex}
                  className="flex-1 h-8 flex items-center justify-center relative group"
                  style={{ backgroundColor: hex }}
                >
                  <span className="text-[8px] font-mono bg-black/40 text-white/90 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {i + 1}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="divide-y divide-grey-300/50">
            {IMPORT_CATEGORIES.map(({ key, label }) => {
              return (
                <div key={key} className="flex items-center gap-3 py-1.5">
                  <span className="font-mono text-[11px] font-semibold text-grey-600 w-20 shrink-0">
                    {label}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <select
                      value={mapping[key] ?? 0}
                      onChange={(e) => {
                        return handleMappingChange(key, Number(e.target.value));
                      }}
                      className="px-2 py-1 rounded border border-grey-300 bg-grey-100 text-grey-900 font-mono text-xs focus:outline-none focus:border-accent"
                    >
                      {colors.slice(0, 5).map((hex, i) => {
                        return (
                          <option key={hex} value={i}>
                            Color {i + 1}
                          </option>
                        );
                      })}
                    </select>
                    <div
                      className="w-5 h-5 rounded border border-grey-300 shrink-0"
                      style={{
                        backgroundColor: colors[mapping[key] ?? 0] ?? "#ccc",
                      }}
                    />
                    <span className="font-mono text-[10px] text-grey-500">
                      {colors[mapping[key] ?? 0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleApply}
            disabled={imported}
            className="w-full py-2 rounded-lg bg-grey-900 text-grey-100 font-mono text-xs font-semibold tracking-wider uppercase hover:bg-grey-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {imported ? "Imported" : "Apply Import"}
          </button>
        </div>
      )}

      {!canApply && url && !parsed?.error && (
        <p className="text-[11px] font-mono text-caution">
          Need at least 5 colors in the palette.
        </p>
      )}
    </div>
  );
};
