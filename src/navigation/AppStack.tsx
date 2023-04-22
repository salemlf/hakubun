import Home from "../pages/Home";
import { Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

export const AppStack = () => {
  return (
    <IonReactRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </IonReactRouter>
  );
};
