import {
  renderHook,
  act,
  screen,
  TestRoute,
  createTestRouter,
} from "../testing/test-utils";
import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { Subject } from "../types/Subject";
import ReviewSummary from "./ReviewSummary";

const mockAssignmentQueueItems = generateRandomQueueItems({
  numItems: 10,
  queueProgressState: "completed",
});

test("ReviewSummary renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

test("Reviewed assignments displayed", async () => {
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

  await renderComponent();

  imageQueueItems.forEach(async (altTxt) => {
    expect(
      await screen.findByRole("img", {
        name: `${altTxt} image`,
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
  const reviewSummaryPath = "/reviews/summary";

  const reviewSummaryRoute: TestRoute = {
    component: () => <ReviewSummary />,
    path: reviewSummaryPath,
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
    reviewSummaryRoute,
    ...(withHomeRoute ? [homeRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: reviewSummaryPath,
    });
  });
};
