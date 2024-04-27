import { ApiResponse } from "./MiscTypes";
import { SubjectType } from "./Subject";

export interface AssignmentAttrs {
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
  subject_type: SubjectType;
}

export interface PreFlattenedAssignment extends ApiResponse {
  id: number;
  data_updated_at: Date;
  data: AssignmentAttrs;
}

export interface Assignment extends AssignmentAttrs, ApiResponse {
  id: number;
  data_updated_at: Date;
}
