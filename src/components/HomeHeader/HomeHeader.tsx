import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import Button from "../Button";
import RefreshHomeButton from "../RefreshHomeButton";
import SettingsIcon from "../../images/settings.svg";
import LogoIcon from "../../images/logo.svg";
import { Header } from "../../styles/BaseStyledComponents";
import styled from "styled-components";
import { useUserInfoStore } from "../../stores/useUserInfoStore";

const SettingsImg = styled.img`
  width: 2.75em;
  height: 2.75em;
`;

const SettingsButton = styled(Button)`
  border-radius: 12px;
  padding: 5px;
`;

const HeaderWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    font-size: 1.25rem;
    margin: 0;
  }
`;

const RefreshAndSettingsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    font-size: 1.25rem;
    margin: 0;
  }
`;

const AppName = styled.h1`
  margin: 0;
  font-size: 1.25rem;
`;

const Logo = styled(IonIcon)`
  width: 2em;
  height: 2em;
`;

const FirstRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SecondRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LevelTxt = styled.h2`
  margin: 5px 0;
  font-size: 1.5rem;
`;

// TODO: sometimes settings button somehow redirects to /reviews/settings and not settings? fix
function HomeHeader() {
  const navigate = useNavigate();
  // !added
  const userInfo = useUserInfoStore.use.userInfo();
  // !added
  const [level, setLevel] = useState<number | undefined>();

  useEffect(() => {
    setUserDetails();
  }, [userInfo]);

  const setUserDetails = () => {
    // let userData = appContext.user;
    if (userInfo) {
      setLevel(userInfo.level);
    }
  };

  // TODO: show loading skeleton
  return (
    <HeaderWrapper bgcolor="var(--light-greyish-purple)">
      <FirstRow>
        <UserInfoContainer>
          <Logo src={LogoIcon} />
          <AppName>Hakubun</AppName>
        </UserInfoContainer>
        <RefreshAndSettingsContainer>
          <RefreshHomeButton />
          <SettingsButton
            aria-label="User settings page"
            backgroundColor="transparent"
            onPress={() => navigate("/settings")}
          >
            <SettingsImg src={SettingsIcon} alt="settings icon"></SettingsImg>
          </SettingsButton>
        </RefreshAndSettingsContainer>
      </FirstRow>
      <SecondRow>
        <LevelTxt>Level {level}</LevelTxt>
      </SecondRow>
    </HeaderWrapper>
  );
}

export default HomeHeader;
