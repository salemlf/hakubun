import { http, HttpResponse } from "msw";
import { server } from "../server";
import { reviewsEndpoint } from "../../endpoints";
import { fakeReviewUpdatedResponse } from "../data-generators/reviewGenerator";
import { AssignmentQueueItem } from "../../../types/AssignmentQueueTypes";

export const mockReviewUpdateResponse = (
  assignmentUpdated: AssignmentQueueItem
) => {
  const reviewUpdateResponse = fakeReviewUpdatedResponse(
    assignmentUpdated.subject_id,
    assignmentUpdated.object,
    assignmentUpdated.assignment_id
  );
  server.use(
    http.post(reviewsEndpoint, () => {
      return HttpResponse.json(reviewUpdateResponse);
    })
  );
};
