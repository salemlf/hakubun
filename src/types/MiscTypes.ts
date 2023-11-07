import { Assignment } from "./Assignment";
import { SubjectType } from "./Subject";

export interface ApiResponse {
  object: string;
  url: string;
  data_updated_at: Date | null;
}

export type SrsLevelName =
  | "initiate"
  | "locked"
  | "initiate"
  | "apprentice"
  | "guru"
  | "master"
  | "enlightened"
  | "burned";

export type TagType = SubjectType | "meaning" | "reading";

export interface StudyMaterial {
  created_at: Date;
  hidden: boolean;
  meaning_note: string | null;
  meaning_synonyms: string[];
  reading_note: string | null;
  subject_id: number;
  subject_type: SubjectType;
}

export interface StudyMaterialDataResponse extends StudyMaterial {
  url: string;
  data_updated_at: Date;
  id: number;
  object: string;
}

export interface StudyMaterialPutData {
  meaning_note?: string | null;
  meaning_synonyms?: string[];
  reading_note?: string | null;
}

export interface StudyMaterialPostDataWithID extends StudyMaterialPutData {
  subject_id: number;
}

export interface StudyMaterialPostData {
  study_material: StudyMaterialPostDataWithID;
}

export interface StudyMaterialPutBody {
  study_material: StudyMaterialPutData;
}

export type StudyMaterialsChangeActionType = "add" | "remove";

export type UserNoteType = "meaning" | "reading";

export type TabData = {
  id: string;
  label: string;
  tabContents: React.ReactNode;
};

export type AssignmentBatch = {
  assignmentBatch: Assignment[];
  subjIDs: number[];
};

export type AccordionItemData = {
  value: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
};

// used for navigation blocking with react-router-prompt
export declare enum HistoryAction {
  Pop = "POP",
  Push = "PUSH",
  Replace = "REPLACE",
}

export type ButtonSize = "sm" | "md" | "lg";

export type LoadingDotSize = "sm" | "md" | "lg";
