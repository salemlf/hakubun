import { IonContent } from "@ionic/react";
import AnimatedPage from "../components/AnimatedPage";
import BackButton from "../components/BackButton";
import GeneralUserSettings from "../components/GeneralUserSettings";
import LessonUserSettings from "../components/LessonUserSettings";
import ReviewUserSettings from "../components/ReviewUserSettings/ReviewUserSettings";
import { Header } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const SettingsHeader = styled(Header)`
  padding: 14px 5px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

const PageHeading = styled.h1`
  margin: 0;
  margin-right: 16px;
  text-align: center;
`;

function Settings() {
  return (
    <AnimatedPage>
      <SettingsHeader bgcolor="var(--light-greyish-purple)">
        <BackButton backgroundColor="var(--ion-color-secondary)" />
        <PageHeading>User Settings</PageHeading>
      </SettingsHeader>
      <IonContent>
        <GeneralUserSettings />
        <LessonUserSettings />
        <ReviewUserSettings />
      </IonContent>
    </AnimatedPage>
  );
}

export default Settings;
