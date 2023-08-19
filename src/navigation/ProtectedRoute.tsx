import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
// import { useUserAuth } from "../contexts/AuthContext";
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
  //   const location = useLocation();
  const navigate = useNavigate();
  //   const [showTabs, setShowTabs] = useState(true);
  //   // TODO: change implementation so don't need to list all these
  //   const pagesToHideTabBar = [
  //     "/reviews/settings",
  //     "/reviews/session",
  //     "/reviews/summary",
  //     "/lessons/settings",
  //     "/lessons/session",
  //     "/lessons/quiz",
  //   ];

  //   let tabBarStyle = showTabs === true ? undefined : { display: "none" };

  //   useEffect(() => {
  //     if (pagesToHideTabBar.includes(location.pathname)) {
  //       setShowTabs(false);
  //     } else {
  //       setShowTabs(true);
  //     }
  //   }, [location.pathname]);

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
  //   const { authLoading, isAuthenticated } = useUserAuth();

  if (authLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
