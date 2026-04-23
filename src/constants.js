export const API_BASE =
  "https://pl5xaf0r80.execute-api.us-east-1.amazonaws.com/prod";
export const API_GET_CHALLENGES = `${API_BASE}/getgeneratedchallenges`;
export const API_SAVE_CHALLENGE = `${API_BASE}/savegeneratedchallenge`;

export const PRIMARY_COLORS = [
  "#FAFFD4",
  "#D8E1FF",
  "#FFEDE1",
  "#DDFFF8",
  "#FFDCE2",
  "#E1FAFF",
  "#F1FFDB",
  "#C2E9CF",
  "#E9CFE3",
  "#FDFFE4",
  "#FFE2D1",
  "#FFD2FB",
  "#D0F4DE",
  "#BEF1F6",
  "#FEF2F2",
  "#E5CDCD",
  "#EEC7C7",
  "#F2B4B2",
  "#E5CDDE",
  "#D9B4D0",
  "#F1ADEC",
  "#C8CADC",
  "#C7C8D9",
  "#A0A7EC",
  "#CEDBE7",
  "#B1C8CE",
  "#96C0D7",
  "#D4E9D2",
  "#B7D1B1",
  "#95D99B",
  "#EBEACC",
  "#D3D0B2",
  "#DFE098",
  "#E8DBCA",
  "#D0BDA1",
  "#D0AD83"
];

export const defaultChallengeMetaV1 = {
  challengeId: "ChallengeSample2025",
  title: "Sample Challenge",
  subtitle: "30 days of reflection and growth.",
  entityDescriptor: "Sample Challenge 2025",
  duration: 30,
  startDate: "2025-01-01",
  showDate: "2024-12-25",
  hideDate: "2025-02-01",
  showAsNewlyLaunched: true,
  description: "30 days of reflection and growth.",
  order: 1,
  takersCount: 0,
  preEnrolledCount: 0,
  surveyUrl: "",
  shareMessage:
    "Join me in this challenge 🌿 30 days of reflection and growth. https://links.gratefulness.me/Challenges",
  thumbnailIllusUrl:
    "https://gratitude-app-content.s3.us-east-1.amazonaws.com/challenges/sample/thumbnail.png",
  bannerIllusUrl:
    "https://gratitude-app-content.s3.us-east-1.amazonaws.com/challenges/sample/banner.png",
  cardIllusUrl:
    "https://gratitude-app-content.s3.us-east-1.amazonaws.com/challenges/sample/card.png",
  recommendIllusUrl: "",
  challengeGroupId: "",
  challengeGroupOrder: 0,
  instructions: [
    "🌿 Take a small moment each day",
    "💭 Reflect with honesty and care",
    "🕊️ Be gentle with yourself as you write",
    "⏳ One day at a time"
  ],
  carouselCards: [
    {
      title: "Opening Reflections",
      subtitle: "Begin with gentle awareness of your inner world.",
      bgColor: "#E9CFE3",
      illusUrl:
        "https://gratitude-app-content.s3.amazonaws.com/challenges/carousels/carousel_heart.png"
    },
    {
      title: "Daily Moments",
      subtitle: "Notice small shifts, feelings, and insights each day.",
      bgColor: "#FFEDE1",
      illusUrl:
        "https://gratitude-app-content.s3.amazonaws.com/challenges/carousels/carousel_smile.png"
    },
    {
      title: "Deepening Practice",
      subtitle:
        "Explore themes of care, gratitude, and gentle self-understanding.",
      bgColor: "#D0F4DE",
      illusUrl:
        "https://gratitude-app-content.s3.amazonaws.com/challenges/carousels/carousel_planning.png"
    }
  ]
};

export const defaultChallengeMetaV2 = {
  id: "ChallengeSample2025",
  title: "Sample Challenge",
  subtitle: "30 days of reflection and growth.",
  description: "30 days of reflection and growth.",
  order: 0,
  takersCount: 0,
  deeplink: "https://links.gratefulness.me/Challenges",
  asset: {
    url:
      "https://static.gratefulness.me/gratitude-app-content/challenges/v2/ChallengeSample2025.png",
    type: "image"
  },
  theme: {
    background: { dark: "#1C2D54", light: "#DEFBD9" },
    text: { dark: "#DEFBD9", light: "#1C2D54" }
  },
  eligibility: {
    geo: { mode: "all", countries: [] },
    platform: {
      android: { enabled: true, minVersion: null },
      ios: { enabled: true, minVersion: null }
    },
    minJournalEntries: 0,
    userType: "all"
  },
  visibility: {
    startDate: "2025-01-01",
    endDate: "",
    visibleFrom: "2024-12-25"
  },
  surveys: []
};
