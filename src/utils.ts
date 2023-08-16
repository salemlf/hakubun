import { StoreApi, UseBoundStore } from "zustand";
import { nanoid } from "nanoid";

export const generateUUID = (): string => {
  return nanoid();
};

export const addUUIDsToObjects = (objectArr: any[]) => {
  return objectArr.map((obj) => ({ ...obj, uuid: generateUUID() }));
};

export const generateXNumUUIDs = (numToGenerate: number) => {
  let uuidsArr = [];
  for (let i = 0; i < numToGenerate; i++) {
    uuidsArr.push(generateUUID());
  }
  return uuidsArr;
};

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
