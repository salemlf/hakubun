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

import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import { useTabBarContext } from "../contexts/TabBarContext";

import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import "./AppStack.module.scss";
import { Reviews } from "../pages/Reviews";

export const AppStack = () => {
  const { showTabBar } = useTabBarContext();
  let tabBarStyle = showTabBar ? undefined : { display: "none" };

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/subject/:id" component={SubjectDetails} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/reviews" component={Reviews} exact={true} />
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
    </IonReactRouter>
  );
};
