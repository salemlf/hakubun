import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../pages/RootLayout";

export const Route = createRootRoute({
  component: () => <RootLayout />,
});
