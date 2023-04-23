import React, { createContext, useState, useEffect, useContext } from "react";

import { Storage } from "@ionic/storage";
import { api } from "../api/ApiConfig";
import { AuthData } from "../services/authService";

type Props = {
  children?: React.ReactNode;
};

type AuthContextData = {
  auth?: AuthData;
  loading: boolean;
  setAuth(arg0: any): Promise<boolean>;
  removeAuth(): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: Props) => {
  const [store, setStore] = useState<Storage>();
  const [auth, setAuthState] = useState<AuthData>();
  const [loading, setLoading] = useState<boolean>(true);

  // called whenever app is opened
  useEffect(() => {
    loadStorageData();
  }, []);

  // TODO: figure out why this is running twice
  async function loadStorageData() {
    console.log("Running loadStorageData...");
    try {
      const initStorage = async () => {
        let newStore = new Storage();
        let store = await newStore.create();
        setStore(store);

        let authDataString = await store.get("auth");

        if (authDataString) {
          let authData = JSON.parse(authDataString);
          configureAxiosHeaders(authData.token);
          setAuthState(authData);
        }
      };

      initStorage();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const configureAxiosHeaders = (newToken: any) => {
    api.defaults.headers["Authorization"] = `Bearer ${newToken}`;
  };

  const getUser = () => {
    return api
      .get("user")
      .then((res: { data: any }) => res.data)
      .catch((err: any) => console.log("Error getting user: ", err));
  };

  const setAuth = (token: any) => {
    configureAxiosHeaders(token);

    return getUser().then(async (res: any) => {
      if (res) {
        let { username, level } = res.data;

        let authData = {
          token,
          username,
          level,
        };

        // *testing
        console.log(
          "🚀 ~ file: AuthContext.tsx:97 ~ returngetUser ~ authData:",
          authData
        );
        // *testing

        setAuthState((prevState) => ({
          ...prevState,
          token: token,
          username: username,
          level: level,
        }));

        await (store as any).set("auth", JSON.stringify(authData));
        return true;
      } else {
        setAuthState(undefined);

        let authData = {
          token: undefined,
          username: undefined,
          level: undefined,
        };

        await (store as any).set("auth", JSON.stringify(authData));
        return false;
      }
    });
  };

  const removeAuth = async () => {
    setAuthState(undefined);
    await (store as any).remove("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, loading, setAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
