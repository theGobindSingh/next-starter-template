import Link from "next/link";
import { CONFIG_STEPS } from "./data";
import SectionWrapper from "./section-wrapper";

interface ConfigCardProps {
  title: string;
  file: string;
  description: string;
  items: string[];
}

const ConfigCard = ({ title, file, description, items }: ConfigCardProps) => {
  return (
    <div className="rounded-xl border border-grey-300 bg-grey-200 p-8 transition-all duration-200 hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg">
      <p
        className="font-mono text-xs font-semibold tracking-widest uppercase mb-2"
        style={{ color: "var(--color-accent-400)" }}
      >
        {file}
      </p>
      <h3
        className="font-sans text-xl font-semibold leading-snug mb-2"
        style={{ color: "var(--color-grey-900)" }}
      >
        {title}
      </h3>
      <p
        className="font-serif text-sm leading-relaxed mb-5"
        style={{ color: "var(--color-grey-500)" }}
      >
        {description}
      </p>
      <ul className="space-y-2">
        {items.map((item) => {
          return (
            <li
              key={item}
              className="flex items-start gap-2 font-serif text-sm"
              style={{ color: "var(--color-grey-900)" }}
            >
              <span
                className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-accent-400)" }}
              />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const LandingConfig = () => {
  return (
    <SectionWrapper variant="default" id="config" withDivider>
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-accent-400)" }}
        >
          Before You Code
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] max-w-3xl mb-6 text-balance"
          style={{ color: "var(--color-grey-900)" }}
        >
          Configure these files to make this template yours
        </h2>
        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mb-16"
          style={{ color: "var(--color-grey-500)" }}
        >
          This template ships with sensible defaults, but every value is meant
          to be changed. Work through these files in order.
        </p>

        <Link
          href="/wizard"
          className="group block w-full rounded-xl border border-accent/30 bg-accent/[0.04] hover:bg-accent/[0.08] hover:border-accent/60 transition-all duration-200 mb-12 p-6"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p
                className="font-mono text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ color: "var(--color-accent-400)" }}
              >
                Visual Config Wizard
              </p>
              <p
                className="font-serif text-sm"
                style={{ color: "var(--color-grey-500)" }}
              >
                Prefer a guided experience? Try the interactive config wizard
                instead.
              </p>
            </div>
            <span
              className="font-mono text-sm font-semibold tracking-widest uppercase shrink-0 flex items-center gap-2 group-hover:gap-3 transition-all"
              style={{ color: "var(--color-accent-400)" }}
            >
              Open Wizard
              <span className="text-lg leading-none" aria-hidden="true">
                &rarr;
              </span>
            </span>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG_STEPS.map((step) => {
            return <ConfigCard key={step.title} {...step} />;
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingConfig;
