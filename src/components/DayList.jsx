import { padDay } from "../utils.js";
import { SectionTitle, PillButton } from "./ui.jsx";

export default function DayList({ days, selectedIndex, onSelect, onAddDay, duration }) {
  return (
    <div className="space-y-3 h-full overflow-y-auto pr-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Days</SectionTitle>
        <span className="text-xs text-[#868484]">
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
                ? "border-[#FE678B] bg-[#FDE8EE] text-[#2B0062]"
                : "border-[#E6F4F9] bg-white text-[#262626] hover:bg-[#F9EAFF]"
            }`}
          >
            <div>
              <div className="font-semibold">
                {day.title || `Day ${index + 1}`}
              </div>
              <div className="text-[11px] text-[#868484] truncate max-w-[180px]">
                {day.subTitle || "No subtitle yet"}
              </div>
            </div>
            <span className="text-[11px] text-[#A8A3B0]">
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
