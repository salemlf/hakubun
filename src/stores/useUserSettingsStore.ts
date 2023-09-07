import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "../utils";
import { PronunciationVoice } from "../types/UserSettingsTypes";

interface UserSettingsState {
  pronunciationVoice: PronunciationVoice;
  lessonBatchSize: number;
}

interface UserSettingsActions {
  setPronunciationVoice: (voice: PronunciationVoice) => void;
  setLessonBatchSize: (size: number) => void;
}

const useUserSettingsStoreBase = create<
  UserSettingsState & UserSettingsActions
>()(
  persist(
    (set, get) => ({
      pronunciationVoice: {
        id: "female_tokyo",
        details: {
          gender: "female",
          accent: "Tokyo",
        },
        displayName: "Female, Tokyo accent",
      },
      lessonBatchSize: 2,
      setPronunciationVoice: (voice: PronunciationVoice) =>
        set({ pronunciationVoice: voice }),
      setLessonBatchSize: (size: number) => set({ lessonBatchSize: size }),
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserSettingsStore = createSelectors(useUserSettingsStoreBase);
