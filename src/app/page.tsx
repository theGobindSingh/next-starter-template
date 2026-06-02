import LandingConfig from "@components/landing/config";
import LandingFeatures from "@components/landing/features";
import LandingFooter from "@components/landing/footer";
import LandingHero from "@components/landing/hero";
import LandingStart from "@components/landing/start";
import LandingTokens from "@components/landing/tokens";
import ThemeToggle from "@components/theme-toggle";

const HomePage = () => {
  return (
    <main className="relative">
      <div className="glow-layer" aria-hidden="true">
        <div className="glow-hero" />
        <div className="glow-features" />
        <div className="glow-start" />
      </div>
      <div className="relative z-10">
        <LandingHero />
        <LandingFeatures />
        <LandingTokens />
        <LandingConfig />
        <LandingStart />
        <LandingFooter />
      </div>
      <ThemeToggle />
    </main>
  );
};

export default HomePage;
