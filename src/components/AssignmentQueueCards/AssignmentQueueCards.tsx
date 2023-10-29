import { useEffect } from "react";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore";
import { useAssignmentSubmitStore } from "../../stores/useAssignmentSubmitStore";
import { getReviewedAssignmentQueueItems } from "../../services/AssignmentQueueService";
import { MAX_ASSIGNMENTS_BEFORE_SUBMIT } from "../../constants";
import { useAssignmentQueue } from "./AssignmentQueueCards.hooks";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../../types/AssignmentQueueTypes";
import { AssignmentQueueCard } from "./AssignmentQueueCard";
import LoadingDots from "../LoadingDots";
import { AssignmentCardContainer } from "./AssignmentQueueCardsStyled";
import { FixedCenterContainer } from "../../styles/BaseStyledComponents";

export type CardProps = {
  submitItems: (reviewData: AssignmentQueueItem[]) => void;
  submitBatch: (
    reviewData: AssignmentQueueItem[]
  ) => Promise<AssignmentSubmitInfo>;
  updateSubmitted: (submittedInfo: AssignmentSubmitInfo) => void;
};

function AssignmentQueueCards({
  submitItems,
  submitBatch,
  updateSubmitted,
}: CardProps) {
  const { handleNextCard, handleRetryCard } = useAssignmentQueue();
  const assignmentQueue = useAssignmentQueueStore(
    (state) => state.assignmentQueue
  );
  const currQueueIndex = useAssignmentQueueStore(
    (state) => state.currQueueIndex
  );
  const shouldBatchSubmit = useAssignmentSubmitStore(
    (state) => state.shouldBatchSubmit
  );

  useEffect(() => {
    // if we've gone past the last item in the queue, submit
    if (
      currQueueIndex === assignmentQueue.length &&
      assignmentQueue.length !== 0
    ) {
      let reviewedItemsInfo = getReviewedAssignmentQueueItems(assignmentQueue);
      submitItems(reviewedItemsInfo.reviewedQueueItems);
    }
  }, [assignmentQueue[currQueueIndex]]);

  useEffect(() => {
    const checkForReviewedBatch =
      shouldBatchSubmit &&
      assignmentQueue.length > 0 &&
      !(currQueueIndex >= assignmentQueue.length - 1);
    if (checkForReviewedBatch) {
      let reviewedItemsInfo = getReviewedAssignmentQueueItems(assignmentQueue);

      // *testing
      console.log(
        "🚀 ~ file: AssignmentQueueCards.tsx:62 ~ useEffect ~ reviewedItemsInfo:",
        reviewedItemsInfo
      );
      // *testing
      if (reviewedItemsInfo.totalUniqueItems >= MAX_ASSIGNMENTS_BEFORE_SUBMIT) {
        // *testing
        console.log("SUBMITTING BATCH");
        // *testing
        submitBatch(reviewedItemsInfo.reviewedQueueItems).then(
          (submittedInfo) => {
            updateSubmitted(submittedInfo);
          }
        );
      }
    }
  }, [currQueueIndex]);

  return (
    <>
      {assignmentQueue.length === 0 ||
      currQueueIndex === assignmentQueue.length ? (
        <FixedCenterContainer>
          <LoadingDots />
        </FixedCenterContainer>
      ) : (
        <AssignmentCardContainer>
          <AssignmentQueueCard
            currentReviewItem={assignmentQueue[currQueueIndex]}
            handleNextCard={handleNextCard}
            handleRetryCard={handleRetryCard}
          />
        </AssignmentCardContainer>
      )}
    </>
  );
}

export default AssignmentQueueCards;
