import { ResponseStructure } from "./MiscTypes";

export type AssignmentType = "radical" | "kanji" | "vocabulary";

export interface PreFlattenedAssignment {
  created_at: Date;
  unlocked_at: Date | null;
  started_at: Date | null;
  passed_at: Date | null;
  burned_at: Date | null;
  resurrected_at: Date | null;
  available_at: Date | null;
  hidden: boolean;
  srs_stage: number;
  subject_id: number;
  subject_type: AssignmentType;
}
export interface Assignment extends PreFlattenedAssignment {
  id: number;
  url: string;
  data_updated_at: Date | null;
}

export interface AssignmentData extends ResponseStructure {
  id: number;
}
