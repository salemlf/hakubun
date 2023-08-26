import { useEffect } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useNavigate } from "react-router-dom";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import { useCreateReview } from "../hooks/useCreateReview";
import {
  blockUserLeavingPage,
  createReviewPostData,
  getCompletedAssignmentQueueData,
} from "../services/AssignmentQueueService";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import QueueHeader from "../components/QueueHeader/QueueHeader";
import AssignmentQueueCards from "../components/AssignmentQueueCards/AssignmentQueueCards";
import AnimatedPage from "../components/AnimatedPage";
import Dialog from "../components/Dialog/Dialog";
import styled from "styled-components";
import { useQueueStore } from "../stores/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";

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
export const ReviewSession = () => {
  const navigate = useNavigate();
  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const assignmentQueue = useAssignmentQueueStore.use.assignmentQueue();
  const { mutateAsync: createReviewsAsync } = useCreateReview();

  useEffect(() => {
    if (assignmentQueue.length === 0) {
      // TODO: redirect to home page, shouldn't be here with no reviews!
    }
  }, []);

  const endReviewSession = () => {
    resetQueueStore();
    resetAssignmentQueue();
  };

  const submitReviews = (queueData: AssignmentQueueItem[]) => {
    let reviewData = getCompletedAssignmentQueueData(queueData);
    let reviewPostData = createReviewPostData(reviewData);

    // TODO: change to actually catch errors
    let promises = reviewPostData.map(function (reviewItem) {
      return createReviewsAsync({
        reviewSessionData: reviewItem,
      })
        .then(function (results) {
          return results.resources_updated.assignment;
        })
        .catch((err) => {
          // *testing
          console.log("🚀 ~ file: ReviewSession.tsx:96 ~ promises ~ err:", err);
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

  return (
    <Page>
      <ReactRouterPrompt
        when={blockUserLeavingPage}
        beforeConfirm={() => {
          endReviewSession();
        }}
      >
        {({
          isActive,
          onConfirm,
          onCancel,
        }: {
          isActive: boolean;
          onConfirm: () => void;
          onCancel: () => void;
        }) =>
          isActive && (
            <Dialog
              uncontrolledSettings={{ defaultOpen: isActive }}
              title="End Review Session?"
              confirmText="End Session"
              cancelText="Cancel"
              onConfirmClick={onConfirm}
              onCancelClick={onCancel}
            />
          )
        }
      </ReactRouterPrompt>
      {assignmentQueue.length !== 0 && <QueueHeader />}
      <IonContent>
        <Grid>
          {assignmentQueue.length !== 0 && (
            <AssignmentQueueCards submitItems={submitReviews} />
          )}
        </Grid>
      </IonContent>
    </Page>
  );
};
