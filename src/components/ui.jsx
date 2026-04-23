import { PRIMARY_COLORS } from "../constants.js";

export const SectionTitle = ({ children }) => (
  <h2 className="text-sm font-semibold text-[#211036] uppercase tracking-wide mb-2">
    {children}
  </h2>
);

export const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-medium text-[#3D3D3D] mb-1"
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
    className="w-full rounded-xl border border-[#E3DCEA] bg-white px-2.5 py-1.5 text-sm text-[#211036] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FE678B]/40 focus:border-[#FE678B]"
  />
);

export const TextArea = ({ id, value, onChange, rows = 3, placeholder }) => (
  <textarea
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    placeholder={placeholder}
    className="w-full rounded-xl border border-[#E3DCEA] bg-white px-2.5 py-1.5 text-sm text-[#211036] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FE678B]/40 focus:border-[#FE678B] resize-y"
  />
);

export const Toggle = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition ${
      checked
        ? "bg-[#FE678B] border-[#FE678B] text-white"
        : "bg-[#F9EAFF] border-[#E3DCEA] text-[#3D3D3D] hover:bg-[#FDE8EE]"
    }`}
  >
    <span
      className={`mr-1 inline-block h-2 w-2 rounded-full ${
        checked ? "bg-white" : "bg-[#868484]"
      }`}
    ></span>
    {label}
  </button>
);

export const PillButton = ({ children, onClick, variant = "primary" }) => {
  const base =
    "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition";
  const styles =
    variant === "primary"
      ? "bg-[#FE678B] text-white hover:bg-[#ED6082]"
      : variant === "ghost"
        ? "bg-transparent text-[#2B0062] hover:bg-[#F9EAFF]"
        : "bg-[#F9EAFF] text-[#2B0062] hover:bg-[#F0E1FA]";
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};

export const ColorPicker = ({ value, onChange }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-[#868484]">
        Selected: <span className="font-mono">{value}</span>
      </span>
      <div
        className="h-5 w-5 rounded-full border border-[#E3DCEA]"
        style={{ backgroundColor: value }}
      />
    </div>

    <div className="rounded-xl bg-[#F9EAFF] p-2">
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
                  ? "border-[#FE678B] ring-2 ring-[#FE678B]/40 scale-105"
                  : "border-[#E3DCEA] hover:scale-105"
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
      className="h-6 w-6 shrink-0 rounded-md border border-[#E3DCEA]"
      style={{ backgroundColor: value || "#ffffff" }}
    />
    <TextInput value={value || ""} onChange={onChange} placeholder="#RRGGBB" />
  </div>
);
