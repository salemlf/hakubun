import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import TokenInput from "../pages/TokenInput";

// TODO: change so no need to specify every route to redirect from?
export const AuthStack = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/authenticate" component={TokenInput} />
        <Redirect from="/" to="/authenticate" exact />
        <Redirect from="/home" to="/authenticate" />
        <Redirect from="/subject" to="/authenticate" />
        <Redirect from="/search" to="/authenticate" />
        <Redirect from="/reviews" to="/authenticate" />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
