import { useEffect, useState } from "react";
import {
  defaultChallengeMetaV1,
  defaultChallengeMetaV2
} from "./constants.js";
import {
  generateDays,
  createEmptyDay,
  padDay,
  normalizeChallengeDays,
  createNewChallengePair,
  seedV2FromId,
  restampDays
} from "./utils.js";
import { fetchChallenges, saveChallenge, deleteChallenge } from "./api.js";
import { PillButton } from "./components/ui.jsx";
import ChallengeMetaEditor from "./components/ChallengeMetaEditor.jsx";
import ChallengeMetaEditorV2 from "./components/ChallengeMetaEditorV2.jsx";
import DayList from "./components/DayList.jsx";
import DayEditor from "./components/DayEditor.jsx";
import JsonPreview from "./components/JsonPreview.jsx";
import HomeScreen from "./components/HomeScreen.jsx";

export default function App() {
  const [metaV1, setMetaV1] = useState(defaultChallengeMetaV1);
  const [metaV2, setMetaV2] = useState({
    ...defaultChallengeMetaV2,
    id: defaultChallengeMetaV1.challengeId
  });
  const [metaVersion, setMetaVersion] = useState("v2");

  const [days, setDays] = useState(
    generateDays(
      defaultChallengeMetaV1.challengeId,
      defaultChallengeMetaV1.duration
    )
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const [view, setView] = useState("home");
  const [challenges, setChallenges] = useState([]);
  const [loadingChallenges, setLoadingChallenges] = useState(false);
  const [challengesError, setChallengesError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingChallenges(true);
        setChallengesError("");
        const list = await fetchChallenges();
        setChallenges(list);
      } catch (err) {
        setChallengesError(err.message || "Unknown error");
      } finally {
        setLoadingChallenges(false);
      }
    };
    load();
  }, []);

  // The challenge ID lives in three places (metaV1.challengeId, metaV2.id,
  // each day's challengeId) — these wrappers keep them in sync whichever
  // editor the change comes from.
  const handleMetaV1Change = (next) => {
    if (next.challengeId !== metaV1.challengeId) {
      setMetaV2((prev) => ({ ...prev, id: next.challengeId }));
      setDays((prev) =>
        prev.map((d) => ({ ...d, challengeId: next.challengeId }))
      );
    }
    setMetaV1(next);
  };

  const handleMetaV2Change = (next) => {
    if (next.id !== metaV2.id) {
      setMetaV1((prev) => ({ ...prev, challengeId: next.id }));
      setDays((prev) => prev.map((d) => ({ ...d, challengeId: next.id })));
    }
    setMetaV2(next);
  };

  const handleGenerateDays = (challengeId, duration) => {
    if (
      days.length > 0 &&
      !window.confirm(
        `Regenerate ${duration} days from scratch? All existing day content will be replaced.`
      )
    ) {
      return;
    }
    setDays(generateDays(challengeId, duration));
    setSelectedDayIndex(0);
  };

  const handleAddDay = () => {
    const idx = days.length;
    setDays([...days, createEmptyDay(metaV1.challengeId, idx)]);
    setMetaV1((prev) => ({ ...prev, duration: idx + 1 }));
    setSelectedDayIndex(idx);
  };

  const handleDeleteDay = (index) => {
    const day = days[index];
    if (
      !window.confirm(
        `Delete ${day?.dayId || `Day ${index + 1}`}? Its content will be lost.`
      )
    ) {
      return;
    }
    const newDays = restampDays(days.filter((_, i) => i !== index));
    setDays(newDays);
    setMetaV1((prev) => ({ ...prev, duration: newDays.length }));
    setSelectedDayIndex((prev) => {
      const shifted = prev > index ? prev - 1 : prev;
      return Math.max(0, Math.min(shifted, newDays.length - 1));
    });
  };

  const handleMoveDay = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= days.length) return;
    const newDays = [...days];
    [newDays[index], newDays[target]] = [newDays[target], newDays[index]];
    setDays(restampDays(newDays));
    if (selectedDayIndex === index) setSelectedDayIndex(target);
    else if (selectedDayIndex === target) setSelectedDayIndex(index);
  };

  // Grows the list with empty days or trims it from the end (with a
  // confirmation), preserving existing content — unlike Generate, which
  // rebuilds every day. Works in both V1 and V2 modes.
  const handleSetDayCount = (count) => {
    const n = Math.floor(Number(count));
    if (!Number.isFinite(n) || n < 1 || n === days.length) return;
    if (n < days.length) {
      if (
        !window.confirm(
          `Remove the last ${days.length - n} day(s)? Their content will be lost.`
        )
      ) {
        return;
      }
      setDays(days.slice(0, n));
    } else {
      setDays([
        ...days,
        ...Array.from({ length: n - days.length }, (_, i) =>
          createEmptyDay(metaV1.challengeId, days.length + i)
        )
      ]);
    }
    setMetaV1((prev) => ({ ...prev, duration: n }));
    setSelectedDayIndex((prev) => Math.min(prev, n - 1));
  };

  const handleUpdateDay = (updatedDay) => {
    const newDays = [...days];
    newDays[selectedDayIndex] = {
      ...updatedDay,
      challengeId: metaV1.challengeId,
      dayId: `Day ${padDay(selectedDayIndex + 1)}`
    };
    setDays(newDays);
  };

  const handleNewChallenge = () => {
    const { v1, v2 } = createNewChallengePair();
    setMetaV1(v1);
    setMetaV2(v2);
    setDays(generateDays(v1.challengeId, v1.duration));
    setSelectedDayIndex(0);
    setMetaVersion("v2");
    setView("editor");
  };

  const handleEditExistingChallenge = (challenge) => {
    const challengeId = challenge.challengeId;
    const loadedV1 = challenge.challengeMeta || {
      ...defaultChallengeMetaV1,
      challengeId
    };
    const loadedV2 =
      challenge.challengeMetaV2 ||
      seedV2FromId(challengeId, loadedV1.title || "");
    const loadedDays = normalizeChallengeDays(challenge.challengeDays);

    setMetaV1({ ...loadedV1, challengeId });
    setMetaV2({ ...loadedV2, id: challengeId });

    if (loadedDays.length > 0) {
      setDays(loadedDays);
    } else {
      setDays(
        generateDays(
          challengeId,
          loadedV1.duration || defaultChallengeMetaV1.duration
        )
      );
    }

    setSelectedDayIndex(0);
    setMetaVersion("v2");
    setView("editor");
  };

  const handleDuplicateChallenge = (challenge) => {
    const sourceId = challenge.challengeId;
    const input = window.prompt(
      "Enter an ID for the duplicated challenge:",
      `${sourceId}Copy`
    );
    if (input == null) return;
    const newId = input.trim();
    if (!newId) return;
    if (challenges.some((c) => c.challengeId === newId)) {
      alert(`A challenge with the ID "${newId}" already exists.`);
      return;
    }

    const source = JSON.parse(JSON.stringify(challenge));
    const srcV1 = source.challengeMeta || {
      ...defaultChallengeMetaV1,
      challengeId: sourceId
    };
    const srcV2 =
      source.challengeMetaV2 || seedV2FromId(sourceId, srcV1.title || "");
    const srcDays = normalizeChallengeDays(source.challengeDays);

    const copyTitle = srcV1.title ? `${srcV1.title} (Copy)` : "New Challenge";
    setMetaV1({ ...srcV1, challengeId: newId, title: copyTitle });
    setMetaV2({
      ...srcV2,
      id: newId,
      title: srcV2.title ? `${srcV2.title} (Copy)` : copyTitle
    });
    setDays(
      srcDays.length > 0
        ? srcDays.map((d) => ({ ...d, challengeId: newId }))
        : generateDays(newId, srcV1.duration || defaultChallengeMetaV1.duration)
    );
    setSelectedDayIndex(0);
    setMetaVersion("v2");
    setView("editor");
  };

  const handleDeleteChallenge = async (challenge) => {
    const id = challenge.challengeId;
    const title =
      challenge.challengeMetaV2?.title || challenge.challengeMeta?.title || id;
    if (
      !window.confirm(
        `Delete "${title}" (${id}) permanently? This cannot be undone.`
      )
    ) {
      return;
    }
    try {
      await deleteChallenge(id);
      setChallenges((prev) => prev.filter((c) => c.challengeId !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete challenge. Please try again.");
    }
  };

  const handleSaveChallenge = async () => {
    try {
      const challengeId = metaV1.challengeId;
      const metaV2ToSave = { ...metaV2, id: challengeId };
      const payload = {
        challengeId,
        challengeMeta: metaV1,
        challengeMetaV2: metaV2ToSave,
        challengeDays: { challengeId, challengeDays: days }
      };

      await saveChallenge(payload);

      setChallenges((prev) => {
        const saved = {
          challengeId,
          challengeMeta: metaV1,
          challengeMetaV2: metaV2ToSave,
          challengeDays: payload.challengeDays
        };
        const others = prev.filter((c) => c.challengeId !== challengeId);
        return [...others, saved];
      });

      alert("Challenge saved successfully ✅");
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save challenge. Please try again.");
    }
  };

  const SegmentedToggle = () => (
    <div className="inline-flex rounded-full border border-[#E3DCEA] bg-[#F9EAFF] p-0.5 text-[11px] font-medium">
      {["v1", "v2"].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => setMetaVersion(v)}
          className={`rounded-full px-2.5 py-0.5 transition ${
            metaVersion === v
              ? "bg-[#FE678B] text-white shadow-sm"
              : "text-[#2B0062] hover:text-[#FE678B]"
          }`}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0FCFF]">
      <header className="border-b border-[#E6F4F9] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-2xl bg-[#FE678B] text-white flex items-center justify-center text-sm font-bold">
              G
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[#211036]">
                Gratitude Challenge Builder
              </h1>
              <p className="text-[11px] text-[#868484]">
                Create and export JSON for in-app challenges.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-[#868484]">
            {view === "editor" && (
              <>
                <span>
                  Challenge ID:{" "}
                  <span className="font-mono text-[#262626]">
                    {metaV1.challengeId}
                  </span>
                </span>
                <SegmentedToggle />
                <PillButton onClick={handleSaveChallenge}>Save</PillButton>
                <PillButton variant="ghost" onClick={() => setView("home")}>
                  ← Back to Challenges
                </PillButton>
              </>
            )}
            {view === "home" && (
              <PillButton onClick={handleNewChallenge}>
                + New Challenge
              </PillButton>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-4">
        {view === "home" ? (
          <HomeScreen
            challenges={challenges}
            loading={loadingChallenges}
            error={challengesError}
            onNewChallenge={handleNewChallenge}
            onEditChallenge={handleEditExistingChallenge}
            onDuplicateChallenge={handleDuplicateChallenge}
            onDeleteChallenge={handleDeleteChallenge}
          />
        ) : (
          <div className="grid grid-cols-12 gap-4 h-[calc(100vh-96px)]">
            <section className="col-span-3 rounded-3xl bg-white p-3 shadow-[0_4px_16px_rgba(43,0,98,0.06)] border border-[#E6F4F9] flex flex-col">
              {metaVersion === "v2" ? (
                <ChallengeMetaEditorV2
                  meta={metaV2}
                  onChange={handleMetaV2Change}
                />
              ) : (
                <ChallengeMetaEditor
                  meta={metaV1}
                  onChange={handleMetaV1Change}
                  onGenerateDays={handleGenerateDays}
                />
              )}
            </section>

            <section className="col-span-5 rounded-3xl bg-white p-3 shadow-[0_4px_16px_rgba(43,0,98,0.06)] border border-[#E6F4F9] flex flex-col">
              <div className="grid grid-cols-3 gap-3 h-full">
                <div className="col-span-1 border-r border-[#E6F4F9] pr-2">
                  <DayList
                    days={days}
                    selectedIndex={selectedDayIndex}
                    onSelect={setSelectedDayIndex}
                    onAddDay={handleAddDay}
                    onDeleteDay={handleDeleteDay}
                    onMoveDay={handleMoveDay}
                    onSetDayCount={handleSetDayCount}
                  />
                </div>
                <div className="col-span-2 pl-2">
                  <DayEditor
                    day={days[selectedDayIndex]}
                    index={selectedDayIndex}
                    onChange={handleUpdateDay}
                  />
                </div>
              </div>
            </section>

            <section className="col-span-4 rounded-3xl bg-white p-3 shadow-[0_4px_16px_rgba(43,0,98,0.06)] border border-[#E6F4F9] flex flex-col">
              <JsonPreview
                metaV1={metaV1}
                metaV2={metaV2}
                metaVersion={metaVersion}
                days={days}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
