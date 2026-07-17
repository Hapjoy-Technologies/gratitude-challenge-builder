import { useEffect, useState } from "react";
import { padDay } from "../utils.js";
import { SectionTitle, PillButton } from "./ui.jsx";

export default function DayList({
  days,
  selectedIndex,
  onSelect,
  onAddDay,
  onDeleteDay,
  onMoveDay,
  onSetDayCount
}) {
  const [countInput, setCountInput] = useState(days.length);

  useEffect(() => {
    setCountInput(days.length);
  }, [days.length]);

  const applyCount = () => {
    const n = Math.floor(Number(countInput));
    if (!Number.isFinite(n) || n < 1) {
      setCountInput(days.length);
      return;
    }
    onSetDayCount(n);
  };

  return (
    <div className="space-y-3 h-full overflow-y-auto pr-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Days</SectionTitle>
        <span className="text-xs text-[#868484]">{days.length} days</span>
      </div>

      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min={1}
          value={countInput}
          onChange={(e) => setCountInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyCount()}
          className="w-14 rounded-lg border border-[#E3DCEA] bg-white px-2 py-1 text-xs text-[#211036] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FE678B]/40 focus:border-[#FE678B]"
        />
        <PillButton variant="ghost" onClick={applyCount}>
          Set count
        </PillButton>
      </div>

      <div className="space-y-1">
        {days.map((day, index) => (
          <div
            key={day.dayId || index}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(index);
            }}
            className={`group flex w-full cursor-pointer items-center justify-between rounded-lg border px-2.5 py-1.5 text-left text-xs ${
              selectedIndex === index
                ? "border-[#FE678B] bg-[#FDE8EE] text-[#2B0062]"
                : "border-[#E6F4F9] bg-white text-[#262626] hover:bg-[#F9EAFF]"
            }`}
          >
            <div className="min-w-0">
              <div className="font-semibold">
                {day.title || `Day ${index + 1}`}
              </div>
              <div className="text-[11px] text-[#868484] truncate max-w-[140px]">
                {day.subTitle || "No subtitle yet"}
              </div>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <span className="text-[11px] text-[#A8A3B0] mr-1 group-hover:hidden">
                {day.dayId || `Day ${padDay(index + 1)}`}
              </span>
              <div className="hidden items-center gap-0.5 group-hover:flex">
                <button
                  type="button"
                  title="Move up"
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDay(index, -1);
                  }}
                  className="rounded px-1 text-[11px] text-[#A8A3B0] hover:text-[#2B0062] disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  title="Move down"
                  disabled={index === days.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDay(index, 1);
                  }}
                  className="rounded px-1 text-[11px] text-[#A8A3B0] hover:text-[#2B0062] disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  title="Delete day"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDay(index);
                  }}
                  className="rounded px-1 text-[11px] text-[#A8A3B0] hover:text-[#FF05B9]"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <PillButton variant="ghost" onClick={onAddDay}>
          + Add day {days.length + 1}
        </PillButton>
      </div>
    </div>
  );
}
