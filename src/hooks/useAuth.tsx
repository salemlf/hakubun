import { useEffect, useState } from "react";
import { useUser, User } from "./useUser";
import { useStorage } from "./useStorage";
import { api, pagingApi } from "../api/ApiConfig";

// TODO: update so user data is refetched if hard refresh (not implemented yet)
export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const { getItem, setItem, removeItem } = useStorage();

  useEffect(() => {
    setAuthLoading(true);
    //* testing
    console.log("Ran useEffect is useAuth");
    //* testing
    getItem("token").then((token) => {
      if (token) {
        //* testing
        console.log("Found token in storage!");
        //* testing
        configureAxiosHeaders(token);
      }
    });
    getItem("user").then((user) => {
      if (user) {
        //* testing
        console.log("Found user in storage!");
        console.log("🚀 ~ file: useAuth.tsx:24 ~ getItem ~ user:", user);
        //* testing
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

      // *testing
      console.log("🚀 ~ file: useAuth.tsx:24 ~ login ~ userData:", userData);
      // *testing
      let userInfo = {
        username: userData.data.username,
        level: userData.data.level,
      };

      // *testing
      console.log("🚀 ~ file: useAuth.tsx:23 ~ login ~ userInfo:", userInfo);
      // *testing
      // TODO: add auth to storage using useStorage
      addUser(userInfo);
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
    setItem("token", token);
  };

  const removeToken = () => {
    removeItem("token");
  };

  return { user, isAuthenticated, authLoading, login, logout };
};
