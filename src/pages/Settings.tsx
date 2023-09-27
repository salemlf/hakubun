import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../stores/useUserInfoStore";
import { useUserLogin } from "../hooks/useUserLogin";
import AnimatedPage from "../components/AnimatedPage";
import BackButton from "../components/BackButton";
import GeneralUserSettings from "../components/GeneralUserSettings";
import LessonUserSettings from "../components/LessonUserSettings";
import ReviewUserSettings from "../components/ReviewUserSettings/ReviewUserSettings";
import Button from "../components/Button";
import FloatingTabBar from "../components/FloatingTabBar";
import {
  ContentWithTabBarNoPadding,
  Header,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const ContainerWithBottomMargin = styled(ContentWithTabBarNoPadding)`
  margin-bottom: 6rem;
`;

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

const Username = styled.h2`
  text-align: center;
`;

const CreditsContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;

  p {
    margin: 10px 0;
  }
`;

// TODO: change to get/set defaults from API
function Settings() {
  const { logout } = useUserLogin();
  const userInfo = useUserInfoStore.use.userInfo();
  const navigate = useNavigate();
  const username = userInfo?.username;

  // TODO: add confirmation after pressing
  const removeAuth = () => {
    logout();
    navigate("/authenticate");
  };

  return (
    <AnimatedPage>
      <SettingsHeader bgcolor="var(--light-greyish-purple)">
        <BackButton backgroundColor="var(--ion-color-secondary)" />
        <PageHeading>User Settings</PageHeading>
      </SettingsHeader>
      <ContainerWithBottomMargin>
        {username && <Username>{username}</Username>}
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
        <CreditsContainer>
          <h3>Credits</h3>
          <p>
            Logo by{" "}
            <a href="https://www.instagram.com/calebsevenhawks">Caleb Walsh</a>
          </p>
          <p>
            Other icons from <a href="https://icons8.com/">Icons8</a>
          </p>
        </CreditsContainer>
      </ContainerWithBottomMargin>
      <FloatingTabBar />
    </AnimatedPage>
  );
}

export default Settings;
