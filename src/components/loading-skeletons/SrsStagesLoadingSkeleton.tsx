import { IonCol, IonSkeletonText } from "@ionic/react";

import styles from "./SrsStagesLoadingSkeleton.module.scss";

export const SrsStagesLoadingSkeleton = () => {
  return (
    <>
      <IonCol size-xs="6" size-md="3">
        <IonSkeletonText
          animated={true}
          className={`${styles.btn}`}
        ></IonSkeletonText>
      </IonCol>
      <IonCol size-xs="6" size-md="3">
        <IonSkeletonText
          animated={true}
          className={`${styles.btn}`}
        ></IonSkeletonText>
      </IonCol>
      <IonCol size-xs="6" size-md="3">
        <IonSkeletonText
          animated={true}
          className={`${styles.btn}`}
        ></IonSkeletonText>
      </IonCol>
      <IonCol size-xs="6" size-md="3">
        <IonSkeletonText
          animated={true}
          className={`${styles.btn}`}
        ></IonSkeletonText>
      </IonCol>
      <IonCol size-xs="12" size-md="6">
        <IonSkeletonText
          animated={true}
          className={`${styles.btn}`}
        ></IonSkeletonText>
      </IonCol>
    </>
  );
};
