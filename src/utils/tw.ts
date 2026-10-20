export type ClassValue = string | number | false | null | undefined;

interface Tw {
  /** Tagged template: tw`flex items-center ${isActive && "text-accent-600"}` */
  (strings: TemplateStringsArray, ...values: ClassValue[]): string;
  /** Joiner: tw("flex", isActive && "text-accent-600", className) */
  (...classes: ClassValue[]): string;
}

const isTemplate = (value: unknown): value is TemplateStringsArray => {
  return Array.isArray(value) && "raw" in value;
};

const toClass = (value: ClassValue): string => {
  return value ? String(value) : "";
};

/** Collapses whitespace so output is one clean, space-separated class list. */
const normalize = (classes: string): string => {
  return classes.split(/\s+/).filter(Boolean).join(" ");
};

/**
 * Builds a class string. Falsy values are dropped in both forms.
 * The editor (.vscode classRegex) and ESLint (better-tailwindcss) check
 * classes written inside either form.
 */
export const tw: Tw = (
  first?: TemplateStringsArray | ClassValue,
  ...rest: ClassValue[]
): string => {
  if (isTemplate(first)) {
    const raw = String.raw({ raw: first }, ...rest.map(toClass));
    return normalize(raw);
  }

  return normalize([first, ...rest].map(toClass).join(" "));
};
