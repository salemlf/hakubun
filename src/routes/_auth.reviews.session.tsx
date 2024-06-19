import { createFileRoute } from "@tanstack/react-router";
import ReviewSession from "../pages/ReviewSession";

export const Route = createFileRoute("/_auth/reviews/session")({
  component: () => <ReviewSession />,
});
