import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "../utils";
import { PronunciationVoice } from "../types/UserSettingsTypes";

interface UserSettingsState {
  pronunciationVoice: PronunciationVoice;
}

interface UserSettingsActions {
  setPronunciationVoice: (voice: PronunciationVoice) => void;
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
      setPronunciationVoice: (voice: PronunciationVoice) =>
        set({ pronunciationVoice: voice }),
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserSettingsStore = createSelectors(useUserSettingsStoreBase);
