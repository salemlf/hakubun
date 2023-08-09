import { toKana, isKanji, isJapanese, toRomaji, isKana } from "wanakana";
import {
  GroupedReviewItems,
  ReviewAnswerValidResult,
  ReviewQueueItem,
  ReviewType,
} from "../types/ReviewSessionTypes";
import { SubjectMeaning, SubjectReading } from "../types/Subject";
import { INVALID_ANSWER_CHARS } from "../constants";
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
): GroupedReviewItems => {
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

type AnswersForReviewsParams = {
  reviewItem: ReviewQueueItem;
  acceptedAnswersOnly: boolean;
};

interface AcceptableAnswer {
  meaning: string;
  primary: boolean;
  accepted_answer: boolean;
}

function convertUserMeaningsToAcceptableAnswers(
  input: string[]
): AcceptableAnswer[] {
  return input.map((word) => ({
    meaning: word,
    primary: false,
    accepted_answer: true,
  }));
}

export const getAnswersForMeaningReviews = ({
  reviewItem,
  acceptedAnswersOnly,
}: AnswersForReviewsParams) => {
  let answers = reviewItem["meanings"];

  if (answers === undefined) {
    return [];
  }

  let acceptableUserAnswers = convertUserMeaningsToAcceptableAnswers(
    reviewItem["meaning_synonyms"]
  );

  return acceptedAnswersOnly
    ? [
        ...answers.filter((answer) => answer.accepted_answer),
        ...acceptableUserAnswers,
      ]
    : [...answers, ...acceptableUserAnswers];
};

export const getAnswersForReadingReviews = ({
  reviewItem,
  acceptedAnswersOnly,
}: AnswersForReviewsParams) => {
  let answers = reviewItem["readings"];
  if (answers === undefined) {
    return [];
  }

  return acceptedAnswersOnly
    ? answers.filter((answer) => answer.accepted_answer)
    : answers;
};

// TODO: update so user-added readings are also checked
export const isUserReadingAnswerCorrect = (
  reviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  // so "ん" is converted properly
  let userReading = toKana(userAnswer);

  let acceptedAnswers = getAnswersForReadingReviews({
    reviewItem: reviewItem,
    acceptedAnswersOnly: true,
  });
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
  let answersWithSynonyms = getAnswersForMeaningReviews({
    reviewItem: reviewItem,
    acceptedAnswersOnly: true,
  });
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
    threshold: 0.2,
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
  }
  return isUserMeaningAnswerCorrect(reviewItem, userAnswer);
};

const checkInvalidSubjectAnswer = (
  userAnswer: string
): ReviewAnswerValidResult => {
  // no answer entered
  if (userAnswer === "") {
    return {
      isValid: false,
      message: "Answer cannot be empty",
    };
  }
  // invalid character entered
  else if (isKanji(userAnswer) || INVALID_ANSWER_CHARS.test(userAnswer)) {
    return {
      isValid: false,
      message: "Unacceptable character(s) entered",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

const checkInvalidMeaningAnswer = (
  currReviewItem: ReviewQueueItem,
  userAnswer: string
): ReviewAnswerValidResult => {
  // entered japanese when english meaning was asked for
  if (isJapanese(userAnswer)) {
    return {
      isValid: false,
      message: "Japanese shouldn't be entered for subject meaning",
    };
  }

  if (!isUserMeaningAnswerCorrect(currReviewItem, userAnswer)) {
    let acceptedReadings = getAnswersForReadingReviews({
      reviewItem: currReviewItem,
      acceptedAnswersOnly: true,
    });

    let isAccidentalReadingAnswer = acceptedReadings.some(
      (subjReading) => toRomaji(subjReading.reading) === userAnswer
    );

    // entered romaji equivalent for reading answer (got confused and thought it was a reading question)
    if (isAccidentalReadingAnswer) {
      return {
        isValid: false,
        message:
          "Are you trying to enter the the reading answer? We're looking for the meaning :p",
      };
    }
  }

  return {
    isValid: true,
    message: "",
  };
};

const checkInvalidReadingAnswer = (
  currReviewItem: ReviewQueueItem,
  userAnswer: string
): ReviewAnswerValidResult => {
  let attemptToKanaConvert = toKana(userAnswer);

  // romaji that can't be converted to kana
  if (!isKana(attemptToKanaConvert)) {
    return {
      isValid: false,
      message: "Input can't be converted to kana!",
    };
  }

  // entered onyomi instead of kunyomi, or vice versa
  if (
    currReviewItem.object === "kanji" &&
    !isUserReadingAnswerCorrect(currReviewItem, userAnswer)
  ) {
    let allReadings = getAnswersForReadingReviews({
      reviewItem: currReviewItem,
      acceptedAnswersOnly: false,
    });

    let readingExists = allReadings.find(
      (subjReading) => subjReading.reading === userAnswer
    );

    if (readingExists) {
      // could be multiple, but just returning the first
      let correctAnswer = allReadings.find((answer) => answer.accepted_answer);

      // I don't think the second message should ever appear for kanji? But not positive, so accounting for it
      return {
        isValid: false,
        message:
          correctAnswer && correctAnswer.type
            ? `Wankani is looking for the ${correctAnswer.type} reading`
            : `Hmm, Wanikani is looking for a different reading...`,
      };
    }
  }

  return {
    isValid: true,
    message: "",
  };
};

export const isUserAnswerValid = (
  currReviewItem: ReviewQueueItem,
  userAnswer: string
): ReviewAnswerValidResult => {
  let subjectValidInfo = checkInvalidSubjectAnswer(userAnswer);
  if (!subjectValidInfo.isValid) {
    return subjectValidInfo;
  }

  let isMeaningReviewType = currReviewItem.review_type === "meaning";
  let validationFunction = isMeaningReviewType
    ? checkInvalidMeaningAnswer
    : checkInvalidReadingAnswer;
  let validationInfo = validationFunction(currReviewItem, userAnswer);

  if (!validationInfo.isValid) {
    return validationInfo;
  }

  return {
    isValid: true,
    message: "",
  };
};

export const createReviewPostData = (reviewedItems: ReviewQueueItem[]) => {
  return reviewedItems.map((reviewedItem) => ({
    assignment_id: reviewedItem.assignment_id,
    incorrect_meaning_answers: reviewedItem.incorrect_meaning_answers,
    incorrect_reading_answers: reviewedItem.incorrect_reading_answers,
  }));
};
