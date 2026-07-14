"use client";

import { LayersIcon } from "@/icons";
import { Button } from "@components/button";

export const WelcomeStep = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
      <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
        <LayersIcon className="text-accent" />
      </div>
      <h1 className="font-sans text-3xl font-bold text-grey-900">
        Configuration Wizard
      </h1>
      <p className="font-serif text-base text-grey-500 max-w-md">
        Fill out the form to configure your project, then copy the CSS variables
        from the sidebar into your globals.css. The generated prompt applies the
        rest.
      </p>
      <Button
        variant="filled"
        color="accent"
        size="lg"
        className="font-mono tracking-widest uppercase"
        onClick={onStart}
      >
        Start Configuring
      </Button>
    </div>
  );
};
