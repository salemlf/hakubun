import { renderWithRouter } from "../testing/test-utils";
import LessonSummary from "./LessonSummary";

describe("<LessonSummary/>", () => {
  test("LessonSummary renders", () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeDefined();
  });
  //   });

  // TODO: add items to submittedAssignmentQueueItems with useAssignmentSubmitStore, check that those items...
  // TODO: ...are rendered in LessonSummary
  //   it("Learned lessons displayed", () => {
  //     test("LessonSummary renders without crashing", () => {
  //       const { baseElement } = renderComponent();

  //       //   let userLvl = mockUserLvl5.data.level;
  //       //   let levelTxt = await waitFor(() => screen.getByTestId("level-num"));
  //       //   expect(levelTxt).toHaveTextContent(`Level ${userLvl}`);
  //     });
});

const renderComponent = () => {
  return renderWithRouter(<LessonSummary />);
};
