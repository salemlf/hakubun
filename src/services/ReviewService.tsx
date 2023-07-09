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

export const mergeQueueItems = (A: ReviewQueueItem, B: ReviewQueueItem) => {
  let merged: any = {};
  Object.keys({ ...A, ...B }).map((key) => {
    if (
      key === "incorrect_meaning_answers" ||
      key === "incorrect_reading_answers"
    ) {
      merged[key] = (B[key] || 0) + (A[key] || 0);
    } else {
      merged[key] = B[key as keyof {}] || A[key as keyof {}];
    }
  });
  return merged;
};

// combining objects with same IDs (subject IDs)
export const getReviewSessionStats = (reviewQueue: ReviewQueueItem[]) => {
  const queueItemReducer = (
    reducedQueueItems: any,
    reviewQueueItem: ReviewQueueItem
  ) => {
    let key = reviewQueueItem.id;
    let correspondingReview = reducedQueueItems.get(key);
    let mergedItem = mergeQueueItems(
      correspondingReview || {},
      reviewQueueItem
    );
    reducedQueueItems.set(key, mergedItem);
    return reducedQueueItems;
  };

  let reviewQueueItemIterator = reviewQueue
    .reduce(queueItemReducer, new Map())
    .values();

  let combinedQueueItems = Array.from(reviewQueueItemIterator);
  // *testing
  console.log(
    "🚀 ~ file: ReviewService.tsx:179 ~ getReviewSessionStats ~ combinedQueueItems:",
    combinedQueueItems
  );
  // *testing
};
