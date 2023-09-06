import { IonContent } from "@ionic/react";
import AnimatedPage from "../components/AnimatedPage";
import BackButton from "../components/BackButton";
import Card from "../components/Card";
import GeneralSettings from "../components/GeneralSettings";
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

const SettingCategory = styled(Card)`
  display: flex;
`;

function Settings() {
  return (
    <AnimatedPage>
      <SettingsHeader bgcolor="var(--light-greyish-purple)">
        <BackButton backgroundColor="var(--ion-color-secondary)" />
        <PageHeading>User Settings</PageHeading>
      </SettingsHeader>
      <IonContent>
        <GeneralSettings />
        <SettingCategory
          title="Lessons"
          headerBgColor="var(--wanikani-lesson)"
        ></SettingCategory>
        <SettingCategory
          title="Reviews"
          headerBgColor="var(--wanikani-review)"
        ></SettingCategory>
      </IonContent>
    </AnimatedPage>
  );
}

export default Settings;
