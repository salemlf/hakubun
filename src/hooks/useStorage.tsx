import { useState } from "react";
import { store } from "../Store";

export const useStorage = () => {
  const [value, setValue] = useState<any | null>(null);

  const setItem = async (key: string, value: any) => {
    // TODO: display err if not set?
    await store.set(key, JSON.stringify(value));
    setValue(value);
  };

  const getItem = async (key: string) => {
    let value = await store.get(key);
    if (value !== undefined && value !== null) {
      let parsed = JSON.parse(value);
      setValue(parsed);
      return parsed;
    }
    return null;
  };

  const removeItem = async (key: string) => {
    await store.remove(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};
