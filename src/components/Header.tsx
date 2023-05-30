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
  IonBackButton,
} from "@ionic/react";

import { LvlBadge } from "./LvlBadge";

import styles from "./Header.module.scss";

import settingsIcon from "../images/settings.svg";

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

    // let level = auth.auth!.level;
    // setLevel(level);

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
          <IonRow
            class="ion-justify-content-start"
            className={`${styles.userInfoRow}`}
          >
            <IonCol className={`${styles.userInfoCol}`}>
              <LvlBadge level={level}></LvlBadge>
            </IonCol>
            <IonCol className={`${styles.userInfoCol}`}>
              <p>{username}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButtons slot="primary">
          <IonButton>
            <img
              src={settingsIcon}
              width="50"
              height="50"
              alt="settings icon"
            ></img>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
