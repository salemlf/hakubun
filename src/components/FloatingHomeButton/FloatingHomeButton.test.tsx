import { act, renderWithClient, screen } from "../../testing/test-utils";
import FloatingHomeButton from ".";

const mockUseNavigate = vi.fn();
vi.mock("@tanstack/react-router", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...mod,
    useNavigate: () => mockUseNavigate,
  };
});

test("FloatingHomeButton renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

test("FloatingHomeButton redirects to home on click", async () => {
  // mocking the home page data since will redirect there
  const { user } = await renderComponent();

  await user.click(
    screen.getByRole("button", {
      name: /home/i,
    })
  );

  expect(mockUseNavigate).toHaveBeenCalledWith({ to: "/", replace: true });
});

const renderComponent = async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  return await act(() => renderWithClient(<FloatingHomeButton />));
};
