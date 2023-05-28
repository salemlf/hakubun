import { useHistory } from "react-router";
import { IonRow, IonItem, useIonPopover } from "@ionic/react";

import { StepProgressBar } from "../progress/StepProgressBar";
import { SubjectCardLoading } from "../loading-skeletons/SubjectCardLoading";
import { StepProgressBarLoading } from "../loading-skeletons/StepProgressBarLoading";

import { getTimeFromNow } from "../../services/MiscService";

import "./SubjectCard.module.scss";
import styles from "./SubjectCard.module.scss";
import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

type PopoverProps = {
  subject: Subject;
  assignment: Assignment;
  isRadical: boolean;
  navigate: any;
};

export const SubjDetailPopover = ({
  subject,
  assignment,
  isRadical,
  navigate,
}: PopoverProps) => {
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

type RadProps = {
  subject: Subject | undefined;
  assignment: Assignment | undefined;
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
  const history = useHistory();
  const handleDismiss = () => dismiss();

  const navigate = (route: string) => {
    handleDismiss();
    history.push(route);
  };

  const [present, dismiss] = useIonPopover(SubjDetailPopover, {
    size: "cover",
    subject,
    assignment,
    isRadical,
    navigate,
  });

  return (
    <>
      <IonRow>
        {subject && assignment ? (
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
        ) : (
          <SubjectCardLoading />
        )}
      </IonRow>
      {displayProgress && (
        <IonRow className={`${styles.progressContainer}`}>
          {assignment ? (
            <StepProgressBar
              stage={assignment.srs_stage}
              passedAt={assignment.passed_at}
            ></StepProgressBar>
          ) : (
            <StepProgressBarLoading />
          )}
        </IonRow>
      )}
    </>
  );
};
