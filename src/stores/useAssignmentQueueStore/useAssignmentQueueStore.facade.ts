import { useShallow } from "zustand/react/shallow";
import {
  AssignmentQueueState,
  AssignmentQueueActions,
  useAssignmentQueueStore,
} from "./useAssignmentQueueStore";

// using facade pattern, cleaner to use in components and easier to replace zustand in future if necessary
const useAssignmentQueueStoreFacade = () => {
  const {
    assignmentQueue,
    currQueueIndex,
    sessionInProgress,
    sessionType,
    updateQueueItem,
    updateQueueItemAltMeanings,
    setAssignmentQueueData,
    updateAssignmentQueueData,
    updateAssignmentSubmittedStates,
    incrementCurrQueueIndex,
    addToAssignmentQueue,
    removeOldQueueItem,
    resetAll,
  } = useAssignmentQueueStore(
    useShallow((state: AssignmentQueueState & AssignmentQueueActions) => ({
      assignmentQueue: state.assignmentQueue,
      currQueueIndex: state.currQueueIndex,
      sessionInProgress: state.sessionInProgress,
      sessionType: state.sessionType,
      updateQueueItem: state.updateQueueItem,
      updateQueueItemAltMeanings: state.updateQueueItemAltMeanings,
      setAssignmentQueueData: state.setAssignmentQueueData,
      updateAssignmentQueueData: state.updateAssignmentQueueData,
      updateAssignmentSubmittedStates: state.updateAssignmentSubmittedStates,
      incrementCurrQueueIndex: state.incrementCurrQueueIndex,
      addToAssignmentQueue: state.addToAssignmentQueue,
      removeOldQueueItem: state.removeOldQueueItem,
      resetAll: state.resetAll,
    }))
  );

  return {
    assignmentQueue,
    currQueueIndex,
    sessionInProgress,
    sessionType,
    updateQueueItem,
    updateQueueItemAltMeanings,
    setAssignmentQueueData,
    updateAssignmentQueueData,
    updateAssignmentSubmittedStates,
    incrementCurrQueueIndex,
    addToAssignmentQueue,
    removeOldQueueItem,
    resetAll,
  };
};

export default useAssignmentQueueStoreFacade;
