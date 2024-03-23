import { HttpResponse, http, passthrough } from "msw";
import { server } from "../server";
import {
  AVAIL_LESSONS,
  AVAIL_REVIEWS,
  assignmentsEndpoint,
} from "../../endpoints";
import { AssignmentCollection } from "../../../types/Collection";

export const mockLessonsAvailableResponse = (
  assignmentCollection: AssignmentCollection
) => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const availLessons = url.searchParams.get(AVAIL_LESSONS);
      if (availLessons) {
        return HttpResponse.json(assignmentCollection);
      }
      return passthrough();
    })
  );
};

export const mockReviewsAvailableResponse = (
  assignmentCollection: AssignmentCollection
) => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const availReviews = url.searchParams.get(AVAIL_REVIEWS);
      if (availReviews) {
        return HttpResponse.json(assignmentCollection);
      }
      return passthrough();
    })
  );
};
