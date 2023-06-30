import { SrsLevelName } from "../types/MiscTypes";
import { Collection } from "../types/Collection";
import { PopoverMessageType } from "../reducers/reviewSessionReducer";

const createTimeTillStr = (timeTill: number, timeFrame: string) => {
  if (timeTill > 0) {
    return timeTill === 1
      ? `${timeTill} ${timeFrame}`
      : `${timeTill} ${timeFrame}s`;
  }
  return undefined;
};

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

type SrsLvls = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const srsLevels: { [index: string]: SrsLvls[] } = {
  locked: [-1],
  initiate: [0],
  apprentice: [1, 2, 3, 4],
  guru: [5, 6],
  master: [7],
  enlightened: [8],
  burned: [9],
};

// used when there's no circumstance where undefined/null should be possible
function ensure<T>(
  argument: T | undefined | null,
  message: string = "Value is not allowed to be undefined or null."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export const getSrsLvlBySrsName = (key: SrsLevelName) => {
  return srsLevels[key as keyof {}];
};

export const getSrsNameBySrsLvl = (srsNum: number) => {
  return ensure(
    Object.keys(srsLevels).find((key) =>
      srsLevels[key].some((lvl: number) => lvl === srsNum)
    )
  );
};

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const flattenData = (data: any) => {
  let flattened = data.data.map((elem: any) => {
    elem = Object.assign({}, elem, elem.data);
    delete elem.data;
    return elem;
  });

  return flattened;
};

export const flattenCollectionOfOne = (data: Collection) => {
  let flattenedCollection = Object.assign({}, data, data.data);
  let innerDataItem = flattenedCollection.data[0];
  let flattenedInnerData = Object.assign({}, innerDataItem, innerDataItem.data);

  delete flattenedInnerData.data;
  return flattenedInnerData;
};

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const popoverColors: { [index: string]: string } = {
  correct: "var(--ion-color-tertiary)",
  incorrect: "var(--ion-color-danger)",
  invalid: "var(--ion-color-warning)",
};

export const getPopoverMsgColor = (messageType: PopoverMessageType) => {
  return popoverColors[messageType as keyof {}];
};
