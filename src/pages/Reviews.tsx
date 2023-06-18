import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSkeletonText,
} from "@ionic/react";

import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

// TODO: hide tab bar on this page
export const Reviews = () => {
  return (
    <Page>
      <IonContent>
        <IonGrid>
          <p>Reviews here</p>
        </IonGrid>
      </IonContent>
    </Page>
  );
};
