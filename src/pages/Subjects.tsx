import { IonContent, IonGrid, IonPage } from "@ionic/react";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

export const Subjects = () => {
  return (
    <Page>
      <>
        <IonContent>
          <IonGrid>
            <p>Subjects Page - TO DO</p>
          </IonGrid>
        </IonContent>
      </>
    </Page>
  );
};
