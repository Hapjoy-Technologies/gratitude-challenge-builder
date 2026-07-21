import { defaultChallengeMetaV1, defaultChallengeMetaV2 } from "./constants.js";

export const padDay = (n) => String(n).padStart(2, "0");

export const createEmptyDay = (challengeId, index) => {
  const dayNumber = index + 1;
  return {
    captionText: `Day ${dayNumber}. Write a short description for this day here.`,
    challengeId,
    courtesy: "",
    dayId: `Day ${padDay(dayNumber)}`,
    daySinceJoining: index,
    examplesHeader: "Example sentences:",
    extraHint: "",
    pointersHeader: "",
    primaryColor: "#FAFFD4",
    promptHeader: "Prompt for the day",
    promptHeaderText:
      "Write the gentle, reflective prompt you want users to respond to.",
    showInvite: false,
    showSurvey: false,
    subTitle: "Day subtitle",
    title: `Day ${dayNumber}`,
    pointers: [],
    examples: [
      "This is an example journal entry for this day. It shows the tone and style you would like users to follow.",
      "You can write longer examples that feel personal, warm, and reflective, giving users a sense of how to respond.",
      "Each example can explore one angle of the prompt, so users feel more guided and supported while writing."
    ]
  };
};

export const generateDays = (challengeId, duration) =>
  Array.from({ length: duration }, (_, i) => createEmptyDay(challengeId, i));

export const restampDays = (days) =>
  days.map((day, i) => ({
    ...day,
    dayId: `Day ${padDay(i + 1)}`,
    daySinceJoining: i
  }));

export const getChallengeStartDate = (challenge) => {
  const metaV1 = challenge.challengeMeta || {};
  const metaV2 = challenge.challengeMetaV2 || null;
  return metaV2?.visibility?.startDate || metaV1.startDate || "";
};

// Newest start date first; challenges without a start date sort to the bottom.
export const sortChallengesByStartDateDesc = (challenges) =>
  [...challenges].sort((a, b) => {
    const da = getChallengeStartDate(a);
    const db = getChallengeStartDate(b);
    if (da === db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db.localeCompare(da);
  });

export const normalizeChallengeDays = (challengeDays) => {
  if (Array.isArray(challengeDays)) return challengeDays;
  if (challengeDays && Array.isArray(challengeDays.challengeDays)) {
    return challengeDays.challengeDays;
  }
  return [];
};

export const seedV2FromId = (challengeId, titleHint = "") => ({
  ...defaultChallengeMetaV2,
  id: challengeId,
  title: titleHint || "",
  subtitle: "",
  description: "",
  order: 0,
  takersCount: 0,
  asset: { ...defaultChallengeMetaV2.asset, url: "" },
  visibility: { startDate: "", endDate: "", visibleFrom: "" },
  surveys: []
});

export const createNewChallengePair = () => {
  const id = `Challenge_${Date.now()}`;
  return {
    v1: {
      ...defaultChallengeMetaV1,
      challengeId: id,
      title: "New Challenge",
      entityDescriptor: id
    },
    v2: {
      ...defaultChallengeMetaV2,
      id,
      title: "New Challenge"
    }
  };
};

export const exportChallengeJson = (challenge) => {
  const data = {
    challengeMeta: challenge.challengeMeta,
    challengeMetaV2: challenge.challengeMetaV2,
    challengeDays: challenge.challengeDays
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${challenge.challengeId || "challenge"}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
