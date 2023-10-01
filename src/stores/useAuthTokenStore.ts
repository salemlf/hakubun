import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import secureLocalStorage from "react-secure-storage";
import { createSelectors } from "../utils";

interface AuthTokenState {
  authToken: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

interface AuthTokenActions {
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

const initialState: AuthTokenState = {
  authToken: null,
  isAuthenticated: false,
  isAuthLoading: false,
};

const useAuthTokenStoreBase = create<AuthTokenState & AuthTokenActions>()(
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

export const useAuthTokenStore = createSelectors(useAuthTokenStoreBase);
