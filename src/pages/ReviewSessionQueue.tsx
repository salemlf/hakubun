import { useEffect } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useReviewQueue } from "../hooks/useReviewQueue";
import ReviewSessionHeader from "../components/ReviewSessionHeader/ReviewSessionHeader";
import ReviewCards from "../components/ReviewCards/ReviewCards";
import { useCreateReview } from "../hooks/useCreateReview";
import {
  createReviewPostData,
  getCompletedReviewSessionData,
} from "../services/ReviewService";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import AnimatedPage from "../components/AnimatedPage";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Page = styled(AnimatedPage)`
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
  const { mutate: createReviews, mutateAsync: createReviewsAsync } =
    useCreateReview();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !queueDataState.isLoading &&
      reviewQueue.length !== 0 &&
      reviewQueue.length === queueDataState.currQueueIndex
    ) {
      let reviewQueue = queueDataState.reviewQueue;
      let reviewData = getCompletedReviewSessionData(reviewQueue);

      submitReviews(reviewData);
    }
  }, [queueDataState.currQueueIndex]);

  const submitReviews = (reviewData: ReviewQueueItem[]) => {
    let reviewPostData = createReviewPostData(reviewData);

    // TODO: change to catch errors
    let promises = reviewPostData.map(function (reviewItem) {
      return createReviewsAsync({
        reviewSessionData: reviewItem,
      })
        .then(function (results) {
          return results.resources_updated.assignment;
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: ReviewSessionQueue.tsx:96 ~ promises ~ err:",
            err
          );
        });
    });
    Promise.all(promises).then(function (results) {
      console.log(results);

      // TODO: flatten this assignment data on the summary page
      let reviewResponses = results;
      let reviewInfo = {
        reviewData,
        reviewResponses,
      };
      navigate("/reviews/summary", { state: reviewInfo });
    });
  };

  // !added

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
              <ReviewCards currentReviewItem={currentReviewItem} />
            )}
        </Grid>
      </IonContent>
    </Page>
  );
};
