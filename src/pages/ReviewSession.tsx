import { useEffect, useState } from "react";
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from "@ionic/react";
import { useTabBarContext } from "../contexts/TabBarContext";
import { useReviewSession } from "../contexts/ReviewSessionContext";
import { useQueue } from "../hooks/useQueue";

import styled from "styled-components/macro";
import { ReviewSessionHeader } from "../components/reviews/ReviewSessionHeader";
import { ReviewCard } from "../components/reviews/ReviewCard";

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

  const handleNextClick = () => {
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
