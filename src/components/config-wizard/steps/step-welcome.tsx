"use client";

import { LayersIcon } from "@/icons";

export const WelcomeStep = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
      <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
        <LayersIcon className="text-gold" />
      </div>
      <h1 className="font-sans text-3xl font-bold text-ink">
        Configuration Wizard
      </h1>
      <p className="font-serif text-base text-muted max-w-md">
        Fill out the form to configure your project, then copy the CSS variables
        from the sidebar into your globals.css. The generated prompt applies the
        rest.
      </p>
      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 font-mono text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-lg bg-gold text-black hover:bg-gold-deep transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/30"
      >
        Start Configuring
      </button>
    </div>
  );
};
