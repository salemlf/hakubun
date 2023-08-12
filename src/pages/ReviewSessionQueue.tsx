import { useEffect } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReviewQueue } from "../hooks/useReviewQueue";
import { useCreateReview } from "../hooks/useCreateReview";
import {
  createReviewPostData,
  getCompletedReviewSessionData,
} from "../services/ReviewService";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { Assignment } from "../types/Assignment";
import ReviewSessionHeader from "../components/ReviewSessionHeader/ReviewSessionHeader";
import ReviewCards from "../components/ReviewCards/ReviewCards";
import AnimatedPage from "../components/AnimatedPage";
import styled from "styled-components";

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

// TODO: improve "Loading..." text
// TODO: add button to abandon session
// TODO: redirect to home if user somehow ends up on this screen without data passed
export const ReviewSessionQueue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { queueDataState, createNewReviewSession } = useReviewQueue();
  const { mutateAsync: createReviewsAsync } = useCreateReview();
  let assignmentBatchToReview: Assignment[] =
    location.state.assignmentBatchToReview;
  let subjIDs: number[] = location.state.subjIDs;

  useEffect(() => {
    createNewReviewSession(assignmentBatchToReview, subjIDs);
  }, []);

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
      // *testing
      console.log(results);
      // *testing

      let reviewResponses = results;
      let reviewInfo = {
        reviewData,
        reviewResponses,
      };
      navigate("/reviews/summary", { state: reviewInfo, replace: true });
    });
  };

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
