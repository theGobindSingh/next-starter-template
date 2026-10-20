import { tw } from "@utils/tw";
import {
  DM_Mono as DmMono,
  Inter,
  Nothing_You_Could_Do as NothingYouCouldDo,
  Source_Serif_4 as SourceSerif4,
} from "next/font/google";

/*
 * The four font roles. Each sets a CSS variable that globals.css maps to a
 * Tailwind utility (font-sans, font-serif, font-mono, font-cursive).
 * To change a font, swap the loader here; nothing else moves.
 */

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = DmMono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

// Not preloaded: the browser still fetches them, but only on pages that use them.
const serif = SourceSerif4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  preload: false,
});

const cursive = NothingYouCouldDo({
  variable: "--font-nothing-you-could-do",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

/** Class names that define every font variable; apply to <html>. */
export const fontVariables = tw(
  sans.variable,
  serif.variable,
  mono.variable,
  cursive.variable,
);
