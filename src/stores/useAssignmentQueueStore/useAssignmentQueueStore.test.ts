import { generateRandomQueueItems } from "../../testing/mocks/data-generators/assignmentQueueGenerator";
import { act, renderHook } from "../../testing/test-utils";
import useAssignmentQueueStoreFacade from "./useAssignmentQueueStore.facade";

const mockAssignmentQueueItems = generateRandomQueueItems({
  numItems: 20,
  queueProgressState: "not_started",
});

describe("useAssignmentQueueStore", () => {
  test("Initial values are as expected", () => {
    const { result } = renderHook(() => useAssignmentQueueStoreFacade());
    expect(result.current.currQueueIndex).toEqual(
      result.current.initialState.currQueueIndex
    );
    expect(result.current.sessionInProgress).toEqual(
      result.current.initialState.sessionInProgress
    );
    expect(result.current.sessionType).toEqual(
      result.current.initialState.sessionType
    );
  });

  test("currQueueIndex increments", () => {
    const { result } = renderHook(() => useAssignmentQueueStoreFacade());
    expect(result.current.currQueueIndex).toEqual(0);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(1);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(2);
  });

  test("currQueueIndex resets", () => {
    const { result } = renderHook(() => useAssignmentQueueStoreFacade());
    expect(result.current.currQueueIndex).toEqual(0);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(1);
    act(() => result.current.resetAll());
    expect(result.current.currQueueIndex).toEqual(0);
  });

  test("Submitted states for queue items update", () => {
    const { result } = renderHook(() => useAssignmentQueueStoreFacade());

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
