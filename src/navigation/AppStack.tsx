import { useEffect, useState } from "react";
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
import SearchIcon from "../images/search.svg";
import styled from "styled-components/macro";

import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, useLocation } from "react-router";

import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import { ReviewSettings } from "../pages/ReviewSettings";
import { ReviewSessionQueue } from "../pages/ReviewSessionQueue";
import { Subjects } from "../pages/Subjects";
import { Search } from "../pages/Search";
import ReviewSummary from "../components/ReviewSummary/ReviewSummary";

export const AppStack = () => {
  return (
    <IonReactRouter>
      <Tabs />
    </IonReactRouter>
  );
};

const TabsStyled = styled(IonTabs)`
  ion-tab-bar {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.4);
    border-radius: 30px;
    width: 65%;
    min-width: 200px;
    max-width: 500px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;

    bottom: 20px;
    position: relative;
    margin: 0 auto;
    border-top: none;
    gap: 5px;
  }

  ion-tab-button {
    border-radius: 30px;

    &:focus {
      outline: 2px solid white;
      --outline: 2px solid white;
    }
  }
`;

export const Tabs = () => {
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
    <TabsStyled>
      <IonRouterOutlet>
        <Route path="/:tab(home)" component={Home} exact={true} />
        <Route path="/:tab(subjects)" component={Subjects} exact={true} />
        <Route path="/:tab(search)" component={Search} exact={true} />
        <Route path="/subjects/:id" component={SubjectDetails} />
        <Route path="/home" component={Home} exact={true} />
        <Route
          path="/review/settings"
          component={ReviewSettings}
          exact={true}
        />
        <Route
          path="/review/session"
          component={ReviewSessionQueue}
          exact={true}
        />
        <Route path="/review/summary" component={ReviewSummary} exact={true} />
        <Route exact={true} path="/" render={() => <Redirect to="/home" />} />
        <Redirect from="/authenticate" to="/home" exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" style={tabBarStyle}>
        <IonTabButton tab="subjects" href="/subjects">
          <IonLabel>Subjects</IonLabel>
          <IonIcon icon={SubjectsIcon} />
        </IonTabButton>

        <IonTabButton tab="home" href="/home">
          <IonLabel>Home</IonLabel>
          <IonIcon icon={HomeIcon} />
        </IonTabButton>
        <IonTabButton tab="search" href="/search">
          <IonLabel>Search</IonLabel>
          <IonIcon icon={SearchIcon} />
        </IonTabButton>
      </IonTabBar>
    </TabsStyled>
  );
};
