import {
  IonRouterOutlet,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";

import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";

// TODO: add icons to tabs
export const AppStack = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/subject/:id" component={SubjectDetails} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="levels" href="/level">
            <IonLabel>Levels</IonLabel>
          </IonTabButton>

          <IonTabButton tab="subjects" href="/subject">
            <IonLabel>Subjects</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
