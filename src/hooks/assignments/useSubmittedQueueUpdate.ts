import { getAssignmentIDs } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { AssignmentSubmitInfo } from "../../types/AssignmentQueueTypes";

export const useSubmittedQueueUpdate = () => {
  const updateAssignmentSubmittedStates = useAssignmentQueueStore(
    (state) => state.updateAssignmentSubmittedStates
  );

  const { updateSubmittedQueueItems, updateQueueItemsWithErrs } =
    useAssignmentSubmitStoreFacade();

  const updateSubmitted = (submittedInfo: AssignmentSubmitInfo) => {
    updateQueueItemsWithErrs(submittedInfo.assignmentsWithErrs);

    const submittedAssignmentIDs = getAssignmentIDs(
      submittedInfo.submitResponses
    );

    const updatedAssignmentQueue = updateAssignmentSubmittedStates(
      submittedAssignmentIDs
    );

    const updatedQueueItems = updatedAssignmentQueue.filter((queueItem) => {
      return submittedAssignmentIDs.includes(queueItem.assignment_id);
    });

    updateSubmittedQueueItems(updatedQueueItems);
  };

  return updateSubmitted;
};
