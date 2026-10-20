"use client";

import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";

// Lenis already turns smoothing off for prefers-reduced-motion users.
const OPTIONS: LenisOptions = {
  anchors: true,
  autoRaf: true,
};

/** Smooth scrolling for the whole page. Remove it from the root layout to opt out. */
const SmoothScroll = () => {
  return <ReactLenis root options={OPTIONS} />;
};

export default SmoothScroll;
