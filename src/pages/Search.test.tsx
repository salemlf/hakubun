import { renderWithRouter } from "../testing/test-utils";
import { Search } from "./Search";

test("Search renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

const renderComponent = () => {
  return renderWithRouter({
    routeObj: { element: <Search />, path: "/search" },
  });
};
