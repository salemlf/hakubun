import { renderHook, screen, waitFor } from "@testing-library/react";
import { createWrapper, renderWithRouter } from "../../testing/test-utils";
import { mockAssignmentsAvailForReview } from "../../testing/mocks/data/assignments.mock";
import { server } from "../../testing/mocks/server";
import ReviewsButton from ".";
import { rest } from "msw";
import { assignmentsAvailForReviewEndpoint } from "../../testing/mocks/handlers";
import { useAssignmentsAvailForReview } from "../../hooks/useAssignmentsAvailForReview";

server.use(
  rest.get(assignmentsAvailForReviewEndpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAssignmentsAvailForReview));
  })
);
const mockLevel = 1;

test("ReviewsButton renders", () => {
  const { baseElement } = renderComponent(mockLevel);
  expect(baseElement).toBeDefined();
  //   TODO: mock useAssignmentsAvailForReview
});

// TODO: fix, result.current.isSuccess is false
test.todo("ReviewsButton redirects to review settings on click", async () => {
  const { user } = renderComponent(mockLevel);

  const { result } = renderHook(() => useAssignmentsAvailForReview(mockLevel), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //   *testing
  console.log(
    "🚀 ~ file: ReviewsButton.test.tsx:32 ~ const{result}=renderHook ~ result:",
    result
  );
  //   *testing

  await user.click(
    screen.getByRole("button", {
      name: /reviews/i,
    })
  );
});

const renderComponent = (level: number) => {
  return renderWithRouter({
    component: <ReviewsButton level={level} />,
    defaultPath: "/",
  });
};
