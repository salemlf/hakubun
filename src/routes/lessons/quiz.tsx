import { createFileRoute } from "@tanstack/react-router";
import LessonQuiz from "../../pages/LessonQuiz";

export const Route = createFileRoute("/lessons/quiz")({
  component: () => <LessonQuiz />,
});
