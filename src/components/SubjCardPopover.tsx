import { IonRow, IonItem, useIonPopover } from "@ionic/react";

import { getTimeFromNow } from "../services/MiscService";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import styles from "./SubjCardPopover.module.scss";

type Props = {
  subject: Subject;
  assignment: Assignment;
  isRadical: boolean;
  navigate: any;
};

export const SubjCardPopover = ({
  subject,
  assignment,
  isRadical,
  navigate,
}: Props) => {
  let availTime = assignment.available_at;
  let timeTill = getTimeFromNow(availTime);

  return (
    <IonItem
      button
      detail={false}
      className={isRadical ? `${styles.radItem}` : `${styles.kanjiItem}`}
      onClick={() => navigate(`/subject/${subject.id}`)}
    >
      <div
        className={
          isRadical
            ? `${styles.radStyle} ${styles.subjPopover}`
            : `${styles.kanjiStyle} ${styles.subjPopover}`
        }
      >
        <p className={`${styles.subjText}`}>{subject.characters}</p>
        <p>{timeTill}</p>
      </div>
    </IonItem>
  );
};
