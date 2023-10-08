import { SettingHeadingFontSize } from "./AssignmentSettings.types";

const headingFontSizeMap: { [index: string]: string } = {
  small: "1rem",
  large: "1.25rem",
};

export const getSettingHeadingFontSize = (
  headingSize: SettingHeadingFontSize
) => {
  return headingFontSizeMap[headingSize];
};
