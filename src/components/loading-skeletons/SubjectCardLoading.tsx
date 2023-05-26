import { IonSkeletonText } from "@ionic/react";

import styles from "./SubjectCardLoading.module.scss";

export const SubjectCardLoading = () => {
  return (
    <IonSkeletonText
      className={`${styles.subjDiv}`}
      animated={true}
    ></IonSkeletonText>
  );
};
