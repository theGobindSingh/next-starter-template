import Link from "@components/link";
import SectionWrapper from "./section-wrapper";

const LandingStart = () => {
  return (
    <SectionWrapper variant="gradient-start" id="start" withDivider>
      <div className="relative z-10 py-24 md:py-32 text-center">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-accent-400)" }}
        >
          Quick Start
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] mb-6 text-balance"
          style={{ color: "var(--color-grey-900)" }}
        >
          Clone, install, and go
        </h2>
        <p
          className="font-serif text-lg leading-relaxed max-w-xl mx-auto mb-12"
          style={{ color: "var(--color-grey-500)" }}
        >
          Get up and running in under a minute. Then configure your brand tokens
          and start building.
        </p>

        <div className="max-w-xl mx-auto rounded-xl border border-grey-300 bg-grey-50 p-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--color-error)" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--color-caution)" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--color-success)" }}
            />
            <span
              className="font-mono text-xs ml-2"
              style={{ color: "var(--color-grey-500)" }}
            >
              terminal
            </span>
          </div>
          <pre
            className="font-mono text-sm leading-relaxed overflow-x-auto"
            style={{ color: "var(--color-grey-900)" }}
          >
            <span style={{ color: "var(--color-accent-400)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>
              git clone
            </span>{" "}
            https://github.com/anomalyco/next-starter-template.git
            <br />
            <span style={{ color: "var(--color-accent-400)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>cd</span>{" "}
            next-starter-template
            <br />
            <span style={{ color: "var(--color-accent-400)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>pnpm install</span>
            <br />
            <span style={{ color: "var(--color-accent-400)" }}>$ </span>
            <span style={{ color: "var(--color-primary)" }}>pnpm dev</span>
            <br />
            <span
              className="block mt-4"
              style={{ color: "var(--color-grey-500)" }}
            >
              {">"} http://localhost:3000
            </span>
          </pre>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/wizard"
            size="md"
            color="accent"
            className="font-mono tracking-widest uppercase"
          >
            Configure Your Brand
          </Link>
          <Link
            href="https://github.com/theGobindSingh/next-starter-template"
            variant="outlined"
            size="md"
            className="font-mono tracking-widest uppercase"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingStart;
