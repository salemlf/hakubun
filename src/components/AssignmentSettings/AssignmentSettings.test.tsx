import { render } from "../../testing/test-utils";
import AssignmentSettings from ".";
import { AssignmentSettingsProps } from ".";
import { mockAssignmentsAvailForReview } from "../../testing/mocks/data/assignments.mock";

describe("<AssignmentSettings/>", () => {
  it("AssignmentSettings renders", () => {
    test("AssignmentQueueCards renders without crashing", () => {
      const mockSettings: AssignmentSettingsProps = {
        assignmentData: mockAssignmentsAvailForReview,
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
  });
});

const renderComponent = (settingProps: AssignmentSettingsProps) => {
  return render(<AssignmentSettings {...settingProps} />);
};
