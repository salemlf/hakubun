import { useState } from "react";
import { IonRow, IonItem, useIonPopover } from "@ionic/react";

import { StepProgressBar } from "../progress/StepProgressBar";

import { getTimeFromNow } from "../../services/MiscService";

import "./SubjectCard.module.scss";
import styles from "./SubjectCard.module.scss";

type PopoverProps = {
  selectedSubj: any;
  isRadical: boolean;
};

export const SubjDetailPopover = ({
  selectedSubj,
  isRadical,
}: PopoverProps) => {
  let availTime = selectedSubj.available_at;

  let timeTill = getTimeFromNow(availTime);

  return (
    <IonItem
      routerLink={`/subject/${selectedSubj.subject_id || selectedSubj.id}`}
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
        <p className={`${styles.subjText}`}>{selectedSubj.characters}</p>
        <p>{timeTill}</p>
      </div>
    </IonItem>
  );
};

type RadProps = {
  // TODO: change to use Subject obj type
  subject: any;
  isRadical: boolean;
  displayProgress?: boolean;
  clickDisabled?: boolean;
};

// TODO: pass in option to disable popover (just disable button?)
export const SubjectCard = ({
  subject,
  isRadical,
  displayProgress = true,
  clickDisabled,
}: RadProps) => {
  const [selectedSubj, setSelectedSubj] = useState<any>();
  const [present] = useIonPopover(SubjDetailPopover, {
    size: "cover",
    selectedSubj,
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
            setSelectedSubj(subject);
            present({
              event: e.nativeEvent,
              size: "auto",
              alignment: "center",
              cssClass: "radPopover",
            });
          }}
          disabled={clickDisabled}
        >
          <p className={`${styles.subjText}`}>{subject.characters}</p>
        </button>
      </IonRow>
      {displayProgress && (
        <IonRow className={`${styles.progressContainer}`}>
          <StepProgressBar stage={subject.srs_stage}></StepProgressBar>
        </IonRow>
      )}
    </>
  );
};
