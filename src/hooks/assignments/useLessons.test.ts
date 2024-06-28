import { mockLessonsAvailableResponse } from "../../testing/mocks/api-responses/assignment-responses";
import { generateAssignmentCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import {
  createQueryWrapper,
  renderHook,
  waitFor,
} from "../../testing/test-utils";
import { useLessons } from "./useLessons";

test("useLessons gets successful response", async () => {
  const lessonAssignmentCollection = generateAssignmentCollection(25, true);
  mockLessonsAvailableResponse(lessonAssignmentCollection);

  const { result } = renderHook(() => useLessons(), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
