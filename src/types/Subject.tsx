export type SubjectType = "radical" | "kanji" | "vocabulary";

export interface Subject {
  selectedImage?: string | null;
  fallbackImage?: string | null;
  id: number;
  url: string;
  object: SubjectType;
  data_updated_at: Date | null;
  amalgamation_subject_ids: number[];
  auxiliary_meanings: SubjectAuxiliaryMeaning[];
  characters: string;
  character_images?: SubjectCharacterImage[];
  created_at: Date;
  document_url: string;
  hidden_at: Date | null;
  lesson_position: number;
  level: number;
  meanings: SubjectMeaning[];
  readings: SubjectReading[];
  meaning_mnemonic: string;
  slug: string;
  spaced_repetition_system_id: number;
  component_subject_ids?: number[];
  visually_similar_subject_ids?: number[];
  reading_hint?: string;
  meaning_hint?: string;
  reading_mnemonic?: string;
  pronunciation_audios?: PronunciationAudio[];
  parts_of_speech?: string[];
  context_sentences?: ContextSentence[];
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

export interface SubjectReading {
  type?: string;
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
  metadata: AudioMetadata[];
}

export interface AudioMetadata {
  gender: string;
  sourceId: number;
  pronunciation: string;
  voiceActorId: number;
  voiceActorName: string;
  voiceDescription: string;
}
