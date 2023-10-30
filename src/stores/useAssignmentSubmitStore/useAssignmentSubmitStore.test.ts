import { mockAssignmentQueueItems } from "../../testing/mocks/data/assignmentQueueItems.mock";
import { act, renderHook } from "../../testing/test-utils";
import useAssignmentSubmitStoreFacade from "./useAssignmentSubmitStore.facade";

describe("useAssignmentSubmitStore", () => {
  test("Initial values are as expected", () => {
    const { result } = renderHook(() => useAssignmentSubmitStoreFacade());
    expect(result.current.submittedAssignmentsWithErrs).toEqual([]);
    expect(result.current.shouldBatchSubmit).toEqual(false);
  });

  test("Submitted queue items added", () => {
    const { result } = renderHook(() => useAssignmentSubmitStoreFacade());
    // make sure nothing in queue
    act(() => result.current.resetAll());
    expect(result.current.submittedAssignmentQueueItems).toEqual([]);

    let halfMockArrLength = mockAssignmentQueueItems.length / 2;
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
