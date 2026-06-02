"use client";

interface UnsavedWarningProps {
  show: boolean;
  onNavigate: () => void;
  onSaveAndNavigate: () => void;
  onCancel: () => void;
}

export const UnsavedWarning = ({
  show,
  onNavigate,
  onSaveAndNavigate,
  onCancel,
}: UnsavedWarningProps) => {
  if (!show) return null;

  return (
    <div className="mb-4 rounded-lg border border-caution/30 bg-caution/5 p-4 flex items-center justify-between">
      <p className="font-serif text-sm text-ink">
        You have unsaved changes. Navigate away?
      </p>
      <div className="flex gap-2">
        <button
          onClick={onNavigate}
          className="font-mono text-xs font-semibold tracking-widest uppercase leading-none px-3 py-1.5 rounded-lg border border-border text-caution hover:bg-caution/10 transition-colors"
        >
          Navigate
        </button>
        <button
          onClick={onSaveAndNavigate}
          className="font-mono text-xs font-semibold tracking-widest uppercase leading-none px-3 py-1.5 rounded-lg border border-border bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          Save & Navigate
        </button>
        <button
          onClick={onCancel}
          className="font-mono text-xs font-semibold tracking-widest uppercase leading-none px-3 py-1.5 rounded-lg border border-border text-ink hover:bg-surface transition-colors"
        >
          Stay
        </button>
      </div>
    </div>
  );
};
