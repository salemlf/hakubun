import { AssignmentSortOption } from "./SortOrderOption.types";

export const SORT_OPTIONS: AssignmentSortOption[] = [
  { id: "shuffled", option: "shuffled", order: "neither" },
  { id: "srs_stage_asc", option: "srs stage", order: "asc" },
  { id: "srs_stage_desc", option: "srs stage", order: "desc" },
  { id: "level_asc", option: "level", order: "asc" },
  { id: "level_desc", option: "level", order: "desc" },
  { id: "available_date_asc", option: "available date", order: "asc" },
  { id: "available_date_desc", option: "available date", order: "desc" },
];
