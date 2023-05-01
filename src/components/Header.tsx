import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonCol,
  IonItem,
  IonRow,
  IonIcon,
  IonButton,
  IonButtons,
  IonBadge,
} from "@ionic/react";

import {
  create,
  ellipsisHorizontal,
  ellipsisVertical,
  helpCircle,
  search,
  personCircle,
  star,
} from "ionicons/icons";

import { settings } from "ionicons/icons";

import styles from "./Header.module.css";

import settingsIcon from "../images/settings.svg";

interface Props {
  username?: string;
  level?: number;
}

// TODO: add click event for settings button
const Header = ({ username, level }: Props) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <IonRow
            class="ion-justify-content-start"
            className={`${styles.userInfoRow}`}
          >
            <IonCol className={`${styles.userInfoCol}`}>
              <IonItem>
                <IonBadge slot="start" className={`${styles.lvlTxt}`}>
                  {level}
                </IonBadge>
              </IonItem>
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
