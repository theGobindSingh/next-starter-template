export interface ColorToken {
  label: string;
  varName: string;
  hex: string;
  cssVar: string;
  group: "primary" | "secondary" | "accent" | "neutral" | "semantic";
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface ConfigStep {
  title: string;
  file: string;
  description: string;
  items: string[];
}

export type SectionVariant =
  | "default"
  | "glow-left"
  | "glow-bottom"
  | "gradient-hero"
  | "gradient-start"
  | "surface";
