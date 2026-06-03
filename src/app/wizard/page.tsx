"use client";

import { WizardProvider } from "@components/config-wizard/context";
import ConfigWizard from "@components/config-wizard/layout/wizard";
import Link from "next/link";

const WizardPage = () => {
  return (
    <div className="min-h-dvh bg-grey-100">
      <header className="border-b border-grey-300">
        <div className="mx-auto w-[90%] max-w-[1400px] flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500 hover:text-accent transition-colors"
          >
            &larr; Back to Home
          </Link>
          <p className="font-mono text-[10px] text-grey-500/40">
            next-starter-template / configure
          </p>
        </div>
      </header>
      <main className="mx-auto w-[90%] max-w-[1400px] py-6">
        <WizardProvider>
          <ConfigWizard />
        </WizardProvider>
      </main>
    </div>
  );
};

export default WizardPage;
