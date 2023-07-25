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
