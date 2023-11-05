import { renderHook, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { createWrapper, renderWithRouter } from "../../testing/test-utils";
import { mockAssignmentsAvailForReviewResponse } from "../../testing/mocks/data/assignments.mock";
import { server } from "../../testing/mocks/server";
import { assignmentsAvailForReviewEndpoint } from "../../testing/endpoints";
import { useAssignmentsAvailForReview } from "../../hooks/useAssignmentsAvailForReview";
import { ReviewSettings } from "../../pages/ReviewSettings";
import ReviewsButton from ".";

const mockLevel = 1;

test("ReviewsButton renders", () => {
  const { baseElement } = renderComponent(mockLevel);
  expect(baseElement).toBeDefined();
});

test("ReviewsButton redirects to review settings on click", async () => {
  server.use(
    rest.get(assignmentsAvailForReviewEndpoint, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(mockAssignmentsAvailForReviewResponse)
      );
    })
  );
  const { user } = renderComponent(mockLevel, true);

  const { result } = renderHook(() => useAssignmentsAvailForReview(mockLevel), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    screen.getByRole("button", {
      name: /reviews/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: /review settings/i,
    })
  ).toBeInTheDocument();
});

const renderComponent = (
  level: number,
  withReviewSettings: boolean = false
) => {
  let routes = withReviewSettings
    ? [{ element: <ReviewSettings />, path: "/reviews/settings" }]
    : [];
  return renderWithRouter({
    component: <ReviewsButton level={level} />,
    defaultPath: "/",
    routes,
  });
};
