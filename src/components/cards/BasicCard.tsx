import { useState } from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSkeletonText,
} from "@ionic/react";

import styles from "./BasicCard.module.scss";

interface Props {
  children?: React.ReactNode;
  title: string;
  isLoading: boolean;
}

export const BasicCard = ({ children, title, isLoading }: Props) => {
  const [loading, setLoading] = useState(true);
  return (
    <IonCard className={`${styles.basicCard}`}>
      <IonCardHeader>
        {!isLoading ? (
          <IonCardTitle className={`${styles.basicCardTitle}`}>
            {title}
          </IonCardTitle>
        ) : (
          <IonCardTitle className={`${styles.basicCardTitle}`}>
            <IonSkeletonText
              animated={true}
              style={{ height: "20px" }}
            ></IonSkeletonText>
          </IonCardTitle>
        )}
      </IonCardHeader>
      <IonCardContent className={`${styles.cardContent}`}>
        {children}
      </IonCardContent>
    </IonCard>
  );
};
