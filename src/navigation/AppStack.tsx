import { IonTabs } from "@ionic/react";
import styled from "styled-components/macro";
import { Redirect, Switch } from "react-router";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import { ReviewSettings } from "../pages/ReviewSettings";
import { ReviewSessionQueue } from "../pages/ReviewSessionQueue";
import { Subjects } from "../pages/Subjects";
import { Search } from "../pages/Search";
import ReviewSummary from "../pages/ReviewSummary";

export const AppStack = () => {
  return (
    <Router>
      <Tabs />
    </Router>
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
  return (
    <Switch>
      <Route path="/review/settings" component={ReviewSettings} exact={true} />
      <Route
        path="/review/session"
        component={ReviewSessionQueue}
        exact={true}
      />
      <Route path="/review/summary" component={ReviewSummary} exact={true} />
      <Route path="/subjects" component={Subjects} exact={true} />
      <Route path="/search" component={Search} exact={true} />
      <Route path="/subjects/:id" component={SubjectDetails} />
      <Route path="/home" component={Home} exact={true} />
      <Route exact={true} path="/" render={() => <Redirect to="/home" />} />
      <Redirect from="/authenticate" to="/home" exact={true} />
    </Switch>
  );
};
