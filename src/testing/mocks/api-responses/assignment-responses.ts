import { HttpResponse, http, passthrough } from "msw";
import { server } from "../server";
import { AVAIL_LESSONS, assignmentsEndpoint } from "../../endpoints";
import { AssignmentCollection } from "../../../types/Collection";

export const mockLessonsAvailableResponse = (
  assignmentCollection: AssignmentCollection
) => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const avail_lessons = url.searchParams.get(AVAIL_LESSONS);
      if (avail_lessons) {
        return HttpResponse.json(assignmentCollection);
      }
      return passthrough();
    })
  );
};
