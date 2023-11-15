import { renderHook, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http, passthrough } from "msw";
import { createWrapper, renderWithRouter } from "../../testing/test-utils";
import { mockAssignmentsAvailForReviewResponse } from "../../testing/mocks/data/assignments.mock";
import { server } from "../../testing/mocks/server";
import { assignmentsEndpoint } from "../../testing/endpoints";
import { useAssignmentsAvailForReview } from "../../hooks/useAssignmentsAvailForReview";
import { ReviewSettings } from "../../pages/ReviewSettings";
import ReviewsButton from ".";

const mockLevel = 1;

server.use(
  http.get(assignmentsEndpoint, ({ request }) => {
    const url = new URL(request.url);
    let availForReview = url.searchParams.get(
      "immediately_available_for_review"
    );
    if (availForReview == "true") {
      return HttpResponse.json(mockAssignmentsAvailForReviewResponse);
    }
    return passthrough();
  })
);

test("ReviewsButton renders", () => {
  const { baseElement } = renderComponent(mockLevel);
  expect(baseElement).toBeDefined();
});

test("ReviewsButton redirects to review settings on click", async () => {
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

// TODO: check that displays a toast on click if no reviews available

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
