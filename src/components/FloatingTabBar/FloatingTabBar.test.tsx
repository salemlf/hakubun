import { act, createTestRouter, TestRoute } from "../../testing/test-utils";
import FloatingTabBar from ".";

test("FloatingTabBar renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = async () => {
  const floatingTabBarPath = "/";
  const routesToRender: TestRoute[] = [
    {
      component: () => <FloatingTabBar />,
      path: floatingTabBarPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: floatingTabBarPath,
    });
  });
};
