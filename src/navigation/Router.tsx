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

// TODO: fix bug where showing as authorized when not

const Router = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return auth ? <AppStack /> : <AuthStack />;
};

export default Router;
