import { act, renderHook } from "../testing/test-utils";
import { useAssignmentSubmitStore } from "./useAssignmentSubmitStore";

describe("useAssignmentSubmitStore", () => {
  it("Initial store values", () => {
    test("Initial values are as expected", () => {
      const { result } = renderHook(() => useAssignmentSubmitStore());
      expect(result.current.submittedAssignmentIDs).toEqual([]);
      expect(result.current.submittedAssignmentResponses).toEqual([]);
      expect(result.current.submittedAssignmentsWithErrs).toEqual([]);
      expect(result.current.shouldBatchSubmit).toEqual(false);
    });
  });

  //   it("shouldBatchSubmit", () => {
  //     test("shouldBatchSubmit is set correctly based on number of assignments ", () => {
  //       const { result } = renderHook(() => useAssignmentSubmitStore());
  //     });
  //   });
});
