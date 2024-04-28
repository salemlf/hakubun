import { renderWithRouter } from "../testing/test-utils";
import { ReviewSettings } from "./ReviewSettings";

test("ReviewSettings renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  return renderWithRouter({
    routeObj: {
      element: <ReviewSettings />,
      path: "/reviews/settings",
    },
    routes: [],
  });
};
