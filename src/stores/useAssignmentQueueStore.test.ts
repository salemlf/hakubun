import { act, renderHook } from "../testing/test-utils";
import { useAssignmentQueueStore } from "./useAssignmentQueueStore";

describe("useAssignmentQueueStore", () => {
  it("Initial store values", () => {
    test("Initial value are as expected", () => {
      const { result } = renderHook(() => useAssignmentQueueStore());
      expect(result.current.currQueueIndex).toEqual(0);
      expect(result.current.sessionInProgress).toEqual(false);
      expect(result.current.sessionType).toEqual("review");
      expect(result.current.submittedAssignmentIDs).toEqual([]);
    });
  });

  it("currQueueIndex", () => {
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
  });
});
