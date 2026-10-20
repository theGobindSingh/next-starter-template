"use client";

import Button from "@components/button";
import Link from "@components/link";
import StatusPage from "@components/status-page";

export interface ErrorProps {
  error: unknown;
  retry: () => void;
}

// Server errors reach the client with only a digest; show it so users can
// quote it and you can match it in the server logs.
const getDigest = (error: unknown): string | undefined => {
  return error instanceof Error && "digest" in error
    ? String(error.digest)
    : undefined;
};

/** Shared body of `error.tsx` and `global-error.tsx`. */
const ErrorContent = ({ error, retry }: ErrorProps) => {
  const digest = getDigest(error);

  const handleRetry = () => {
    retry();
  };

  return (
    <StatusPage
      code={digest ? `Error ${digest}` : "Error"}
      title="Something went wrong"
      description="An unexpected error occurred. Try again, or come back later."
    >
      <Button onClick={handleRetry}>Try again</Button>
      <Link href="/" variant="outlined" color="grey">
        Go home
      </Link>
    </StatusPage>
  );
};

export default ErrorContent;
