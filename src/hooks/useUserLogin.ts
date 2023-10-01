import * as LogRocket from "logrocket";
import { useQueryClient } from "@tanstack/react-query";
import { api, pagingApi } from "../api/ApiConfig";
import { useAuthTokenStore } from "../stores/useAuthTokenStore";
import { useUserInfoStore } from "../stores/useUserInfoStore";
import { User } from "../types/UserTypes";

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const setIsAuthLoading = useAuthTokenStore.use.setIsAuthLoading();
  const setIsAuthenticated = useAuthTokenStore.use.setIsAuthenticated();
  const setAuthToken = useAuthTokenStore.use.setAuthToken();
  const resetToken = useAuthTokenStore.use.reset();
  const setUserInfo = useUserInfoStore.use.setUserInfo();
  const resetUserInfo = useUserInfoStore.use.reset();

  const configureAxiosHeaders = (newToken: any) => {
    api.defaults.headers["Authorization"] = `Bearer ${newToken}`;
    pagingApi.defaults.headers["Authorization"] = `Bearer ${newToken}`;
  };

  const getUser = () => {
    return api
      .get("user")
      .then((res: { data: any }) => res.data)
      .catch((err: any) => console.log("Error getting user: ", err));
  };

  const login = async (token: string) => {
    setAuthToken(token);
    configureAxiosHeaders(token);
    setIsAuthLoading(true);

    try {
      let userData = await getUser();
      let userInfo: User = userData.data;

      // *testing
      console.log("🚀 ~ file: useAuth.tsx:23 ~ login ~ userInfo:", userInfo);
      // *testing

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
  };

  const logout = () => {
    setIsAuthLoading(true);
    resetUserInfo();
    resetToken();
    delete api.defaults.headers.common["Authorization"];
    delete pagingApi.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setIsAuthLoading(false);
    queryClient.invalidateQueries();
  };

  return { login, logout };
};
