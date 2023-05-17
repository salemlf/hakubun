import { Subject } from "./Subject";
import { Assignment } from "./Assignment";

export interface ResponseStructure {
  object: string;
  url: string;
  data_updated_at: Date | null;
  data: [];
}

export type SrsLevelName =
  | "initiate"
  | "apprentice"
  | "guru"
  | "master"
  | "enlightened"
  | "burned";

// export type SubjAndAssignment = Subject & Assignment;
