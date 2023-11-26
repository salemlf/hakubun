import { act, renderHook } from "../../testing/test-utils";
import { generateRandomQueueItems } from "../../testing/mocks/data-generators/assignmentQueueGenerator";
import useAssignmentSubmitStoreFacade from "./useAssignmentSubmitStore.facade";

const mockAssignmentQueueItems = generateRandomQueueItems({
  numItems: 20,
  queueProgressState: "completed",
});

describe("useAssignmentSubmitStore", () => {
  test("Initial values are as expected", () => {
    const { result } = renderHook(() => useAssignmentSubmitStoreFacade());
    expect(result.current.submittedAssignmentsWithErrs).toEqual(
      result.current.initialState.submittedAssignmentsWithErrs
    );
    expect(result.current.shouldBatchSubmit).toEqual(
      result.current.initialState.shouldBatchSubmit
    );
  });

  test("Submitted queue items added", () => {
    const { result } = renderHook(() => useAssignmentSubmitStoreFacade());
    // make sure nothing in queue
    act(() => result.current.resetAll());
    expect(result.current.submittedAssignmentQueueItems).toEqual([]);

    const halfMockArrLength = mockAssignmentQueueItems.length / 2;
    const firstHalf = mockAssignmentQueueItems.slice(0, halfMockArrLength);
    const secondHalf = mockAssignmentQueueItems.slice(halfMockArrLength + 1);
    // combining arrs instead of using mockAssignmentQueueItems directly in case length of mock items is ever 1
    const allMockItems = [...firstHalf, ...secondHalf];

    act(() => result.current.updateSubmittedQueueItems(firstHalf));
    expect(result.current.submittedAssignmentQueueItems).toEqual(firstHalf);
    act(() => result.current.updateSubmittedQueueItems(secondHalf));
    expect(result.current.submittedAssignmentQueueItems).toEqual(allMockItems);
  });
});
