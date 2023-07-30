import { Subject } from "./Subject";
import { RequireAtLeastOne } from "./Global";

export type ReviewType = "reading" | "meaning";

export interface ReviewQueueItem extends Subject {
  itemID: string;
  assignment_id: number;
  is_reviewed: boolean;
  srs_stage: number;
  review_type: ReviewType;
  is_correct_answer: boolean | null;
  meaning_synonyms: string[];
  primary_audio_url: string | null;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
  ending_srs_stage: number | null;
}

export type ReviewSessionDataState = {
  isLoading: boolean;
  reviewQueue: ReviewQueueItem[];
  currQueueIndex: number;
};

type ReviewSessionDataActionType =
  | "END_REVIEW"
  | "REVIEW_QUEUE_LOADING"
  | "REVIEW_QUEUE_LOADED"
  | "UPDATE_REVIEW_QUEUE_ITEM"
  | "REMOVE_REVIEW_QUEUE_ITEM"
  | "ADD_TO_REVIEW_QUEUE"
  | "RESET_REVIEW"
  | "INCREMENT_CURR_INDEX";

export type ReviewSessionDataAction = {
  type: ReviewSessionDataActionType;
  payload?: any;
};

export type ReviewSessionDataDispatch = (
  action: ReviewSessionDataAction
) => void;

export type PopoverMessageType = "correct" | "incorrect" | "invalid";

export type PopoverInfo = {
  message: string;
  messageType: PopoverMessageType;
};

export type ReviewSessionQueueState = {
  isSecondClick: boolean;
  isBottomSheetVisible: boolean;
  showRetryButton: boolean;
  popoverInfo: PopoverInfo;
  displayPopoverMsg: boolean;
};

export type ReviewSessionQueueActionType =
  | "CORRECT_MOVE_TO_NEXT"
  | "WRONG_MOVE_TO_NEXT"
  | "CORRECT_SHOW_RESULT"
  | "WRONG_SHOW_RESULT"
  | "SUBMIT_CHOICE"
  | "RETRY_REVIEW"
  | "SHOW_POPOVER_MSG"
  | "RESET_REVIEW_CARDS";

export type ReviewSessionQueueAction = {
  type: ReviewSessionQueueActionType;
  payload?: any;
};

export type ReviewSessionQueueDispatch = (
  action: ReviewSessionQueueAction
) => void;

export type BottomSheetSubjectProps = {
  reviewItem: ReviewQueueItem;
  selectedSegment: ReviewType | string;
};

export type ReviewAnswerValidResult = {
  isValid: boolean;
  message: string;
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
