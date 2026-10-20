import Link from "@components/link";
import ThemeToggle from "@components/theme-toggle";

const HomePage = () => {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-8 px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-sm tracking-widest text-accent-600 uppercase">
          Next.js Starter
        </p>
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-balance">
        Start here. Make it yours.
      </h1>

      <p className="text-lg text-fg-muted">
        Edit <code className="font-mono text-fg">src/app/page.tsx</code> to
        begin. Read <code className="font-mono text-fg">AGENTS.md</code> and{" "}
        <code className="font-mono text-fg">docs/</code> for the conventions.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="https://nextjs.org/docs" variant="filled">
          Next.js docs
        </Link>
        <Link
          href="https://github.com/theGobindSingh/next-starter-template"
          variant="outlined"
          color="grey"
        >
          GitHub
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
