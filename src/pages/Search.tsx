import { IonContent, IonGrid, IonPage } from "@ionic/react";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

export const Search = () => {
  return (
    <Page>
      <>
        <IonContent>
          <IonGrid>
            <p>Search Page - TO DO</p>
          </IonGrid>
        </IonContent>
      </>
    </Page>
  );
};
