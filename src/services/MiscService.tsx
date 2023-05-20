import { SrsLevelName } from "../types/MiscTypes";
import { Collection } from "../types/Collection";

const createTimeTillStr = (timeTill: number, timeFrame: string) => {
  if (timeTill > 0) {
    return timeTill === 1
      ? `${timeTill} ${timeFrame}`
      : `${timeTill} ${timeFrame}s`;
  }
  return undefined;
};

// TODO: modify so if 1 for value displays without "s"
export const getTimeFromNow = (availableTime: Date | null) => {
  if (availableTime === null) {
    return "N/A";
  }

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  let availDate = new Date(availableTime);
  let rightNow = new Date();
  let timeDiff = availDate.getTime() - rightNow.getTime();

  // TODO: display one decimal point?
  let monthsTill = Math.floor(timeDiff / month);
  let daysTill = Math.floor(timeDiff / day);
  let hrsTill = Math.floor(timeDiff / hour);
  let minsTill = Math.floor(timeDiff / minute);

  return (
    createTimeTillStr(monthsTill, "month") ||
    createTimeTillStr(daysTill, "day") ||
    createTimeTillStr(hrsTill, "hour") ||
    createTimeTillStr(minsTill, "minute") ||
    "Available Now"
  );
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
  let flattened = data.data.map((elem: any) => {
    elem = Object.assign({}, elem, elem.data);
    delete elem.data;
    return elem;
  });

  console.log("flattened: ", flattened);

  return flattened;
};

export const flattenCollectionOfOne = (data: Collection) => {
  let flattenedCollection = Object.assign({}, data, data.data);
  let innerDataItem = flattenedCollection.data[0];
  let flattenedInnerData = Object.assign({}, innerDataItem, innerDataItem.data);

  delete flattenedInnerData.data;
  return flattenedInnerData;
};
