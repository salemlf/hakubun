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
  isButtonLink?: boolean;
};

// TODO: create a version that links to subject as button, no locked styling, no popover
export const SubjectCard = ({
  subject,
  assignment,
  clickDisabled,
  locked,
  useLockedStyle,
  isButtonLink = false,
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

  const onClickEvent = (e: any) => {
    if (isButtonLink) {
      navigate(`/subject/${subject.id}`);
    } else {
      present({
        event: e.nativeEvent,
        size: "auto",
        alignment: "center",
      });
    }
  };

  return (
    <IonRow className="ion-justify-content-center">
      {(subject && assignment) || (subject && locked) ? (
        subject.useImage ? (
          <button
            key={`${subject.id}`}
            className={`${styles.radicalDivWithImg} ${
              isButtonLink ? styles.buttonLink : ""
            }`}
            onClick={(e: any) => onClickEvent(e)}
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
            } ${useLockedStyle && locked ? styles.lockedSubj : ""} ${
              isButtonLink ? styles.buttonLink : ""
            }`}
            onClick={(e: any) => onClickEvent(e)}
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
