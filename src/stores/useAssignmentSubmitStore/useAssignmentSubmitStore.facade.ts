import { useShallow } from "zustand/react/shallow";
import {
  AssignmentSubmitActions,
  AssignmentSubmitState,
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
  } = useAssignmentSubmitStore(
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
  };
};

export default useAssignmentSubmitStoreFacade;
