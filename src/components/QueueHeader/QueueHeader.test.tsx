import QueueHeader from ".";
import { act, createTestRouter, TestRoute } from "../../testing/test-utils";

test("QueueHeader renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = async () => {
  const queueHeaderPath = "/reviews/summary";
  const routesToRender: TestRoute[] = [
    {
      component: () => <QueueHeader />,
      path: queueHeaderPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: queueHeaderPath,
    });
  });
};
