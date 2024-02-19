import { renderHook, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http, passthrough } from "msw";
import { createWrapper, renderWithRouter } from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { AVAIL_REVIEWS, assignmentsEndpoint } from "../../testing/endpoints";
import { generateAssignmentCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import { useAssignmentsAvailForReview } from "../../hooks/useAssignmentsAvailForReview";
import { AssignmentCollection } from "../../types/Collection";
import { ReviewSettings } from "../../pages/ReviewSettings";
import ReviewsButton from ".";

const mockLevel = 1;
const mockAssignmentCollection = generateAssignmentCollection(10);
const mockEmptyAssignmentCollection = generateAssignmentCollection(0);

const mockAvailReviewsResponse = (mockCollection: AssignmentCollection) => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const availForReview = url.searchParams.get(AVAIL_REVIEWS);
      if (availForReview == "true") {
        return HttpResponse.json(mockCollection);
      }
      return passthrough();
    })
  );
};

test("ReviewsButton renders", () => {
  const { baseElement } = renderComponent(mockLevel);
  expect(baseElement).toBeDefined();
});

test("Redirects to review settings on click", async () => {
  mockAvailReviewsResponse(mockAssignmentCollection);

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

test("Shows error text on API error and no cached data", async () => {
  server.use(
    http.get(assignmentsEndpoint, ({ request }) => {
      const url = new URL(request.url);
      const availForReviews = url.searchParams.get(AVAIL_REVIEWS);
      if (availForReviews == "true") {
        return HttpResponse.error();
      }
      return passthrough();
    })
  );

  renderComponent(mockLevel, true);
  const { result } = renderHook(() => useAssignmentsAvailForReview(mockLevel), {
    wrapper: createWrapper(),
  });
  await waitFor(() => {
    expect(result.current.isError).toBe(true);
  });

  await waitFor(() => {
    expect(result.current.data).toBe(undefined);
  });

  const errButton = await screen.findByTestId("review-btn-err");
  expect(errButton).toHaveTextContent("Error loading data");
});

test("Displays toast on click if no reviews available", async () => {
  mockAvailReviewsResponse(mockEmptyAssignmentCollection);

  const { user } = renderComponent(mockLevel);
  const { result } = renderHook(() => useAssignmentsAvailForReview(mockLevel), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    screen.getByRole("button", {
      name: /reviews/i,
    })
  );

  const errToast = await screen.findByTestId("error-toast");
  expect(errToast).toBeInTheDocument();
});

// TODO: add test
test.todo(
  "Displays error toast if API error and no cached data",
  async () => {}
);

const renderComponent = (
  level: number,
  withReviewSettings: boolean = false
) => {
  const routes = withReviewSettings
    ? [{ element: <ReviewSettings />, path: "/reviews/settings" }]
    : [];
  return renderWithRouter({
    routeObj: { element: <ReviewsButton level={level} />, path: "/" },
    routes,
  });
};
