import { Subject } from "./Subject";
import { RequireAtLeastOne } from "./Global";
import { PreFlattenedAssignment } from "./Assignment";

export type ReviewType = "reading" | "meaning";

export interface AssignmentQueueItem extends Subject {
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

interface ReviewPostItemOptional {
  assignment_id?: number;
  subject_id?: number;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
  created_at?: Date;
}

export type ReviewPostItem = RequireAtLeastOne<
  ReviewPostItemOptional,
  "assignment_id" | "subject_id"
>;

export type ReviewPostData = {
  review: ReviewPostItem;
};

export type AssignmentSessionType = "lesson" | "review";

export type AssignmentSubmitInfo = {
  assignmentData: AssignmentQueueItem[];
  submitResponses: PreFlattenedAssignment[];
  errors: AssignmentQueueItem[];
};

export type ReviewedQueueItemInfo = {
  totalUniqueItems: number;
  reviewedQueueItems: AssignmentQueueItem[];
};
