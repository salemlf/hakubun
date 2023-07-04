import { ReviewQueueItem, ReviewType } from "../types/ReviewSessionTypes";

export const checkIfReviewIsComplete = (
  reviewItemToMatch: ReviewQueueItem,
  reviewQueue: ReviewQueueItem[]
) => {
  let correspondingReviewType: ReviewType =
    reviewItemToMatch.review_type === "reading" ? "meaning" : "reading";
  // TODO: filter queue by id and matching pair for review (reading -> meaning, meaning -> reading)
  let matchingReviewItemsOfOtherType = reviewQueue.filter(
    (review: ReviewQueueItem) =>
      review.id === reviewItemToMatch.id &&
      review.review_type === correspondingReviewType
  );
  console.log(
    "🚀 ~ file: ReviewService.tsx:15 ~ matchingReviewItemsOfOtherType:",
    matchingReviewItemsOfOtherType
  );

  // TODO: if no matches, only reading, so return true
  if (matchingReviewItemsOfOtherType.length === 0) {
    return true;
  }

  // TODO: else if matches, get the last match (or just use some function) and checking that is_reviewed is true
  let matchHasBeenReviewd = matchingReviewItemsOfOtherType.some(
    (review: ReviewQueueItem) => review.is_reviewed === true
  );
  // *testing
  console.log(
    "🚀 ~ file: ReviewService.tsx:25 ~ matchHasBeenReviewd:",
    matchHasBeenReviewd
  );
  // *testing

  return matchHasBeenReviewd;
};

export const getNumberOfIncorrectForReviewTypes = (
  reviewQueue: ReviewQueueItem[],
  reviewItem: ReviewQueueItem
) => {
  // let incorrectCount = {
  //   incorrect_meaning_answers: 0,
  //   incorrect_reading_answers: 0
  // }
  let incorrectMeaningCount = reviewQueue.reduce(
    (acc, curr) =>
      curr.id == reviewItem.id &&
      curr.review_type === ("meaning" as ReviewType) &&
      curr.is_correct_answer === false
        ? ++acc
        : acc,
    0
  );
  console.log(
    "🚀 ~ file: ReviewService.tsx:56 ~ incorrectMeaningCount:",
    incorrectMeaningCount
  );

  let incorrectReadingCount = reviewQueue.reduce(
    (acc, curr) =>
      curr.id == reviewItem.id &&
      curr.review_type === ("reading" as ReviewType) &&
      curr.is_correct_answer === false
        ? ++acc
        : acc,
    0
  );
  console.log(
    "🚀 ~ file: ReviewService.tsx:67 ~ incorrectReadingCount:",
    incorrectReadingCount
  );

  return {
    incorrect_meaning_answers: incorrectMeaningCount,
    incorrect_reading_answers: incorrectReadingCount,
  };
};
