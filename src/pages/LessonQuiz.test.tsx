import { act, createTestRouter, TestRoute } from "../testing/test-utils";
import LessonQuiz from "./LessonQuiz";

test("LessonQuiz renders", async () => {
  const { baseElement } = await renderComponent(false);
  expect(baseElement).toBeDefined();
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
