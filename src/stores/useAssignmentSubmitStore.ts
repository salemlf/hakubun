import { create } from "zustand";
import { PreFlattenedAssignment } from "../types/Assignment";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";

interface AssignmentSubmitState {
  shouldBatchSubmit: boolean;
  submittedAssignmentIDs: number[];
  submittedAssignmentResponses: PreFlattenedAssignment[];
  submittedAssignmentsWithErrs: AssignmentQueueItem[];
}

interface AssignmentSubmitActions {
  updateSubmittedAssignments: (assignmentIDs: number[]) => void;
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
  submittedAssignmentIDs: [],
  submittedAssignmentResponses: [],
  submittedAssignmentsWithErrs: [],
  shouldBatchSubmit: false,
};

// TODO: persist this state?
export const useAssignmentSubmitStore = create<
  AssignmentSubmitState & AssignmentSubmitActions
>((set, get) => ({
  ...initialState,
  updateSubmittedAssignments: (submittedAssignmentIDs: number[]) => {
    set((state) => ({
      submittedAssignmentIDs: [
        ...state.submittedAssignmentIDs,
        ...submittedAssignmentIDs,
      ],
    }));
  },
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
