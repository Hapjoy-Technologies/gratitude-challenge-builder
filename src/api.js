import {
  API_GET_CHALLENGES,
  API_SAVE_CHALLENGE,
  API_DELETE_CHALLENGE
} from "./constants.js";

export const fetchChallenges = async () => {
  const res = await fetch(API_GET_CHALLENGES);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.challenges || [];
};

export const saveChallenge = async (payload) => {
  const res = await fetch(API_SAVE_CHALLENGE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const deleteChallenge = async (challengeId) => {
  const res = await fetch(API_DELETE_CHALLENGE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
