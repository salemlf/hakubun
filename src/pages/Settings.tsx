import { IonContent } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/AuthContext";
import AnimatedPage from "../components/AnimatedPage";
import BackButton from "../components/BackButton";
import GeneralUserSettings from "../components/GeneralUserSettings";
import LessonUserSettings from "../components/LessonUserSettings";
import ReviewUserSettings from "../components/ReviewUserSettings/ReviewUserSettings";
import Button from "../components/Button";
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled(Button)`
  padding: 10px;
  font-size: 1.25rem;
  border-radius: 12px;
`;

// TODO: change to get/set defaults from API
function Settings() {
  const appContext = useUserAuth();
  const navigate = useNavigate();

  // TODO: add confirmation after pressing
  const removeAuth = () => {
    appContext.logout();
    navigate("/authenticate");
  };

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
        <ButtonRow>
          <LogoutButton
            backgroundColor="var(--ion-color-danger)"
            onPress={() => removeAuth()}
          >
            Logout
          </LogoutButton>
        </ButtonRow>
      </IonContent>
    </AnimatedPage>
  );
}

export default Settings;
