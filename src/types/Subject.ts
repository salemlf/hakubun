import { ApiResponse } from "./MiscTypes";

export type SubjectType =
  | "radical"
  | "kanji"
  | "vocabulary"
  | "kana_vocabulary";

export interface SubjectAttrs {
  object: SubjectType;
  amalgamation_subject_ids?: number[];
  auxiliary_meanings: SubjectAuxiliaryMeaning[];
  characters: string | null;
  character_images?: SubjectCharacterImage[];
  created_at: Date;
  document_url: string;
  hidden_at: Date | null;
  lesson_position: number;
  level: number;
  meanings: SubjectMeaning[];
  readings?: SubjectReading[];
  meaning_mnemonic: string;
  slug: string;
  spaced_repetition_system_id: number;
  component_subject_ids?: number[];
  visually_similar_subject_ids?: number[];
  reading_hint?: string | null;
  meaning_hint?: string | null;
  reading_mnemonic?: string;
  pronunciation_audios?: PronunciationAudio[];
  parts_of_speech?: string[];
  context_sentences?: ContextSentence[];
  availableImages?: string[];
  useImage?: boolean;
}

export interface PreFlattenedSubject extends ApiResponse {
  id: number;
  data: SubjectAttrs;
}
export interface Subject extends ApiResponse, SubjectAttrs {
  id: number;
  object: SubjectType;
}

export interface SubjectAuxiliaryMeaning {
  meaning: string;
  type: string;
}

export interface SubjectCharacterImage {
  url: string;
  metadata: SubjectMetadata;
  content_type: string;
}

export interface SubjectMetadata {
  inline_styles?: boolean;
  color?: string;
  dimensions?: string;
  style_name?: string;
}

export interface SubjectMeaning {
  meaning: string;
  primary: boolean;
  accepted_answer: boolean;
}

export type ReadingType = "kunyomi" | "onyomi" | "nanori";

export interface SubjectReading {
  type?: ReadingType;
  primary: boolean;
  accepted_answer: boolean;
  reading: string;
}

export interface ContextSentence {
  en: string;
  ja: string;
}

export interface PronunciationAudio {
  url: string;
  content_type: string;
  metadata: AudioMetadata;
}

export interface AudioMetadata {
  gender: string;
  source_id: number;
  pronunciation: string;
  voice_actor_id: number;
  voice_actor_name: string;
  voice_description: string;
}

export interface Radical extends Subject {
  amalgamation_subject_ids: number[];
  characters: string | null;
  character_images?: SubjectCharacterImage[];
}

export interface Kanji extends Subject {
  amalgamation_subject_ids: number[];
  component_subject_ids: number[];
  reading_hint: string | null;
  meaning_hint: string | null;
  reading_mnemonic: string;
  readings: SubjectReading[];
  visually_similar_subject_ids: number[];
}

export interface Vocabulary extends Subject {
  component_subject_ids?: number[];
  context_sentences: ContextSentence[];
  parts_of_speech: string[];
  pronunciation_audios: PronunciationAudio[];
  readings?: SubjectReading[];
  reading_mnemonic: string;
}

export interface KanaVocabulary extends Subject {
  context_sentences: ContextSentence[];
  parts_of_speech: string[];
  pronunciation_audios: PronunciationAudio[];
}

export type GeneralVocabulary = Vocabulary | KanaVocabulary;
