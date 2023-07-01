import { useReducer } from "react";
import { IonContent, IonGrid, IonPage } from "@ionic/react";
import {
  useReviewSession,
  addToReviewQueue,
  updateReviewQueue,
} from "../contexts/ReviewSessionDataContext";

import { ReviewQueueItem, ReviewType } from "../types/MiscTypes";
import { ReviewSessionHeader } from "../components/reviews/ReviewSessionHeader";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { ReviewItemBottomSheet } from "../components/reviews/ReviewItemBottomSheet";
import { ReviewCharAndType } from "../components/reviews/ReviewCharAndType";

import {
  isUserAnswerCorrect,
  isUserAnswerValid,
} from "../services/SubjectAndAssignmentService";
import { reviewSessionReducer } from "../reducers/reviewSessionReducer";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

const Grid = styled(IonGrid)`
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: fix the excessive number of rerenders happening for this page
export const ReviewSession = () => {
  // TODO: rename state to reviewContextState or something
  const { state, dispatchContext } = useReviewSession();

  let reviewQueue = state.reviewQueue;

  const [sessionState, dispatchSessionState] = useReducer(
    reviewSessionReducer,
    {
      currReviewCardIndex: 0,
      isSecondClick: false,
      isBottomSheetVisible: false,
      showRetryButton: false,
      popoverInfo: { message: "", messageType: "invalid" },
      displayPopoverMsg: false,
    }
  );

  // TODO: make this more *elegant*
  const playAudioIfAvailable = (url: string | null, reviewType: ReviewType) => {
    let shouldPlayAudio = url !== null && reviewType === "reading";
    if (shouldPlayAudio) {
      let audio = new Audio(url!);
      audio.play();
    }
  };

  const handleCorrectAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    if (sessionState.isSecondClick) {
      dispatchSessionState({ type: "CORRECT_MOVE_TO_NEXT" });
      setUserAnswer("");
    } else {
      playAudioIfAvailable(
        currReviewItem.primary_audio_url,
        currReviewItem.review_type
      );

      let updatedReviewItem = currReviewItem;
      dispatchSessionState({
        type: "SHOW_POPOVER_MSG",
        payload: { message: "CORRECT!", messageType: "correct" },
      });
      dispatchSessionState({ type: "CORRECT_SHOW_RESULT" });

      let wasWrongFirstAttempt = updatedReviewItem.is_reviewed;
      if (wasWrongFirstAttempt) {
        // keeping answer as incorrect and is_reviewed as true
        // TODO: make sure this actually updates
        updatedReviewItem.is_reviewed = true;
        // TODO: update review item SRS level
        // TODO: change to show toast with updated SRS level
        dispatchSessionState({
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
      }
      updateReviewQueue(updatedReviewItem, state, dispatchContext);
    }
  };

  const handleWrongAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    let updatedReviewItem = currReviewItem;
    if (sessionState.isSecondClick) {
      addToReviewQueue(updatedReviewItem, state, dispatchContext);
      dispatchSessionState({ type: "WRONG_MOVE_TO_NEXT" });
      setUserAnswer("");
    } else {
      dispatchSessionState({ type: "WRONG_SHOW_RESULT" });
      dispatchSessionState({
        type: "SHOW_POPOVER_MSG",
        payload: { message: "SRRY, WRONG :(", messageType: "incorrect" },
      });
      updatedReviewItem.is_correct_answer = false;
      updatedReviewItem.is_reviewed = true;
    }
    updateReviewQueue(updatedReviewItem, state, dispatchContext);
  };

  const handleNextClick = (
    currReviewItem: ReviewQueueItem,
    userAnswer: string,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    // TODO: also check that next reviewQueue.length - 1 !== sessionState.currReviewCardIndex ? may not be necessary
    let isValidInfo = isUserAnswerValid(currReviewItem, userAnswer);
    if (isValidInfo.isValid === false) {
      dispatchSessionState({
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

    dispatchSessionState({ type: "SUBMIT_CHOICE" });
  };

  const handleRetryClick = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    let updatedReviewItem = currReviewItem;
    updatedReviewItem.is_correct_answer = null;
    updatedReviewItem.is_reviewed = false;

    updateReviewQueue(updatedReviewItem, state, dispatchContext);
    setUserAnswer("");
    dispatchSessionState({ type: "RETRY_REVIEW" });
  };

  return (
    <Page>
      {!state.isLoading && reviewQueue && reviewQueue.length !== 0 && (
        <ReviewSessionHeader
          reviewQueue={reviewQueue}
          currReviewCardIndex={sessionState.currReviewCardIndex}
        />
      )}
      <IonContent>
        <Grid>
          {state.isLoading && <p>Loading...</p>}
          {!state.isLoading &&
            reviewQueue &&
            reviewQueue.length - 1 !== sessionState.currReviewCardIndex && (
              <>
                <ReviewCharAndType
                  reviewQueue={reviewQueue}
                  currReviewCardIndex={sessionState.currReviewCardIndex}
                  showReviewMsg={sessionState.displayPopoverMsg}
                  popoverInfo={sessionState.popoverInfo}
                />
                <ReviewCard
                  reviewQueue={reviewQueue}
                  currReviewCardIndex={sessionState.currReviewCardIndex}
                  onRetryClick={handleRetryClick}
                  onNextClick={handleNextClick}
                  enterTextDisabled={sessionState.isSecondClick}
                  showRetryButton={sessionState.showRetryButton}
                />
                <ReviewItemBottomSheet
                  isBottomSheetVisible={sessionState.isBottomSheetVisible}
                />
              </>
            )}
          {!state.isLoading &&
            reviewQueue &&
            reviewQueue.length - 1 === sessionState.currReviewCardIndex && (
              <div>REVIEW SUMMARY</div>
            )}
        </Grid>
      </IonContent>
    </Page>
  );
};
