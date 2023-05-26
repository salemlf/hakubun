import { IonSkeletonText } from "@ionic/react";

import styles from "./StepProgressBarLoading.module.scss";

export const StepProgressBarLoading = () => {
  return (
    <IonSkeletonText
      className={`${styles.containerStyles}`}
      animated={true}
    ></IonSkeletonText>
  );
};
