import { PillButton } from "./ui.jsx";
import { normalizeChallengeDays, exportChallengeJson } from "../utils.js";

export default function HomeScreen({
  challenges,
  loading,
  error,
  onNewChallenge,
  onEditChallenge,
  onDuplicateChallenge,
  onDeleteChallenge
}) {
  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-112px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-[#211036]">
            Your Generated Challenges
          </h2>
          <p className="text-sm text-[#868484]">
            Select a challenge to edit or export, or start a new one.
          </p>
        </div>
        <PillButton onClick={onNewChallenge}>+ New Challenge</PillButton>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center text-sm text-[#868484]">
          Loading challenges...
        </div>
      )}

      {!loading && error && (
        <div className="mb-4 rounded-xl border border-[#F9C9D6] bg-[#FDE8EE] px-3 py-2 text-sm text-[#211036]">
          Failed to load challenges: {error}
        </div>
      )}

      {!loading && !error && challenges.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-sm text-[#868484]">
          <p>No challenges found yet.</p>
          <button
            type="button"
            onClick={onNewChallenge}
            className="mt-3 text-xs font-semibold text-[#FE678B] hover:text-[#ED6082] hover:underline"
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
                  className="rounded-3xl border border-[#E6F4F9] bg-white p-4 shadow-[0_4px_16px_rgba(43,0,98,0.06)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-semibold text-[#211036]">
                        {title}
                      </h3>
                      <div className="flex gap-1">
                        {hasV1 && (
                          <span className="inline-flex items-center rounded-full bg-[#F0FCFF] px-1.5 py-0.5 text-[10px] font-medium text-[#868484]">
                            V1
                          </span>
                        )}
                        {hasV2 && (
                          <span className="inline-flex items-center rounded-full bg-[#F9EAFF] px-1.5 py-0.5 text-[10px] font-medium text-[#2B0062]">
                            V2
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#868484] mb-3 break-all">
                      ID:{" "}
                      <span className="font-mono text-[#3D3D3D]">
                        {ch.challengeId}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#3D3D3D]">
                      <span className="inline-flex items-center rounded-full bg-[#F0FCFF] px-2 py-0.5">
                        Duration:{" "}
                        <span className="ml-1 font-medium">{duration} days</span>
                      </span>
                      <span className="inline-flex items-center rounded-full bg-[#F0FCFF] px-2 py-0.5">
                        Start:{" "}
                        <span className="ml-1 font-medium">{startDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <PillButton onClick={() => onEditChallenge(ch)}>
                        Edit
                      </PillButton>
                      <PillButton
                        variant="ghost"
                        onClick={() => onDuplicateChallenge(ch)}
                      >
                        Duplicate
                      </PillButton>
                      <PillButton
                        variant="ghost"
                        onClick={() => exportChallengeJson(ch)}
                      >
                        Export
                      </PillButton>
                    </div>
                    <PillButton
                      variant="danger"
                      onClick={() => onDeleteChallenge(ch)}
                    >
                      Delete
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
