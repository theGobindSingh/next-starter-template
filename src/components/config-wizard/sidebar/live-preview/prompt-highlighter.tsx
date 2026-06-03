import { type ReactNode } from "react";

const CodeBlock = ({
  lang,
  codeLines,
}: {
  lang: string;
  codeLines: string[];
}) => {
  return (
    <div className="my-3 rounded-lg border border-grey-300 bg-grey-50 overflow-hidden">
      {lang && (
        <div className="px-3 py-1.5 border-b border-grey-300 bg-grey-200">
          <span className="font-mono text-[10px] font-semibold tracking-widest uppercase text-grey-500/60">
            {lang}
          </span>
        </div>
      )}
      <pre className="p-3 font-mono text-xs leading-relaxed text-primary whitespace-pre-wrap break-words">
        {codeLines.join("\n")}
      </pre>
    </div>
  );
};

export const PromptHighlighter = ({ text }: { text: string }) => {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];
  let idx = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      let j = i + 1;
      while (j < lines.length && !lines[j]!.startsWith("```")) {
        codeLines.push(lines[j]!);
        j++;
      }
      elements.push(
        <CodeBlock key={`cb-${idx}`} lang={lang} codeLines={codeLines} />,
      );
      idx++;
      i = j + 1;
      continue;
    }

    const key = `l-${idx}`;
    idx++;
    i++;

    if (line.startsWith("# ")) {
      elements.push(
        <span key={key} className="block text-accent font-bold text-sm mb-2">
          {line}
        </span>,
      );
    } else if (line.startsWith("`") && line.endsWith("`")) {
      elements.push(
        <span key={key} className="block text-primary mt-2 mb-1">
          {line}
        </span>,
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <span key={key} className="block text-grey-500">
          {line}
        </span>,
      );
    } else if (/^\d+\./.test(line)) {
      elements.push(
        <span key={key} className="block text-caution font-semibold mt-2">
          {line}
        </span>,
      );
    } else if (line.trim() === "") {
      elements.push(
        <span key={key} className="block">
          &nbsp;
        </span>,
      );
    } else {
      elements.push(
        <span key={key} className="block text-grey-900/80">
          {line}
        </span>,
      );
    }
  }
  return <>{elements}</>;
};
