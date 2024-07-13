import {
  act,
  createTestRouter,
  renderHook,
  screen,
  TestRoute,
} from "../testing/test-utils";
import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import ReviewSession from "./ReviewSession";

const mockQueueStore = () => {
  renderHook(() => useQueueStoreFacade());
};

const mockReviewQueueStore = (queueItems: AssignmentQueueItem[]) => {
  const { result: assignmentQueueResult } = renderHook(() =>
    useAssignmentQueueStoreFacade()
  );
  expect(assignmentQueueResult.current.assignmentQueue).toEqual([]);
  act(() =>
    assignmentQueueResult.current.setAssignmentQueueData(queueItems, "review")
  );
};

test("ReviewSession renders", async () => {
  const { baseElement } = await renderComponent(false);
  expect(baseElement).toBeDefined();
});

describe("End session dialog", () => {
  test("Displays dialog on home button click", async () => {
    mockQueueStore();
    const randomQueueItems = generateRandomQueueItems({
      numItems: 10,
      areLessons: false,
      queueProgressState: "not_started",
    });
    mockReviewQueueStore(randomQueueItems);
    const { user } = await renderComponent(true);

    await user.click(
      await screen.findByRole("button", {
        name: /home page/i,
      })
    );

    const dialog = await screen.findByRole("alertdialog", {
      name: /end review session\?/i,
    });

    expect(dialog).toBeInTheDocument();
  });

  test("Navigates to Home when end session is clicked", async () => {
    mockQueueStore();
    const randomQueueItems = generateRandomQueueItems({
      numItems: 10,
      areLessons: false,
      queueProgressState: "not_started",
    });
    mockReviewQueueStore(randomQueueItems);
    const { user } = await renderComponent(true);

    await user.click(
      await screen.findByRole("button", {
        name: /home page/i,
      })
    );

    await screen.findByRole("alertdialog", {
      name: /end review session\?/i,
    });

    await user.click(
      screen.getByRole("button", {
        name: /end session/i,
      })
    );

    expect(
      await screen.findByRole("heading", {
        name: /mock home/i,
      })
    ).toBeVisible();
  });

  test("Stays in review session when cancel is clicked", async () => {
    mockQueueStore();
    const randomQueueItems = generateRandomQueueItems({
      numItems: 10,
      areLessons: false,
      queueProgressState: "not_started",
    });
    mockReviewQueueStore(randomQueueItems);
    const { user } = await renderComponent(true);

    // check that we're in the review session
    expect(
      await screen.findByTestId("review-session-content")
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /home page/i,
      })
    );

    await screen.findByRole("alertdialog", {
      name: /end review session\?/i,
    });

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    );

    // check that we're still in the review session
    expect(
      await screen.findByTestId("review-session-content")
    ).toBeInTheDocument();
  });
});

// TODO: fix, check lesson session testing for reference since that one works
const renderComponent = async (
  withHomeRoute: boolean,
  withSubjDetails: boolean = false
) => {
  const reviewSessionPath = "/reviews/session";
  const reviewSessionRoute: TestRoute = {
    component: () => <ReviewSession />,
    path: reviewSessionPath,
  };

  const homeRoute: TestRoute = {
    path: "/",
    component: () => (
      <div>
        <h1>Mock Home</h1>
      </div>
    ),
  };

  const subjDetailsRoute: TestRoute = {
    path: "/subjects/$subjId",
    component: (subjID: number) => (
      <div>
        <h1>Fake Subject Details</h1>
      </div>
    ),
  };

  const routesToRender: TestRoute[] = [
    reviewSessionRoute,
    ...(withHomeRoute ? [homeRoute] : []),
    ...(withSubjDetails ? [subjDetailsRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: reviewSessionPath,
    });
  });
};
