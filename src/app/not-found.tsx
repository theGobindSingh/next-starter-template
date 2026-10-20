import Link from "@components/link";
import StatusPage from "@components/status-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

const NotFound = () => {
  return (
    <StatusPage
      code="404"
      title="Page not found"
      description="The page you are looking for doesn't exist or has moved."
    >
      <Link href="/" variant="filled">
        Go home
      </Link>
    </StatusPage>
  );
};

export default NotFound;
