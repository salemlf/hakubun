import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "../Storage";

export interface AuthTokenState {
  authToken: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

export interface AuthTokenActions {
  setAuthToken: (token: string | null) => void;
  setIsAuthLoading: (loading: boolean) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  reset: () => void;
}

export const initialState: AuthTokenState = {
  authToken: null,
  isAuthenticated: false,
  isAuthLoading: false,
};

export const useAuthTokenStore = create<AuthTokenState & AuthTokenActions>()(
  persist(
    (set) => ({
      ...initialState,
      setAuthToken: (token: string | null) => set({ authToken: token }),
      setIsAuthLoading: (loading: boolean) => set({ isAuthLoading: loading }),
      setIsAuthenticated: (authenticated: boolean) =>
        set({ isAuthenticated: authenticated }),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-token-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
