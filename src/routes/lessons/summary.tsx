import { createFileRoute } from "@tanstack/react-router";
import LessonSummary from "../../pages/LessonSummary";

export const Route = createFileRoute("/lessons/summary")({
  component: () => <LessonSummary />,
});
