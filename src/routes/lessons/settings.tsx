import { createFileRoute } from "@tanstack/react-router";
import LessonSettings from "../../pages/LessonSettings";

export const Route = createFileRoute("/lessons/settings")({
  component: () => <LessonSettings />,
});
