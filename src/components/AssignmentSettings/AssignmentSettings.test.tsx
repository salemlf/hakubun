import { HttpResponse, http, passthrough } from "msw";
import { act, TestRoute, createTestRouter } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import AssignmentSettings from ".";
import { AssignmentSettingsProps } from ".";
import {
  generateStudyMaterialCollectionFromSubjs,
  generateSubjectCollection,
  getIDsFromSubjOrAssignmentCollection,
} from "../../testing/mocks/data-generators/collectionGenerator";
import {
  CorrespondingSubject,
  createCorrespondingSubject,
  generateAssignmentArrayFromSubjs,
} from "../../testing/mocks/data-generators/assignmentGenerator";
import {
  studyMaterialsEndpoint,
  subjectsEndpoint,
} from "../../testing/endpoints";
import {
  StudyMaterialCollection,
  SubjectCollection,
} from "../../types/Collection";

// TODO: change so creates a variety of subjects, not just one type
const subjType = "vocabulary";
const mockSubjCollection = generateSubjectCollection(18, subjType);
const subjIDs = getIDsFromSubjOrAssignmentCollection(mockSubjCollection);
const correspondingSubjInfo: CorrespondingSubject[] = subjIDs.map((id) =>
  createCorrespondingSubject(id, subjType)
);

const assignmentsFromSubjCollection = generateAssignmentArrayFromSubjs({
  correspondingSubjects: correspondingSubjInfo,
});
const studyMaterialCollectionForSubjs =
  generateStudyMaterialCollectionFromSubjs({
    correspondingSubjects: correspondingSubjInfo,
  });

// TODO: also mock study materials response
const mockSubjectsByIDsResponse = (subjCollection: SubjectCollection) => {
  server.use(
    http.get(subjectsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const subjIDs = url.searchParams.get("ids");
      if (subjIDs) {
        return HttpResponse.json(subjCollection);
      }
      return passthrough();
    })
  );
};

const mockStudyMaterialsResponse = (
  studyMaterialCollection: StudyMaterialCollection
) => {
  server.use(
    http.get(studyMaterialsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const subjIDs = url.searchParams.get("subject_ids");
      if (subjIDs) {
        return HttpResponse.json(studyMaterialCollection);
      }
      return passthrough();
    })
  );
};

test("AssignmentSettings renders", async () => {
  mockSubjectsByIDsResponse(mockSubjCollection);
  mockStudyMaterialsResponse(studyMaterialCollectionForSubjs);
  const mockSettings: AssignmentSettingsProps = {
    assignmentData: assignmentsFromSubjCollection,
  };
  const { baseElement } = await renderComponent(mockSettings);
  expect(baseElement).toBeDefined();
});

const renderComponent = async (settingProps: AssignmentSettingsProps) => {
  const assignmentSettingsPath = "/lessons/settings";
  const routesToRender: TestRoute[] = [
    {
      component: () => <AssignmentSettings {...settingProps} />,
      path: assignmentSettingsPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: assignmentSettingsPath,
    });
  });
};
