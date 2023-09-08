import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { Keyboard } from "@capacitor/keyboard";
import { useHideTabBar } from "../contexts/HideTabBarContext";
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
  const { setIsHidden } = useHideTabBar();

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

  useEffect(() => {
    if (Capacitor.isPluginAvailable("Keyboard")) {
      //* testing
      console.debug("useEffect in ProtectedRoute called!");
      //* testing

      //* testing
      console.debug("Capacitor Keyboard plugin is available!");
      //* testing
      Keyboard.addListener("keyboardWillShow", () => {
        //* testing
        console.debug("keyboardWillShow called!");
        //* testing
        setIsHidden(true);
      });

      Keyboard.addListener("keyboardDidHide", () => {
        //* testing
        console.debug("keyboardDidHide called!");
        //* testing
        setIsHidden(false);
      });
      // return () => {
      //   //* testing
      //   console.debug("Removing listeners in ProtectedRoute useEffect...");
      //   //* testing
      //   setIsHidden(false);
      //   Keyboard.removeAllListeners();
      // };
    }
    return () => {
      //* testing
      console.debug("Removing listeners in ProtectedRoute useEffect...");
      //* testing
      setIsHidden(false);
      if (Capacitor.isPluginAvailable("Keyboard")) {
        Keyboard.removeAllListeners();
      }
    };
  }, []);

  if (authLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
