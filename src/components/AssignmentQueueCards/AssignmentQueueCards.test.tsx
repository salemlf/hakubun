import AssignmentQueueCards, { CardProps } from ".";
import { render } from "../../testing/test-utils";
import { AssignmentSubmitInfo } from "../../types/AssignmentQueueTypes";

describe("<AssignmentQueueCards/>", () => {
  test("AssignmentQueueCards renders", () => {
    const emptySubmitInfo: AssignmentSubmitInfo = {
      assignmentData: [],
      submitResponses: [],
      errors: [],
    };

    const submitItemsMock = vi.fn();
    const submitBatchMock = vi.fn().mockResolvedValue(emptySubmitInfo);
    const updateSubmittedMock = vi.fn();

    const { baseElement } = renderComponent({
      submitItems: submitItemsMock,
      submitBatch: submitBatchMock,
      updateSubmitted: updateSubmittedMock,
    });
    expect(baseElement).toBeDefined();
  });
});

const renderComponent = (props: CardProps) => {
  return render(<AssignmentQueueCards {...props} />);
};
