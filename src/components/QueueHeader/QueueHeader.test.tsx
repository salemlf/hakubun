import QueueHeader from ".";
import { renderWithRouter } from "../../testing/test-utils";

test("QueueHeader renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  return renderWithRouter({ component: <QueueHeader /> });
};
