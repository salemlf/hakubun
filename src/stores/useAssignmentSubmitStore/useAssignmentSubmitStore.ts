import { create } from "zustand";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";

export interface AssignmentSubmitState {
  shouldBatchSubmit: boolean;
  // TODO: remove responses, using queue items instead
  submittedAssignmentQueueItems: AssignmentQueueItem[];
  submittedAssignmentsWithErrs: AssignmentQueueItem[];
}

export interface AssignmentSubmitActions {
  updateQueueItemsWithErrs: (assignmentErrs: AssignmentQueueItem[]) => void;
  updateSubmittedQueueItems: (
    assignmentQueueItems: AssignmentQueueItem[]
  ) => void;
  setShouldBatchSubmit: (shouldBatchSubmit: boolean) => void;
  resetAll: () => void;
}
const initialState: AssignmentSubmitState = {
  submittedAssignmentsWithErrs: [],
  submittedAssignmentQueueItems: [],
  shouldBatchSubmit: false,
};

// TODO: remove the errors for assignments that were able to update before end of session
// TODO: persist this state?
export const useAssignmentSubmitStore = create<
  AssignmentSubmitState & AssignmentSubmitActions
>((set, get) => ({
  ...initialState,
  updateSubmittedQueueItems: (assignmentQueueItems: AssignmentQueueItem[]) => {
    set((state) => ({
      submittedAssignmentQueueItems: [
        ...state.submittedAssignmentQueueItems,
        ...assignmentQueueItems,
      ],
    }));
  },
  updateQueueItemsWithErrs: (assignmentErrs: AssignmentQueueItem[]) => {
    set((state) => ({
      submittedAssignmentsWithErrs: [
        ...state.submittedAssignmentsWithErrs,
        ...assignmentErrs,
      ],
    }));
  },
  setShouldBatchSubmit: (shouldSubmit: boolean) => {
    set(() => ({
      shouldBatchSubmit: shouldSubmit,
    }));
  },
  resetAll: () => {
    set(initialState);
  },
}));
