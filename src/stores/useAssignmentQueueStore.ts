import { create } from "zustand";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { createSelectors } from "../utils";

interface AssignmentQueueState {
  assignmentQueue: ReviewQueueItem[];
  currQueueIndex: number;
  sessionInProgress: boolean;
}

interface AssignmentQueueActions {
  updateQueueItem: (item: ReviewQueueItem) => void;
  setAssignmentQueueData: (queueData: ReviewQueueItem[]) => void;
  incrementCurrQueueIndex: () => void;
  addToAssignmentQueue: (reviewItem: ReviewQueueItem) => void;
  removeOldQueueItem: () => void;
  resetAll: () => void;
}
const initialState: AssignmentQueueState = {
  currQueueIndex: 0,
  assignmentQueue: [],
  sessionInProgress: false,
};

// TODO:rename variables so works with lessons quiz and review session
// TODO: remove isLoading here, just keep in review session queue file
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
      ...state,
      assignmentQueue: [
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

  setAssignmentQueueData: (queueData: ReviewQueueItem[]) => {
    set((state) => ({
      ...state,
      assignmentQueue: queueData,
      sessionInProgress: true,
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
  resetAll: () => {
    set(initialState);
  },
}));

export const useAssignmentQueueStore = createSelectors(
  useAssignmentQueueStoreBase
);
