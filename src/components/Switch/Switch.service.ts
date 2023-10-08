import { SwitchSize, SwitchSizeMapValue } from "./Switch.types";

const switchSizeMap: { [index: string]: SwitchSizeMapValue } = {
  small: {
    rootSize: {
      width: "40px",
      height: "25px",
    },
    toggleSize: {
      width: "21px",
      height: "21px",
    },
  },
  medium: {
    rootSize: {
      width: "60px",
      height: "37px",
    },
    toggleSize: {
      width: "33px",
      height: "33px",
    },
  },
  large: {
    rootSize: {
      width: "78px",
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
