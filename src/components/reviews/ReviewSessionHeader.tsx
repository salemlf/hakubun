import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  useIonRouter,
} from "@ionic/react";

import HomeIcon from "../../images/home.svg";
import styled from "styled-components/macro";

const SessionHeader = styled(IonHeader)`
  box-shadow: none;
  --ion-toolbar-background: var(--dark-greyish-purple);
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

export const ReviewSessionHeader = () => {
  const router = useIonRouter();

  return (
    <SessionHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => router.push("/home")}>
            <IonIcon slot="icon-only" icon={HomeIcon}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </SessionHeader>
  );
};
