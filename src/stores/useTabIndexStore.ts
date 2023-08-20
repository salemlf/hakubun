import { create } from "zustand";
import { createSelectors } from "../utils";

interface TabIndexState {
  isLastIndex: boolean;
}

interface TabIndexActions {
  setIsLastIndex: (isLast: boolean) => void;
  resetAll: () => void;
}

const initialState: TabIndexState = {
  isLastIndex: false,
};

export const useTabIndexStoreBase = create<TabIndexState & TabIndexActions>(
  (set) => ({
    ...initialState,
    setIsLastIndex: (isLast: boolean) => set({ isLastIndex: isLast }),
    resetAll: () => {
      set(initialState);
    },
  })
);

export const useTabIndexStore = createSelectors(useTabIndexStoreBase);
