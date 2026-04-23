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
  seedV2FromId
} from "./utils.js";
import { fetchChallenges, saveChallenge } from "./api.js";
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

  const handleGenerateDays = (challengeId, duration) => {
    setDays(generateDays(challengeId, duration));
    setSelectedDayIndex(0);
  };

  const handleAddDay = () => {
    const idx = days.length;
    setDays([...days, createEmptyDay(metaV1.challengeId, idx)]);
    setSelectedDayIndex(idx);
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
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-0.5 text-[11px] font-medium">
      {["v1", "v2"].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => setMetaVersion(v)}
          className={`rounded-full px-2.5 py-0.5 transition ${
            metaVersion === v
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-sm font-bold">
              G
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-800">
                Gratitude Challenge Builder
              </h1>
              <p className="text-[11px] text-slate-500">
                Create and export JSON for in-app challenges.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            {view === "editor" && (
              <>
                <span>
                  Challenge ID:{" "}
                  <span className="font-mono text-slate-700">
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
          />
        ) : (
          <div className="grid grid-cols-12 gap-4 h-[calc(100vh-96px)]">
            <section className="col-span-3 rounded-2xl bg-white p-3 shadow-sm border border-slate-200 flex flex-col">
              {metaVersion === "v2" ? (
                <ChallengeMetaEditorV2 meta={metaV2} onChange={setMetaV2} />
              ) : (
                <ChallengeMetaEditor
                  meta={metaV1}
                  onChange={setMetaV1}
                  onGenerateDays={handleGenerateDays}
                />
              )}
            </section>

            <section className="col-span-5 rounded-2xl bg-white p-3 shadow-sm border border-slate-200 flex flex-col">
              <div className="grid grid-cols-3 gap-3 h-full">
                <div className="col-span-1 border-r border-slate-100 pr-2">
                  <DayList
                    days={days}
                    selectedIndex={selectedDayIndex}
                    onSelect={setSelectedDayIndex}
                    onAddDay={handleAddDay}
                    duration={metaV1.duration}
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

            <section className="col-span-4 rounded-2xl bg-white p-3 shadow-sm border border-slate-200 flex flex-col">
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
