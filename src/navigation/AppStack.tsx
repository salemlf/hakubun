import {
  IonRouterOutlet,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
} from "@ionic/react";
import HomeIcon from "../images/home.svg";
import SubjectsIcon from "../images/subjects.svg";
import Search from "../images/search.svg";
import "./AppStack.module.scss";

import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, useLocation } from "react-router";

import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import { ReviewSettings } from "../pages/ReviewSettings";
import { ReviewSession } from "../pages/ReviewSession";
import { useEffect, useState } from "react";

export const AppStack = () => {
  return (
    <IonReactRouter>
      <TabBar />
    </IonReactRouter>
  );
};

export const TabBar = () => {
  const location = useLocation();
  const [showTabs, setShowTabs] = useState(true);
  const pagesToHideTabBar = ["/review/settings", "/review/session"];
  let tabBarStyle = showTabs === true ? undefined : { display: "none" };

  useEffect(() => {
    if (pagesToHideTabBar.includes(location.pathname)) {
      setShowTabs(false);
    } else {
      setShowTabs(true);
    }
  }, [location.pathname]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/subject/:id" component={SubjectDetails} />
        <Route path="/home" component={Home} exact={true} />
        <Route
          path="/review/settings"
          component={ReviewSettings}
          exact={true}
        />
        <Route path="/review/session" component={ReviewSession} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Redirect from="/authenticate" to="/home" exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" style={tabBarStyle}>
        <IonTabButton tab="subjects" href="/subject">
          <IonLabel>Subjects</IonLabel>
          <IonIcon icon={SubjectsIcon} />
        </IonTabButton>

        <IonTabButton tab="home" href="/home">
          <IonLabel>Home</IonLabel>
          <IonIcon icon={HomeIcon} />
        </IonTabButton>

        <IonTabButton tab="search" href="/search">
          <IonLabel>Search</IonLabel>
          <IonIcon icon={Search} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
