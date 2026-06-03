import { FEATURES } from "./data";
import SectionWrapper from "./section-wrapper";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="rounded-xl border border-grey-300 bg-grey-200 p-8 transition-all duration-200 hover:border-accent/40">
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-lg font-mono text-sm font-bold mb-6"
        style={{
          backgroundColor: "var(--color-accent-100)",
          color: "var(--color-accent-400)",
        }}
      >
        {icon}
      </div>
      <h3
        className="font-sans text-xl font-semibold leading-snug mb-3"
        style={{ color: "var(--color-grey-900)" }}
      >
        {title}
      </h3>
      <p
        className="font-serif text-base leading-relaxed"
        style={{ color: "var(--color-grey-500)" }}
      >
        {description}
      </p>
    </div>
  );
};

const LandingFeatures = () => {
  return (
    <SectionWrapper variant="glow-left">
      <div className="relative z-10 py-24 md:py-32">
        <p
          className="font-mono text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-accent-400)" }}
        >
          What&rsquo;s Inside
        </p>
        <h2
          className="font-sans text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] max-w-2xl mb-16 text-balance"
          style={{ color: "var(--color-grey-900)" }}
        >
          Everything you need to start building&mdash;nothing you don&rsquo;t
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            return <FeatureCard key={feature.title} {...feature} />;
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingFeatures;
