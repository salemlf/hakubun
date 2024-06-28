import {
  createQueryWrapper,
  renderHook,
  waitFor,
} from "../../testing/test-utils";
import { generateSubjectCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import { mockSubjsOfTypeForLvlResponse } from "../../testing/mocks/api-responses/subject-responses";
import { useKanjiSubjectsForLvl } from "../subjects/useKanjiSubjectsForLvl";

test("useKanjiSubjectsForLvl gets successful response", async () => {
  const mockLvl = 1;
  const mockKanjiSubjCollection = generateSubjectCollection(20, "kanji");
  mockSubjsOfTypeForLvlResponse(mockKanjiSubjCollection, "kanji");
  const { result } = renderHook(() => useKanjiSubjectsForLvl(mockLvl), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
