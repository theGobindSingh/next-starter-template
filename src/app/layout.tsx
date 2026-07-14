import ThemeSetter from "@/app/theme-setter";
import "@styles/globals.css";
import type { Metadata } from "next";
import {
  DM_Mono as DmMono,
  Inter,
  Nothing_You_Could_Do as NothingYouCouldDo,
  Poppins,
} from "next/font/google";
import { cookies } from "next/headers";
import { type PropsWithChildren } from "react";

const fontSansSerif = Inter({
  variable: "--font-serif",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontMono = DmMono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

const fontSans = Poppins({
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const fontCursive = NothingYouCouldDo({
  variable: "--font-cursive",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description:
    "Starter template with Next.js, TypeScript, and Tailwind baseline.",
};

const getTheme = async () => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("theme")?.value ?? null;
  } catch {
    return null;
  }
};

const RootLayout = async ({ children }: PropsWithChildren<unknown>) => {
  const theme = await getTheme();
  return (
    <html lang="en" className={theme === "dark" ? "dark" : "light"}>
      <head />
      <body
        className={`${fontSansSerif.variable} ${fontMono.variable} ${fontSans.variable} ${fontCursive.variable}`}
      >
        <ThemeSetter />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
