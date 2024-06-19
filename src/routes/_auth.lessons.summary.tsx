import { createFileRoute } from "@tanstack/react-router";
import LessonSummary from "../pages/LessonSummary";

export const Route = createFileRoute("/_auth/lessons/summary")({
  component: () => <LessonSummary />,
});
