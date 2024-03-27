import { HttpResponse, http, passthrough } from "msw";
import { server } from "../server";
import { subjectsEndpoint } from "../../endpoints";
import { SubjectCollection } from "../../../types/Collection";
import { SubjectType } from "../../../types/Subject";

export const mockSubjsOfTypeForLvlResponse = (
  subjCollection: SubjectCollection,
  subjType: SubjectType
) => {
  server.use(
    http.get(subjectsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const levels = url.searchParams.get("levels");
      const subjTypes = url.searchParams.get("types");
      if (levels && subjTypes === subjType) {
        return HttpResponse.json(subjCollection);
      }
      return passthrough();
    })
  );
};
