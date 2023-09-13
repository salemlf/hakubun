import { AssignmentType } from "./types/Assignment";
import { PronunciationVoice } from "./types/UserSettingsTypes";

export const LEVELS = Array.from({ length: 60 }, (_, index) => index + 1);

export const ASSIGNMENT_BATCH_SIZES = [
  1, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
];

export const AUDIO_VOICES: PronunciationVoice[] = [
  {
    id: "male_kyoto",
    details: {
      gender: "male",
      accent: "Kyoto",
    },
    displayName: "Male, Kyoto accent",
  },
  {
    id: "female_kyoto",
    details: {
      gender: "female",
      accent: "Kyoto",
    },
    displayName: "Female, Kyoto accent",
  },
  {
    id: "male_tokyo",
    details: {
      gender: "male",
      accent: "Tokyo",
    },
    displayName: "Male, Tokyo accent",
  },
  {
    id: "female_tokyo",
    details: {
      gender: "female",
      accent: "Tokyo",
    },
    displayName: "Female, Tokyo accent",
  },
];

export const INITIAL_ASSIGNMENT_TYPES: AssignmentType[] = [
  "radical",
  "kanji",
  "vocabulary",
  "kana_vocabulary",
];

export const INVALID_ANSWER_CHARS = new RegExp(
  /.*[!@#%^&*()_+=[\]{}\|;:",\\/<>\~`].*/,
  "g"
);
