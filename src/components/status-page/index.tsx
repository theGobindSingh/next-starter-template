import type { PropsWithChildren } from "react";

interface StatusPageProps extends PropsWithChildren {
  code: string;
  title: string;
  description: string;
}

/** Full-screen message for 404 and error pages; `children` holds the actions. */
const StatusPage = ({
  code,
  title,
  description,
  children,
}: StatusPageProps) => {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 px-6 py-24">
      <p className="font-mono text-sm tracking-widest text-accent-600 uppercase">
        {code}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-balance">
        {title}
      </h1>
      <p className="text-lg text-fg-muted">{description}</p>
      <div className="flex flex-wrap gap-3">{children}</div>
    </main>
  );
};

export default StatusPage;
