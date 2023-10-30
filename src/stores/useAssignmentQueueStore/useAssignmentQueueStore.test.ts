import { mockAssignmentQueueItems } from "../../testing/mocks/data/assignmentQueueItems.mock";
import { act, renderHook } from "../../testing/test-utils";
import { useAssignmentQueueStore } from "./useAssignmentQueueStore";

describe("useAssignmentQueueStore", () => {
  test("Initial values are as expected", () => {
    const { result } = renderHook(() => useAssignmentQueueStore());
    expect(result.current.currQueueIndex).toEqual(0);
    expect(result.current.sessionInProgress).toEqual(false);
    expect(result.current.sessionType).toEqual("review");
  });

  test("currQueueIndex increments", () => {
    const { result } = renderHook(() => useAssignmentQueueStore());
    expect(result.current.currQueueIndex).toEqual(0);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(1);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(2);
  });

  test("currQueueIndex resets", () => {
    const { result } = renderHook(() => useAssignmentQueueStore());
    expect(result.current.currQueueIndex).toEqual(0);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(1);
    act(() => result.current.resetAll());
    expect(result.current.currQueueIndex).toEqual(0);
  });

  test("Submitted states for queue items update", () => {
    const { result } = renderHook(() => useAssignmentQueueStore());

    // adding some mock assignments to the queue
    act(() =>
      result.current.setAssignmentQueueData(mockAssignmentQueueItems, "review")
    );

    let randomQueueItem =
      result.current.assignmentQueue[
        Math.floor(Math.random() * result.current.assignmentQueue.length)
      ];
    let assignmentIDOfRandomQueueItem = randomQueueItem.assignment_id;

    // all submitted states should be false at first
    expect(
      result.current.assignmentQueue.find(
        (queueItem) => queueItem.isSubmitted === true
      )
    ).toEqual(undefined);

    act(() =>
      result.current.updateAssignmentSubmittedStates([
        assignmentIDOfRandomQueueItem,
      ])
    );

    // the submitted state of the random queue item should now be true
    expect(
      result.current.assignmentQueue.find(
        (queueItem) => queueItem.assignment_id === assignmentIDOfRandomQueueItem
      )?.isSubmitted
    ).toEqual(true);
  });
});
