import { useMemo, useState } from "react";
import { SectionTitle, PillButton } from "./ui.jsx";

export default function JsonPreview({ metaV1, metaV2, metaVersion, days }) {
  const activeMeta = metaVersion === "v2" ? metaV2 : metaV1;
  const challengeId = metaVersion === "v2" ? metaV2.id : metaV1.challengeId;

  const metaJson = useMemo(
    () => JSON.stringify(activeMeta, null, 2),
    [activeMeta]
  );
  const daysJson = useMemo(
    () =>
      JSON.stringify(
        { challengeId, challengeDays: days },
        null,
        2
      ),
    [challengeId, days]
  );

  const [tab, setTab] = useState("meta");

  const copyToClipboard = (text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  const metaLabel = metaVersion === "v2" ? "Meta (V2)" : "Meta (V1)";

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <SectionTitle>JSON Preview</SectionTitle>
        <div className="space-x-1">
          <PillButton
            variant={tab === "meta" ? "primary" : "ghost"}
            onClick={() => setTab("meta")}
          >
            {metaLabel}
          </PillButton>
          <PillButton
            variant={tab === "days" ? "primary" : "ghost"}
            onClick={() => setTab("days")}
          >
            Days
          </PillButton>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] text-slate-500">
          Copy and paste into your JSON config.
        </p>
        <PillButton
          variant="ghost"
          onClick={() => copyToClipboard(tab === "meta" ? metaJson : daysJson)}
        >
          Copy {tab === "meta" ? "meta" : "days"} JSON
        </PillButton>
      </div>
      <div className="flex-1 overflow-hidden">
        <pre className="h-full w-full overflow-auto rounded-xl bg-slate-900 p-3 text-[11px] text-slate-100 shadow-inner">
          {tab === "meta" ? metaJson : daysJson}
        </pre>
      </div>
    </div>
  );
}
