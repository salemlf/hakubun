import { useReviewSessionQueue } from "../contexts/ReviewSessionQueueContext";
import {
  useReviewSessionData,
  updateReviewQueueItem,
  addToReviewQueue,
} from "../contexts/ReviewSessionDataContext";
import { playAudioIfAvailable } from "../services/MiscService";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import {
  isUserAnswerCorrect,
  isUserAnswerValid,
} from "../services/SubjectAndAssignmentService";
import { useEffect } from "react";

export const useReviewQueue = () => {
  const { queueDataState, dispatchQueueDataContext } = useReviewSessionData();
  const { queueState, dispatchQueueContext } = useReviewSessionQueue();
  // *testing
  useEffect(() => {
    console.log(
      "🚀 ~ file: useReviewQueue.tsx:16 ~ useReviewQueue ~ queueDataState.reviewQueue:",
      queueDataState.reviewQueue
    );
  }, [queueDataState.reviewQueue]);
  // *testing

  const resetCurrReviewCardIndex = () => {
    dispatchQueueContext({
      type: "RESET_REVIEW_CARD_INDEX",
    });
  };

  const handleCorrectAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    if (queueState.isSecondClick) {
      dispatchQueueContext({ type: "CORRECT_MOVE_TO_NEXT" });
      setUserAnswer("");
    } else {
      playAudioIfAvailable(
        currReviewItem.primary_audio_url,
        currReviewItem.review_type
      );

      let updatedReviewItem = currReviewItem;
      dispatchQueueContext({
        type: "SHOW_POPOVER_MSG",
        payload: { message: "CORRECT!", messageType: "correct" },
      });
      dispatchQueueContext({ type: "CORRECT_SHOW_RESULT" });

      let wasWrongFirstAttempt = updatedReviewItem.is_reviewed;
      if (wasWrongFirstAttempt) {
        // keeping answer as incorrect and is_reviewed as true
        // TODO: make sure this actually updates
        updatedReviewItem.is_reviewed = true;
        // TODO: update review item SRS level
        // TODO: change to show toast with updated SRS level
        dispatchQueueContext({
          type: "SHOW_POPOVER_MSG",
          payload: {
            message: "FAKE UPDATING SRS LEVEL...",
            messageType: "correct",
          },
        });
      }
      // user got answer correct first try
      else {
        // TODO: make sure this actually updates
        updatedReviewItem.is_correct_answer = true;
        updatedReviewItem.is_reviewed = true;
        updateReviewQueueItem(
          updatedReviewItem,
          queueDataState,
          dispatchQueueDataContext
        );
      }
    }
  };

  const handleWrongAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    let updatedReviewItem = currReviewItem;
    if (queueState.isSecondClick) {
      addToReviewQueue(
        updatedReviewItem,
        queueDataState,
        dispatchQueueDataContext
      );
      dispatchQueueContext({ type: "WRONG_MOVE_TO_NEXT" });
      setUserAnswer("");
    } else {
      dispatchQueueContext({ type: "WRONG_SHOW_RESULT" });
      dispatchQueueContext({
        type: "SHOW_POPOVER_MSG",
        payload: { message: "SRRY, WRONG :(", messageType: "incorrect" },
      });
      updatedReviewItem.is_correct_answer = false;
      updatedReviewItem.is_reviewed = true;
    }
    updateReviewQueueItem(
      updatedReviewItem,
      queueDataState,
      dispatchQueueDataContext
    );
  };

  const handleNextClick = (
    currReviewItem: ReviewQueueItem,
    userAnswer: string,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    // TODO: also check that next reviewQueue.length - 1 !== sessionState.currReviewCardIndex ? may not be necessary
    let isValidInfo = isUserAnswerValid(currReviewItem, userAnswer);
    if (isValidInfo.isValid === false) {
      dispatchQueueContext({
        type: "SHOW_POPOVER_MSG",
        payload: { message: isValidInfo.message, messageType: "invalid" },
      });
      // *testing
      console.log(
        "🚀 ~ file: ReviewSession.tsx:233 ~ ReviewSession ~ isValidInfo.message:",
        isValidInfo.message
      );
      // *testing
      return;
    }
    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:137 ~ ReviewSession ~ userAnswer:",
      userAnswer
    );
    // *testing
    let isCorrectAnswer = isUserAnswerCorrect(currReviewItem, userAnswer);
    // *testing
    console.log(
      "🚀 ~ file: ReviewCard.tsx:141 ~ isCorrectAnswer:",
      isCorrectAnswer
    );
    // *testing

    isCorrectAnswer
      ? handleCorrectAnswer(currReviewItem, setUserAnswer)
      : handleWrongAnswer(currReviewItem, setUserAnswer);

    dispatchQueueContext({ type: "SUBMIT_CHOICE" });
  };

  const handleRetryClick = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    let updatedReviewItem = currReviewItem;
    updatedReviewItem.is_correct_answer = null;
    updatedReviewItem.is_reviewed = false;

    updateReviewQueueItem(
      updatedReviewItem,
      queueDataState,
      dispatchQueueDataContext
    );
    setUserAnswer("");
    dispatchQueueContext({ type: "RETRY_REVIEW" });
  };

  return {
    queueDataState,
    queueState,
    resetCurrReviewCardIndex,
    handleNextClick,
    handleRetryClick,
  };
};
