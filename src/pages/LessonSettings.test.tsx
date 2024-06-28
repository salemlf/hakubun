import { act, createTestRouter, TestRoute } from "../testing/test-utils";
import LessonSettings from "./LessonSettings";

test("LesssonSettings renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = async () => {
  const lessonSettingsPath = "/lessons/settings";
  const routesToRender: TestRoute[] = [
    {
      component: () => <LessonSettings />,
      path: lessonSettingsPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: lessonSettingsPath,
    });
  });
};
