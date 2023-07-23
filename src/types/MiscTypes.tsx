import { SubjectType } from "./Subject";

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

type UserPreferences = {
  default_voice_actor_id: number;
  extra_study_autoplay_audio: boolean;
  lessons_autoplay_audio: true;
  lessons_batch_size: number;
  lessons_presentation_order: string;
  reviews_autoplay_audio: boolean;
  reviews_display_srs_indicator: boolean;
  reviews_presentation_order: string;
};

type Subscription = {
  active: boolean;
  type: string;
  max_level_granted: number;
  period_ends_at: Date | null;
};

export type UserData = {
  current_vacation_started_at: Date | null;
  id: string;
  level: number;
  preferences: UserPreferences;
  profile_url: string;
  started_at: Date | null;
  subscription: Subscription;
  username: string;
};

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
