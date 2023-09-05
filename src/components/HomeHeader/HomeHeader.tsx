import { useEffect, useState } from "react";
import { useUserAuth } from "../../contexts/AuthContext";
import LvlBadge from "../LvlBadge/LvlBadge";
import Button from "../Button";
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

function HomeHeader() {
  const auth = useUserAuth();
  const [level, setLevel] = useState<number | undefined>();
  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    setUserDetails();
  }, [auth.isAuthenticated]);

  const setUserDetails = () => {
    let userData = auth.user;
    if (userData !== null) {
      setUsername(userData.username);
      setLevel(userData.level);
    }
  };

  // TODO: show loading skeleton
  return (
    <HeaderWrapper bgcolor="var(--light-greyish-purple)">
      <UserInfoContainer>
        <LvlBadge level={level}></LvlBadge>
        <p>{username}</p>
      </UserInfoContainer>
      <SettingsButton backgroundColor="transparent">
        <SettingsImg src={SettingsIcon} alt="settings icon"></SettingsImg>
      </SettingsButton>
    </HeaderWrapper>
  );
}

export default HomeHeader;
