import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";

import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <p className={`${styles.footerText}`}>
          Icons by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </p>
      </IonToolbar>
    </IonFooter>
  );
};
