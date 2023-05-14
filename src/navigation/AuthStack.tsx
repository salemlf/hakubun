import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";

// import { Route } from "react-router-dom";
import { Route } from "react-router";

import TokenInput from "../pages/TokenInput";

export const AuthStack = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={TokenInput} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
