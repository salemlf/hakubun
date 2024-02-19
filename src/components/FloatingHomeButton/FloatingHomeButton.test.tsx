import { renderWithRouter, screen } from "../../testing/test-utils";
import FloatingHomeButton from ".";
import Home from "../../pages/Home";

test("FloatingHomeButton renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("FloatingHomeButton redirects to home on click", async () => {
  // mocking the home page data since will redirect there

  const { user } = renderComponent(true);

  await user.click(
    screen.getByRole("button", {
      name: /home/i,
    })
  );

  expect(
    await screen.findByRole("heading", {
      name: /hakubun/i,
    })
  ).toBeVisible();
});

const renderComponent = (withHome: boolean = false) => {
  const routes = withHome ? [{ element: <Home />, path: "/" }] : [];

  const initialPath = "/reviews/summary";
  return renderWithRouter({
    routeObj: {
      element: <FloatingHomeButton />,
      path: initialPath,
    },
    defaultPath: initialPath,
    routes,
  });
};
