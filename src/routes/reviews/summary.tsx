import { createFileRoute } from "@tanstack/react-router";
import ReviewSummary from "../../pages/ReviewSummary";

export const Route = createFileRoute("/reviews/summary")({
  component: () => <ReviewSummary />,
});
