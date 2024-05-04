import { create } from "zustand";
import { getLastIndexOfQueueItem } from "../../services/AssignmentQueueService/AssignmentQueueService";
import {
  AssignmentQueueItem,
  AssignmentSessionType,
} from "../../types/AssignmentQueueTypes";

export interface AssignmentQueueState {
  assignmentQueue: AssignmentQueueItem[];
  currQueueIndex: number;
  sessionInProgress: boolean;
  sessionType: AssignmentSessionType;
}

export interface AssignmentQueueActions {
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
  updateAssignmentSubmittedStates: (
    assignmentIDs: number[]
  ) => AssignmentQueueItem[];
  incrementCurrQueueIndex: () => void;
  addToAssignmentQueue: (reviewItem: AssignmentQueueItem) => void;
  removeOldQueueItem: () => void;
  resetAll: () => void;
}
export const initialState: AssignmentQueueState = {
  currQueueIndex: 0,
  assignmentQueue: [],
  sessionInProgress: false,
  sessionType: "review",
};

export const useAssignmentQueueStore = create<
  AssignmentQueueState & AssignmentQueueActions
>((set, get) => ({
  ...initialState,
  incrementCurrQueueIndex: () =>
    set((state) => ({ currQueueIndex: state.currQueueIndex + 1 })),
  updateQueueItem: (item) => {
    const lastIndexOfItem = getLastIndexOfQueueItem(
      get().assignmentQueue,
      item
    );

    const updatedQueueItem = { ...item };

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
    ): boolean => assignmentQueueItem.subject_id === subjectID;

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
  updateAssignmentSubmittedStates: (submittedIDs: number[]) => {
    const queueItemsWithUpdatedSubmit = get().assignmentQueue.map(
      (assignmentQueueItem: AssignmentQueueItem) => {
        if (submittedIDs.includes(assignmentQueueItem.assignment_id)) {
          return {
            ...assignmentQueueItem,
            isSubmitted: true,
          };
        }
        return assignmentQueueItem;
      }
    );
    set(() => ({
      assignmentQueue: queueItemsWithUpdatedSubmit,
    }));

    return get().assignmentQueue;
  },
  resetAll: () => {
    set(initialState);
  },
}));
