import { useHistory } from "react-router";
import { IonRow, useIonPopover } from "@ionic/react";

import { SubjectCardLoading } from "../loading-skeletons/SubjectCardLoading";
import { SubjCardPopover } from "../SubjCardPopover";

import styles from "./SubjectCard.module.scss";

import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

type RadProps = {
  subject: Subject;
  assignment: Assignment | undefined;
  clickDisabled?: boolean;
  locked: boolean;
  useLockedStyle: boolean;
};

// TODO: combine with RadicalImageCard since so many similarities
export const SubjectCard = ({
  subject,
  assignment,
  clickDisabled,
  locked,
  useLockedStyle,
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
    navigate,
  });

  return (
    <>
      <IonRow>
        {(subject && assignment) || (subject && locked) ? (
          <button
            title={
              subject.object === "radical" ? "Radical Subject" : "Kanji Subject"
            }
            className={`${styles.subjDiv} ${
              subject.object === "radical" ? styles.radStyle : styles.kanjiStyle
            } ${useLockedStyle && locked ? styles.lockedSubj : ""}`}
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
    </>
  );
};
