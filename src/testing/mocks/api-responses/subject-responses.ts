import { HttpResponse, http, passthrough } from "msw";
import { server } from "../server";
import { subjectsEndpoint } from "../../endpoints";
import { SubjectCollection } from "../../../types/Collection";

export const mockKanjiSubjsForLvlResponse = (
  subjCollection: SubjectCollection
) => {
  server.use(
    http.get(subjectsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const levels = url.searchParams.get("levels");
      const subjTypes = url.searchParams.get("types");
      if (levels && subjTypes === "kanji") {
        return HttpResponse.json(subjCollection);
      }
      return passthrough();
    })
  );
};

export const mockRadicalSubjsForLvlResponse = (
  subjCollection: SubjectCollection
) => {
  server.use(
    http.get(subjectsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const levels = url.searchParams.get("levels");
      const subjTypes = url.searchParams.get("types");
      if (levels && subjTypes === "radical") {
        return HttpResponse.json(subjCollection);
      }
      return passthrough();
    })
  );
};
