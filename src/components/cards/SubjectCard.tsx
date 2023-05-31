import { useHistory } from "react-router";
import { IonRow, useIonPopover } from "@ionic/react";

import { SubjectCardLoading } from "../loading-skeletons/SubjectCardLoading";
import { SubjCardPopover } from "../SubjCardPopover";
import ImageFallback from "../ImageFallback";

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
    <IonRow>
      {(subject && assignment) || (subject && locked) ? (
        subject.useImage ? (
          <button
            key={`${subject.id}`}
            className={`${styles.radicalDivWithImg}`}
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
            <ImageFallback
              images={subject.availableImages}
              altText={subject.meaning_mnemonic}
            ></ImageFallback>
          </button>
        ) : (
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
        )
      ) : (
        <SubjectCardLoading />
      )}
    </IonRow>
  );
};
