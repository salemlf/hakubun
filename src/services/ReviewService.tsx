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

  let incorrectMeaningNum = reviewItem.incorrect_meaning_answers;
  let incorrectReadingNum = reviewItem.incorrect_reading_answers;

  if (matchingItem) {
    incorrectMeaningNum += matchingItem.incorrect_meaning_answers;
    incorrectReadingNum += matchingItem.incorrect_reading_answers;
  }

  // If no change, level up!
  if (incorrectMeaningNum === 0 && incorrectReadingNum === 0) {
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
    (incorrectMeaningNum + incorrectReadingNum) / 2
  );

  // level can only as low as 1 for review items, so creating lower bound
  let updatedSrsLvl = Math.max(
    1,
    reviewItem.srs_stage - incorrectAdjustmentCount * penaltyFactor
  );

  // *testing
  console.log(
    "🚀 ~ file: ReviewService.tsx:78 ~ updatedSrsLvl:",
    updatedSrsLvl
  );
  // *testing

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

// reducer that merges ReviewQueueItems with same ids
export const queueItemReducer = (
  reducedQueueItems: any,
  reviewQueueItem: ReviewQueueItem
) => {
  let key = reviewQueueItem.id;
  let correspondingReview = reducedQueueItems.get(key);
  let mergedItem = mergeQueueItems(correspondingReview || {}, reviewQueueItem);
  reducedQueueItems.set(key, mergedItem);
  return reducedQueueItems;
};

export const getReviewPercentageCorrect = (
  reviewQueueAfterCombined: ReviewQueueItem[]
) => {
  let totalNumReviews = reviewQueueAfterCombined.length;

  let correctReadingReviews = reviewQueueAfterCombined.filter((reviewItem) => {
    return (
      reviewItem.readings !== undefined &&
      reviewItem.incorrect_reading_answers === 0
    );
  });

  let correctMeaningReviews = reviewQueueAfterCombined.filter((reviewItem) => {
    return (
      reviewItem.meanings !== undefined &&
      reviewItem.incorrect_meaning_answers === 0
    );
  });

  let totalNumCorrect =
    correctReadingReviews.length + correctMeaningReviews.length;

  const numItemsWithReadings = reviewQueueAfterCombined.filter(
    (queueItem) => queueItem.readings !== undefined
  ).length;

  let totalReviews =
    numItemsWithReadings * 2 + (totalNumReviews - numItemsWithReadings);

  // *testing
  console.log("total: ", totalReviews);
  // *testing

  let percentageCorrect = Math.ceil(100 * (totalNumCorrect / totalReviews));
  // *testing
  console.log(
    "🚀 ~ file: ReviewService.tsx:153 ~ getReviewSessionStats ~ percentageCorrect:",
    percentageCorrect
  );
  // *testing

  return percentageCorrect;
};

// combining objects with same IDs (subject IDs)
export const getReviewSessionStats = (reviewQueue: ReviewQueueItem[]) => {
  let reviewQueueItemIterator = reviewQueue
    .reduce(queueItemReducer, new Map())
    .values();

  let combinedQueueItems: ReviewQueueItem[] = Array.from(
    reviewQueueItemIterator
  );
  // *testing
  console.log(
    "🚀 ~ file: ReviewService.tsx:179 ~ getReviewSessionStats ~ combinedQueueItems:",
    combinedQueueItems
  );
  // *testing

  // TODO: return review session stats
  let percentCorrect = getReviewPercentageCorrect(combinedQueueItems);
};
