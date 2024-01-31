import { renderWithRouter } from "../../testing/test-utils";
import FloatingTabBar from ".";

test("FloatingTabBar renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  return renderWithRouter({
    routeObj: {
      element: <FloatingTabBar />,
      path: "/",
    },
  });
};
