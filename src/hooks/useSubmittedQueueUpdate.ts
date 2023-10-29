import { getAssignmentIDs } from "../services/SubjectAndAssignmentService";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { useAssignmentSubmitStore } from "../stores/useAssignmentSubmitStore";
import { AssignmentSubmitInfo } from "../types/AssignmentQueueTypes";

// TODO: also update SRS level based on responses?
export const useSubmittedQueueUpdate = () => {
  const updateAssignmentSubmittedStates = useAssignmentQueueStore(
    (state) => state.updateAssignmentSubmittedStates
  );

  const updateSubmittedQueueItems = useAssignmentSubmitStore(
    (state) => state.updateSubmittedQueueItems
  );
  const updateQueueItemsWithErrs = useAssignmentSubmitStore(
    (state) => state.updateQueueItemsWithErrs
  );

  const updateSubmitted = (submittedInfo: AssignmentSubmitInfo) => {
    updateQueueItemsWithErrs(submittedInfo.errors);

    const submittedAssignmentIDs = getAssignmentIDs(
      submittedInfo.submitResponses
    );

    let updatedAssignmentQueue = updateAssignmentSubmittedStates(
      submittedAssignmentIDs
    );

    // TODO: get the assignment queue items that were submitted, add them to...
    // TODO: ...submittedAssignmentQueueItems in useAssignmentSubmitStore
    const updatedQueueItems = updatedAssignmentQueue.filter((queueItem) => {
      return submittedAssignmentIDs.includes(queueItem.assignment_id);
    });

    updateSubmittedQueueItems(updatedQueueItems);

    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:298 ~ updatedQueueItems ~ updatedQueueItems:",
      updatedQueueItems
    );
    // *testing
  };

  return updateSubmitted;
};
