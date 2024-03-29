import { ApiResponse } from "./MiscTypes";
import { SubjectType } from "./Subject";

// technically study material also has id, object, url, and data_updated_at attrs, but we don't really use them
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

export interface PreflattenedStudyMaterial extends ApiResponse {
  id: number;
  data: StudyMaterial;
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
