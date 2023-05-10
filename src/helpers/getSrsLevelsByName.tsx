import { SrsLevelName } from "../types/MiscTypes";

const srsLevels: {} = {
  initiate: [0],
  apprentice: [1, 2, 3, 4],
  guru: [5, 6],
  master: [7],
  enlightened: [8],
  burned: [9],
};

const getSrsLevelsByName = (key: SrsLevelName) => {
  return srsLevels[key as keyof {}];
};

export default getSrsLevelsByName;
