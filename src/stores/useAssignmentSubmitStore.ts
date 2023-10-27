import { create } from "zustand";

interface AssignmentSubmitState {
  shouldBatchSubmit: boolean;
  submittedAssignmentIDs: number[];
}

interface AssignmentSubmitActions {
  updateSubmittedAssignments: (assignmentIDs: number[]) => void;
  setShouldBatchSubmit: (shouldBatchSubmit: boolean) => void;
  resetAll: () => void;
}
const initialState: AssignmentSubmitState = {
  submittedAssignmentIDs: [],
  shouldBatchSubmit: false,
};

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
  setShouldBatchSubmit: (shouldSubmit: boolean) => {
    set(() => ({
      shouldBatchSubmit: shouldSubmit,
    }));
  },
  resetAll: () => {
    set(initialState);
  },
}));
