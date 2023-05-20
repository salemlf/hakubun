import { IonRow, IonItem, useIonPopover } from "@ionic/react";

import { StepProgressBar } from "../progress/StepProgressBar";

import { getTimeFromNow } from "../../services/MiscService";

import "./SubjectCard.module.scss";
import styles from "./SubjectCard.module.scss";
import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

type PopoverProps = {
  subject: Subject;
  assignment: Assignment;
  isRadical: boolean;
};

export const SubjDetailPopover = ({
  subject,
  assignment,
  isRadical,
}: PopoverProps) => {
  let availTime = assignment.available_at;
  let timeTill = getTimeFromNow(availTime);

  return (
    <IonItem
      routerLink={`/subject/${subject.id}`}
      routerDirection="forward"
      className={isRadical ? `${styles.radItem}` : `${styles.kanjiItem}`}
      button={true}
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

type RadProps = {
  subject: Subject;
  assignment: Assignment;
  isRadical: boolean;
  displayProgress?: boolean;
  clickDisabled?: boolean;
};

export const SubjectCard = ({
  subject,
  assignment,
  isRadical,
  displayProgress = true,
  clickDisabled,
}: RadProps) => {
  const [present] = useIonPopover(SubjDetailPopover, {
    size: "cover",
    subject,
    assignment,
    isRadical,
  });

  return (
    <>
      <IonRow>
        <button
          title={isRadical ? "Radical Subject" : "Kanji Subject"}
          className={
            isRadical
              ? `${styles.radStyle} ${styles.subjDiv}`
              : `${styles.kanjiStyle} ${styles.subjDiv}`
          }
          onClick={(e: any) => {
            present({
              event: e.nativeEvent,
              size: "auto",
              alignment: "center",
              cssClass: "radPopover",
            });
          }}
          disabled={clickDisabled}
        >
          {subject && (
            <p className={`${styles.subjText}`}>{subject.characters}</p>
          )}
        </button>
      </IonRow>
      {displayProgress && (
        <IonRow className={`${styles.progressContainer}`}>
          <StepProgressBar stage={assignment.srs_stage}></StepProgressBar>
        </IonRow>
      )}
    </>
  );
};
