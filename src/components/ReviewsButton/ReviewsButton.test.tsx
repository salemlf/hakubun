import { renderHook, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { createWrapper, renderWithRouter } from "../../testing/test-utils";
import { mockAssignmentsAvailForReviewResponse } from "../../testing/mocks/data/assignments.mock";
import { server } from "../../testing/mocks/server";
import {
  assignmentsAvailForReviewEndpoint,
  assignmentsEndpoint,
} from "../../testing/endpoints";
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
    rest.get(assignmentsEndpoint, (req, res, ctx) => {
      const url = new URL(req.url);
      console.log(
        "🚀 ~ file: ReviewsButton.test.tsx:25 ~ rest.get ~ url:",
        url
      );
      const availForReview = url.searchParams.get(
        "immediately_available_for_review"
      );
      if (availForReview) {
        return res(
          ctx.status(200),
          ctx.json(mockAssignmentsAvailForReviewResponse)
        );
      }

      // return res(
      //   ctx.status(200),
      //   ctx.json(mockAssignmentsAvailForReviewResponse)
      // );
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
