type SrsStageNum = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SrsStageName =
  | "locked"
  | "initiate"
  | "apprentice"
  | "guru"
  | "master"
  | "enlightened"
  | "burned";

export type SrsLevelNumsAndSubLevels = {
  stageNums: SrsStageNum[];
  subLevels: number[] | null;
};

enum AssignmentTypeKeys {
  RADICAL = "radical",
  KANJI = "kanji",
  VOCABULARY = "vocabulary",
  KANA_VOCABULARY = "kana_vocabulary",
}

export type AssignmentTypeGroupCount = Record<AssignmentTypeKeys, number>;
