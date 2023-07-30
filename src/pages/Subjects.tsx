import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { TabData } from "../types/MiscTypes";
import styled from "styled-components/macro";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

const Tab1Contents = () => {
  return <p>Tab 1 Contents</p>;
};

const Tab2Contents = () => {
  return <p>Tab 2 Contents</p>;
};

const Tab3Contents = () => {
  return <p>Tab 3 Contents</p>;
};

const tabs: TabData[] = [
  { id: "1", label: "Level 1", tabContents: <Tab1Contents /> },
  { id: "2", label: "Level 2", tabContents: <Tab2Contents /> },
  { id: "3", label: "Level 3", tabContents: <Tab3Contents /> },
];

export const Subjects = () => {
  return (
    <Page>
      <SwipeableTabs tabs={tabs} />
      {/* <IonContent>
          <IonGrid>
            <p>Subjects Page - TO DO</p>
          </IonGrid>
        </IonContent> */}
    </Page>
  );
};
