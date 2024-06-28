import {
  createQueryWrapper,
  renderHook,
  waitFor,
} from "../../testing/test-utils";
import { generateSubjectCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import { mockSubjsOfTypeForLvlResponse } from "../../testing/mocks/api-responses/subject-responses";
import { useRadicalSubjectsForLvl } from "./useRadicalSubjectsForLvl";

test("useRadicalSubjectsForLvl gets successful response", async () => {
  const mockLvl = 1;
  const mockRadicalSubjCollection = generateSubjectCollection(20, "radical");
  mockSubjsOfTypeForLvlResponse(mockRadicalSubjCollection, "radical");
  const { result } = renderHook(() => useRadicalSubjectsForLvl(mockLvl), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
