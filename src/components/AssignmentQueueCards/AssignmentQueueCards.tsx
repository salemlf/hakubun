import { useEffect } from "react";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore";
import { useAssignmentSubmitStore } from "../../stores/useAssignmentSubmitStore";
import { getReviewedAssignmentQueueItems } from "../../services/AssignmentQueueService";
import { getAssignmentIDs } from "../../services/SubjectAndAssignmentService";
import { MAX_ASSIGNMENTS_BEFORE_SUBMIT } from "../../constants";
import { useAssignmentQueue } from "./AssignmentQueueCards.hooks";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../../types/AssignmentQueueTypes";
import { AssignmentQueueCard } from "./AssignmentQueueCard";
import { AssignmentCardContainer } from "./AssignmentQueueCardsStyled";
import LoadingDots from "../LoadingDots";
import { FixedCenterContainer } from "../../styles/BaseStyledComponents";

export type CardProps = {
  submitItems: (reviewData: AssignmentQueueItem[]) => void;
  submitBatch: (
    reviewData: AssignmentQueueItem[]
  ) => Promise<AssignmentSubmitInfo>;
};

function AssignmentQueueCards({ submitItems, submitBatch }: CardProps) {
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
  const updateSubmittedAssignmentResponses = useAssignmentSubmitStore(
    (state) => state.updateSubmittedAssignmentResponses
  );
  const updateSubmittedAssignmentsWithErrs = useAssignmentSubmitStore(
    (state) => state.updateSubmittedAssignmentsWithErrs
  );
  const updateAssignmentSubmittedStates = useAssignmentQueueStore(
    (state) => state.updateAssignmentSubmittedStates
  );

  useEffect(() => {
    if (
      currQueueIndex === assignmentQueue.length &&
      assignmentQueue.length !== 0
    ) {
      submitItems(assignmentQueue);
    }
  }, [assignmentQueue[currQueueIndex]]);

  useEffect(() => {
    if (shouldBatchSubmit && assignmentQueue.length > 0) {
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
            updateSubmittedAssignmentResponses(submittedInfo.submitResponses);
            updateSubmittedAssignmentsWithErrs(submittedInfo.errors);
            updateAssignmentSubmittedStates;

            const submittedAssignmentIDs = getAssignmentIDs(
              submittedInfo.submitResponses
            );

            updateAssignmentSubmittedStates(submittedAssignmentIDs);
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
