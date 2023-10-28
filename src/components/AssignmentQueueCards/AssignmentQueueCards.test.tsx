import AssignmentQueueCards, { CardProps } from ".";
import { render } from "../../testing/test-utils";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../../types/AssignmentQueueTypes";

describe("<AssighmentQueueCards/>", () => {
  const submitItems = (reviewData: AssignmentQueueItem[]) => {
    console.log("submitItems noop called");
  };

  it("AssignmentQueueCards renders", () => {
    test("AssignmentQueueCards renders without crashing", () => {
      const emptySubmitInfo: AssignmentSubmitInfo = {
        assignmentData: [],
        submitResponses: [],
        errors: [],
      };
      const submitBatchMock = vi.fn().mockResolvedValue(emptySubmitInfo);
      const { baseElement } = renderComponent({
        submitItems: submitItems,
        submitBatch: submitBatchMock,
      });
      expect(baseElement).toBeDefined();
    });
  });
});

const renderComponent = ({ submitItems, submitBatch }: CardProps) => {
  return render(
    <AssignmentQueueCards submitItems={submitItems} submitBatch={submitBatch} />
  );
};
