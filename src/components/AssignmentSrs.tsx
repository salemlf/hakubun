import { IonRow, IonBadge } from "@ionic/react";
import styles from "./AssignmentSrs.module.scss";

import {
  getTimeFromNow,
  getSrsNameBySrsLvl,
  convertToUpperCase,
} from "../services/MiscService";
import { Assignment } from "../types/Assignment";

type Props = {
  assignment: Assignment;
};

export const AssignmentSrs = ({ assignment }: Props) => {
  let timeTill = getTimeFromNow(assignment.available_at);

  const getSrsLvl = () => {
    return getSrsNameBySrsLvl(assignment.srs_stage);
  };

  return (
    <div className={`${styles.srsContainer}`}>
      <p>{timeTill}</p>
      <p className={`${styles.srsLevel} ${styles[getSrsLvl()]}`}>
        {convertToUpperCase(getSrsLvl())}
      </p>
    </div>
  );
};
