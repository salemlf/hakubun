// import { NavigationContainer } from "@react-navigation/native";

import { Redirect, Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";

import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../components/Loading";

// interface Props {
//     auth: any;
//     loading: boolean;
//   }

// interface Props {
//   auth: any;
//   loading: boolean;
//   setAuth?: (arg0: string) => any;
//   removeAuth?: () => any;
// }

const Router = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return auth ? <AppStack /> : <AuthStack />;
};

export default Router;
