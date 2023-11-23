import { SubjectType } from "./types/Subject";
import { PronunciationVoice } from "./types/UserSettingsTypes";

// general
export const MIN_LEVEL = 1;
export const MAX_LEVEL = 60;
export const LEVELS = Array.from({ length: 60 }, (_, index) => index + 1);

export const MAX_ASSIGNMENTS_BEFORE_SUBMIT = 5;

export const ASSIGNMENT_BATCH_SIZES = [
  "All",
  "1",
  "2",
  "5",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
];

export const INVALID_ANSWER_CHARS = new RegExp(
  /.*[!@#%^&*()_+=[\]{}|;:",\\/<>~`].*/,
  "g"
);

// TODO: add more, prob some missing
export const PARTS_OF_SPEECH = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "transitive verb",
  "intransitive verb",
  "godan verb",
  "ichidan verb",
  "い adjective",
  "の adjective",
  "な adjective",
];

// subjects
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

export const ALL_SUBJECT_TYPES: SubjectType[] = [
  "radical",
  "kanji",
  "vocabulary",
  "kana_vocabulary",
];

// assignments
export const VALID_SRS_STAGES = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
