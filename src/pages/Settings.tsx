import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import { useUserLogin } from "../hooks/user/useUserLogin";
import GeneralUserSettings from "../components/GeneralUserSettings";
import LessonUserSettings from "../components/LessonUserSettings";
import ReviewUserSettings from "../components/ReviewUserSettings/ReviewUserSettings";
import Button from "../components/Button";
import UserFeedbackModal from "../components/UserFeedbackModal";
import PageHeader from "../components/PageHeader";
import AlertModal from "../components/AlertModal";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(MainContent)`
  padding-bottom: 20px;
`;

const SettingBtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const SettingsBtn = styled(Button)`
  padding: 10px;
  font-size: 1.25rem;
  border-radius: 12px;
`;

const Username = styled.h2`
  text-align: center;
`;

const CreditsAndVersionContainer = styled.div`
  text-align: center;
  margin: 16px;
  margin-top: 20px;

  p {
    margin: 0;
  }
`;

const CreditsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 16px;
  justify-content: center;
  margin-bottom: 16px;
`;

const ReleaseTxt = styled.p`
  grid-column: 1 / 3;
  font-size: 1.125rem;
`;

// TODO: change to get defaults from API
export function Settings() {
  const [isFeedbackModalShown, setIsFeedbackModalShown] = useState(false);
  const [isLogoutConfirmationShown, setIsLogoutConfirmationShown] =
    useState(false);
  const { logout } = useUserLogin();
  const { userInfo } = useUserInfoStoreFacade();
  const navigate = useNavigate();
  const username = userInfo?.username;

  const removeAuth = () => {
    logout();
    navigate({ to: "/authenticate", replace: true });
  };

  return (
    <>
      <PageHeader title="User Settings" bgColor="var(--foreground-color)" />
      <Content>
        {username && <Username>{username}</Username>}
        <GeneralUserSettings />
        <LessonUserSettings />
        <ReviewUserSettings />
        <SettingBtnsContainer>
          <ButtonRow>
            <SettingsBtn
              backgroundColor="var(--ion-color-tertiary)"
              color="#000"
              onPress={() => setIsFeedbackModalShown(true)}
            >
              Submit Feedback
            </SettingsBtn>
          </ButtonRow>
          <ButtonRow>
            <SettingsBtn
              backgroundColor="var(--ion-color-danger)"
              color="white"
              onPress={() => setIsLogoutConfirmationShown(true)}
            >
              Log Out
            </SettingsBtn>
          </ButtonRow>
        </SettingBtnsContainer>
        <CreditsAndVersionContainer>
          <h3>Credits</h3>
          <CreditsContent>
            <p>
              Logo by{" "}
              <a href="https://www.instagram.com/calebsevenhawks">
                Caleb Walsh
              </a>
            </p>
            <p>
              Other icons from <a href="https://icons8.com/">Icons8</a>
            </p>
            <p>
              Pitch accent data from{" "}
              <a href="https://jotoba.de/docs.html">Jotoba API</a>
            </p>
          </CreditsContent>
          <ReleaseTxt>{`Version ${APP_VERSION}`}</ReleaseTxt>
        </CreditsAndVersionContainer>
      </Content>
      <UserFeedbackModal
        isOpen={isFeedbackModalShown}
        setIsOpen={setIsFeedbackModalShown}
      />
      <AlertModal
        open={isLogoutConfirmationShown}
        onOpenChange={setIsLogoutConfirmationShown}
      >
        <AlertModal.Content
          modalID="confirm-log-out-alert-modal"
          isOpen={isLogoutConfirmationShown}
          title="Log Out"
          confirmText="Yes"
          description="Are you sure you want to log out?"
          cancelText="No"
          onConfirmClick={() => removeAuth()}
          onCancelClick={() => setIsLogoutConfirmationShown(false)}
        />
      </AlertModal>
    </>
  );
}

export default Settings;
