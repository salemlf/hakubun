import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonButtons,
} from "@ionic/react";

import { LvlBadge } from "./LvlBadge";
import settingsIcon from "../images/settings.svg";

import styled from "styled-components/macro";

const SettingsImg = styled.img`
  max-height: 100%;
`;

const Button = styled(IonButton)`
  min-height: 38px;
`;

const UserInfoCol = styled(IonCol)`
  flex-grow: 0;

  p {
    font-size: 1.25rem;
    margin: 0;
  }
`;

const HeaderRow = styled(IonRow)`
  align-items: center;
  justify-content: flex-start;
`;

// TODO: add click event for settings button
const Header = () => {
  const auth = useAuth();
  const [level, setLevel] = useState<number | undefined>();
  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    setUserDetails();
  }, [auth]);

  const setUserDetails = () => {
    let username = auth.auth!.username;
    setUsername(username);

    let userData = auth.userData;
    if (userData != undefined) {
      setLevel(userData.level);
    }
  };

  // TODO: show loading skeleton
  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <HeaderRow>
            <UserInfoCol>
              <LvlBadge level={level}></LvlBadge>
            </UserInfoCol>
            <UserInfoCol>
              <p>{username}</p>
            </UserInfoCol>
          </HeaderRow>
        </IonGrid>
        <IonButtons slot="primary">
          <Button>
            <SettingsImg src={settingsIcon} alt="settings icon"></SettingsImg>
          </Button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
