import { createFileRoute } from "@tanstack/react-router";
import TokenInput from "../pages/TokenInput";

export const Route = createFileRoute("/authenticate")({
  component: () => <TokenInput />,
});
