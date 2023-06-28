import { useEffect, useState } from "react";
import { IonContent, IonGrid, IonPage, useIonToast } from "@ionic/react";
import { useTabBarContext } from "../contexts/TabBarContext";
import { useReviewSession } from "../contexts/ReviewSessionContext";
import { useQueue } from "../hooks/useQueue";

import styled from "styled-components/macro";
import { ReviewSessionHeader } from "../components/reviews/ReviewSessionHeader";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { ReviewQueueItem } from "../types/MiscTypes";
import { isUserAnswerCorrect } from "../services/SubjectAndAssignmentService";

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
  const [isSecondClick, setIsSecondClick] = useState(false);
  const { setShowTabBar } = useTabBarContext();
  const [present] = useIonToast();
  const { state } = useReviewSession();
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

  const handleNextClick = (
    currReviewItem: ReviewQueueItem,
    userAnswer: string,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    if (userAnswer === "") {
      presentToast("SHAKE-EDY SHAKE, INVALID INPUT!");
      return;
    }
    // TODO: account for edge cases (create some function to check if valid input) before checking if correct answer
    let isCorrectAnswer = isUserAnswerCorrect(currReviewItem, userAnswer);
    // *testing
    console.log(
      "🚀 ~ file: ReviewCard.tsx:141 ~ isCorrectAnswer:",
      isCorrectAnswer
    );
    // *testing

    // TODO: isSecondClick will also be equivalent to swiping
    if (isSecondClick) {
      //TODO: move onto
      if (isCorrectAnswer) {
        presentToast("CORRECT!");
        // TODO: if correct...
        // TODO:   check that is_reviewed isn't already true (i.e. marked incorrect and now reviewing again)
        // TODO: if above is true (is_reviewed is false)...
        // TODO:   mark as correct and set is_reviewed to true
        // TODO:   then remove from queue (dequeue), and add to completedReviews
        // TODO: if above is not true (is_reviewed is true)...
        // TODO:   keep answer as incorrect and and set is_reviewed to true
        // TODO:   then remove from queue (dequeue), and add to completedReviews
      } else {
        // TODO: if incorrect...
        // TODO: mark as incorrect and set is_reviewed to true
        // TODO: then dequeue and add back to queue in some random spot
        presentToast("SRRY, WRONG :(");
      }
    } else {
      if (isCorrectAnswer) {
        presentToast("CORRECT!");
        // TODO: show tab at bottom to pull up for details
      } else {
        // TODO: show tab at bottom to pull up for details
        presentToast("SRRY, WRONG :(");
      }
      // TODO: show incorrect junk, blah blah
    }

    setUserAnswer("");
    // TODO: this can be removed once correct/incorrect and dequeue stuff is implemented
    setCurrReviewCardIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrReviewCardIndex((prevIndex) => prevIndex - 1);
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
          {!state.isLoading && reviewQueue && reviewQueue.length !== 0 && (
            <ReviewCard
              reviewQueue={reviewQueue}
              currReviewCardIndex={currReviewCardIndex}
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
            />
          )}
        </Grid>
      </IonContent>
    </Page>
  );
};
