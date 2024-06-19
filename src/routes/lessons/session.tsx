import { createFileRoute } from "@tanstack/react-router";
import LessonSession from "../../pages/LessonSession";

export const Route = createFileRoute("/lessons/session")({
  component: () => <LessonSession />,
});
