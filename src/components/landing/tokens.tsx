import { COLOR_TOKENS } from "./data";
import SectionWrapper from "./section-wrapper";

interface SwatchProps {
  label: string;
  hex: string;
  cssVar: string;
}

const Swatch = ({ label, hex, cssVar }: SwatchProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-grey-300 bg-grey-100">
      <div
        className="shrink-0 w-10 h-10 rounded-md border border-grey-300"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="min-w-0">
        <p
          className="font-sans text-sm font-semibold truncate"
          style={{ color: "var(--color-grey-900)" }}
        >
          {label}
        </p>
        <p
          className="font-mono text-xs"
          style={{ color: "var(--color-grey-500)" }}
        >
          {hex}
        </p>
      </div>
    </div>
  );
};

const GROUP_LABELS: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  neutral: "Neutral",
  semantic: "Semantic",
};

const LandingTokens = () => {
  const groups: Record<string, typeof COLOR_TOKENS> = {};

  for (const token of COLOR_TOKENS) {
    const group = groups[token.group];
    if (group) {
      group.push(token);
    } else {
      groups[token.group] = [token];
    }
  }

  return (
    <SectionWrapper variant="surface">
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-accent-400)" }}
        >
          Design System
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] max-w-2xl mb-6 text-balance"
          style={{ color: "var(--color-grey-900)" }}
        >
          Your palette, documented
        </h2>
        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mb-16"
          style={{ color: "var(--color-grey-500)" }}
        >
          Every color token used across the system, captured in docs/DESIGN.md
          as CSS custom properties. Swap the hex values to rebrand the entire
          interface.
        </p>

        {Object.entries(groups).map(([group, tokens]) => {
          return (
            <div key={group} className="mb-12 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="h-px flex-1"
                  style={{ backgroundColor: "var(--color-grey-300)" }}
                />
                <span
                  className="font-mono text-sm font-semibold tracking-widest uppercase shrink-0"
                  style={{ color: "var(--color-accent-400)" }}
                >
                  {GROUP_LABELS[group]}
                </span>
                <span
                  className="h-px flex-1"
                  style={{ backgroundColor: "var(--color-grey-300)" }}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {tokens.map((token) => {
                  return (
                    <Swatch
                      key={token.varName}
                      label={token.label}
                      hex={token.hex}
                      cssVar={token.cssVar}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-16 rounded-xl border border-grey-300 bg-grey-200 p-8">
          <h3
            className="font-sans text-xl font-semibold mb-4"
            style={{ color: "var(--color-grey-900)" }}
          >
            Typography
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p
                className="font-mono text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--color-grey-500)" }}
              >
                Display &mdash; Poppins
              </p>
              <p
                className="font-sans text-4xl font-bold leading-tight tracking-tight"
                style={{ color: "var(--color-grey-900)" }}
              >
                Aa
              </p>
              <p
                className="font-sans text-lg mt-2"
                style={{ color: "var(--color-grey-500)" }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div>
              <p
                className="font-mono text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--color-grey-500)" }}
              >
                Body &mdash; Inter
              </p>
              <p
                className="font-serif text-2xl font-normal leading-snug"
                style={{ color: "var(--color-grey-900)" }}
              >
                Aa
              </p>
              <p
                className="font-serif text-base mt-2"
                style={{ color: "var(--color-grey-500)" }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div>
              <p
                className="font-mono text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--color-grey-500)" }}
              >
                Label &mdash; DM Mono
              </p>
              <p
                className="font-mono text-2xl font-medium leading-snug"
                style={{ color: "var(--color-grey-900)" }}
              >
                Aa
              </p>
              <p
                className="font-mono text-base mt-2"
                style={{ color: "var(--color-grey-500)" }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingTokens;
