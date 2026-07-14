"use client";

import { Button } from "@components/button";

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
      <p className="font-serif text-sm text-grey-900">
        You have unsaved changes. Navigate away?
      </p>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          color="caution"
          size="sm"
          className="text-xs font-mono tracking-widest uppercase leading-none border-grey-300"
          onClick={onNavigate}
        >
          Navigate
        </Button>
        <Button
          variant="filled"
          color="primary"
          size="sm"
          className="text-xs font-mono tracking-widest uppercase leading-none border border-grey-300 hover:bg-primary/80"
          onClick={onSaveAndNavigate}
        >
          Save & Navigate
        </Button>
        <Button
          variant="outlined"
          size="sm"
          className="text-xs font-mono tracking-widest uppercase leading-none border-grey-300 text-grey-900 hover:bg-grey-200"
          onClick={onCancel}
        >
          Stay
        </Button>
      </div>
    </div>
  );
};
