import type { Metadata } from "next";
import {
  DM_Mono as DmMono,
  Inter,
  Nothing_You_Could_Do as NothingYouCouldDo,
  Poppins,
} from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

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
  description: "Starter template with Next.js, TypeScript, and plain CSS.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${fontSansSerif.variable} ${fontMono.variable} ${fontSans.variable} ${fontCursive.variable}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
