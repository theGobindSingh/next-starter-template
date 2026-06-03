"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const SearchableSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query) {
      return options;
    }
    const lower = query.toLowerCase();
    return options.filter((opt) => {
      return opt.label.toLowerCase().includes(lower);
    });
  }, [options, query]);

  const selectedLabel = useMemo(() => {
    return options.find((opt) => {
      return opt.value === value;
    })?.label;
  }, [options, value]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setOpen(true);
      setFocusedIdx(-1);
    },
    [],
  );

  const handleSelect = useCallback(
    (opt: { value: string; label: string }) => {
      onChange(opt.value);
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIdx((prev) => {
          return Math.min(prev + 1, filtered.length - 1);
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIdx((prev) => {
          return Math.max(prev - 1, 0);
        });
      } else if (e.key === "Enter" && focusedIdx >= 0) {
        e.preventDefault();
        handleSelect(filtered[focusedIdx]!);
      } else if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();
      }
    },
    [filtered, focusedIdx, handleSelect],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      return document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  useEffect(() => {
    if (!open || focusedIdx < 0) {
      return;
    }
    const el = listRef.current?.children[focusedIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [focusedIdx, open]);

  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex flex-col gap-1.5 relative" ref={containerRef}>
      <label
        htmlFor={id}
        className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500"
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={open ? query : (selectedLabel ?? value)}
        onChange={handleInputChange}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        className="w-full px-3 py-2.5 rounded-lg border border-grey-300 bg-grey-100 text-grey-900 font-serif text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors placeholder:text-grey-500/60"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        autoComplete="off"
      />
      {open && (
        <div
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          className="absolute top-full mt-1 left-0 right-0 z-50 max-h-60 overflow-auto rounded-lg border border-grey-300 bg-grey-100 shadow-lg"
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-grey-500/60 font-serif">
              No fonts found
            </div>
          ) : (
            filtered.map((opt, idx) => {
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  className={`px-3 py-2 text-sm font-serif cursor-pointer transition-colors ${
                    opt.value === value
                      ? "bg-accent/10 text-accent font-semibold"
                      : idx === focusedIdx
                        ? "bg-grey-50 text-grey-900"
                        : "text-grey-900 hover:bg-grey-50"
                  }`}
                  onClick={() => {
                    return handleSelect(opt);
                  }}
                  onMouseEnter={() => {
                    return setFocusedIdx(idx);
                  }}
                >
                  {opt.label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
