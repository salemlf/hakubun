import { createWrapper, renderHook, waitFor } from "../../testing/test-utils";
import { generateSubjectCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import { mockRadicalSubjsForLvlResponse } from "../../testing/mocks/api-responses/subject-responses";
import { useRadicalSubjectsForLvl } from "./useRadicalSubjectsForLvl";

test("useRadicalSubjectsForLvl gets successful response", async () => {
  const mockLvl = 1;
  const mockRadicalSubjCollection = generateSubjectCollection("radical", 20);
  mockRadicalSubjsForLvlResponse(mockRadicalSubjCollection);
  const { result } = renderHook(() => useRadicalSubjectsForLvl(mockLvl), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
