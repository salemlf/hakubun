import { create } from "zustand";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { createSelectors } from "../utils";

interface ReviewSessionState {
  isLoading: boolean;
  reviewSessionQueue: ReviewQueueItem[];
  currQueueIndex: number;
}

interface ReviewSessionActions {
  updateReviewItem: (item: ReviewQueueItem) => void;
  removeReviewItem: () => void;
  resetReviewSession: () => void;
  setReviewSessionLoaded: (queueData: ReviewQueueItem[]) => void;
  setReviewSessionLoading: () => void;
}

const useReviewSessionStoreBase = create<
  ReviewSessionState & ReviewSessionActions
>((set, get) => ({
  isLoading: true,
  currQueueIndex: 0,
  reviewSessionQueue: [],

  incrementCurrQueueIndex: () =>
    set((state) => ({ currQueueIndex: state.currQueueIndex + 1 })),
  resetQueueIndex: () => set({ currQueueIndex: 0 }),
  updateReviewItem: (item) => {
    const lastIndexOfItem =
      get().reviewSessionQueue.length -
      1 -
      get()
        .reviewSessionQueue.slice()
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
        ...state.reviewSessionQueue.slice(0, lastIndexOfItem),
        updatedQueueItem,
        ...state.reviewSessionQueue.slice(lastIndexOfItem + 1),
      ],
    }));
  },
  addLessonQuizItem: (reviewItem: ReviewQueueItem) => {
    set((state) => ({
      ...state,
      reviewSessionQueue: [...state.reviewSessionQueue, reviewItem],
    }));
  },
  removeReviewItem: () => {
    const indexToRemove = get().currQueueIndex;

    set((state) => ({
      ...state,
      reviewSessionQueue: [
        ...state.reviewSessionQueue.slice(0, indexToRemove),
        ...state.reviewSessionQueue.slice(indexToRemove + 1),
      ],
    }));
  },
  resetReviewSession: () => {
    set((state) => ({ ...state, reviewSessionQueue: [], currQueueIndex: 0 }));
  },

  setReviewSessionLoaded: (queueData: ReviewQueueItem[]) => {
    set((state) => ({
      ...state,
      isLoading: false,
      reviewSessionQueue: queueData,
    }));
  },

  setReviewSessionLoading: () => {
    set((state) => ({ ...state, isLoading: true }));
  },
}));

export const useReviewSessionStore = createSelectors(useReviewSessionStoreBase);
