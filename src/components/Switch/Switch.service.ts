import { SwitchSize, SwitchSizeMapValue } from "./Switch.types";

const switchSizeMap: { [index: string]: SwitchSizeMapValue } = {
  small: {
    rootSize: {
      width: "58px",
      height: "30px",
    },
    toggleSize: {
      width: "27px",
      height: "27px",
    },
  },
  medium: {
    rootSize: {
      width: "68px",
      height: "37px",
    },
    toggleSize: {
      width: "33px",
      height: "33px",
    },
  },
  large: {
    rootSize: {
      width: "90px",
      height: "49px",
    },
    toggleSize: {
      width: "45px",
      height: "45px",
    },
  },
};

export const getSwitchSize = (switchSize: SwitchSize) => {
  return switchSizeMap[switchSize];
};
