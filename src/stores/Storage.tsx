import { StateStorage } from "zustand/middleware";
import { Storage } from "@ionic/storage";

const store = new Storage();
await store.create();

export const storage: StateStorage = {
  getItem: async (key: string): Promise<string | null> => {
    const value = (await store.get(key)) || null;
    return value;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await store.set(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await store.remove(key);
  },
};
