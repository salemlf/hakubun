import { createFileRoute } from "@tanstack/react-router";
import { Search } from "../pages/Search";

export const Route = createFileRoute("/_auth/search")({
  component: () => <Search />,
});
