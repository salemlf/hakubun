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
import Levels from "../images/levels.svg";
import Search from "../images/search.svg";

import styled from "styled-components/macro";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";

import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import "./AppStack.module.scss";

const TabBar = styled(IonTabBar)`
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.4);
  border-radius: 50px !important;

  height: 50px;
  width: 50%;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;

  bottom: 20px;
  position: relative;
  margin: 0 auto !important;
  border-top: none;

  ion-tab-button {
    border-radius: 16px !important;
  }
`;

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
            <IonIcon icon={HomeIcon} />
          </IonTabButton>

          <IonTabButton tab="levels" href="/level">
            <IonLabel>Levels</IonLabel>
            <IonIcon icon={Levels} />
          </IonTabButton>

          <IonTabButton tab="subjects" href="/subject">
            <IonLabel>Subjects</IonLabel>
            <IonIcon icon={SubjectsIcon} />
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
