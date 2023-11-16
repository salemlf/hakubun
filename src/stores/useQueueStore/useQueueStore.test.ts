import { act, renderHook } from "../../testing/test-utils";
import useQueueStoreFacade from "./useQueueStore.facade";

describe("useQueueStore", () => {
  test("Initial values are as expected", async () => {
    const { result } = renderHook(() => useQueueStoreFacade());
    expect(result.current.isSubmittingAnswer).toEqual(false);
    expect(result.current.isBottomSheetVisible).toEqual(false);
    expect(result.current.popoverInfo).toEqual({
      message: "",
      messageType: "invalid",
    });
    expect(result.current.displayPopoverMsg).toEqual(false);
    expect(result.current.savedUserAnswer).toEqual(null);
  });

  test("isSubmittingAnswer updates", () => {
    const { result } = renderHook(() => useQueueStoreFacade());
    expect(result.current.isSubmittingAnswer).toEqual(false);
    act(() => result.current.setIsSubmittingAnswer(true));
    expect(result.current.isSubmittingAnswer).toEqual(true);
    act(() => result.current.setIsSubmittingAnswer(false));
    expect(result.current.isSubmittingAnswer).toEqual(false);
  });

  test("isSubmittingAnswer resets", () => {
    const { result } = renderHook(() => useQueueStoreFacade());
    expect(result.current.isSubmittingAnswer).toEqual(false);
    act(() => result.current.setIsSubmittingAnswer(true));
    expect(result.current.isSubmittingAnswer).toEqual(true);
    act(() => result.current.resetAll());
    expect(result.current.isSubmittingAnswer).toEqual(false);
  });
});
