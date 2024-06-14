export type WordSearchResult = {
  kanji: KanjiResult[];
  words: WordsResult[];
};

export type KanjiResult = {
  chinese?: string[];
  frequency?: number;
  grade?: number;
  jlpt?: number;
  korean_h?: string[];
  korean_r?: string[];
  kunyomi?: string[];
  literal?: string;
  meanings?: string[];
  onyomi?: string[];
  parts?: string[];
  radical?: string;
  stroke_count?: number;
};

export type WordsResult = {
  audio?: string;
  common: boolean;
  pitch?: PitchSection[];
  reading: KanjiReadings;
  senses?: WordSense[];
};

export type KanjiReadings = {
  kana?: string;
  kanji?: string;
  furigana?: string;
};

export type PitchSection = {
  part: string;
  high: boolean;
};

export type WordSense = {
  glosses?: string[];
  language: string;
  pos?: PartOfSentence[];
};

export type PartOfSentence = string | Record<string, string>;
