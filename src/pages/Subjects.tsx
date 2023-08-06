import { IonGrid } from "@ionic/react";
import { TabData } from "../types/MiscTypes";
import SwipeableTabs from "../components/SwipeableTabs";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
// import FloatingTabBar from "../components/FloatingTabBar";
import AnimatedPage from "../components/AnimatedPage";
// import styled from "styled-components/macro";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
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

// TODO: just testing this out, need to put real content
export const Subjects = () => {
  return (
    <Page>
      <SwipeableTabs tabs={tabs} defaultValue="1" />
      <ContentWithTabBar>
        <IonGrid>
          <p>Subjects Page - TO DO</p>
        </IonGrid>
      </ContentWithTabBar>
      {/* <FloatingTabBar /> */}
    </Page>
  );
};
