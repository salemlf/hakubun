import { Subject } from "./Subject";
import { RequireAtLeastOne } from "./Global";

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
  ending_srs_stage: number | null;
}

// TODO: remove, change to be SRS level popover type once using toast for this functionality
export type PopoverMessageType = "correct" | "incorrect" | "invalid";

export type ToastMessageType = "correct" | "incorrect";

export type PopoverInfo = {
  message: string;
  messageType: PopoverMessageType;
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

// TODO: make data structure same as resources_updated.assignment
// interface ReviewPostResponseUpdate {
//       "id": 1422,
//       "object": "assignment",
//       "url": "https://api.wanikani.com/v2/assignments/1422",
//       "data_updated_at": "2018-05-14T03:35:34.180006Z",
//       "data": {
//         "created_at": "2018-01-24T21:32:38.967244Z",
//         "subject_id": 997,
//         "subject_type": "vocabulary",
//         "level": 2,
//         "srs_stage": 1,
//         "unlocked_at": "2018-01-24T21:32:39.888359Z",
//         "started_at": "2018-01-24T21:52:47.926376Z",
//         "passed_at": null,
//         "burned_at": null,
//         "available_at": "2018-05-14T07:00:00.000000Z",
//         "resurrected_at": null,
//         "passed": false,
//         "resurrected": false,
//         "hidden": false
//       }
// }

// review post response example
// {
//   "id": 72,
//   "object": "review",
//   "url": "https://api.wanikani.com/v2/reviews/72",
//   "data_updated_at": "2018-05-13T03:34:54.000000Z",
//   "data": {
//     "created_at": "2018-05-13T03:34:54.000000Z",
//     "assignment_id": 1422,
//     "spaced_repetition_system_id": 1,
//     "subject_id": 997,
//     "starting_srs_stage": 1,
//     "ending_srs_stage": 1,
//     "incorrect_meaning_answers": 1,
//     "incorrect_reading_answers": 2
//   },
//   "resources_updated": {
//     "assignment": {
//       "id": 1422,
//       "object": "assignment",
//       "url": "https://api.wanikani.com/v2/assignments/1422",
//       "data_updated_at": "2018-05-14T03:35:34.180006Z",
//       "data": {
//         "created_at": "2018-01-24T21:32:38.967244Z",
//         "subject_id": 997,
//         "subject_type": "vocabulary",
//         "level": 2,
//         "srs_stage": 1,
//         "unlocked_at": "2018-01-24T21:32:39.888359Z",
//         "started_at": "2018-01-24T21:52:47.926376Z",
//         "passed_at": null,
//         "burned_at": null,
//         "available_at": "2018-05-14T07:00:00.000000Z",
//         "resurrected_at": null,
//         "passed": false,
//         "resurrected": false,
//         "hidden": false
//       }
//     },
//     "review_statistic": {
//       "id": 342,
//       "object": "review_statistic",
//       "url": "https://api.wanikani.com/v2/review_statistics/342",
//       "data_updated_at": "2018-05-14T03:35:34.223515Z",
//       "data": {
//         "created_at": "2018-01-24T21:35:55.127513Z",
//         "subject_id": 997,
//         "subject_type": "vocabulary",
//         "meaning_correct": 1,
//         "meaning_incorrect": 1,
//         "meaning_max_streak": 1,
//         "meaning_current_streak": 1,
//         "reading_correct": 1,
//         "reading_incorrect": 2,
//         "reading_max_streak": 1,
//         "reading_current_streak": 1,
//         "percentage_correct": 67,
//         "hidden": false
//       }
//     }
//   }
// }
