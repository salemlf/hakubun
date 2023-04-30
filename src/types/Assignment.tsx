export type AssignmentType = "radical" | "kanji" | "vocabulary";

export interface Assignment {
  id: number;
  url: string;
  created_at: Date;
  data_updated_at: Date | null;
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
