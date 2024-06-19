import { createFileRoute } from "@tanstack/react-router";
import Settings from "../pages/Settings";

export const Route = createFileRoute("/_auth/settings")({
  component: () => <Settings />,
});
