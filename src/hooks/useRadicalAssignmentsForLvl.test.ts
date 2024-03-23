import { mockAssignmentsOfSubjTypeResponse } from "../testing/mocks/api-responses/assignment-responses";
import { generateAssignmentCollection } from "../testing/mocks/data-generators/collectionGenerator";
import { createWrapper, renderHook, waitFor } from "../testing/test-utils";
import { useRadicalAssignmentsForLvl } from "./useRadicalAssignmentsForLvl";

test("useRadicalAssignmentsForLvl gets successful response", async () => {
  const radicalAssignmentCollection = generateAssignmentCollection(
    25,
    false,
    "radical"
  );
  mockAssignmentsOfSubjTypeResponse(radicalAssignmentCollection, "radical");
  const mockLevel = 1;
  const { result } = renderHook(() => useRadicalAssignmentsForLvl(mockLevel), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
