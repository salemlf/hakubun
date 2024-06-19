import { createFileRoute } from "@tanstack/react-router";
import ReviewSession from "../../pages/ReviewSession";

export const Route = createFileRoute("/reviews/session")({
  component: () => <ReviewSession />,
});
