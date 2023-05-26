import { IonItem, IonRow, useIonPopover } from "@ionic/react";

import ImageFallback from "../ImageFallback";
import { StepProgressBar } from "../progress/StepProgressBar";
import { SubjectCardLoading } from "../loading-skeletons/SubjectCardLoading";
import { StepProgressBarLoading } from "../loading-skeletons/StepProgressBarLoading";

import { getTimeFromNow } from "../../services/MiscService";

import styles from "./RadicalImageCard.module.scss";
import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

type PopoverProps = {
  subject: Subject;
  assignment: Assignment;
};

const RadicalDetailPopover = ({ subject, assignment }: PopoverProps) => {
  let availTime = assignment.available_at;

  let timeTill = getTimeFromNow(availTime);

  return (
    <IonItem
      className={`${styles.ionItem}`}
      button={true}
      routerLink={`/subject/${subject.id}`}
      routerDirection="forward"
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
};

type RadImageProps = {
  subject: Subject;
  assignment: Assignment | undefined;
  displayProgress?: boolean;
  clickDisabled?: boolean;
};

export const RadicalImageCard = ({
  subject,
  assignment,
  displayProgress = true,
  clickDisabled,
}: RadImageProps) => {
  const [present] = useIonPopover(RadicalDetailPopover, {
    size: "cover",
    subject,
    assignment,
  });
  return (
    <>
      <IonRow>
        {subject && assignment ? (
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
          <SubjectCardLoading />
        )}
      </IonRow>

      {displayProgress && (
        <IonRow className={`${styles.progressContainer}`}>
          {assignment ? (
            <StepProgressBar stage={assignment.srs_stage}></StepProgressBar>
          ) : (
            <StepProgressBarLoading />
          )}
        </IonRow>
      )}
    </>
  );
};
