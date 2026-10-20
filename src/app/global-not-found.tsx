import { site } from "@/site";
import Link from "@components/link";
import StatusPage from "@components/status-page";
import { fontVariables } from "@styles/fonts";
import "@styles/globals.css";
import { THEME_INIT_SCRIPT } from "@utils/theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Page not found",
};

/** 404 for unmatched URLs. The site and the admin have separate root layouts, so it renders its own document. */
const GlobalNotFound = () => {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script>{THEME_INIT_SCRIPT}</script>
      </head>
      <body>
        <StatusPage
          code="404"
          title="Page not found"
          description="The page you are looking for doesn't exist or has moved."
        >
          <Link href="/" variant="filled">
            Go home
          </Link>
        </StatusPage>
      </body>
    </html>
  );
};

export default GlobalNotFound;
