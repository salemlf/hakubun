import { SrsLevelNumsAndSubLevels, SrsStageName } from "./SrsStages.types";

export const srsStageNames: SrsStageName[] = [
  "initiate",
  "apprentice",
  "guru",
  "master",
  "enlightened",
  "burned",
];

export const srsStagesMap: { [index: string]: SrsLevelNumsAndSubLevels } = {
  locked: { stageNums: [-1], subLevels: null },
  initiate: { stageNums: [0], subLevels: null },
  apprentice: { stageNums: [1, 2, 3, 4], subLevels: [1, 2, 3, 4] },
  guru: { stageNums: [5, 6], subLevels: [1, 2] },
  master: { stageNums: [7], subLevels: null },
  enlightened: { stageNums: [8], subLevels: null },
  burned: { stageNums: [9], subLevels: null },
};
