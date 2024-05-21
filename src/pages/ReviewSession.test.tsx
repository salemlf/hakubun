import {
  act,
  renderHook,
  renderWithRouter,
  screen,
} from "../testing/test-utils";
import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import ReviewSession from "./ReviewSession";
import Home from "./Home";
import { SubjectDetails } from "./SubjectDetails";

const mockReviewQueueStore = (queueItems: AssignmentQueueItem[]) => {
  const { result: assignmentQueueResult } = renderHook(() =>
    useAssignmentQueueStoreFacade()
  );
  expect(assignmentQueueResult.current.assignmentQueue).toEqual([]);
  act(() =>
    assignmentQueueResult.current.setAssignmentQueueData(queueItems, "review")
  );
};

test("ReviewSession renders", () => {
  const { baseElement } = renderComponent(false);
  expect(baseElement).toBeDefined();
});

describe("End session dialog", () => {
  test("Displays dialog on home button click", async () => {
    const { user } = renderComponent(true);

    await user.click(
      screen.getByRole("button", {
        name: /home page/i,
      })
    );

    const dialog = await screen.findByRole("alertdialog", {
      name: /end review session\?/i,
    });
    expect(dialog).toBeInTheDocument();
  });

  test("Navigates to Home when end session is clicked", async () => {
    const { user } = renderComponent(true);

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
        name: /end session/i,
      })
    );

    expect(
      await screen.findByRole("heading", {
        name: /hakubun/i,
      })
    ).toBeVisible();
  });

  test("Stays in review session when cancel is clicked", async () => {
    const { user } = renderComponent(true);

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

test("Navigate to Subject Details page without being navigation blocked", async () => {
  const kanjiReviewItems = generateRandomQueueItems({
    subjectType: "kanji",
    numItems: 1,
    queueProgressState: "not_started",
  });

  mockReviewQueueStore(kanjiReviewItems);
  const { router } = renderComponent(true, true);
  await act(() => router.navigate("/subjects/10"));
  expect(await screen.findByTestId("subject-details-page")).toBeInTheDocument();
});

// TODO: add another test that checks user can go to review summary w/o page being blocked

const renderComponent = (
  withHomeRoute: boolean,
  withSubjDetails: boolean = false
) => {
  const routes = [
    ...(withHomeRoute
      ? [
          {
            path: "/",
            element: <Home />,
          },
        ]
      : []),
    ...(withSubjDetails
      ? [
          {
            path: "/subjects/:id",
            element: <SubjectDetails />,
          },
        ]
      : []),
  ];

  const reviewSessionPath = "/reviews/session";
  return renderWithRouter({
    routeObj: {
      path: reviewSessionPath,
      element: <ReviewSession />,
    },
    defaultPath: reviewSessionPath,
    routes,
  });
};
