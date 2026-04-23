import { PillButton } from "./ui.jsx";
import { normalizeChallengeDays, exportChallengeJson } from "../utils.js";

export default function HomeScreen({
  challenges,
  loading,
  error,
  onNewChallenge,
  onEditChallenge
}) {
  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-112px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Your Generated Challenges
          </h2>
          <p className="text-sm text-slate-500">
            Select a challenge to edit or export, or start a new one.
          </p>
        </div>
        <PillButton onClick={onNewChallenge}>+ New Challenge</PillButton>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
          Loading challenges...
        </div>
      )}

      {!loading && error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Failed to load challenges: {error}
        </div>
      )}

      {!loading && !error && challenges.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-sm text-slate-500">
          <p>No challenges found yet.</p>
          <button
            type="button"
            onClick={onNewChallenge}
            className="mt-3 text-xs font-medium text-sky-600 hover:underline"
          >
            Create your first challenge →
          </button>
        </div>
      )}

      {!loading && !error && challenges.length > 0 && (
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {challenges.map((ch) => {
              const metaV1 = ch.challengeMeta || {};
              const metaV2 = ch.challengeMetaV2 || null;
              const days = normalizeChallengeDays(ch.challengeDays);
              const title =
                metaV2?.title || metaV1.title || ch.challengeId || "Untitled Challenge";
              const duration = days.length || metaV1.duration || 0;
              const startDate =
                metaV2?.visibility?.startDate || metaV1.startDate || "—";
              const hasV1 = !!ch.challengeMeta;
              const hasV2 = !!ch.challengeMetaV2;

              return (
                <div
                  key={ch.challengeId}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {title}
                      </h3>
                      <div className="flex gap-1">
                        {hasV1 && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                            V1
                          </span>
                        )}
                        {hasV2 && (
                          <span className="inline-flex items-center rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-medium text-sky-700">
                            V2
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 break-all">
                      ID:{" "}
                      <span className="font-mono text-slate-600">
                        {ch.challengeId}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5">
                        Duration:{" "}
                        <span className="ml-1 font-medium">{duration} days</span>
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5">
                        Start:{" "}
                        <span className="ml-1 font-medium">{startDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <PillButton onClick={() => onEditChallenge(ch)}>
                      Edit
                    </PillButton>
                    <PillButton
                      variant="ghost"
                      onClick={() => exportChallengeJson(ch)}
                    >
                      Export JSON
                    </PillButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
