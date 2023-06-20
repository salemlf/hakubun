import { useEffect } from "react";
import { IonContent, IonGrid, IonPage } from "@ionic/react";

import { useTabBarContext } from "../contexts/TabBarContext";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: add a button to return home
export const ReviewSession = () => {
  const { setShowTabBar } = useTabBarContext();
  useEffect(() => {
    setShowTabBar(false);

    return () => {
      setShowTabBar(true);
    };
  });

  return (
    <Page>
      <IonContent>
        <IonGrid>
          <h1>Review Session</h1>
        </IonGrid>
      </IonContent>
    </Page>
  );
};
