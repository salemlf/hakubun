import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/AuthContext";
import LvlBadge from "../LvlBadge/LvlBadge";
import Button from "../Button";
import RefreshHomeButton from "../RefreshHomeButton";
import SettingsIcon from "../../images/settings.svg";
import { Header } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

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

// TODO: sometimes settings button somehow redirects to /reviews/settings and not settings? fix
function HomeHeader() {
  const navigate = useNavigate();
  const auth = useUserAuth();
  const [level, setLevel] = useState<number | undefined>();

  useEffect(() => {
    setUserDetails();
  }, [auth.isAuthenticated]);

  const setUserDetails = () => {
    let userData = auth.user;
    if (userData !== null) {
      setLevel(userData.level);
    }
  };

  // TODO: show loading skeleton
  return (
    <HeaderWrapper bgcolor="var(--light-greyish-purple)">
      <UserInfoContainer>
        <LvlBadge level={level}></LvlBadge>
        {/* <p>{username}</p> */}
        <AppName>Hakubun</AppName>
      </UserInfoContainer>
      <RefreshAndSettingsContainer>
        <RefreshHomeButton />
        <SettingsButton
          backgroundColor="transparent"
          onPress={() => navigate("/settings")}
        >
          <SettingsImg src={SettingsIcon} alt="settings icon"></SettingsImg>
        </SettingsButton>
      </RefreshAndSettingsContainer>
    </HeaderWrapper>
  );
}

export default HomeHeader;
