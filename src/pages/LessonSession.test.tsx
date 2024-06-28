import {
  screen,
  renderHook,
  act,
  TestRoute,
  createTestRouter,
} from "../testing/test-utils";
import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import useLessonPaginatorStoreFacade from "../stores/useLessonPaginatorStore/useLessonPaginatorStore.facade";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import LessonSession from "./LessonSession";

const mockAssignmentQueueLessons = generateRandomQueueItems({
  numItems: 10,
  areLessons: true,
  queueProgressState: "not_started",
});

test("LessonSession renders", async () => {
  const { baseElement } = await renderComponent(false);
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
    const { user } = await renderComponent(true);

    await user.click(
      await screen.findByRole("button", {
        name: /home page/i,
      })
    );

    const dialog = await screen.findByRole("alertdialog", {
      name: /end lesson session\?/i,
    });
    expect(dialog).toBeInTheDocument();
  });

  test("Navigates to Home when end session is clicked", async () => {
    mockQueueStore();
    mockAssignmentQueueStore();
    mockPaginatorStore();

    const { user } = await renderComponent(true);

    await user.click(
      await screen.findByRole("button", {
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
        name: /mock home/i,
      })
    ).toBeVisible();
  });

  test("Stays in lesson session when cancel is clicked", async () => {
    mockQueueStore();
    mockAssignmentQueueStore();
    mockPaginatorStore();

    const { user } = await renderComponent(true);

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

const renderComponent = async (withHomeRoute: boolean) => {
  const lessonSessionPath = "/lessons/session";
  const lessonSessionRoute: TestRoute = {
    component: () => <LessonSession />,
    path: lessonSessionPath,
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
    lessonSessionRoute,
    ...(withHomeRoute ? [homeRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: lessonSessionPath,
    });
  });
};
