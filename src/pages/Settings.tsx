import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RELEASE_VERSION } from "../App";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import { useUserLogin } from "../hooks/user/useUserLogin";
import GeneralUserSettings from "../components/GeneralUserSettings";
import LessonUserSettings from "../components/LessonUserSettings";
import ReviewUserSettings from "../components/ReviewUserSettings/ReviewUserSettings";
import Button from "../components/Button";
import UserFeedbackModal from "../components/UserFeedbackModal";
import PageHeader from "../components/PageHeader";
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

const CreditsVersionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 5px;
`;

const ReleaseTxt = styled.p`
  grid-column: 1 / 3;
  font-size: 1.125rem;
`;

// TODO: change to get defaults from API
function Settings() {
  const [isFeedbackModalShown, setIsFeedbackModalShown] = useState(false);
  const { logout } = useUserLogin();
  const { userInfo } = useUserInfoStoreFacade();
  const navigate = useNavigate();
  const username = userInfo?.username;

  // TODO: add confirmation after pressing
  const removeAuth = () => {
    logout();
    navigate("/authenticate");
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
              onPress={() => removeAuth()}
            >
              Logout
            </SettingsBtn>
          </ButtonRow>
        </SettingBtnsContainer>
        <CreditsAndVersionContainer>
          <h3>Credits</h3>
          <CreditsVersionContent>
            <p>
              Logo by{" "}
              <a href="https://www.instagram.com/calebsevenhawks">
                Caleb Walsh
              </a>
            </p>
            <p>
              Other icons from <a href="https://icons8.com/">Icons8</a>
            </p>
            <ReleaseTxt>{`Version ${RELEASE_VERSION}`}</ReleaseTxt>
          </CreditsVersionContent>
        </CreditsAndVersionContainer>
      </Content>
      <UserFeedbackModal
        isOpen={isFeedbackModalShown}
        setIsOpen={setIsFeedbackModalShown}
      />
    </>
  );
}

export default Settings;
