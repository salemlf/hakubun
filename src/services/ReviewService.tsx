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

export const getCorrespondingReview = (
  reviewQueue: ReviewQueueItem[],
  reviewItem: ReviewQueueItem
) => {
  let correspondingReviewType: ReviewType =
    reviewItem.review_type === "reading" ? "meaning" : "reading";

  let matchingPair = reviewQueue.find(
    (review) =>
      review.id === reviewItem.id &&
      review.review_type === correspondingReviewType
  );

  return matchingPair;
};

export const calculateSRSLevel = (
  reviewQueue: ReviewQueueItem[],
  reviewItem: ReviewQueueItem
) => {
  let matchingItem = getCorrespondingReview(reviewQueue, reviewItem);
  // *testing
  console.log("🚀 ~ file: ReviewService.tsx:62 ~ matchingItem:", matchingItem);
  // *testing

  let incorrecMeaningNum = reviewItem.incorrect_meaning_answers;
  let incorrecReadingNum = reviewItem.incorrect_reading_answers;

  if (matchingItem) {
    incorrecMeaningNum += matchingItem.incorrect_meaning_answers;
    incorrecReadingNum += matchingItem.incorrect_reading_answers;
  }

  // If no change, level up!
  if (incorrecMeaningNum === 0 && incorrecReadingNum === 0) {
    return {
      ...reviewItem,
      ending_srs_stage: reviewItem.srs_stage + 1,
    };
  }

  // oh no, level gonna decrease :(
  // per wanikani docs: new_srs_stage = current_srs_stage - (incorrect_adjustment_count * srs_penalty_factor)
  // incorrect_adjustment_count: number of incorrect answers divided by two and rounded up
  // srs_penalty_factor: 2 if current_srs_stage is at or above 5, 1 if < 5

  let penaltyFactor = reviewItem.srs_stage >= 5 ? 2 : 1;
  let incorrectAdjustmentCount = Math.ceil(
    (incorrecMeaningNum + incorrecReadingNum) / 2
  );
  let updatedSrsLvl =
    reviewItem.srs_stage - incorrectAdjustmentCount * penaltyFactor;

  return {
    ...reviewItem,
    ending_srs_stage: updatedSrsLvl,
  };
};
