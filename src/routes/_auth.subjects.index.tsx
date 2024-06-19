import { createFileRoute } from "@tanstack/react-router";
import { Subjects } from "../pages/Subjects";

export const Route = createFileRoute("/_auth/subjects/")({
  component: () => <Subjects />,
});
