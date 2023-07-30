import { IonContent, IonGrid, IonPage } from "@ionic/react";
import styled from "styled-components/macro";
import AnimatedTabs from "../components/Tabs/Tabs";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

const tabs = [
  { id: "1", label: "Level 1" },
  { id: "2", label: "Level 2" },
  { id: "3", label: "Level 3" },
];

export const Subjects = () => {
  return (
    <Page>
      <AnimatedTabs tabs={tabs} />
      {/* <IonContent>
          <IonGrid>
            <p>Subjects Page - TO DO</p>
          </IonGrid>
        </IonContent> */}
    </Page>
  );
};
