import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContext } from "../contexts/AuthContext";

interface AuthenticatedCtx {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<AuthenticatedCtx>()({
  component: Root,
});

function Root() {
  return <Outlet />;
}
