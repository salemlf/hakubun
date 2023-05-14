import { Subject } from "./Subject";
import { Assignment } from "./Assignment";

export type SrsLevelName =
  | "initiate"
  | "apprentice"
  | "guru"
  | "master"
  | "enlightened"
  | "burned";

export type SubjAndAssignment = Subject & Assignment;
