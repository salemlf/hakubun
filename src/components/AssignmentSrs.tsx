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
  console.log(
    "🚀 ~ file: AssignmentSrs.tsx:16 ~ AssignmentSrs ~ assignment:",
    assignment
  );

  let timeTill = getTimeFromNow(assignment.available_at);

  const getSrsLvl = () => {
    return getSrsNameBySrsLvl(assignment.srs_stage);
  };

  // TODO: display badge color using srs phase color, similar to SrsStages component
  return (
    <IonRow className={`${styles.srsContainer}`}>
      <p>{timeTill}</p>
      <IonBadge className={`${styles.srsLevel} ${getSrsLvl()}`}>
        {convertToUpperCase(getSrsLvl())}
      </IonBadge>
    </IonRow>
  );
};
