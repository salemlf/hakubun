import { createFileRoute } from "@tanstack/react-router";
import ReviewSummary from "../pages/ReviewSummary";

export const Route = createFileRoute("/_auth/reviews/summary")({
  component: () => <ReviewSummary />,
});
