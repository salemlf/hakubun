import { useReviewSessionQueue } from "../contexts/ReviewSessionQueueContext";
import {
  useReviewSessionData,
  updateReviewQueueItem,
  addToReviewQueue,
  createReviewItems,
} from "../contexts/ReviewSessionDataContext";
import {
  capitalizeWord,
  getSrsNameBySrsLvl,
  playAudioIfAvailable,
} from "../services/MiscService";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";

import { isUserAnswerCorrect } from "../services/ReviewService";
import {
  calculateSRSLevel,
  checkIfReviewIsComplete,
} from "../services/ReviewService";
import { Assignment } from "../types/Assignment";

// TODO: add wrap up functionality
export const useReviewQueue = () => {
  const { queueDataState, dispatchQueueDataContext } = useReviewSessionData();
  const { queueState, dispatchQueueContext } = useReviewSessionQueue();

  const createNewReviewSession = (
    assignments: Assignment[],
    subjIDs: number[]
  ) => {
    endReviewSession();
    createReviewItems(assignments, subjIDs, dispatchQueueDataContext);
  };

  const endReviewSession = () => {
    dispatchQueueContext({
      type: "RESET_REVIEW_CARDS",
    });
    dispatchQueueDataContext({ type: "RESET_REVIEW" });
  };

  const displayInvalidAnswerMsg = (message: string) => {
    dispatchQueueContext({
      type: "SHOW_POPOVER_MSG",
      payload: { message: message, messageType: "invalid" },
    });
  };

  const displaySRSStatus = (reviewItem: ReviewQueueItem) => {
    // *testing
    console.log("reviewItem.srs_stage: ", reviewItem.srs_stage);
    console.log("reviewItem.ending_srs_stage: ", reviewItem.ending_srs_stage);
    // *testing

    let endingSRS = reviewItem.ending_srs_stage!;

    let hasIncreased = endingSRS > reviewItem.srs_stage;
    let endingSRSName = capitalizeWord(getSrsNameBySrsLvl(endingSRS));

    // TODO: change to use more specific types that display up or down arrows based on correct/incorrect
    let popoverToDispatch = hasIncreased
      ? {
          type: "SHOW_POPOVER_MSG" as const,
          payload: {
            message: `Increasing to ${endingSRSName}...`,
            messageType: "correct",
          },
        }
      : {
          type: "SHOW_POPOVER_MSG" as const,
          payload: {
            message: `Decreasing to ${endingSRSName}...`,
            messageType: "incorrect",
          },
        };

    dispatchQueueContext(popoverToDispatch);
  };

  const correctFirstClick = (currReviewItem: ReviewQueueItem) => {
    let isReviewItemComplete = checkIfReviewIsComplete(
      currReviewItem,
      queueDataState.reviewQueue
    );

    playAudioIfAvailable(
      currReviewItem.primary_audio_url,
      currReviewItem.review_type
    );

    let updatedReviewItem = currReviewItem;
    dispatchQueueContext({
      type: "SHOW_POPOVER_MSG",
      payload: { message: "CORRECT!", messageType: "correct" },
    });

    if (isReviewItemComplete) {
      updatedReviewItem = calculateSRSLevel(
        queueDataState.reviewQueue,
        updatedReviewItem
      );

      displaySRSStatus(updatedReviewItem);
    }

    let wasWrongFirstAttempt = updatedReviewItem.is_reviewed;
    if (wasWrongFirstAttempt) {
      // keeping answer as incorrect and is_reviewed as true
      updatedReviewItem.is_reviewed = true;

      updateReviewQueueItem(updatedReviewItem, dispatchQueueDataContext);
    }
    // user got answer correct first try
    else {
      updatedReviewItem.is_correct_answer = true;
      updatedReviewItem.is_reviewed = true;
      updateReviewQueueItem(updatedReviewItem, dispatchQueueDataContext);
    }

    dispatchQueueContext({ type: "CORRECT_SHOW_RESULT" });
  };

  const handleCorrectAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void,
    moveToNextItem: boolean
  ) => {
    if (moveToNextItem) {
      dispatchQueueContext({ type: "CORRECT_MOVE_TO_NEXT" });
      dispatchQueueDataContext({ type: "INCREMENT_CURR_INDEX" });
      setUserAnswer("");
    } else {
      correctFirstClick(currReviewItem);
    }
  };

  const handleWrongAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void,
    moveToNextItem: boolean
  ) => {
    let updatedReviewItem = currReviewItem;

    if (moveToNextItem) {
      addToReviewQueue(updatedReviewItem, dispatchQueueDataContext);
      dispatchQueueDataContext({
        type: "REMOVE_REVIEW_QUEUE_ITEM",
      });
      dispatchQueueContext({ type: "WRONG_MOVE_TO_NEXT" });
      setUserAnswer("");
    } else {
      dispatchQueueContext({
        type: "SHOW_POPOVER_MSG",
        payload: { message: "SRRY, WRONG :(", messageType: "incorrect" },
      });
      updatedReviewItem.is_correct_answer = false;
      updatedReviewItem.is_reviewed = false;

      updatedReviewItem.review_type === "reading"
        ? (updatedReviewItem.incorrect_reading_answers += 1)
        : (updatedReviewItem.incorrect_meaning_answers += 1);

      updateReviewQueueItem(updatedReviewItem, dispatchQueueDataContext);
      dispatchQueueContext({ type: "WRONG_SHOW_RESULT" });
    }
  };

  const handleNextClick = (
    currReviewItem: ReviewQueueItem,
    userAnswer: string,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:137 ~ ReviewSession ~ userAnswer:",
      userAnswer
    );
    // *testing
    let isCorrectAnswer = isUserAnswerCorrect(currReviewItem, userAnswer);

    let moveToNextItem = queueState.isSecondClick;
    isCorrectAnswer
      ? handleCorrectAnswer(currReviewItem, setUserAnswer, moveToNextItem)
      : handleWrongAnswer(currReviewItem, setUserAnswer, moveToNextItem);

    dispatchQueueContext({ type: "SUBMIT_CHOICE" });
  };

  const handleRetryClick = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    let updatedReviewItem = currReviewItem;
    updatedReviewItem.is_correct_answer = null;
    updatedReviewItem.is_reviewed = false;
    // undoing the increment previously done
    updatedReviewItem.review_type === "reading"
      ? (updatedReviewItem.incorrect_reading_answers -= 1)
      : (updatedReviewItem.incorrect_meaning_answers -= 1);

    updateReviewQueueItem(updatedReviewItem, dispatchQueueDataContext);
    setUserAnswer("");
    dispatchQueueContext({ type: "RETRY_REVIEW" });
  };

  return {
    queueDataState,
    queueState,
    handleNextClick,
    handleRetryClick,
    createNewReviewSession,
    displayInvalidAnswerMsg,
    endReviewSession,
  };
};
