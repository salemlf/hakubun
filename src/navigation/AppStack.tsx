import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";

import { Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

export const AppStack = () => {
  return (
    <IonReactRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/subject/:id" component={SubjectDetails} />
      </Switch>
    </IonReactRouter>
  );
};
