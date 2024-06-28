import { act, createTestRouter, TestRoute } from "../testing/test-utils";
import { Search } from "./Search";

test("Search renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = async () => {
  const searchPath = "/search";
  const routesToRender: TestRoute[] = [
    {
      component: () => <Search />,
      path: searchPath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: searchPath,
    });
  });
};
