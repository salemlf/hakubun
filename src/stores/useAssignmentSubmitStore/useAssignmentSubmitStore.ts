import { create } from "zustand";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";

export type QueueItemAndErr = {
  queueItem: AssignmentQueueItem;
  error: string;
};

export interface AssignmentSubmitState {
  shouldBatchSubmit: boolean;
  submittedAssignmentQueueItems: AssignmentQueueItem[];
  submittedAssignmentsWithErrs: QueueItemAndErr[];
}

export interface AssignmentSubmitActions {
  updateQueueItemsWithErrs: (assignmentsAndErrs: QueueItemAndErr[]) => void;
  updateSubmittedQueueItems: (
    assignmentQueueItems: AssignmentQueueItem[]
  ) => void;
  setShouldBatchSubmit: (shouldBatchSubmit: boolean) => void;
  resetAll: () => void;
}

export const initialState: AssignmentSubmitState = {
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
  updateQueueItemsWithErrs: (assignmentErrs: QueueItemAndErr[]) => {
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
