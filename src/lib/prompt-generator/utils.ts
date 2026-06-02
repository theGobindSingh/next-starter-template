const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

const appendSection = (
  sections: string[],
  order: { value: number },
  title: string,
  lang: string,
  content: string,
): void => {
  sections.push(`\n${order.value}. ${title}`);
  sections.push("```" + lang);
  sections.push(content);
  sections.push("```");
  order.value++;
};

const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};

export { appendSection, estimateTokens, toKebabCase };
