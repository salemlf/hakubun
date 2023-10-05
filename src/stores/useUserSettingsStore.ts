import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "../utils";
import { PronunciationVoice } from "../types/UserSettingsTypes";
import { AssignmentSortOption } from "../components/SortOrderOption/SortOrderOption.types";
import { getSortOrderOptionById } from "../components/SortOrderOption/SortOrderOption.service";

interface UserSettingsState {
  pronunciationVoice: PronunciationVoice;
  lessonBatchSize: number;
  reviewBatchSize: number;
  lessonSortOrderOption: AssignmentSortOption;
  reviewSortOrderOption: AssignmentSortOption;
}

interface UserSettingsActions {
  setPronunciationVoice: (voice: PronunciationVoice) => void;
  setLessonBatchSize: (size: number) => void;
  setReviewBatchSize: (size: number) => void;
  setLessonSortOrderOption: (sortOption: AssignmentSortOption) => void;
  setReviewSortOrderOption: (sortOption: AssignmentSortOption) => void;
}

const initialState: UserSettingsState = {
  pronunciationVoice: {
    id: "female_tokyo",
    details: {
      gender: "female",
      accent: "Tokyo",
    },
    displayName: "Female, Tokyo accent",
  },
  lessonBatchSize: 2,
  reviewBatchSize: 5,
  lessonSortOrderOption: getSortOrderOptionById("level_asc"),
  reviewSortOrderOption: getSortOrderOptionById("shuffled"),
};

const useUserSettingsStoreBase = create<
  UserSettingsState & UserSettingsActions
>()(
  persist(
    (set, get) => ({
      ...initialState,
      setPronunciationVoice: (voice: PronunciationVoice) =>
        set({ pronunciationVoice: voice }),
      setLessonBatchSize: (size: number) => set({ lessonBatchSize: size }),
      setReviewBatchSize: (size: number) => set({ reviewBatchSize: size }),
      setLessonSortOrderOption: (sortOption: AssignmentSortOption) =>
        set({ lessonSortOrderOption: sortOption }),
      setReviewSortOrderOption: (sortOption: AssignmentSortOption) =>
        set({ reviewSortOrderOption: sortOption }),
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserSettingsStore = createSelectors(useUserSettingsStoreBase);
