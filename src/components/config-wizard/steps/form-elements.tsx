"use client";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) => {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => {
          return onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg border border-grey-300 bg-grey-100 text-grey-900 font-serif text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors placeholder:text-grey-500/60"
        aria-required={required}
      />
    </div>
  );
};

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) => {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => {
          return onChange(e.target.value);
        }}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 rounded-lg border border-grey-300 bg-grey-100 text-grey-900 font-serif text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-y min-h-[80px] placeholder:text-grey-500/60"
        aria-required={required}
      />
    </div>
  );
};

const Select = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-xs font-semibold tracking-widest uppercase text-grey-500"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          return onChange(e.target.value);
        }}
        className="w-full px-3 py-2.5 rounded-lg border border-grey-300 bg-grey-100 text-grey-900 font-serif text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
      >
        {options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export { Input, Select, Textarea };
