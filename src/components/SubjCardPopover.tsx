import { IonItem } from "@ionic/react";

import { getTimeFromNow } from "../services/MiscService";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import ImageFallback from "./ImageFallback";

import styles from "./SubjCardPopover.module.scss";

type Props = {
  subject: Subject;
  assignment: Assignment | undefined;
  navigate: (page: string) => void;
};

export const SubjCardPopover = ({ subject, assignment, navigate }: Props) => {
  let timeTill;
  if (assignment) {
    let availTime = assignment.available_at;
    timeTill = getTimeFromNow(availTime);
  } else {
    // TODO: display locked icon instead
    timeTill = "Locked";
  }

  if (subject.object == "radical" && subject.useImage === true) {
    // image card for when characters aren't available
    return (
      <IonItem
        button
        detail={false}
        className={`${styles.ionItem}`}
        onClick={() => navigate(`/subject/${subject.id}`)}
      >
        <div className={`${styles.radicalPopoverWithImg}`}>
          <ImageFallback
            images={subject.availableImages}
            altText={subject.meaning_mnemonic}
          ></ImageFallback>
          <p>{timeTill}</p>
        </div>
      </IonItem>
    );
  }

  return (
    <IonItem
      button
      detail={false}
      className={
        subject.object === "radical"
          ? `${styles.radItem}`
          : `${styles.kanjiItem}`
      }
      onClick={() => navigate(`/subject/${subject.id}`)}
    >
      <div
        className={
          subject.object === "radical"
            ? `${styles.radItem} ${styles.subjPopover}`
            : `${styles.kanjiItem} ${styles.subjPopover}`
        }
      >
        <p className={`${styles.subjText}`}>{subject.characters}</p>
        <p>{timeTill}</p>
      </div>
    </IonItem>
  );
};
