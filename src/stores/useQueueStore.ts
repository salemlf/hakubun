import { create } from "zustand";
import { createSelectors } from "../utils";
import { PopoverInfo } from "../types/AssignmentQueueTypes";

interface QueueState {
  isSubmittingAnswer: boolean;
  isBottomSheetVisible: boolean;
  popoverInfo: PopoverInfo;
  displayPopoverMsg: boolean;
  savedUserAnswer: string | null;
}

interface QueueActions {
  setIsSubmittingAnswer: (isSubmittingAnswer: boolean) => void;
  retryReview: () => void;
  showPopoverMsg: (popoverInfo: PopoverInfo) => void;
  setSavedUserAnswer: (savedUserAnswer: string | null) => void;
  correctShowResult: () => void;
  correctMoveToNext: () => void;
  wrongMoveToNext: () => void;
  wrongShowResult: () => void;
  submitChoice: () => void;
  resetAll: () => void;
}

const initialState: QueueState = {
  isSubmittingAnswer: false,
  isBottomSheetVisible: false,
  popoverInfo: { message: "", messageType: "invalid" },
  displayPopoverMsg: false,
  savedUserAnswer: null,
};

const useQueueStoreBase = create<QueueState & QueueActions>((set, get) => ({
  ...initialState,
  setIsSubmittingAnswer: (isSubmittingAnswer) =>
    set({
      isSubmittingAnswer,
    }),
  retryReview: () =>
    set({
      isSubmittingAnswer: false,
      displayPopoverMsg: false,
      isBottomSheetVisible: false,
    }),
  showPopoverMsg: (state) =>
    set({ popoverInfo: { ...state }, displayPopoverMsg: true }),
  setSavedUserAnswer: (savedUserAnswer) => set({ savedUserAnswer }),
  correctShowResult: () => set({ isBottomSheetVisible: true }),
  correctMoveToNext: () =>
    set({ isBottomSheetVisible: false, displayPopoverMsg: false }),
  wrongMoveToNext: () =>
    set({
      isBottomSheetVisible: false,
      displayPopoverMsg: false,
    }),
  wrongShowResult: () =>
    set({
      isBottomSheetVisible: true,
    }),
  submitChoice: () =>
    set({
      isSubmittingAnswer: !get().isSubmittingAnswer,
    }),
  resetAll: () => {
    set(initialState);
  },
}));

export const useQueueStore = createSelectors(useQueueStoreBase);
