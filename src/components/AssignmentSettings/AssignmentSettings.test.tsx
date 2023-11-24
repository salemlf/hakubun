import { HttpResponse, http, passthrough } from "msw";
import { renderWithRouter } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import AssignmentSettings from ".";
import { AssignmentSettingsProps } from ".";
import {
  generateSubjectCollection,
  getIDsFromSubjOrAssignmentCollection,
} from "../../testing/mocks/data-generators/collectionGenerator";
import {
  CorrespondingSubject,
  createCorrespondingSubject,
  generateAssignmentArrayFromSubjs,
} from "../../testing/mocks/data-generators/assignmentGenerator";
import { subjectsEndpoint } from "../../testing/endpoints";
import { SubjectCollection } from "../../types/Collection";

// TODO: change so creates a variety of subjects, not just one type
const subjType = "vocabulary";
const mockSubjCollection = generateSubjectCollection(subjType, 18);
const subjIDs = getIDsFromSubjOrAssignmentCollection(mockSubjCollection);
const correspondingSubjInfo: CorrespondingSubject[] = subjIDs.map((id) =>
  createCorrespondingSubject(id, subjType)
);

const assignmentsFromSubjCollection = generateAssignmentArrayFromSubjs({
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

test("AssignmentSettings renders", () => {
  mockSubjectsByIDsResponse(mockSubjCollection);
  const mockSettings: AssignmentSettingsProps = {
    assignmentData: assignmentsFromSubjCollection,
    settingsType: "review",
    defaultBatchSize: "10",
    defaultSortOrder: {
      id: "shuffled",
      option: "shuffled",
      order: "neither",
    },
  };
  const { baseElement } = renderComponent(mockSettings);
  expect(baseElement).toBeDefined();
});

const renderComponent = (settingProps: AssignmentSettingsProps) => {
  return renderWithRouter({
    component: <AssignmentSettings {...settingProps} />,
  });
};
