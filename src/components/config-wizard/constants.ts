import type { WizardState } from "./types";

export const STEP_LABELS = [
  "Welcome",
  "Product Identity",
  "Visual Tokens",
  "Color System",
  "Agent Config",
  "Project Structure",
  "Design Docs",
  "Live Mode",
  "Review",
];

export const DEFAULT_STATE: WizardState = {
  brandName: "",
  tagline: "",
  productDescription: "",
  targetUsers: "",
  brandPersonality: "",
  antiReferences: "",
  accessibilityLevel: "AA",

  fonts: {
    display: "Poppins",
    body: "Inter",
    label: "DM Mono",
    cursive: "Nothing You Could Do",
  },
  borderRadius: 8,
  shadowIntensity: 2,
  motionSpeed: "normal",

  primaryColor: "#3b82f6",
  secondaryColor: "#8b5cf6",
  overriddenColors: {},

  productContext: "",
  testingFramework: "none",
  deploymentTarget: "vercel",
  compliance: [],

  creativeNorthStar: "The Monograph",
  designOverview: "",
  componentVariants: "",
  dosAndDonts: "",

  namingConvention: "kebab-case",
  componentPlacement: "hybrid",
  folderPerComponent: true,

  liveMode: false,
};

export const NORTH_STAR_INFO: Record<string, string> = {
  "The Monograph":
    "A focused, authoritative document. Scholarly, curated, and definitive — each page feels like a statement.",
  "The Gallery":
    "A curated exhibition space. Every element is an artwork, carefully placed for maximum impact and contemplation.",
  "The Editorial Sanctuary":
    "A protected space for editorial content. Refined, intentional, and distraction-free — words and images breathe.",
  "The Golden State Curator":
    "Warm, sun-drenched, and meticulously edited. California modernist meets quiet luxury.",
  "The Lab Notebook":
    "A record of discovery. Raw, process-driven, and honest — sketches, notes, and findings in constant iteration.",
  "The Studio":
    "A creative workspace. Raw materials, natural light, and the energy of making — nothing is over-polished.",
  "The Archive":
    "A collection of enduring artifacts. Time-tested, meaningful, and organized with reverence for the past.",
  "The Workshop":
    "A place of craft and making. Tools are visible, process is celebrated, and every detail is hand-finished.",
  "The Canvas":
    "An open field of possibility. Minimal foundation, maximal expression — the surface invites creation.",
  "The Atelier":
    "A fashion or design atelier. Bespoke, haute, and detail-obsessed — every seam and stitch matters.",
  "The Blueprint":
    "A technical drawing brought to life. Precision, structure, and clarity — form follows function with rigor.",
  "The Library":
    "A repository of knowledge. Quiet, ordered, and vast — designed for deep focus and intellectual wandering.",
};
