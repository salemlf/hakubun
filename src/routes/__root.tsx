import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContext } from "../contexts/AuthContext";
import ErrorOccurred from "../pages/ErrorOccurred";

export interface AuthenticatedCtx {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<AuthenticatedCtx>()({
  component: Root,
  errorComponent: ({ error }) => {
    return <ErrorOccurred error={error} />;
  },
});

function Root() {
  return <Outlet />;
}
