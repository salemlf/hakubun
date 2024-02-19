import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import {
  renderHook,
  act,
  renderWithRouter,
  screen,
} from "../testing/test-utils";
import LessonSummary from "./LessonSummary";

const mockAssignmentQueueItems = generateRandomQueueItems({
  numItems: 10,
  areLessons: true,
  queueProgressState: "not_started",
});

test("LessonSummary renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("Learned lessons displayed", async () => {
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
      await screen.findByRole("img", {
        name: `${altTxt}`,
      })
    ).toBeDefined();
  });
  txtQueueItems.forEach(async (char) => {
    expect(await screen.findByText(`${char}`)).toBeDefined();
  });
});

const renderComponent = () => {
  const lessonSummaryPath = "/lessons/summary";

  return renderWithRouter({
    routeObj: {
      path: lessonSummaryPath,
      element: <LessonSummary />,
    },
    defaultPath: lessonSummaryPath,
  });
};
