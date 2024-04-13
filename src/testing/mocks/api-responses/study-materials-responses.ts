import { HttpResponse, http, passthrough } from "msw";
import { server } from "../server";
import { studyMaterialsEndpoint, SUBJECT_IDS } from "../../endpoints";
import { StudyMaterialCollection } from "../../../types/Collection";

export const mockStudyMaterialsBySubjIDsResponse = (
  subjIDs: number[],
  studyMaterialCollection: StudyMaterialCollection
) => {
  const subjIDsString = subjIDs.join(",");

  server.use(
    http.get(studyMaterialsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const subjIDsParam = url.searchParams.get(SUBJECT_IDS);

      if (subjIDsParam === subjIDsString) {
        return HttpResponse.json(studyMaterialCollection);
      }
      return passthrough();
    })
  );
};
