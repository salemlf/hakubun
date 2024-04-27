import { LastUpdateChoice } from "./LastUpdateOption.types";

export const LAST_UPDATE_CHOICES: LastUpdateChoice[] = [
  { hours: "48", displayOption: "2 days" },
  { hours: "96", displayOption: "4 days" },
  { hours: "168", displayOption: "1 week" },
  { hours: "336", displayOption: "2 weeks" },
  { hours: "672", displayOption: "4 weeks" },
  { hours: "1344", displayOption: "2 months" },
  { hours: "-1", displayOption: "disabled" },
];
