import { act, createTestRouter, TestRoute } from "../testing/test-utils";
import { ReviewSettings } from "./ReviewSettings";

test("ReviewSettings renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = async () => {
  const reviewSettingsPath = "/reviews/settings";
  const routesToRender: TestRoute[] = [
    {
      component: () => <ReviewSettings />,
      path: reviewSettingsPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: reviewSettingsPath,
    });
  });
};
