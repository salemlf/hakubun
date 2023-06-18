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

import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import "./AppStack.module.scss";
import { Reviews } from "../pages/Reviews";

export const AppStack = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/subject/:id" component={SubjectDetails} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/home/reviews" component={Reviews} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Redirect from="/authenticate" to="/home" exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
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
