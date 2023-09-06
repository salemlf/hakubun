import { AssignmentType } from "./types/Assignment";
import { PronunciationVoice } from "./types/UserSettingsTypes";

export const LEVELS = Array.from({ length: 60 }, (_, index) => index + 1);

export const ASSIGNMENT_BATCH_SIZES = [
  1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
];

export const AUDIO_VOICES: PronunciationVoice[] = [
  "Male, Kyoto accent",
  "Female, Kyoto accent",
  "Male, Tokyo accent",
  "Female, Tokyo accent",
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

export const TAG_REGEXES = {
  radRegEx: new RegExp(`<radical>(.+?)<\/radical>`, "g"),
  kanjiRegEx: new RegExp(`<kanji>(.+?)<\/kanji>`, "g"),
  vocabRegEx: new RegExp(`<vocabulary>(.+?)<\/vocabulary>`, "g"),
  readingRegEx: new RegExp(`<reading>(.+?)<\/reading>`, "g"),
  meaningRegEx: new RegExp(`<meaning>(.+?)<\/meaning>`, "g"),
  japaneseRegEx: new RegExp(`<ja>(.+?)<\/ja>`, "g"),
  japaneseReadingRegEx: new RegExp(`<reading><ja>(.+?)<\/ja><\/reading>`, "g"),
};
