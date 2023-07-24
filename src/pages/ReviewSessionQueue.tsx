import { IonContent, IonGrid, IonPage } from "@ionic/react";

import styled from "styled-components/macro";
import { useReviewQueue } from "../hooks/useReviewQueue";
import ReviewSessionHeader from "../components/ReviewSessionHeader/ReviewSessionHeader";
import ReviewCards from "../components/ReviewCards/ReviewCards";
import ReviewSummary from "../components/ReviewSummary/ReviewSummary";

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
  margin: 10px;
`;

// TODO: add button to abandon session
// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: fix the excessive number of rerenders happening for this page
export const ReviewSessionQueue = () => {
  const { queueDataState } = useReviewQueue();

  let reviewQueue = queueDataState.reviewQueue;
  let currentReviewItem =
    queueDataState.reviewQueue[queueDataState.currQueueIndex];

  return (
    <Page>
      {!queueDataState.isLoading && reviewQueue.length !== 0 && (
        <ReviewSessionHeader currentReviewItem={currentReviewItem} />
      )}
      <IonContent>
        <Grid>
          {queueDataState.isLoading && <p>Loading...</p>}
          {!queueDataState.isLoading &&
            reviewQueue.length !== queueDataState.currQueueIndex &&
            currentReviewItem && (
              // <ReviewItemCard currentReviewItem={currentReviewItem} />
              <ReviewCards currentReviewItem={currentReviewItem} />
            )}
          {!queueDataState.isLoading &&
            reviewQueue.length === queueDataState.currQueueIndex && (
              <ReviewSummary />
            )}
        </Grid>
      </IonContent>
    </Page>
  );
};
