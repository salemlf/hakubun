import { renderWithRouter } from "../testing/test-utils";
import LessonSettings from "./LessonSettings";

test("LesssonSettings renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  return renderWithRouter({
    routeObj: {
      element: <LessonSettings />,
      path: "/lessons/settings",
    },
    routes: [],
  });
};
