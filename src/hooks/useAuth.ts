import { useEffect, useState } from "react";
import * as LogRocket from "logrocket";
import { useQueryClient } from "@tanstack/react-query";
import secureLocalStorage from "react-secure-storage";
import { api, pagingApi } from "../api/ApiConfig";
import { useUser } from "./useUser";
import { useStorage } from "./useStorage";
import { User } from "../types/UserTypes";

// TODO: update so user data is refetched if hard refresh (not implemented yet)
export const useAuth = () => {
  const queryClient = useQueryClient();
  const { user, addUser, removeUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // const { getItem, setItem, removeItem } = useStorage();
  const { getItem } = useStorage();

  useEffect(() => {
    setAuthLoading(true);
    //* testing
    console.log("Ran useEffect in useAuth");
    //* testing
    let token = secureLocalStorage.getItem("token");
    if (token) {
      //* testing
      console.log("Found token in storage!");
      //* testing
      configureAxiosHeaders(token);
    }
    getItem("user").then((user) => {
      if (user) {
        addUser(user);
        setIsAuthenticated(true);
      }
      setAuthLoading(false);
    });
  }, []);

  const login = async (token: string) => {
    setToken(token);
    configureAxiosHeaders(token);
    setAuthLoading(true);

    try {
      let userData = await getUser();
      let userInfo: User = userData.data;

      // *testing
      console.log("🚀 ~ file: useAuth.tsx:23 ~ login ~ userInfo:", userInfo);
      // *testing

      addUser(userInfo);
      LogRocket.identify(`${userInfo.username}`, {
        name: `${userInfo.username}`,
      });

      setIsAuthenticated(true);
      setAuthLoading(false);
      return true;
    } catch (error) {
      console.error(
        "An error occurred when fetching/setting user data: ",
        error
      );
      setAuthLoading(false);
      return false;
    }
  };

  const logout = () => {
    setAuthLoading(true);
    removeUser();
    removeToken();
    setIsAuthenticated(false);
    setAuthLoading(false);
    queryClient.invalidateQueries();
  };

  const getUser = () => {
    return api
      .get("user")
      .then((res: { data: any }) => res.data)
      .catch((err: any) => console.log("Error getting user: ", err));
  };

  const configureAxiosHeaders = (newToken: any) => {
    api.defaults.headers["Authorization"] = `Bearer ${newToken}`;
    pagingApi.defaults.headers["Authorization"] = `Bearer ${newToken}`;
  };

  const setToken = (token: string) => {
    // setItem("token", token);
    secureLocalStorage.setItem("token", token);
  };

  const removeToken = () => {
    // removeItem("token");
    secureLocalStorage.removeItem("token");
  };

  return { user, isAuthenticated, authLoading, login, logout };
};
