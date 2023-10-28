import { create } from "zustand";
import { PreFlattenedAssignment } from "../types/Assignment";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";

interface AssignmentSubmitState {
  shouldBatchSubmit: boolean;
  submittedAssignmentResponses: PreFlattenedAssignment[];
  submittedAssignmentsWithErrs: AssignmentQueueItem[];
}

interface AssignmentSubmitActions {
  updateSubmittedAssignmentResponses: (
    assignmentResponses: PreFlattenedAssignment[]
  ) => void;
  updateSubmittedAssignmentsWithErrs: (
    assignmentResponses: AssignmentQueueItem[]
  ) => void;
  setShouldBatchSubmit: (shouldBatchSubmit: boolean) => void;
  resetAll: () => void;
}
const initialState: AssignmentSubmitState = {
  submittedAssignmentResponses: [],
  submittedAssignmentsWithErrs: [],
  shouldBatchSubmit: false,
};

// TODO: remove the errors for assignments that were able to update before end of session
// TODO: persist this state?
export const useAssignmentSubmitStore = create<
  AssignmentSubmitState & AssignmentSubmitActions
>((set, get) => ({
  ...initialState,
  updateSubmittedAssignmentResponses: (
    assignmentResponses: PreFlattenedAssignment[]
  ) => {
    set((state) => ({
      submittedAssignmentResponses: [
        ...state.submittedAssignmentResponses,
        ...assignmentResponses,
      ],
    }));
  },
  updateSubmittedAssignmentsWithErrs: (
    assignmentErrs: AssignmentQueueItem[]
  ) => {
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
