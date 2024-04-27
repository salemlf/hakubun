import { LastUpdateChoice } from "./LastUpdateOption.types";

export const LAST_UPDATE_CHOICES: LastUpdateChoice[] = [
  { value: "48", displayOption: "2 days" },
  { value: "96", displayOption: "4 days" },
  { value: "168", displayOption: "1 week" },
  { value: "336", displayOption: "2 weeks" },
  { value: "672", displayOption: "4 weeks" },
  { value: "1344", displayOption: "2 months" },
  { value: "-1", displayOption: "disabled" },
];
