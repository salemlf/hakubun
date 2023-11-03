import {
  renderHook,
  act,
  renderWithRouter,
  screen,
} from "../testing/test-utils";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { mockAssignmentQueueItems } from "../testing/mocks/data/assignmentQueueItems.mock";
import ReviewSummary from "./ReviewSummary";
import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";
import { Subject } from "../types/Subject";

test("ReviewSummary renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("Reviewed assignments displayed", () => {
  const { result } = renderHook(() => useAssignmentSubmitStoreFacade());
  expect(result.current.submittedAssignmentQueueItems).toEqual([]);
  act(() => result.current.updateSubmittedQueueItems(mockAssignmentQueueItems));
  expect(result.current.submittedAssignmentQueueItems).toEqual(
    mockAssignmentQueueItems
  );

  const txtQueueItems: string[] = [];
  const imageQueueItems: string[] = [];
  result.current.submittedAssignmentQueueItems.forEach((queueItem) => {
    if (!queueItem.useImage) {
      queueItem.characters !== null && txtQueueItems.push(queueItem.characters);
    } else {
      imageQueueItems.push(getSubjectDisplayName(queueItem as Subject));
    }
  });

  renderComponent();

  imageQueueItems.forEach(async (altTxt) => {
    expect(
      screen.getByRole("img", {
        name: `${altTxt} image`,
      })
    ).toBeDefined();
  });
  txtQueueItems.forEach((char) => {
    expect(screen.getByText(`${char}`)).toBeDefined();
  });
});

const renderComponent = () => {
  return renderWithRouter({
    routeObj: {
      element: <ReviewSummary />,
      path: "/reviews/summary",
    },
  });
};
