import React from "react";
import { useHistory, useParams } from "react-router";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonPage,
} from "@ionic/react";

export const SubjectTab = () => {
  const history = useHistory();
  const params = useParams();

  return <div>SubjectTab</div>;
};
