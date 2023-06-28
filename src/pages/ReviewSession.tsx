import { useEffect, useState } from "react";
import { IonContent, IonGrid, IonPage, useIonToast } from "@ionic/react";
import { useTabBarContext } from "../contexts/TabBarContext";
import {
  useReviewSession,
  addToReviewQueue,
  updateReviewQueue,
} from "../contexts/ReviewSessionContext";

import styled from "styled-components/macro";
import { ReviewSessionHeader } from "../components/reviews/ReviewSessionHeader";
import { ReviewCard } from "../components/reviews/ReviewCard";
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

// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: fix the excessive number of rerenders happening for this page
export const ReviewSession = () => {
  const [currReviewCardIndex, setCurrReviewCardIndex] = useState(0);
  // TODO: isSecondClick will be equivalent to swiping
  const [isSecondClick, setIsSecondClick] = useState(false);
  const [isSubjectDetailsVisible, setIsSubjectDetailsVisible] = useState(false);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const { setShowTabBar } = useTabBarContext();
  const [present] = useIonToast();
  const { state, dispatch } = useReviewSession();
  useEffect(() => {
    setShowTabBar(false);

    return () => {
      setShowTabBar(true);
    };
  });

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 3000,
      position: "top",
    });
  };

  let reviewQueue = state.reviewQueue;

  const handleCorrectAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    let updatedReviewItem = currReviewItem;
    if (isSecondClick) {
      setIsSubjectDetailsVisible(false);
      setUserAnswer("");
      setCurrReviewCardIndex((prevIndex) => prevIndex + 1);
    } else {
      presentToast("CORRECT!");
      // showing tab at bottom to pull up for details
      setIsSubjectDetailsVisible(true);

      // making sure is_reviewed isn't already true (i.e. marked incorrect and now reviewing again)
      if (updatedReviewItem.is_reviewed) {
        // keeping answer as incorrect and is_reviewed as true
        // TODO: make sure this actually updates
        updatedReviewItem.is_reviewed = true;
        // TODO: update SRS level
        // TODO: change to show toast with updated SRS level
        presentToast("FAKE UPDATING SRS LEVEL...");
      } else {
        // TODO: make sure this actually updates
        updatedReviewItem.is_correct_answer = true;
        updatedReviewItem.is_reviewed = true;
      }
      updateReviewQueue(updatedReviewItem, state, dispatch);
    }
  };

  const handleWrongAnswer = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    let updatedReviewItem = currReviewItem;
    if (isSecondClick) {
      setIsSubjectDetailsVisible(false);
      setShowRetryButton(false);
      // TODO: rn just adding to back of queue, change to add to some random spot
      addToReviewQueue(updatedReviewItem, state, dispatch);
      setUserAnswer("");
      setCurrReviewCardIndex((prevIndex) => prevIndex + 1);
    } else {
      // showing tab at bottom to pull up for details
      setIsSubjectDetailsVisible(true);
      // TODO: display retry button
      setShowRetryButton(true);
      presentToast("SRRY, WRONG :(");
      updatedReviewItem.is_correct_answer = false;
      updatedReviewItem.is_reviewed = true;
      updateReviewQueue(updatedReviewItem, state, dispatch);
    }
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

    setIsSecondClick(!isSecondClick);
  };

  const handleRetryClick = (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:150 ~ handleRetryClick ~ currReviewItem:",
      currReviewItem
    );
    // *testing
    let updatedReviewItem = currReviewItem;

    updatedReviewItem.is_correct_answer = null;
    updatedReviewItem.is_reviewed = false;
    updateReviewQueue(updatedReviewItem, state, dispatch);
    setIsSubjectDetailsVisible(false);
    setUserAnswer("");
    setIsSecondClick(false);
    setShowRetryButton(false);
  };

  return (
    <Page>
      {!state.isLoading && reviewQueue && reviewQueue.length !== 0 && (
        <ReviewSessionHeader
          reviewQueue={reviewQueue}
          currReviewCardIndex={currReviewCardIndex}
        />
      )}
      <IonContent>
        <Grid>
          {state.isLoading && <p>Loading...</p>}
          {!state.isLoading &&
            reviewQueue &&
            reviewQueue.length - 1 !== currReviewCardIndex && (
              <>
                <ReviewCard
                  reviewQueue={reviewQueue}
                  currReviewCardIndex={currReviewCardIndex}
                  onRetryClick={handleRetryClick}
                  onNextClick={handleNextClick}
                  enterTextDisabled={isSecondClick}
                  showRetryButton={showRetryButton}
                />
                {isSubjectDetailsVisible && <div>Subject info here</div>}
              </>
            )}
          {!state.isLoading &&
            reviewQueue &&
            reviewQueue.length - 1 === currReviewCardIndex && (
              <div>REVIEW SUMMARY</div>
            )}
        </Grid>
      </IonContent>
    </Page>
  );
};
