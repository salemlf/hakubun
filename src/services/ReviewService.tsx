import { ReviewQueueItem, ReviewType } from "../types/ReviewSessionTypes";

export const checkIfReviewIsComplete = (
  reviewItemToMatch: ReviewQueueItem,
  reviewQueue: ReviewQueueItem[]
) => {
  let correspondingReviewType: ReviewType =
    reviewItemToMatch.review_type === "reading" ? "meaning" : "reading";
  let matchingReviewItemsOfOtherType = reviewQueue.filter(
    (review: ReviewQueueItem) =>
      review.id === reviewItemToMatch.id &&
      review.review_type === correspondingReviewType
  );

  // if no matches, only reading, so return true
  if (matchingReviewItemsOfOtherType.length === 0) {
    return true;
  }

  let matchHasBeenReviewd = matchingReviewItemsOfOtherType.some(
    (review: ReviewQueueItem) => review.is_reviewed === true
  );
  return matchHasBeenReviewd;
};

// TODO: fix this, always returning 2+ if any incorrect
// export const getItemWithNumIncorrectReviews = (
//   reviewQueue: ReviewQueueItem[],
//   reviewItem: ReviewQueueItem
// ) => {
//   let incorrectMeaningCount = reviewQueue.reduce(
//     (acc, curr) =>
//       curr.id == reviewItem.id &&
//       curr.review_type === ("meaning" as ReviewType) &&
//       curr.is_correct_answer === false
//         ? ++acc
//         : acc,
//     0
//   );
//   // *testing
//   console.log(
//     "🚀 ~ file: ReviewService.tsx:56 ~ incorrectMeaningCount:",
//     incorrectMeaningCount
//   );
//   // *testing

//   let incorrectReadingCount = reviewQueue.reduce(
//     (acc, curr) =>
//       curr.id == reviewItem.id &&
//       curr.review_type === ("reading" as ReviewType) &&
//       curr.is_correct_answer === false
//         ? ++acc
//         : acc,
//     0
//   );
//   // *testing
//   console.log(
//     "🚀 ~ file: ReviewService.tsx:67 ~ incorrectReadingCount:",
//     incorrectReadingCount
//   );
//   // *testing

//   return {
//     ...reviewItem,
//     incorrect_meaning_answers: incorrectMeaningCount,
//     incorrect_reading_answers: incorrectReadingCount,
//   };
// };

export const calculateSRSLevel = (reviewItem: ReviewQueueItem) => {
  // per wanikani docs: new_srs_stage = current_srs_stage - (incorrect_adjustment_count * srs_penalty_factor)
  // incorrect_adjustment_count: number of incorrect answers divided by two and rounded up
  // srs_penalty_factor: 2 if current_srs_stage is at or above 5, 1 if < 5
  // if (
  //   reviewItem.incorrect_meaning_answers === null ||
  //   reviewItem.incorrect_reading_answers === null
  // ) {
  //   console.error(
  //     "Woah now, can't calculate SRS level with null incorrect meaning/reading answers!"
  //   );
  //   return reviewItem;
  // }

  let penaltyFactor = reviewItem.srs_stage >= 5 ? 2 : 1;
  let incorrectAdjustmentCount = Math.ceil(
    (reviewItem.incorrect_meaning_answers +
      reviewItem.incorrect_reading_answers) /
      2
  );
  let updatedSrsLvl =
    reviewItem.srs_stage - incorrectAdjustmentCount * penaltyFactor;

  // *testing
  console.log(
    "🚀 ~ file: ReviewService.tsx:88 ~ calculateSRSLevel ~ updatedSrsLvl:",
    updatedSrsLvl
  );
  // *testing

  return {
    ...reviewItem,
    ending_srs_stage: updatedSrsLvl,
  };
};
