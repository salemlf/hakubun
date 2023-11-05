import { renderWithRouter, screen } from "../../testing/test-utils";
import FloatingHomeButton from ".";
import Home from "../../pages/Home";
(".");

test("FloatingHomeButton renders", () => {
  const { baseElement } = renderComponent();
  expect(baseElement).toBeDefined();
});

test("FloatingHomeButton redirects to home on click", async () => {
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
  let routes = withHome ? [{ element: <Home />, path: "/" }] : [];
  return renderWithRouter({
    component: <FloatingHomeButton />,
    defaultPath: "/reviews/summary",
    routes,
  });
};
