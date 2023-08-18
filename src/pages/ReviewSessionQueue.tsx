import { useEffect } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useLocation, useNavigate } from "react-router-dom";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import { useReviewQueue } from "../hooks/useReviewQueue";
import { useCreateReview } from "../hooks/useCreateReview";
import {
  createReviewPostData,
  getCompletedReviewSessionData,
} from "../services/ReviewService";
import { useCardQueueStore } from "../stores/useCardQueueStore";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { Assignment } from "../types/Assignment";
import { AssignmentBatch } from "../types/MiscTypes";
import QueueHeader from "../components/QueueHeader/QueueHeader";
import ReviewCards from "../components/ReviewCards/ReviewCards";
import AnimatedPage from "../components/AnimatedPage";
import Dialog from "../components/Dialog/Dialog";
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
  const { queueDataState, createNewReviewSession, endReviewSession } =
    useReviewQueue();
  const { mutateAsync: createReviewsAsync } = useCreateReview();
  // !added
  // !added
  // *testing
  console.log(
    "🚀 ~ file: ReviewSessionQueue.tsx:44 ~ ReviewSessionQueue ~ location.state:",
    location.state
  );
  // *testing
  let stateFromReviewSettings: AssignmentBatch = location.state;
  let assignmentBatchToReview: Assignment[] =
    stateFromReviewSettings.assignmentBatch;
  let subjIDs: number[] = stateFromReviewSettings.subjIDs;

  useEffect(() => {
    // *testing
    console.log("Came back to page!!");
    // *testing
    if (queueDataState.reviewQueue.length !== 0) {
      // *testing
      console.log("HEY, there's already a review session in progress!");
      // *testing
    } else {
      createNewReviewSession(assignmentBatchToReview, subjIDs);
    }

    // !added
    return () => {
      // *testing
      console.log("LEAVING PAGE!");
      // *testing
    };
    // !added
  }, []);

  const submitReviews = (queueData: ReviewQueueItem[]) => {
    let reviewData = getCompletedReviewSessionData(queueData);
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
          // *testing
          // TODO: actually catch errors
          console.log(
            "🚀 ~ file: ReviewSessionQueue.tsx:96 ~ promises ~ err:",
            err
          );
          // *testing
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

  // TODO: fix so this returns false when home button is clicked
  const canLeavePage = ({
    currentLocation,
    nextLocation,
    historyAction,
  }: {
    currentLocation: Location;
    nextLocation: Location;
    // historyAction: HistoryAction;
    historyAction: any;
  }) => {
    // *testing
    console.log("currentLocation: ", currentLocation);
    console.log("nextLocation: ", nextLocation);
    console.log("historyAction: ", historyAction);
    // *testing
    // use regex to match /subjects/* pathnames
    let regex = new RegExp("/subjects/*");
    if (regex.test(nextLocation.pathname)) {
      // *testing
      console.log(
        "Subject path detected! Saving input value to localStorage..."
      );
      // *testing
      return true;
    }
    return false;
  };

  return (
    <Page>
      <ReactRouterPrompt
        // when={isPageLeaveAllowed === false}
        when={!canLeavePage}
        // beforeConfirm={async () => {
        //   await delayPromise();
        //   await fetch("https://api.zippopotam.us/in/400072")
        //     .then((response) => response.text())
        //     .then((result) => alert("called beforeConfirm " + result))
        //     .catch((error) => console.log("error", error));
        // }}
        // beforeCancel={() => delayPromise()}
      >
        {
          ({
            isActive,
            onConfirm,
            onCancel,
          }: {
            isActive: boolean;
            onConfirm: () => void;
            onCancel: () => void;
          }) => (
            <Dialog
              open={isActive}
              title="End review session?"
              confirmText="End Session"
              cancelText="Cancel"
              onConfirmClick={onConfirm}
              onCancelClick={onCancel}
            />
          )
          // )
        }
      </ReactRouterPrompt>
      {!queueDataState.isLoading && queueDataState.reviewQueue.length !== 0 && (
        <QueueHeader queueType="review" />
      )}
      <IonContent>
        <Grid>
          {queueDataState.isLoading && <p>Loading...</p>}
          {!queueDataState.isLoading &&
            queueDataState.reviewQueue.length !== 0 && (
              <ReviewCards queueType="review" submitItems={submitReviews} />
            )}
        </Grid>
      </IonContent>
    </Page>
  );
};
