import { create } from "zustand";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import { createSelectors } from "../utils";

interface AssignmentQueueState {
  assignmentQueue: AssignmentQueueItem[];
  currQueueIndex: number;
  sessionInProgress: boolean;
}

interface AssignmentQueueActions {
  updateQueueItem: (item: AssignmentQueueItem) => void;
  setAssignmentQueueData: (queueData: AssignmentQueueItem[]) => void;
  incrementCurrQueueIndex: () => void;
  addToAssignmentQueue: (reviewItem: AssignmentQueueItem) => void;
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
      assignmentQueue: [
        ...state.assignmentQueue.slice(0, lastIndexOfItem),
        updatedQueueItem,
        ...state.assignmentQueue.slice(lastIndexOfItem + 1),
      ],
    }));
  },
  setAssignmentQueueData: (queueData: AssignmentQueueItem[]) => {
    set(() => ({
      assignmentQueue: queueData,
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
  resetAll: () => {
    set(initialState);
  },
}));

export const useAssignmentQueueStore = createSelectors(
  useAssignmentQueueStoreBase
);
