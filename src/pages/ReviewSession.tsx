import { useEffect, useState } from "react";
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from "@ionic/react";
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
  const { setShowTabBar } = useTabBarContext();
  useEffect(() => {
    setShowTabBar(false);

    return () => {
      setShowTabBar(true);
    };
  });

  const [currReviewCardIndex, setCurrReviewCardIndex] = useState(0);
  const { state } = useReviewSession();
  let reviewQueue = state.reviewQueue;

  const handleNextClick = (
    currReviewItem: ReviewQueueItem,
    userAnswer: string,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => {
    // TODO: account for edge cases (create some function to check if valid input) before checking if correct answer
    let isCorrectAnswer = isUserAnswerCorrect(currReviewItem, userAnswer);
    // *testing
    console.log(
      "🚀 ~ file: ReviewCard.tsx:141 ~ isCorrectAnswer:",
      isCorrectAnswer
    );
    // *testing
    setUserAnswer("");
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
