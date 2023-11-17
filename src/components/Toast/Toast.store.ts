import { nanoid } from "nanoid";
import { Except, Merge } from "type-fest";
import { create } from "zustand";
import { ToastPropsWithCustomContent, ToastType } from "./Toast.types";

export interface ToastItem extends ToastPropsWithCustomContent {
  id: string;
  toastType: ToastType;
  timeout: number;
  allowClose?: boolean;
}

type ToastStoreState = {
  notifications: ToastItem[];
};

type ToastStoreActions = {
  notify: (
    data: Merge<Except<ToastItem, "id">, { timeout?: number | null }>
  ) => string;
  closeToast: (id: string) => void;
  closeAllToasts: () => void;
};

export type ToastStore = ToastStoreState & ToastStoreActions;

const initialState: ToastStoreState = {
  notifications: [],
};

export const useToastStore = create<ToastStore>((set) => ({
  ...initialState,
  notify: (data) => {
    const id = nanoid();

    set((state) => ({
      notifications: [
        {
          ...data,
          id,
          timeout:
            typeof data.timeout === "number"
              ? data.timeout
              : data.timeout === null
              ? Infinity
              : data.toastType === "loading"
              ? Infinity
              : 5000,
          allowClose: data.allowClose ?? data.toastType !== "loading",
        },
        ...state.notifications,
      ],
    }));

    return id;
  },
  closeToast: (id: string) =>
    set(({ notifications }) => {
      const i = notifications.findIndex((item) => item.id === id);
      if (i === -1) return { notifications };

      return {
        notifications: [
          ...notifications.slice(0, i),
          ...notifications.slice(i + 1),
        ],
      };
    }),

  closeAllToasts: () => {
    set(initialState);
  },
}));
