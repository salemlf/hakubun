import { create } from "zustand";

interface TabIndexStore {
  isLastIndex: boolean;
  setIsLastIndex: (isLast: boolean) => void;
}

export const useTabIndexStore = create<TabIndexStore>((set) => ({
  isLastIndex: false,
  setIsLastIndex: (isLast: boolean) => set({ isLastIndex: isLast }),
}));
