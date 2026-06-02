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
    <div className="rounded-xl border border-border bg-surface p-8 transition-all duration-200 hover:border-gold/40">
      <p
        className="font-mono text-xs font-semibold tracking-widest uppercase mb-2"
        style={{ color: "var(--color-gold)" }}
      >
        {file}
      </p>
      <h3
        className="font-sans text-xl font-semibold leading-snug mb-2"
        style={{ color: "var(--color-ink)" }}
      >
        {title}
      </h3>
      <p
        className="font-serif text-sm leading-relaxed mb-5"
        style={{ color: "var(--color-muted)" }}
      >
        {description}
      </p>
      <ul className="space-y-2">
        {items.map((item) => {
          return (
            <li
              key={item}
              className="flex items-start gap-2 font-serif text-sm"
              style={{ color: "var(--color-ink)" }}
            >
              <span
                className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-gold)" }}
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
          style={{ color: "var(--color-gold)" }}
        >
          Before You Code
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] max-w-3xl mb-6 text-balance"
          style={{ color: "var(--color-ink)" }}
        >
          Configure these files to make this template yours
        </h2>
        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mb-16"
          style={{ color: "var(--color-muted)" }}
        >
          This template ships with sensible defaults, but every value is meant
          to be changed. Work through these files in order.
        </p>

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
