import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { mockAssignmentQueueItems } from "../testing/mocks/data/assignmentQueueItems.mock";
import {
  renderHook,
  act,
  renderWithRouter,
  screen,
} from "../testing/test-utils";
import LessonSummary from "./LessonSummary";

test("LessonSummary renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("Learned lessons displayed", () => {
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
      imageQueueItems.push(queueItem.meaning_mnemonic);
    }
  });

  renderComponent();

  imageQueueItems.forEach(async (altTxt) => {
    expect(
      screen.getByRole("img", {
        name: `${altTxt}`,
      })
    ).toBeDefined();
  });
  txtQueueItems.forEach((char) => {
    expect(screen.getByText(`${char}`)).toBeDefined();
  });
});

const renderComponent = () => {
  return renderWithRouter(<LessonSummary />);
};
