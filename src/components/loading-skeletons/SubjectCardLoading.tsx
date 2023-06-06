import { IonSkeletonText } from "@ionic/react";

import styles from "./SubjectCardLoading.module.scss";

// TODO: use prop for specifying size
export const SubjectCardLoading = () => {
  return (
    <IonSkeletonText
      className={`${styles.subjDiv}`}
      animated={true}
    ></IonSkeletonText>
  );
};
