import { useReducer } from "react";
import { IonContent, IonGrid, IonPage, useIonToast } from "@ionic/react";
import {
  useReviewSession,
  addToReviewQueue,
  updateReviewQueue,
} from "../contexts/ReviewSessionDataContext";

import styled from "styled-components/macro";
import { ReviewSessionHeader } from "../components/reviews/ReviewSessionHeader";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { ReviewItemBottomSheet } from "../components/reviews/ReviewItemBottomSheet";
import { ReviewQueueItem } from "../types/MiscTypes";
import {
  isUserAnswerCorrect,
  isUserAnswerValid,
} from "../services/SubjectAndAssignmentService";

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

type SessionStateProps = {
  currReviewCardIndex: number;
  // TODO: change below to more generic name, swiping will also toggle value
  isSecondClick: boolean;
  isSubjectDetailsVisible: boolean;
  showRetryButton: boolean;
};

type ActionType =
  | "CORRECT_MOVE_TO_NEXT"
  | "WRONG_MOVE_TO_NEXT"
  | "CORRECT_SHOW_RESULT"
  | "WRONG_SHOW_RESULT"
  | "SUBMIT_CHOICE"
  | "RETRY_REVIEW";

type SessionAction = {
  type: ActionType;
  payload?: any;
};

// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: fix the excessive number of rerenders happening for this page
export const ReviewSession = () => {
  const [present] = useIonToast();
  // TODO: rename state to reviewContextState or something
  const { state, dispatchContext } = useReviewSession();

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 3000,
      position: "top",
    });
  };

  let reviewQueue = state.reviewQueue;

  // TODO: fix all the switch cases
  const reviewSessionReducer = (
    state: SessionStateProps,
    action: SessionAction
  ) => {
    switch (action.type) {
      case "CORRECT_SHOW_RESULT":
        return { ...state, isSubjectDetailsVisible: true };
      case "CORRECT_MOVE_TO_NEXT":
        // TODO: rn just adding to back of queue, change to add to some random spot
        return { ...state, currReviewCardIndex: state.currReviewCardIndex + 1 };
      case "WRONG_SHOW_RESULT":
        return {
          ...state,
          isSubjectDetailsVisible: true,
          showRetryButton: true,
        };
      case "WRONG_MOVE_TO_NEXT":
        // TODO: rn just adding to back of queue, change to add to some random spot
        return {
          ...state,
          isSubjectDetailsVisible: false,
          showRetryButton: false,
          currReviewCardIndex: state.currReviewCardIndex + 1,
        };
      case "WRONG_SHOW_RESULT":
        return {
          ...state,
          isSubjectDetailsVisible: true,
          showRetryButton: true,
        };
      case "SUBMIT_CHOICE":
        return {
          ...state,
          isSecondClick: !state.isSecondClick,
        };
      case "RETRY_REVIEW":
        return {
          ...state,
          isSecondClick: false,
          isSubjectDetailsVisible: false,
          showRetryButton: false,
        };
      default: {
        throw new Error(
          `Unhandled review session reducer action type: ${action.type}`
        );
      }
    }
  };

  const [sessionState, dispatchSessionState] = useReducer(
    reviewSessionReducer,
    {
      currReviewCardIndex: 0,
      isSecondClick: false,
      isSubjectDetailsVisible: false,
      showRetryButton: false,
    }
  );

  const handleCorrectAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    if (sessionState.isSecondClick) {
      dispatchSessionState({ type: "CORRECT_MOVE_TO_NEXT" });
      setUserAnswer("");
    } else {
      let updatedReviewItem = currReviewItem;
      presentToast("CORRECT!");
      dispatchSessionState({ type: "CORRECT_SHOW_RESULT" });

      // user is correcting after being incorrect
      if (updatedReviewItem.is_reviewed) {
        // keeping answer as incorrect and is_reviewed as true
        // TODO: make sure this actually updates
        updatedReviewItem.is_reviewed = true;
        // TODO: update review item SRS level
        // TODO: change to show toast with updated SRS level
        presentToast("FAKE UPDATING SRS LEVEL...");
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
      presentToast("SRRY, WRONG :(");
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
    let isValidInfo = isUserAnswerValid(currReviewItem, userAnswer);
    if (!isValidInfo.isValid) {
      presentToast(isValidInfo.message);
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
                <ReviewCard
                  reviewQueue={reviewQueue}
                  currReviewCardIndex={sessionState.currReviewCardIndex}
                  onRetryClick={handleRetryClick}
                  onNextClick={handleNextClick}
                  enterTextDisabled={sessionState.isSecondClick}
                  showRetryButton={sessionState.showRetryButton}
                />
                {sessionState.isSubjectDetailsVisible && (
                  <ReviewItemBottomSheet />
                )}
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
