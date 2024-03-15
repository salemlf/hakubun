import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { displayToast } from "./components/Toast/Toast.service";

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

export const groupDataByProperty = function (dataToGroup: any[], key: string) {
  return dataToGroup.reduce(function (objWithGroups, item) {
    let group = item[key];
    objWithGroups[group] = objWithGroups[group] || [];
    objWithGroups[group].push(item);

    return objWithGroups;
  }, {});
};

export const getNumObjsWithDistinctPropValue = function (
  data: any[],
  prop: string
) {
  const distinctValues: Record<string, number> = {};

  return data.reduce((count, obj) => {
    const value = obj[prop as keyof object];
    if (!distinctValues[value]) {
      distinctValues[value] = 1;
      return count + 1;
    }
    return count;
  }, 0);
};

export const getRandomIntArr = (
  minLength: number,
  maxLength: number,
  minVal: number,
  maxVal: number
): number[] => {
  const randomLength = faker.number.int({
    min: minLength,
    max: maxLength,
  });

  return Array.from({ length: randomLength }, () =>
    faker.number.int({
      min: minVal,
      max: maxVal,
    })
  );
};

export const copyToClipboard = (textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy).then(
    () => {
      displayToast({
        toastType: "success",
        title: "Copied to Clipboard",
        content: "Content successfully copied to clipboard!",
        timeout: 10000,
      });
    },
    () => {
      console.error("Failed to copy content to clipboard");
      displayToast({
        toastType: "error",
        title: "Failed to Copy to Clipboard",
        content: "An error occurred when copying the content to clipboard",
        timeout: 10000,
      });
    }
  );
};
