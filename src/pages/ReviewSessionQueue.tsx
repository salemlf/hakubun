import { IonContent, IonGrid, IonPage } from "@ionic/react";

import { ReviewSessionHeader } from "../components/reviews/ReviewSessionHeader";
import { ReviewInputAndButtons } from "../components/reviews/ReviewInputAndButtons";
import { ReviewItemBottomSheet } from "../components/reviews/ReviewItemBottomSheet";
import { ReviewCharAndType } from "../components/reviews/ReviewCharAndType";

import styled from "styled-components/macro";
import { useReviewQueue } from "../hooks/useReviewQueue";

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
export const ReviewSessionQueue = () => {
  const { queueDataState, queueState } = useReviewQueue();

  let reviewQueue = queueDataState.reviewQueue;
  let currentReviewItem =
    queueDataState.reviewQueue[queueState.currReviewCardIndex];

  return (
    <Page>
      {!queueDataState.isLoading && reviewQueue.length !== 0 && (
        <ReviewSessionHeader currentReviewItem={currentReviewItem} />
      )}
      <IonContent>
        <Grid>
          {queueDataState.isLoading && <p>Loading...</p>}
          {!queueDataState.isLoading &&
            reviewQueue.length - 1 !== queueState.currReviewCardIndex &&
            currentReviewItem && (
              <>
                <ReviewCharAndType currentReviewItem={currentReviewItem} />
                <ReviewInputAndButtons currentReviewItem={currentReviewItem} />
                <ReviewItemBottomSheet
                  currentReviewItem={currentReviewItem}
                  reviewType={currentReviewItem.review_type}
                />
              </>
            )}
          {!queueDataState.isLoading &&
            reviewQueue.length - 1 === queueState.currReviewCardIndex && (
              <div>REVIEW SUMMARY</div>
            )}
        </Grid>
      </IonContent>
    </Page>
  );
};
