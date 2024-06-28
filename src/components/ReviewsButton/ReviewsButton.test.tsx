import { renderHook, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http, passthrough } from "msw";
import {
  act,
  createQueryWrapper,
  createTestRouter,
  TestRoute,
} from "../../testing/test-utils";
import { server } from "../../testing/mocks/server";
import { AVAIL_REVIEWS, assignmentsEndpoint } from "../../testing/endpoints";
import { generateAssignmentCollection } from "../../testing/mocks/data-generators/collectionGenerator";
import { useReviews } from "../../hooks/assignments/useReviews";
import { AssignmentCollection } from "../../types/Collection";
import ReviewsButton from ".";

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

test("ReviewsButton renders", async () => {
  const { baseElement } = await renderComponent();
  expect(baseElement).toBeDefined();
});

test("Redirects to review settings on click", async () => {
  mockAvailReviewsResponse(mockAssignmentCollection);

  const { user } = await renderComponent(true);

  const { result } = renderHook(() => useReviews(), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    await screen.findByRole("button", {
      name: /reviews/i,
    })
  );

  expect(
    await screen.findByRole("heading", {
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

  await renderComponent(true);
  const { result } = renderHook(() => useReviews(), {
    wrapper: createQueryWrapper(),
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

  const { user } = await renderComponent();
  const { result } = renderHook(() => useReviews(), {
    wrapper: createQueryWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    await screen.findByRole("button", {
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

const renderComponent = async (withReviewSettings: boolean = false) => {
  const reviewsButtonPath = "/";
  const reviewsButtonRoute: TestRoute = {
    component: () => <ReviewsButton />,
    path: reviewsButtonPath,
  };

  const reviewSettingsRoute: TestRoute = {
    path: "/reviews/settings",
    component: () => (
      <div>
        <h1>Mock Review Settings</h1>
      </div>
    ),
  };

  const routesToRender: TestRoute[] = [
    reviewsButtonRoute,
    ...(withReviewSettings ? [reviewSettingsRoute] : []),
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: reviewsButtonPath,
    });
  });
};
