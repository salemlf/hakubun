import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getSortOrderOptionById } from "../../components/SortOrderOption/SortOrderOption.service";
import { PronunciationVoice } from "../../types/UserSettingsTypes";
import { AssignmentSortOption } from "../../components/SortOrderOption/SortOrderOption.types";
import { BackToBackChoice } from "../../components/BackToBackOption/BackToBackOption.types";

export interface UserSettingsState {
  pronunciationVoice: PronunciationVoice;
  lessonBatchSize: string;
  reviewBatchSize: string;
  lessonSortOrderOption: AssignmentSortOption;
  reviewSortOrderOption: AssignmentSortOption;
  reviewBackToBackOption: BackToBackChoice;
  prefersDarkModeTheme: boolean;
}

export interface UserSettingsActions {
  setPronunciationVoice: (voice: PronunciationVoice) => void;
  setLessonBatchSize: (size: string) => void;
  setReviewBatchSize: (size: string) => void;
  setLessonSortOrderOption: (sortOption: AssignmentSortOption) => void;
  setReviewSortOrderOption: (sortOption: AssignmentSortOption) => void;
  setReviewBackToBackOption: (backToBackChoice: BackToBackChoice) => void;
  setPrefersDarkModeTheme: (isDarkMode: boolean) => void;
}

export const initialState: UserSettingsState = {
  pronunciationVoice: {
    id: "female_tokyo",
    details: {
      gender: "female",
      accent: "Tokyo",
    },
    displayName: "Female, Tokyo accent",
  },
  lessonBatchSize: "2",
  reviewBatchSize: "5",
  lessonSortOrderOption: getSortOrderOptionById("level_asc"),
  reviewSortOrderOption: getSortOrderOptionById("shuffled"),
  reviewBackToBackOption: "disabled",
  prefersDarkModeTheme:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,
};

export const useUserSettingsStore = create<
  UserSettingsState & UserSettingsActions
>()(
  persist(
    (set, get) => ({
      ...initialState,
      setPronunciationVoice: (voice: PronunciationVoice) =>
        set({ pronunciationVoice: voice }),
      setLessonBatchSize: (size: string) => set({ lessonBatchSize: size }),
      setReviewBatchSize: (size: string) => set({ reviewBatchSize: size }),
      setLessonSortOrderOption: (sortOption: AssignmentSortOption) =>
        set({ lessonSortOrderOption: sortOption }),
      setReviewSortOrderOption: (sortOption: AssignmentSortOption) =>
        set({ reviewSortOrderOption: sortOption }),
      setReviewBackToBackOption: (backToBackChoice: BackToBackChoice) =>
        set({ reviewBackToBackOption: backToBackChoice }),
      setPrefersDarkModeTheme: (prefersDarkMode: boolean) =>
        set({ prefersDarkModeTheme: prefersDarkMode }),
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
