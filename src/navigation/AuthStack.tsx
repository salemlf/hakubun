import TokenInput from "../pages/TokenInput";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch } from "react-router-dom";

export const AuthStack = () => {
  return (
    <IonReactRouter>
      <Switch>
        <Route exact path="/" component={TokenInput} />
      </Switch>
    </IonReactRouter>
  );
};
