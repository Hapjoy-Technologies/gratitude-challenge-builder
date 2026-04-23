import { padDay } from "../utils.js";
import { SectionTitle, PillButton } from "./ui.jsx";

export default function DayList({ days, selectedIndex, onSelect, onAddDay, duration }) {
  return (
    <div className="space-y-3 h-full overflow-y-auto pr-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Days</SectionTitle>
        <span className="text-xs text-slate-500">
          {days.length} / {duration}
        </span>
      </div>
      <div className="space-y-1">
        {days.map((day, index) => (
          <button
            key={day.dayId || index}
            type="button"
            onClick={() => onSelect(index)}
            className={`flex w-full items-center justify-between rounded-lg border px-2.5 py-1.5 text-left text-xs ${
              selectedIndex === index
                ? "border-sky-500 bg-sky-50 text-sky-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <div>
              <div className="font-semibold">
                {day.title || `Day ${index + 1}`}
              </div>
              <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                {day.subTitle || "No subtitle yet"}
              </div>
            </div>
            <span className="text-[11px] text-slate-400">
              {day.dayId || `Day ${padDay(index + 1)}`}
            </span>
          </button>
        ))}
      </div>
      {days.length < duration && (
        <div className="pt-2">
          <PillButton variant="ghost" onClick={onAddDay}>
            + Add day {days.length + 1}
          </PillButton>
        </div>
      )}
    </div>
  );
}
