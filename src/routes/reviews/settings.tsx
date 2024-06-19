import { createFileRoute } from "@tanstack/react-router";
import { ReviewSettings } from "../../pages/ReviewSettings";

export const Route = createFileRoute("/reviews/settings")({
  component: () => <ReviewSettings />,
});
