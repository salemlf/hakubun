import { useEffect } from "react";
import useAssignmentSubmitStoreFacade from "../../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import useAssignmentQueueStoreFacade from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { getReviewedAssignmentQueueItems } from "../../services/AssignmentQueueService/AssignmentQueueService";
import { MAX_ASSIGNMENTS_BEFORE_SUBMIT } from "../../constants";
import { useAssignmentQueue } from "./AssignmentQueueCards.hooks";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../../types/AssignmentQueueTypes";
import { AssignmentQueueCard } from "./AssignmentQueueCard";
import AssignmentQueueItemBottomSheet from "../AssignmentQueueItemBottomSheet";
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
  const { assignmentQueue, currQueueIndex } = useAssignmentQueueStoreFacade();
  const { shouldBatchSubmit } = useAssignmentSubmitStoreFacade();
  const currReviewItem = assignmentQueue[currQueueIndex];

  useEffect(() => {
    // if we've gone past the last item in the queue, submit
    if (
      currQueueIndex === assignmentQueue.length &&
      assignmentQueue.length !== 0
    ) {
      const reviewedItemsInfo =
        getReviewedAssignmentQueueItems(assignmentQueue);
      submitItems(reviewedItemsInfo.reviewedQueueItems);
    }
  }, [currQueueIndex]);

  useEffect(() => {
    const checkForReviewedBatch =
      shouldBatchSubmit &&
      assignmentQueue.length > 0 &&
      !(currQueueIndex >= assignmentQueue.length - 1);
    if (checkForReviewedBatch) {
      const reviewedItemsInfo =
        getReviewedAssignmentQueueItems(assignmentQueue);

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
        <>
          <AssignmentCardContainer>
            <AssignmentQueueCard
              currentReviewItem={currReviewItem}
              handleNextCard={handleNextCard}
              handleRetryCard={handleRetryCard}
            />
          </AssignmentCardContainer>
          <AssignmentQueueItemBottomSheet currentReviewItem={currReviewItem} />
        </>
      )}
    </>
  );
}

export default AssignmentQueueCards;
