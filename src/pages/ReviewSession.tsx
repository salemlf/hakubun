import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import { useQueueStore } from "../stores/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import {
  blockUserLeavingPage,
  createReviewPostData,
  getCompletedAssignmentQueueData,
} from "../services/AssignmentQueueService";
import { useCreateReview } from "../hooks/useCreateReview";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import { PreFlattenedAssignment } from "../types/Assignment";
import QueueHeader from "../components/QueueHeader/QueueHeader";
import AssignmentQueueCards from "../components/AssignmentQueueCards/AssignmentQueueCards";
import AnimatedPage from "../components/AnimatedPage";
import AlertDialog from "../components/AlertDialog";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

// TODO: add button to abandon session
// TODO: redirect to home if user somehow ends up on this screen without data passed
export const ReviewSession = () => {
  const navigate = useNavigate();
  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const assignmentQueue = useAssignmentQueueStore.use.assignmentQueue();
  // !added
  const currQueueIndex = useAssignmentQueueStore.use.currQueueIndex();
  const updateAssignmentQueueData =
    useAssignmentQueueStore.use.updateAssignmentQueueData();
  // !added
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

  const wrapUpReviewSession = (cancelPageLeave: () => void) => {
    //  TODO: get all reviews that have not been started (is_reviewed is false), make sure any other items in queue with...
    // TODO: ...matching assignment_id but different itemID also have is_reviewed as false
    // TODO: ...if that's true, remove items from queue
    // TODO: DO NOT remove item at currQueueIndex or it's corresponding item

    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:82 ~ reviewedItems ~ assignmentQueue BEFORE filter:",
      assignmentQueue
    );
    // *testing

    let reviewedItems = assignmentQueue.filter((item) => {
      return (
        item.is_reviewed === true ||
        assignmentQueue.some((otherItem) => {
          return (
            otherItem.assignment_id === item.assignment_id &&
            otherItem.is_reviewed === true &&
            otherItem.itemID !== item.itemID
          );
        }) ||
        assignmentQueue.indexOf(item) === currQueueIndex ||
        assignmentQueue.some((otherItem) => {
          return (
            otherItem.assignment_id === item.assignment_id &&
            assignmentQueue.indexOf(otherItem) === currQueueIndex
          );
        })
      );
    });
    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:63 ~ wrapUpReviewSession ~ reviewedItems:",
      reviewedItems
    );
    // *testing

    updateAssignmentQueueData(reviewedItems);
    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:87 ~ reviewedItems ~ assignmentQueue AFTER update:",
      assignmentQueue
    );
    // *testing

    cancelPageLeave();
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
      let unableToUpdate: AssignmentQueueItem[] = [];
      let reviewResponses: PreFlattenedAssignment[] = [];

      results.forEach((response, index) => {
        if (response === undefined) {
          unableToUpdate.push(reviewData[index]);
        } else {
          reviewResponses.push(response);
        }
      });

      let reviewInfo = {
        reviewData,
        reviewResponses,
        errors: unableToUpdate,
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
            <AlertDialog
              uncontrolledSettings={{ defaultOpen: isActive }}
              title="End Review Session?"
              confirmText="End Session"
              cancelText="Cancel"
              onConfirmClick={onConfirm}
              onCancelClick={onCancel}
              showAddtlAction={true}
              addtlActionText="Wrap Up"
              onAddtlActionClick={() => {
                wrapUpReviewSession(onCancel);
              }}
            />
          )
        }
      </ReactRouterPrompt>
      {assignmentQueue.length !== 0 && <QueueHeader />}
      <MainContent>
        {assignmentQueue.length !== 0 && (
          <AssignmentQueueCards submitItems={submitReviews} />
        )}
      </MainContent>
      <KeyboardShortcuts />
    </Page>
  );
};
