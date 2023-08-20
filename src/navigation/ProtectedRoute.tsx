import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import Loading from "../components/Loading";

type Props = {
  isAuthenticated: boolean;
  authLoading: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  isAuthenticated,
  authLoading,
  redirectPath = "/authenticate",
  children,
}: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.addListener("backButton", ({ canGoBack }) => {
        if (!canGoBack) {
          CapacitorApp.exitApp();
        } else {
          navigate(-1);
        }
      });
    }
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [history]);

  if (authLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
