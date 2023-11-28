import { faker } from "@faker-js/faker";
import { reviewsEndpoint } from "../../endpoints";
import { SubjectType } from "../../../types/Subject";
import { ReviewStatistic, ReviewUpdateResponse } from "../../../types/Review";
import { PreFlattenedAssignment } from "../../../types/Assignment";
import { VALID_SRS_STAGES } from "../../../constants";

// TODO: pass in starting and ending SRS stages, incorrect meaning/reading answers
export const fakeReviewUpdatedResponse = (
  subjectID: number,
  subType: SubjectType,
  assignmentID?: number
): ReviewUpdateResponse => {
  const asgmtID = assignmentID || faker.number.int({ min: 1 });

  const mockReviewUpdate: ReviewUpdateResponse = {
    id: faker.number.int(),
    object: "review",
    url: reviewsEndpoint,
    data_updated_at: faker.date.past(),
    data: {
      created_at: faker.date.past(),
      assignment_id: asgmtID,
      subject_id: subjectID,
      spaced_repetition_system_id: faker.number.int(),
      starting_srs_stage: faker.helpers.rangeToNumber({
        min: VALID_SRS_STAGES[0],
        max: VALID_SRS_STAGES[VALID_SRS_STAGES.length - 1],
      }),
      ending_srs_stage: faker.helpers.rangeToNumber({
        min: VALID_SRS_STAGES[0],
        max: VALID_SRS_STAGES[VALID_SRS_STAGES.length - 1],
      }),
      incorrect_meaning_answers: 1,
      incorrect_reading_answers: 2,
    },
    resources_updated: {
      assignment: fakeAssignmentUpdated(subjectID, subType, asgmtID),
      review_statistic: fakeReviewStatistic(subjectID, subType),
    },
  };

  return mockReviewUpdate;
};

// TODO: pass in isBurned, isResurrected, etc.
const fakeAssignmentUpdated = (
  subjectID: number,
  subjType: SubjectType,
  assignmentID: number
): PreFlattenedAssignment => {
  return {
    id: assignmentID,
    object: "assignment",
    url: faker.internet.url(),
    data_updated_at: faker.date.past(),
    data: {
      created_at: faker.date.past(),
      subject_id: subjectID,
      subject_type: subjType,
      srs_stage: faker.number.int({ min: 1, max: 9 }),
      unlocked_at: faker.date.past(),
      started_at: faker.date.past(),
      passed_at: faker.date.past(),
      burned_at: null,
      available_at: faker.date.past(),
      resurrected_at: null,
      hidden: false,
    },
  };
};

const fakeReviewStatistic = (
  subjectID: number,
  subjType: SubjectType
): ReviewStatistic => {
  return {
    id: faker.number.int(),
    object: "review_statistic",
    url: faker.internet.url(),
    data_updated_at: faker.date.past(),
    data: {
      created_at: faker.date.past(),
      subject_id: subjectID,
      subject_type: subjType,
      meaning_correct: faker.number.int(),
      meaning_incorrect: faker.number.int(),
      meaning_max_streak: faker.number.int(),
      meaning_current_streak: faker.number.int(),
      reading_correct: faker.number.int(),
      reading_incorrect: faker.number.int(),
      reading_max_streak: faker.number.int(),
      reading_current_streak: faker.number.int(),
      percentage_correct: faker.number.int(),
      hidden: false,
    },
  };
};
