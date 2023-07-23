import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { useUserAuth } from "../../contexts/AuthContext";
import { LvlBadge } from "../LvlBadge";
import SettingsIcon from "../../images/settings.svg";
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
            <SettingsImg src={SettingsIcon} alt="settings icon"></SettingsImg>
          </Button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}

export default HomeHeader;
