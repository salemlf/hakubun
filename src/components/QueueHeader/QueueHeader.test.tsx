import QueueHeader from ".";
import Home from "../../pages/Home";
import { renderWithRouter } from "../../testing/test-utils";

test("QueueHeader renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  const routes = [{ element: <Home />, path: "/" }];
  return renderWithRouter({
    component: <QueueHeader />,
    defaultPath: "/reviews/summary",
    routes,
  });
};
