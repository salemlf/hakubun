import { createContext, useCallback } from "react";
import useAuthTokenStoreFacade from "../stores/useAuthTokenStore/useAuthTokenStore.facade";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import { api, pagingApi } from "../api/ApiConfig";
import LogRocket from "logrocket";
import { User } from "../types/User";

export interface AuthContext {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const {
    isAuthenticated,
    isAuthLoading,
    setIsAuthLoading,
    setIsAuthenticated,
    setAuthToken,
    reset: resetToken,
  } = useAuthTokenStoreFacade();
  const { setUserInfo, reset: resetUserInfo } = useUserInfoStoreFacade();

  const configureAxiosHeaders = (newToken: string) => {
    api.defaults.headers["Authorization"] = `Bearer ${newToken}`;
    pagingApi.defaults.headers["Authorization"] = `Bearer ${newToken}`;
  };

  // TODO: type this response
  const getUser = () => {
    return api
      .get("user")
      .then((res: { data: any }) => res.data)
      .catch((err) => console.log("Error getting user: ", JSON.stringify(err)));
  };

  const login = useCallback(async (token: string) => {
    setAuthToken(token);
    configureAxiosHeaders(token);
    setIsAuthLoading(true);

    try {
      const userData = await getUser();
      const userInfo: User = userData.data;

      setUserInfo(userInfo);

      LogRocket.identify(`${userInfo.username}`, {
        name: `${userInfo.username}`,
      });

      setIsAuthenticated(true);
      setIsAuthLoading(false);
      return true;
    } catch (error) {
      console.error(
        "An error occurred when fetching/setting user data: ",
        error
      );
      setIsAuthenticated(false);
      setIsAuthLoading(false);
      return false;
    }
  }, []);

  const logout = () => {
    setIsAuthLoading(true);
    resetUserInfo();
    resetToken();
    delete api.defaults.headers.common["Authorization"];
    delete pagingApi.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setIsAuthLoading(false);
    queryClient.removeQueries();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
