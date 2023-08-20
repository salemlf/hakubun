import { create } from "zustand";
import { createSelectors } from "../utils";
import { PopoverInfo } from "../types/ReviewSessionTypes";

interface QueueState {
  isSecondClick: boolean;
  isBottomSheetVisible: boolean;
  showRetryButton: boolean;
  popoverInfo: PopoverInfo;
  displayPopoverMsg: boolean;
  savedUserAnswer: string | null;
}

interface QueueActions {
  setSecondClick: (isSecondClick: boolean) => void;
  retryReview: () => void;
  showPopoverMsg: (popoverInfo: PopoverInfo) => void;
  resetReviewCards: () => void;
  setSavedUserAnswer: (savedUserAnswer: string | null) => void;
  correctShowResult: () => void;
  correctMoveToNext: () => void;
  wrongMoveToNext: () => void;
  wrongShowResult: () => void;
  submitChoice: () => void;
}

// TODO: clean up how initial data is set
const useQueueStoreBase = create<QueueState & QueueActions>((set, get) => ({
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
  showPopoverMsg: (state) =>
    set({ popoverInfo: { ...state }, displayPopoverMsg: true }),
  resetReviewCards: () =>
    set({
      displayPopoverMsg: false,
      isSecondClick: false,
      isBottomSheetVisible: false,
      showRetryButton: false,
    }),
  setSavedUserAnswer: (savedUserAnswer) => set({ savedUserAnswer }),
  correctShowResult: () => set({ isBottomSheetVisible: true }),
  correctMoveToNext: () =>
    set({ isBottomSheetVisible: false, displayPopoverMsg: false }),
  wrongMoveToNext: () =>
    set({
      isBottomSheetVisible: false,
      displayPopoverMsg: false,
      showRetryButton: false,
    }),
  wrongShowResult: () =>
    set({ isBottomSheetVisible: true, showRetryButton: true }),
  submitChoice: () => set({ isSecondClick: !get().isSecondClick }),
}));

export const useQueueStore = createSelectors(useQueueStoreBase);
