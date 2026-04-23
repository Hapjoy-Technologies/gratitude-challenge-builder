import { PRIMARY_COLORS } from "../constants.js";

export const SectionTitle = ({ children }) => (
  <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
    {children}
  </h2>
);

export const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-medium text-slate-600 mb-1"
  >
    {children}
  </label>
);

export const TextInput = ({ id, value, onChange, placeholder, type = "text" }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
  />
);

export const TextArea = ({ id, value, onChange, rows = 3, placeholder }) => (
  <textarea
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    placeholder={placeholder}
    className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 resize-y"
  />
);

export const Toggle = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
      checked
        ? "bg-sky-600 border-sky-600 text-white"
        : "bg-slate-100 border-slate-300 text-slate-600"
    }`}
  >
    <span
      className={`mr-1 inline-block h-2 w-2 rounded-full ${
        checked ? "bg-white" : "bg-slate-400"
      }`}
    ></span>
    {label}
  </button>
);

export const PillButton = ({ children, onClick, variant = "primary" }) => {
  const base =
    "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium";
  const styles =
    variant === "primary"
      ? "bg-sky-600 text-white hover:bg-sky-700"
      : variant === "ghost"
        ? "bg-transparent text-slate-600 hover:bg-slate-100"
        : "bg-slate-200 text-slate-700 hover:bg-slate-300";
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};

export const ColorPicker = ({ value, onChange }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-slate-500">
        Selected: <span className="font-mono">{value}</span>
      </span>
      <div
        className="h-5 w-5 rounded-full border border-slate-300"
        style={{ backgroundColor: value }}
      />
    </div>

    <div className="rounded-xl bg-slate-50 p-2">
      <div className="grid grid-cols-8 gap-2">
        {PRIMARY_COLORS.map((color) => {
          const isSelected = color === value;
          return (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`h-7 w-7 rounded-full border transition-transform ${
                isSelected
                  ? "border-sky-600 ring-2 ring-sky-300 scale-105"
                  : "border-slate-200 hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
            >
              {isSelected && (
                <span className="block h-full w-full rounded-full border border-white/70" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export const HexColorInput = ({ value, onChange }) => (
  <div className="flex items-center space-x-2">
    <div
      className="h-6 w-6 shrink-0 rounded-md border border-slate-300"
      style={{ backgroundColor: value || "#ffffff" }}
    />
    <TextInput value={value || ""} onChange={onChange} placeholder="#RRGGBB" />
  </div>
);
