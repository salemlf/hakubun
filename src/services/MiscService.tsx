import { SrsLevelName } from "../types/MiscTypes";
import { Collection } from "../types/Collection";

export const getTimeFromNow = (availableTime: Date | null) => {
  if (availableTime == null) {
    return "N/A";
  }

  let availDate = new Date(availableTime);
  let rightNow = new Date();
  let timeDiff = availDate.getTime() - rightNow.getTime();

  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;

  let monthsTill = Math.floor(timeDiff / month);
  let daysTill = Math.floor(timeDiff / day);
  let hrsTill = Math.floor(timeDiff / hour);
  let minsTill = Math.floor(timeDiff / minute);

  if (monthsTill > 0) {
    return `${monthsTill} months`;
  } else if (daysTill > 0) {
    return `${daysTill} days`;
  } else if (hrsTill > 0) {
    return `${hrsTill} hours`;
  } else if (minsTill > 0) {
    return `${minsTill} minutes`;
  } else if (minsTill <= 0) {
    return `Available now`;
  } else {
    return "Unknown";
  }
};

const srsLevels: {} = {
  initiate: [0],
  apprentice: [1, 2, 3, 4],
  guru: [5, 6],
  master: [7],
  enlightened: [8],
  burned: [9],
};

export const getSrsLevelsByName = (key: SrsLevelName) => {
  return srsLevels[key as keyof {}];
};

export const convertToUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const flattenData = (data: any) => {
  let flattened = Object.assign({}, data, data.data);
  delete flattened.data;
  return flattened;
};

export const flattenCollectionOfOne = (data: Collection) => {
  let flattenedCollection = Object.assign({}, data, data.data);
  let innerDataItem = flattenedCollection.data[0];
  let flattenedInnerData = Object.assign({}, innerDataItem, innerDataItem.data);

  delete flattenedInnerData.data;
  return flattenedInnerData;
};
