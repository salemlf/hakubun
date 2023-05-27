import { IonItem, IonBadge } from "@ionic/react";

import styles from "./LvlBadge.module.scss";

type Props = {
  level: number | undefined;
};

export const LvlBadge = ({ level }: Props) => {
  return <IonBadge className={`${styles.lvlTxt}`}>{level}</IonBadge>;
};
