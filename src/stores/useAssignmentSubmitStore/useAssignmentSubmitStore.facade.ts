import { useShallow } from "zustand/react/shallow";
import {
  AssignmentSubmitActions,
  AssignmentSubmitState,
  initialState,
  useAssignmentSubmitStore,
} from "./useAssignmentSubmitStore";

// using facade pattern, cleaner to use in components and easier to replace zustand in future if necessary
const useAssignmentSubmitStoreFacade = () => {
  const {
    shouldBatchSubmit,
    submittedAssignmentQueueItems,
    submittedAssignmentsWithErrs,
    updateQueueItemsWithErrs,
    updateSubmittedQueueItems,
    setShouldBatchSubmit,
    resetAll,
  }: AssignmentSubmitState & AssignmentSubmitActions = useAssignmentSubmitStore(
    useShallow((state: AssignmentSubmitState & AssignmentSubmitActions) => ({
      shouldBatchSubmit: state.shouldBatchSubmit,
      submittedAssignmentQueueItems: state.submittedAssignmentQueueItems,
      submittedAssignmentsWithErrs: state.submittedAssignmentsWithErrs,
      updateQueueItemsWithErrs: state.updateQueueItemsWithErrs,
      updateSubmittedQueueItems: state.updateSubmittedQueueItems,
      setShouldBatchSubmit: state.setShouldBatchSubmit,
      resetAll: state.resetAll,
    }))
  );

  return {
    shouldBatchSubmit,
    submittedAssignmentQueueItems,
    submittedAssignmentsWithErrs,
    updateQueueItemsWithErrs,
    updateSubmittedQueueItems,
    setShouldBatchSubmit,
    resetAll,
    // exporting to check that state is reset properly
    initialState,
  };
};

export default useAssignmentSubmitStoreFacade;
