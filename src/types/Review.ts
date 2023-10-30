import { PreFlattenedAssignment } from "./Assignment";
import { RequireAtLeastOne } from "./Global";
import { ApiResponse } from "./MiscTypes";

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

interface ReviewAttrs {
  created_at: Date | null;
  assignment_id: number;
  subject_id: number;
  spaced_repetition_system_id: number;
  starting_srs_stage: number;
  ending_srs_stage: number;
  incorrect_meaning_answers: number;
  incorrect_reading_answers: number;
}

export interface PreflattenedReview extends ApiResponse {
  data: ReviewAttrs;
}

interface ReviewStatisticAttrs {
  created_at: Date | null;
  subject_id: number;
  subject_type: string;
  meaning_correct: number;
  meaning_incorrect: number;
  meaning_max_streak: number;
  meaning_current_streak: number;
  reading_correct: number;
  reading_incorrect: number;
  reading_max_streak: number;
  reading_current_streak: number;
  percentage_correct: number;
  hidden: boolean;
}

export interface ReviewStatistic extends ApiResponse {
  data: ReviewStatisticAttrs;
}

// TODO: possibly make these optional? Think they're always returned though
interface ResourcesUpdated {
  assignment?: PreFlattenedAssignment;
  review_statistic: ReviewStatistic;
}

export interface ReviewUpdateResponse extends ApiResponse {
  data: ReviewAttrs;
  resources_updated: ResourcesUpdated;
}

// ? example ReviewUpdateResponse
// {
//   "id": 3549669371,
//   "object": "review",
//   "url": "https://api.wanikani.com/v2/reviews/3549669371",
//   "data_updated_at": "2023-10-29T19:40:18.535477Z",
//   "data": {
//       "created_at": "2023-10-29T19:40:18.513102Z",
//       "assignment_id": 331005228,
//       "subject_id": 919,
//       "spaced_repetition_system_id": 1,
//       "starting_srs_stage": 2,
//       "ending_srs_stage": 3,
//       "incorrect_meaning_answers": 0,
//       "incorrect_reading_answers": 0
//   },
//   "resources_updated": {
//       "assignment": {
//           "id": 331005228,
//           "object": "assignment",
//           "url": "https://api.wanikani.com/v2/assignments/331005228",
//           "data_updated_at": "2023-10-29T19:40:18.531247Z",
//           "data": {
//               "created_at": "2023-03-20T16:15:24.601433Z",
//               "subject_id": 919,
//               "subject_type": "kanji",
//               "srs_stage": 3,
//               "unlocked_at": "2023-03-20T16:15:24.597840Z",
//               "started_at": "2023-09-01T13:02:14.271875Z",
//               "passed_at": "2023-10-18T03:54:51.479289Z",
//               "burned_at": null,
//               "available_at": "2023-10-30T18:00:00.000000Z",
//               "resurrected_at": null,
//               "hidden": false
//           }
//       },
//       "review_statistic": {
//           "id": 327140187,
//           "object": "review_statistic",
//           "url": "https://api.wanikani.com/v2/review_statistics/327140187",
//           "data_updated_at": "2023-10-29T19:40:18.541777Z",
//           "data": {
//               "created_at": "2023-09-01T13:02:14.293947Z",
//               "subject_id": 919,
//               "subject_type": "kanji",
//               "meaning_correct": 14,
//               "meaning_incorrect": 2,
//               "meaning_max_streak": 11,
//               "meaning_current_streak": 11,
//               "reading_correct": 14,
//               "reading_incorrect": 7,
//               "reading_max_streak": 5,
//               "reading_current_streak": 2,
//               "percentage_correct": 76,
//               "hidden": false
//           }
//       }
//   }
// }
