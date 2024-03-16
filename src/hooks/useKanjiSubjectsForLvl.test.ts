import { createWrapper, renderHook, waitFor } from "../testing/test-utils";
import { generateSubjectCollection } from "../testing/mocks/data-generators/collectionGenerator";
import { mockKanjiSubjsForLvlResponse } from "../testing/mocks/api-responses/subject-responses";
import { useKanjiSubjectsForLvl } from "./useKanjiSubjectsForLvl";

test("useKanjiSubjectsForLvl gets successful response", async () => {
  const mockLvl = 1;
  const mockKanjiSubjCollection = generateSubjectCollection("kanji", 20);
  mockKanjiSubjsForLvlResponse(mockKanjiSubjCollection);
  const { result } = renderHook(() => useKanjiSubjectsForLvl(mockLvl), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
