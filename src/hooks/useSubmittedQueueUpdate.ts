import { getAssignmentIDs } from "../services/SubjectAndAssignmentService";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { AssignmentSubmitInfo } from "../types/AssignmentQueueTypes";

// TODO: also update SRS level based on responses?
export const useSubmittedQueueUpdate = () => {
  const updateAssignmentSubmittedStates = useAssignmentQueueStore(
    (state) => state.updateAssignmentSubmittedStates
  );

  const { updateSubmittedQueueItems, updateQueueItemsWithErrs } =
    useAssignmentSubmitStoreFacade();

  const updateSubmitted = (submittedInfo: AssignmentSubmitInfo) => {
    updateQueueItemsWithErrs(submittedInfo.errors);

    const submittedAssignmentIDs = getAssignmentIDs(
      submittedInfo.submitResponses
    );

    let updatedAssignmentQueue = updateAssignmentSubmittedStates(
      submittedAssignmentIDs
    );

    const updatedQueueItems = updatedAssignmentQueue.filter((queueItem) => {
      return submittedAssignmentIDs.includes(queueItem.assignment_id);
    });

    updateSubmittedQueueItems(updatedQueueItems);
  };

  return updateSubmitted;
};
