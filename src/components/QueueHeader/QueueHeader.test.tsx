import QueueHeader from ".";
import { renderWithRouter } from "../../testing/test-utils";

test("QueueHeader renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

// TODO: change to use mock home page
const renderComponent = () => {
  const queueHeaderPath = "/reviews/summary";
  return renderWithRouter({
    routeObj: {
      path: queueHeaderPath,
      element: <QueueHeader />,
    },
    defaultPath: queueHeaderPath,
    mockHome: true,
  });
};
