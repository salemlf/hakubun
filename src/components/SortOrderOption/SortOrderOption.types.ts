// TODO: add current level option to this? Or possibly could be separate
type Option =
  | "shuffled"
  | "srs stage"
  | "level"
  | "available date"
  | "date updated";

export type SortOrder = "asc" | "desc" | "neither";

export type AssignmentSortOption = {
  id: string;
  option: Option;
  order: SortOrder;
};
