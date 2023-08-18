import { create } from "zustand";
import { createSelectors } from "../utils";
import { PopoverInfo } from "../types/ReviewSessionTypes";

interface CardQueueState {
  isSecondClick: boolean;
  isBottomSheetVisible: boolean;
  showRetryButton: boolean;
  popoverInfo: PopoverInfo;
  displayPopoverMsg: boolean;
  savedUserAnswer: string | null;
}

interface CardQueueActions {
  setSecondClick: (isSecondClick: boolean) => void;
  retryReview: () => void;
  showPopoverMsg: (popoverInfo: any) => void;
  resetReviewCards: () => void;
  setSavedUserAnswer: (savedUserAnswer: string | null) => void;
}

const useCardQueueStoreBase = create<CardQueueState & CardQueueActions>(
  (set) => ({
    isSecondClick: false,
    isBottomSheetVisible: false,
    showRetryButton: false,
    popoverInfo: { message: "", messageType: "invalid" },
    displayPopoverMsg: false,
    savedUserAnswer: null,
    setSecondClick: (isSecondClick) => set({ isSecondClick }),
    retryReview: () =>
      set({
        isSecondClick: false,
        displayPopoverMsg: false,
        isBottomSheetVisible: false,
        showRetryButton: false,
      }),
    showPopoverMsg: (popoverInfo) =>
      set({ popoverInfo, displayPopoverMsg: true }),
    resetReviewCards: () =>
      set({
        displayPopoverMsg: false,
        isSecondClick: false,
        isBottomSheetVisible: false,
        showRetryButton: false,
      }),
    setSavedUserAnswer: (savedUserAnswer) => set({ savedUserAnswer }),
  })
);

export const useCardQueueStore = createSelectors(useCardQueueStoreBase);
