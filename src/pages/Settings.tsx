import { useNavigate } from "react-router-dom";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import { useUserLogin } from "../hooks/useUserLogin";
import GeneralUserSettings from "../components/GeneralUserSettings";
import LessonUserSettings from "../components/LessonUserSettings";
import ReviewUserSettings from "../components/ReviewUserSettings/ReviewUserSettings";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(MainContent)`
  margin-bottom: 20px;
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
      <PageHeader title="User Settings" />
      <Content>
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
      </Content>
    </>
  );
}

export default Settings;
