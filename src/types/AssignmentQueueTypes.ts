import { QueueItemAndErr } from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore";
import { Subject, SubjectType } from "./Subject";
import { Assignment, PreFlattenedAssignment } from "./Assignment";

export type ReviewType = "reading" | "meaning";

export interface AssignmentQueueItem extends Subject, Assignment {
  object: SubjectType;
  itemID: string;
  assignment_id: number;
  is_reviewed: boolean;
  srs_stage: number;
  review_type: ReviewType;
  is_correct_answer: boolean | null;
  meaning_synonyms: string[];
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
  starting_srs_stage: number;
  ending_srs_stage: number | null;
  isSubmitted: boolean;
  readingAudios?: ReadingAudio[];
}

// TODO: remove, change to be SRS level popover type once using toast for this functionality
export type PopoverMessageType = "correct" | "incorrect" | "invalid";

export type ToastMessageType = "correct" | "incorrect";

export type PopoverInfo = {
  message: string;
  messageType: PopoverMessageType;
};

export type PopoverStyles = {
  bgColor: string;
  fontColor: string;
};

export type BottomSheetSubjectProps = {
  reviewItem: AssignmentQueueItem;
  tabBgColor: string;
  tabSelectionColor: string;
};

export type ReviewAnswerValidResult = {
  isValid: boolean;
  message: string;
};

export type GroupedReviewItems = {
  correct: AssignmentQueueItem[];
  incorrect: AssignmentQueueItem[];
};

export type AssignmentSessionType = "lesson" | "review";

export type AssignmentSubmitInfo = {
  assignmentData: AssignmentQueueItem[];
  submitResponses: PreFlattenedAssignment[];
  assignmentsWithErrs: QueueItemAndErr[];
};

export type AssignmentSubmitOutcome = {
  assignmentID: number;
  response?: PreFlattenedAssignment;
  error?: string;
};

export type ReviewedQueueItemInfo = {
  totalUniqueItems: number;
  reviewedQueueItems: AssignmentQueueItem[];
};

export type ReadingAudio = {
  isPrimary: boolean;
  reading: string;
  gender: string;
  accent: string;
  audioFile: Howl;
  backupAudioFiles?: Howl;
};
