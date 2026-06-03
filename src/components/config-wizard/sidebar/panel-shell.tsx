import type { ReactNode } from "react";

interface PanelShellProps {
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
}

export const PanelShell = ({
  title,
  headerRight,
  children,
}: PanelShellProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-grey-300 bg-grey-200 shrink-0">
        <p className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500">
          {title}
        </p>
        {headerRight && (
          <div className="flex items-center gap-2">{headerRight}</div>
        )}
      </div>
      <div className="flex-1 overflow-auto px-4 pb-8 pt-4">
        <pre className="font-mono text-xs leading-relaxed text-grey-900 whitespace-pre-wrap break-words">
          {children}
        </pre>
      </div>
    </div>
  );
};
