import AssignmentQueueCards from ".";
import { render } from "../../testing/test-utils";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";

describe("<AssighmentQueueCards/>", () => {
  const submitItems = (reviewData: AssignmentQueueItem[]) => {
    console.log("submitItems noop called");
  };
  test("AssighmentQueueCards renders without crashing", () => {
    const { baseElement } = renderComponent(submitItems);
    expect(baseElement).toBeDefined();
  });

  // test("App name is rendered to screen", async () => {
  //   renderComponent();

  //   expect(await screen.findByText(/^Hakubun$/)).toBeInTheDocument();
  // });

  // test("Level is rendered to screen", async () => {
  //   renderComponent();

  //   let levelTxt = await waitFor(() => screen.getByTestId("level-num"));
  //   expect(levelTxt).toHaveTextContent(/^Level$/);
  // });
});

const renderComponent = (
  submitItems: (reviewData: AssignmentQueueItem[]) => void
) => {
  return render(<AssignmentQueueCards submitItems={submitItems} />);
};
