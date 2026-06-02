import type { ReactNode } from "react";
import SectionWrapper from "./section-wrapper";

interface HeroButtonProps {
  href: string;
  variant: "primary" | "ghost" | "gold";
  children: ReactNode;
}

const HeroButton = ({ href, variant, children }: HeroButtonProps) => {
  const base =
    "inline-flex items-center gap-2 font-mono text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-lg transition-all duration-200";
  const styles = {
    primary:
      "bg-primary text-white hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30",
    ghost:
      "bg-transparent text-ink border border-border hover:bg-surface focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/30",
    gold: "bg-gold text-black hover:bg-gold-deep focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/30",
  };

  return (
    <a href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </a>
  );
};

const LandingHero = () => {
  return (
    <SectionWrapper variant="gradient-hero">
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--color-gold)" }}
        >
          Next.js Starter Template
        </p>

        <h1
          className="font-sans font-bold leading-[1.1] tracking-[-0.02em] max-w-4xl mt-8 text-balance"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            color: "var(--color-ink)",
          }}
        >
          Build extraordinary apps from a{" "}
          <span style={{ color: "var(--color-gold)" }}>
            remarkable foundation
          </span>
        </h1>

        <p
          className="font-serif text-lg leading-relaxed max-w-2xl mt-6"
          style={{ color: "var(--color-muted)" }}
        >
          A batteries-included Next.js starter with TypeScript, Tailwind v4,
          strict ESLint, and a striking default design system. Clone, configure,
          ship.
        </p>

        <div className="flex flex-wrap gap-4 mt-12">
          <HeroButton href="#start" variant="gold">
            Get Started
          </HeroButton>
          <HeroButton
            href="https://github.com/anomalyco/next-starter-template"
            variant="ghost"
          >
            View on GitHub
          </HeroButton>
          <HeroButton href="/wizard" variant="primary">
            Config Wizard
          </HeroButton>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingHero;
