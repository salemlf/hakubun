// import axios from "axios";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  SetStateAction,
} from "react";

// import * as SecureStore from "expo-secure-store";
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

// const AuthContext = createContext({});
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: Props) => {
  const [store, setStore] = useState<Storage>();
  const [auth, setAuthState] = useState<AuthData>();
  const [loading, setLoading] = useState<boolean>(true);

  // called whenever app is opened
  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      // !added
      const initStorage = async () => {
        let newStore = new Storage();
        let store = await newStore.create();
        setStore(store);

        let authDataString = await store.get("auth");

        if (authDataString) {
          let authData = JSON.parse(authDataString);
          configureAxiosHeaders(authData);
          setAuthState(authData);
        }
      };

      initStorage();
      // !added
      //   let authDataString = await SecureStore.getItemAsync("auth");
      //   if (authDataString) {
      //     let authData = JSON.parse(authDataString);
      //     configureAxiosHeaders(authData);
      //     setAuthState(authData);
      //   }
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

  const setAuth = (auth: any) => {
    configureAxiosHeaders(auth);

    return getUser().then(async (res: any) => {
      if (res) {
        setAuthState(auth);
        // await SecureStore.setItemAsync("auth", JSON.stringify(auth));

        await (store as any).set("auth", JSON.stringify(auth));
        return true;
      } else {
        setAuthState(undefined);
        console.log("auth", auth);
        // await SecureStore.setItemAsync("auth", JSON.stringify(auth));
        await (store as any).set("auth", JSON.stringify(auth));
        return false;
      }
    });
  };

  const removeAuth = async () => {
    setAuthState(undefined);
    // await SecureStore.deleteItemAsync("auth");
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
