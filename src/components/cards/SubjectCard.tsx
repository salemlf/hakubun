import { useHistory } from "react-router";
import { IonRow, useIonPopover } from "@ionic/react";

import { StepProgressBar } from "../progress/StepProgressBar";
import { SubjectCardLoading } from "../loading-skeletons/SubjectCardLoading";
import { StepProgressBarLoading } from "../loading-skeletons/StepProgressBarLoading";
import { SubjCardPopover } from "../SubjCardPopover";

import styles from "./SubjectCard.module.scss";

import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

type RadProps = {
  subject: Subject | undefined;
  assignment: Assignment | undefined;
  isRadical: boolean;
  displayProgress?: boolean;
  clickDisabled?: boolean;
  locked: boolean;
};

// TODO: combine with RadicalImageCard since so many similarities
export const SubjectCard = ({
  subject,
  assignment,
  isRadical,
  displayProgress = true,
  clickDisabled,
  locked,
}: RadProps) => {
  const history = useHistory();
  const handleDismiss = () => dismiss();

  // TODO: use useHistory or useLocation to set state/type of subject
  const navigate = (route: string) => {
    handleDismiss();
    history.push(route);
  };

  const [present, dismiss] = useIonPopover(SubjCardPopover, {
    size: "cover",
    subject,
    assignment,
    isRadical,
    navigate,
  });

  return (
    <>
      <IonRow>
        {(subject && assignment) || (subject && locked) ? (
          <button
            title={isRadical ? "Radical Subject" : "Kanji Subject"}
            className={`${styles.subjDiv} ${
              isRadical ? styles.radStyle : styles.kanjiStyle
            } ${locked ? styles.lockedSubj : ""}`}
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
      {/* TODO: lift this up in tree so no need for displayProgress? */}
      {displayProgress && (
        <IonRow className={`${styles.progressContainer}`}>
          {assignment || locked ? (
            <StepProgressBar
              stage={assignment?.srs_stage || 0}
              passedAt={assignment?.passed_at || null}
            ></StepProgressBar>
          ) : (
            <StepProgressBarLoading />
          )}
        </IonRow>
      )}
    </>
  );
};
