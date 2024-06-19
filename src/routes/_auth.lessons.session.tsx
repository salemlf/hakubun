import { createFileRoute } from "@tanstack/react-router";
import LessonSession from "../pages/LessonSession";

export const Route = createFileRoute("/_auth/lessons/session")({
  component: () => <LessonSession />,
});
