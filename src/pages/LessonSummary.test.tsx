import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import {
  renderHook,
  act,
  screen,
  TestRoute,
  createTestRouter,
} from "../testing/test-utils";
import LessonSummary from "./LessonSummary";

const mockAssignmentQueueItems = generateRandomQueueItems({
  numItems: 10,
  areLessons: true,
  queueProgressState: "not_started",
});

test("LessonSummary renders", async () => {
  const { baseElement } = await renderComponent();
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

  await renderComponent();

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

test("Can navigate to home page without being blocked", async () => {
  const { result } = renderHook(() => useAssignmentSubmitStoreFacade());
  expect(result.current.submittedAssignmentQueueItems).toEqual([]);
  act(() => result.current.updateSubmittedQueueItems(mockAssignmentQueueItems));

  const { user } = await renderComponent(true);

  await user.click(
    await screen.findByRole("button", {
      name: /home/i,
    })
  );

  expect(
    await screen.findByRole("heading", {
      name: /mock home/i,
    })
  ).toBeVisible();
});

const renderComponent = async (withHomeRoute: boolean = false) => {
  const lessonSummaryPath = "/lessons/summary";

  const lessonSummaryRoute: TestRoute = {
    component: () => <LessonSummary />,
    path: lessonSummaryPath,
  };

  const homeRoute: TestRoute = {
    path: "/",
    component: () => (
      <div>
        <h1>Mock Home</h1>
      </div>
    ),
  };

  const routesToRender: TestRoute[] = [
    lessonSummaryRoute,
    ...(withHomeRoute ? [homeRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: lessonSummaryPath,
    });
  });
};
