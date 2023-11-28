import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import secureLocalStorage from "react-secure-storage";

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

const storage: StateStorage = {
  getItem: (name: string): any | null => {
    return secureLocalStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    secureLocalStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    secureLocalStorage.removeItem(name);
  },
};

export const initialState: AuthTokenState = {
  authToken: null,
  isAuthenticated: false,
  isAuthLoading: false,
};

// TODO: change this into slices, so only setAuthToken is in secure storage and rest is normie storage
export const useAuthTokenStore = create<AuthTokenState & AuthTokenActions>()(
  persist(
    (set, get) => ({
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
