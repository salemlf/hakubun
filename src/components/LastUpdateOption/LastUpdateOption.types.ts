export type LastUpdateOption =
  | "2 days"
  | "4 days"
  | "1 week"
  | "2 weeks"
  | "4 weeks"
  | "2 months"
  | "disabled";

export type LastUpdateChoice = {
  value: string;
  displayOption: LastUpdateOption;
};
