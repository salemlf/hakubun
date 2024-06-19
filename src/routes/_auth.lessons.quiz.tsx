import { createFileRoute } from "@tanstack/react-router";
import LessonQuiz from "../pages/LessonQuiz";

export const Route = createFileRoute("/_auth/lessons/quiz")({
  component: () => <LessonQuiz />,
});
