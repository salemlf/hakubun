import { renderWithRouter } from "../testing/test-utils";
import { Search } from "./Search";

test("Search renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  const searchPath = "/search";
  return renderWithRouter({
    routeObj: { element: <Search />, path: searchPath },
    defaultPath: searchPath,
  });
};
