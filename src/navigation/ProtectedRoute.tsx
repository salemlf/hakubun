import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import useAuthTokenStoreFacade from "../stores/useAuthTokenStore/useAuthTokenStore.facade";
import LoadingDots from "../components/LoadingDots";
import { FixedCenterContainer } from "../styles/BaseStyledComponents";
import { setAxiosHeaders } from "../api/ApiConfig";
import { useAuthTokenStore } from "../stores/useAuthTokenStore/useAuthTokenStore";
import { PersistentStore, useHydration } from "../hooks/useHydration";

type Props = {
  redirectPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  redirectPath = "/authenticate",
  children,
}: Props) => {
  const navigate = useNavigate();
  const { isAuthenticated, isAuthLoading, authToken } =
    useAuthTokenStoreFacade();
  const isHydrated = useHydration(useAuthTokenStore as PersistentStore);

  useEffect(() => {
    setAxiosHeaders(authToken);
  }, []);

  // TODO: prevent this behavior if on a page that uses bottomsheet
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

  if (isAuthLoading || !isHydrated) {
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
