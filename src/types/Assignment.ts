import { ApiResponse } from "./MiscTypes";

export type AssignmentType =
  | "radical"
  | "kanji"
  | "vocabulary"
  | "kana_vocabulary";

interface AssignmentAttrs {
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

export interface PreFlattenedAssignment extends ApiResponse {
  data: AssignmentAttrs;
}

export interface Assignment extends AssignmentAttrs, ApiResponse {}
