import { ToastStore, useToastStore } from "./Toast.store";

export const displayToast = (...args: Parameters<ToastStore["notify"]>) =>
  useToastStore.getState().notify(...args);

export const closeToast = (...args: Parameters<ToastStore["closeToast"]>) =>
  useToastStore.getState().closeToast(...args);
