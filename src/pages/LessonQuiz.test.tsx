import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import {
  act,
  createTestRouter,
  renderHook,
  TestRoute,
  screen,
} from "../testing/test-utils";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import LessonQuiz from "./LessonQuiz";

const mockQueueStore = () => {
  renderHook(() => useQueueStoreFacade());
};

const mockLessonQueueStore = (queueItems: AssignmentQueueItem[]) => {
  const { result: assignmentQueueResult } = renderHook(() =>
    useAssignmentQueueStoreFacade()
  );
  expect(assignmentQueueResult.current.assignmentQueue).toEqual([]);
  act(() =>
    assignmentQueueResult.current.setAssignmentQueueData(queueItems, "lesson")
  );
};
test("LessonQuiz renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

describe("End quiz dialog", () => {
  // TODO: doesn't work, fix
  test("Displays dialog on home button click", async () => {
    mockQueueStore();
    const randomQueueItems = generateRandomQueueItems({
      numItems: 10,
      areLessons: true,
      queueProgressState: "not_started",
    });
    mockLessonQueueStore(randomQueueItems);

    const { user } = await renderComponent(true);

    await user.click(
      await screen.findByRole("button", {
        name: /home page/i,
      })
    );

    const dialog = await screen.findByRole("alertdialog", {
      name: /end lesson quiz\?/i,
    });

    expect(dialog).toBeInTheDocument();

    // screen.debug();
  });
});

const renderComponent = async (withHomeRoute: boolean = false) => {
  const lessonQuizPath = "/lessons/quiz";
  const lessonQuizRoute: TestRoute = {
    component: () => <LessonQuiz />,
    path: lessonQuizPath,
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
    lessonQuizRoute,
    ...(withHomeRoute ? [homeRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: lessonQuizPath,
    });
  });
};
