import { create } from "zustand";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { createSelectors } from "../utils";

interface AssignmentQueueState {
  assignmentQueue: ReviewQueueItem[];
  currQueueIndex: number;
}

interface AssignmentQueueActions {
  updateQueueItem: (item: ReviewQueueItem) => void;
  resetReviewSession: () => void;
  setAssignmentQueueData: (queueData: ReviewQueueItem[]) => void;
  incrementCurrQueueIndex: () => void;
  addToAssignmentQueue: (reviewItem: ReviewQueueItem) => void;
  removeOldQueueItem: () => void;
}

// TODO:rename variables so works with lessons quiz and review session
// TODO: remove isLoading here, just keep in review session queue file
const useAssignmentQueueStoreBase = create<
  AssignmentQueueState & AssignmentQueueActions
>((set, get) => ({
  currQueueIndex: 0,
  assignmentQueue: [],

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
    const updatedQueueItem = { ...item };

    set((state) => ({
      ...state,
      reviewSessionQueue: [
        ...state.assignmentQueue.slice(0, lastIndexOfItem),
        updatedQueueItem,
        ...state.assignmentQueue.slice(lastIndexOfItem + 1),
      ],
    }));
  },
  removeReviewItem: () => {
    const indexToRemove = get().currQueueIndex;

    set((state) => ({
      ...state,
      assignmentQueueData: [
        ...state.assignmentQueue.slice(0, indexToRemove),
        ...state.assignmentQueue.slice(indexToRemove + 1),
      ],
    }));
  },
  resetReviewSession: () => {
    set((state) => ({ ...state, assignmentQueue: [], currQueueIndex: 0 }));
  },

  setAssignmentQueueData: (queueData: ReviewQueueItem[]) => {
    set((state) => ({
      ...state,
      assignmentQueue: queueData,
    }));
  },
  addToAssignmentQueue(reviewItem) {
    set((state) => ({
      ...state,
      assignmentQueue: [...state.assignmentQueue, reviewItem],
    }));
  },
  removeOldQueueItem() {
    const indexToRemove = get().currQueueIndex;

    set((state) => ({
      ...state,
      assignmentQueueData: [
        ...state.assignmentQueue.slice(0, indexToRemove),
        ...state.assignmentQueue.slice(indexToRemove + 1),
      ],
    }));
  },
}));

export const useAssignmentQueueStore = createSelectors(
  useAssignmentQueueStoreBase
);
