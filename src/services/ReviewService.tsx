import { toKana } from "wanakana";
import { ReviewQueueItem, ReviewType } from "../types/ReviewSessionTypes";
import { SubjectMeaning, SubjectReading } from "../types/Subject";
import Fuse from "fuse.js";

const reviewColors: { [index: string]: string } = {
  reading: `var(--ion-color-primary)`,
  meaning: `var(--ion-color-secondary)`,
};

export const getReviewTypeColor = (reviewType: ReviewType) => {
  return reviewColors[reviewType as keyof {}];
};

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

export const getCorrectReviewItemsByType = (
  combinedReviewItems: ReviewQueueItem[],
  reviewType: ReviewType
) => {
  let subjMeaningFilter: string;
  let incorrectFilter: string;
  if (reviewType === "meaning") {
    subjMeaningFilter = "meanings";
    incorrectFilter = "incorrect_meaning_answers";
  } else {
    subjMeaningFilter = "readings";
    incorrectFilter = "incorrect_reading_answers";
  }

  return combinedReviewItems.filter((reviewItem) => {
    return (
      reviewItem[subjMeaningFilter as keyof {}] !== undefined &&
      reviewItem[incorrectFilter as keyof {}] === 0
    );
  });
};

export const getReviewsGroupedByResult = (
  reviewQueueAfterCombined: ReviewQueueItem[]
) => {
  const divideByResult = (
    array: any[],
    isCorrect: (e: ReviewQueueItem) => boolean
  ) => {
    return array.reduce(
      ([correct, incorrect], elem) => {
        return isCorrect(elem)
          ? [[...correct, elem], incorrect]
          : [correct, [...incorrect, elem]];
      },
      [[], []]
    );
  };

  const [correct, incorrect] = divideByResult(
    reviewQueueAfterCombined,
    (reviewItem) =>
      reviewItem.incorrect_reading_answers === 0 &&
      reviewItem.incorrect_meaning_answers === 0
  );
  return { correct, incorrect };
};

// combining objects with same IDs (subject IDs)
export const getCompletedReviewSessionData = (
  reviewQueue: ReviewQueueItem[]
) => {
  let reviewQueueItemIterator = reviewQueue
    .reduce(queueItemReducer, new Map())
    .values();

  let combinedQueueItems: ReviewQueueItem[] = Array.from(
    reviewQueueItemIterator
  );

  return combinedQueueItems;
};

export const groupDataByProperty = function (dataToGroup: any[], key: string) {
  return dataToGroup.reduce(function (objWithGroups, item) {
    let group = item[key];
    objWithGroups[group] = objWithGroups[group] || [];
    objWithGroups[group].push(item);

    return objWithGroups;
  }, {});
};

export const isUserReadingAnswerCorrect = (
  reviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  // so "ん" is converted properly
  let userReading = toKana(userAnswer);
  let answers = reviewItem["readings"] as SubjectReading[];

  let acceptedAnswers = answers.filter((answer) => answer.accepted_answer);
  // *testing
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:193 ~ acceptedAnswers:",
    acceptedAnswers
  );
  // *testing

  // readings shouldn't allow any typos/mistakes
  let isCorrectReading = acceptedAnswers.some(
    (subjReading) => subjReading.reading === userReading
  );
  return isCorrectReading;
};

export const isUserMeaningAnswerCorrect = (
  reviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  let answers = reviewItem["meanings"] as SubjectMeaning[];
  let userSynonyms = reviewItem["meaning_synonyms"];
  let acceptedAnswers = answers.filter((answer) => answer.accepted_answer);

  let answersWithSynonyms = [...acceptedAnswers, { synonyms: userSynonyms }];
  // *testing
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:200 ~ answersWithSynonyms:",
    answersWithSynonyms
  );
  // *testing

  // TODO: update this based on user settings once those are implemented, allow strict meanings (0.0 threshold, and prob just apply to vocab)
  // meanings allow some typos/mistakes
  let options = {
    keys: ["meaning", "synonyms"],
    threshold: 0.1,
    distance: 20,
  };
  let fuse = new Fuse(answersWithSynonyms, options);
  let meaningsMatched = fuse.search(userAnswer);
  return meaningsMatched.length !== 0;
};

export const isUserAnswerCorrect = (
  reviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  let reviewType = reviewItem.review_type as string;
  if (reviewType === "reading") {
    return isUserReadingAnswerCorrect(reviewItem, userAnswer);
  } else {
    return isUserMeaningAnswerCorrect(reviewItem, userAnswer);
  }
};

const checkInvalidSubjectAnswer = (
  currReviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  // - no answer entered
  // - entered kanji/kana for meaning
  // - entered unacceptable character in input (kanji, special char, symbol, number, etc... Basically anything other than kana, romaji, or "normal English letters" - apostrophes, -, and some other chars should be allowed)

  let subjectValidInfo = {
    isValid: true,
    message: "",
  };

  if (userAnswer === "") {
    subjectValidInfo.isValid = false;
    subjectValidInfo.message = "SHAKE-EDY SHAKE, PLEASE ENTER ANSWER!";
  }
  return subjectValidInfo;
};

// TODO: finish implementing
export const isUserAnswerValid = (
  currReviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:198 ~ userAnswer:",
    userAnswer
  );
  let subjectValidInfo = checkInvalidSubjectAnswer(currReviewItem, userAnswer);
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:233 ~ subjectValidInfo:",
    subjectValidInfo
  );

  /*
  examples of invalid answers
  -------------------
  any subject
  - no answer entered
  - entered kanji/kana for meaning
  - entered unacceptable character in input (kanji, special char, symbol, number, etc... Basically anything other than kana, romaji, or "normal English letters" - apostrophes, -, and some other chars should be allowed)
  
  kanji
  - entered onyomi instead of kunyomi, or vice versa

  meaning review type
  - entered kanji/kana

  reading review type
  - romaji that can't be converted to kana
  */

  return subjectValidInfo;
};
