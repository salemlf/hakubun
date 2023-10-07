import { create } from "zustand";
import { createSelectors } from "../utils";
import {
  AssignmentQueueItem,
  AssignmentSessionType,
} from "../types/AssignmentQueueTypes";

interface AssignmentQueueState {
  assignmentQueue: AssignmentQueueItem[];
  currQueueIndex: number;
  sessionInProgress: boolean;
  sessionType: AssignmentSessionType;
}

interface AssignmentQueueActions {
  updateQueueItem: (item: AssignmentQueueItem) => void;
  updateQueueItemAltMeanings: (
    subjectID: number,
    altMeanings: string[]
  ) => void;
  setAssignmentQueueData: (
    queueData: AssignmentQueueItem[],
    sessionType: AssignmentSessionType
  ) => void;
  updateAssignmentQueueData: (queueData: AssignmentQueueItem[]) => void;
  incrementCurrQueueIndex: () => void;
  addToAssignmentQueue: (reviewItem: AssignmentQueueItem) => void;
  removeOldQueueItem: () => void;
  resetAll: () => void;
}
const initialState: AssignmentQueueState = {
  currQueueIndex: 0,
  assignmentQueue: [],
  sessionInProgress: false,
  sessionType: "review",
};

const useAssignmentQueueStoreBase = create<
  AssignmentQueueState & AssignmentQueueActions
>((set, get) => ({
  ...initialState,
  incrementCurrQueueIndex: () =>
    set((state) => ({ currQueueIndex: state.currQueueIndex + 1 })),
  resetQueueIndex: () => set({ currQueueIndex: 0 }),
  updateQueueItem: (item) => {
    const lastIndexOfItem =
      get().assignmentQueue.length -
      1 -
      get()
        .assignmentQueue.slice()
        .reverse()
        .findIndex(
          (reviewItem) =>
            reviewItem.itemID === item.itemID &&
            reviewItem.review_type === item.review_type
        );

    let updatedQueueItem = Object.assign({}, item);

    set((state) => ({
      assignmentQueue: [
        ...state.assignmentQueue.slice(0, lastIndexOfItem),
        updatedQueueItem,
        ...state.assignmentQueue.slice(lastIndexOfItem + 1),
      ],
    }));
  },
  updateQueueItemAltMeanings: (subjectID, altMeanings) => {
    const shouldUpdateAltMeanings = (
      assignmentQueueItem: AssignmentQueueItem
    ): boolean =>
      assignmentQueueItem.id === subjectID &&
      assignmentQueueItem.review_type === "meaning";

    const queueItemsWithUpdatedMeanings = get().assignmentQueue.map(
      (assignmentQueueItem: AssignmentQueueItem) => {
        if (shouldUpdateAltMeanings(assignmentQueueItem)) {
          return {
            ...assignmentQueueItem,
            meaning_synonyms: altMeanings,
          };
        }
        return assignmentQueueItem;
      }
    );

    set(() => ({
      assignmentQueue: queueItemsWithUpdatedMeanings,
    }));
  },
  setAssignmentQueueData: (
    queueData: AssignmentQueueItem[],
    sessionType: AssignmentSessionType
  ) => {
    set(() => ({
      assignmentQueue: queueData,
      sessionType,
      sessionInProgress: true,
    }));
  },
  addToAssignmentQueue(reviewItem) {
    set((state) => ({
      assignmentQueue: [...state.assignmentQueue, reviewItem],
    }));
  },
  removeOldQueueItem() {
    const indexToRemove = get().currQueueIndex;

    set((state) => ({
      assignmentQueue: [
        ...state.assignmentQueue.slice(0, indexToRemove),
        ...state.assignmentQueue.slice(indexToRemove + 1),
      ],
    }));
  },
  updateAssignmentQueueData: (queueData: AssignmentQueueItem[]) => {
    set(() => ({
      assignmentQueue: queueData,
    }));
  },
  resetAll: () => {
    set(initialState);
  },
}));

export const useAssignmentQueueStore = createSelectors(
  useAssignmentQueueStoreBase
);
