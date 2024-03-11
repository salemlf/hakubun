import { sortQueueItemsByMeaningAndReading } from "../../services/AssignmentQueueService/AssignmentQueueService";
import { shuffleArray } from "../../services/MiscService/MiscService";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import { BackToBackChoice } from "./BackToBackOption.types";

type BackToBackMapValue = {
  orderFunc: (
    queueItems: any[],
    meaningFirst: boolean
  ) => AssignmentQueueItem[];
  meaningFirst: boolean;
};

const queueItemOrderMap: { [index: string]: BackToBackMapValue } = {
  "reading then meaning": {
    orderFunc: sortQueueItemsByMeaningAndReading,
    meaningFirst: false,
  },
  "meaning then reading": {
    orderFunc: sortQueueItemsByMeaningAndReading,
    meaningFirst: true,
  },
  disabled: { orderFunc: shuffleArray, meaningFirst: false },
};

export const orderQueueItemsWithBackToBackOption = (
  queueItemData: AssignmentQueueItem[],
  backToBackChoice: BackToBackChoice
): AssignmentQueueItem[] => {
  let mapValue = queueItemOrderMap[backToBackChoice];
  return mapValue.orderFunc(queueItemData, mapValue.meaningFirst);
};
