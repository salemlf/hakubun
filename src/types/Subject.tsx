import { ResponseStructure } from "./MiscTypes";

export type SubjectType = "radical" | "kanji" | "vocabulary";

export interface PreFlattenedSubject {
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

export interface Subject extends PreFlattenedSubject {
  id: number;
  url: string;
  data_updated_at: Date | null;
}

export interface SubjectData extends ResponseStructure {
  id: number;
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
  inlineStyles: boolean;
}

export interface SubjectMeaning {
  meaning: string;
  primary: boolean;
  acceptedAnswer: boolean;
}

export type ReadingType = "kunyomi" | "onyomi" | "nanori";

export interface SubjectReading {
  type?: ReadingType;
  primary: boolean;
  acceptedAnswer: boolean;
  reading: string;
}

export interface ContextSentence {
  en: string;
  ja: string;
}

export interface PronunciationAudio {
  url: string;
  contentType: string;
  metadata: AudioMetadata;
}

export interface AudioMetadata {
  gender: string;
  sourceId: number;
  pronunciation: string;
  voiceActorId: number;
  voiceActorName: string;
  voiceDescription: string;
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
