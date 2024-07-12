import { mockReviewsAvailableResponse } from "../../testing/mocks/api-responses/assignment-responses";
import { generateAssignmentCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import {
  createQueryWrapper,
  renderHook,
  waitFor,
} from "../../testing/test-utils";
import { useReviews } from "./useReviews";

test("useReviews gets successful response", async () => {
  const reviewAssignmentCollection = generateAssignmentCollection(25);
  mockReviewsAvailableResponse(reviewAssignmentCollection);

  const { result } = renderHook(() => useReviews(), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
