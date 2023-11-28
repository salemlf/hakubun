import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../../types/User";

export interface UserInfoState {
  userInfo: User | undefined;
}

export interface UserInfoActions {
  setUserInfo: (userInfo: User) => void;
  reset: () => void;
}

export const initialState: UserInfoState = {
  userInfo: undefined,
};

export const useUserInfoStore = create<UserInfoState & UserInfoActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUserInfo: (info: User) => set({ userInfo: info }),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "user-info-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
