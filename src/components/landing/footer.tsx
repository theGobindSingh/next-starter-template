import OrnamentalDivider from "./ornamental-divider";

const LandingFooter = () => {
  return (
    <footer>
      <OrnamentalDivider />
      <div className="mx-auto w-[85%] max-[1024px]:w-[90%] flex flex-col md:flex-row items-center justify-between gap-4 pb-12">
        <p
          className="font-serif text-sm"
          style={{ color: "var(--color-grey-500)" }}
        >
          Built with{" "}
          <a
            href="https://nextjs.org"
            className="font-semibold underline underline-offset-2 transition-colors duration-200"
            style={{ color: "var(--color-primary)" }}
          >
            Next.js
          </a>
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/anomalyco/next-starter-template"
            className="font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--color-grey-500)" }}
          >
            GitHub
          </a>
          <a
            href="https://opencode.ai"
            className="font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--color-grey-500)" }}
          >
            opencode
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
