import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import LoadingDots from "../components/LoadingDots";
import { FixedCenterContainer } from "../styles/BaseStyledComponents";

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

  // TODO: prevent this behavior if on a page that uses bottomsheet
  // TODO: move to App.tsx
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
    return (
      <FixedCenterContainer>
        <LoadingDots />
      </FixedCenterContainer>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
