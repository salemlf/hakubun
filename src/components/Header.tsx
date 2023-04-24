import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonCol,
  IonItem,
  IonRow,
  IonIcon,
} from "@ionic/react";

import { settings } from "ionicons/icons";

interface Props {
  username?: string;
  level?: number;
}

// TODO: increase size of settings icon
// TODO: change settings icon into button w/ icon
const Header = ({ username, level }: Props) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <IonRow style={styles.row}>
            <IonCol>
              <IonItem>{username}</IonItem>
              <IonItem>{level}</IonItem>
            </IonCol>
            <IonCol style={styles.rightCol}>
              <IonIcon
                icon={settings}
                color="secondary"
                size="large"
                aria-hidden="true"
              ></IonIcon>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

let styles = {
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "10px",
  },
  rightCol: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};

export default Header;
