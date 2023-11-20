import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import useLessonPaginatorStoreFacade from "../stores/useLessonPaginatorStore/useLessonPaginatorStore.facade";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import { mockAssignmentQueueLessons } from "../testing/mocks/data/assignmentQueueItems.mock";
import {
  renderWithRouter,
  screen,
  renderHook,
  act,
} from "../testing/test-utils";
import Home from "./Home";
import LessonSession from "./LessonSession";

test("LessonSession renders", () => {
  const { baseElement } = renderComponent(false);
  expect(baseElement).toBeDefined();
});

const mockAssignmentQueueStore = () => {
  const { result: assignmentQueueResult } = renderHook(() =>
    useAssignmentQueueStoreFacade()
  );
  expect(assignmentQueueResult.current.assignmentQueue).toEqual([]);
  act(() =>
    assignmentQueueResult.current.setAssignmentQueueData(
      mockAssignmentQueueLessons,
      "lesson"
    )
  );
};

const mockPaginatorStore = () => {
  const { result: lessonPaginatorResult } = renderHook(() =>
    useLessonPaginatorStoreFacade()
  );
  expect(lessonPaginatorResult.current.currentLessonPage).toEqual(0);
  expect(lessonPaginatorResult.current.currentLessonDir).toEqual(0);
};

const mockQueueStore = () => {
  renderHook(() => useQueueStoreFacade());
};

describe("End session dialog", () => {
  test("Displays dialog on home button click", async () => {
    mockQueueStore();
    mockAssignmentQueueStore();
    mockPaginatorStore();
    const { user } = renderComponent(true);

    await user.click(
      screen.getByRole("button", {
        name: /home page/i,
      })
    );

    let dialog = await screen.findByRole("alertdialog", {
      name: /end lesson session\?/i,
    });
    expect(dialog).toBeInTheDocument();
  });

  test("Navigates to Home when end session is clicked", async () => {
    mockQueueStore();
    mockAssignmentQueueStore();
    mockPaginatorStore();

    const { user } = renderComponent(true);

    await user.click(
      screen.getByRole("button", {
        name: /home page/i,
      })
    );

    await screen.findByRole("alertdialog", {
      name: /end lesson session\?/i,
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

  test("Stays in lesson session when cancel is clicked", async () => {
    mockQueueStore();
    mockAssignmentQueueStore();
    mockPaginatorStore();

    const { user } = renderComponent(true);

    // check that we're in the lesson session
    expect(
      await screen.findByTestId("lesson-session-content")
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /home page/i,
      })
    );

    await screen.findByRole("alertdialog", {
      name: /end lesson session\?/i,
    });

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    );

    // check that we're still in the lesson session
    expect(
      await screen.findByTestId("lesson-session-content")
    ).toBeInTheDocument();
  });
});

const renderComponent = (withHomeRoute: boolean) => {
  return renderWithRouter({
    routeObj: {
      path: "/lessons/session",
      element: <LessonSession />,
    },
    routes: withHomeRoute
      ? [
          {
            path: "/",
            element: <Home />,
          },
        ]
      : [],
  });
};
