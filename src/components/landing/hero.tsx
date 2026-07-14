import Link from "@components/link";
import SectionWrapper from "./section-wrapper";

const LandingHero = () => {
  return (
    <SectionWrapper variant="gradient-hero">
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--color-accent-400)" }}
        >
          Next.js Starter Template
        </p>

        <h1
          className="font-sans font-bold leading-[1.1] tracking-[-0.02em] max-w-4xl mt-8 text-balance"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            color: "var(--color-grey-900)",
          }}
        >
          Build extraordinary apps from a{" "}
          <span style={{ color: "var(--color-accent-400)" }}>
            remarkable foundation
          </span>
        </h1>

        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mt-6"
          style={{ color: "var(--color-grey-500)" }}
        >
          A batteries-included Next.js starter with TypeScript, Tailwind v4,
          strict ESLint, and a striking default design system. Clone, configure,
          ship.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-12">
          <Link
            href="#start"
            variant="filled"
            color="accent"
            size="lg"
            className="font-mono tracking-widest uppercase"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/theGobindSingh/next-starter-template"
            variant="outlined"
            size="lg"
            className="font-mono tracking-widest uppercase"
          >
            View on GitHub
          </Link>
          <Link
            href="/wizard"
            variant="filled"
            color="primary"
            size="lg"
            className="font-mono tracking-widest uppercase"
          >
            Config Wizard
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingHero;
