import { useState } from "react";

import { IonRow, useIonPopover } from "@ionic/react";

import { StepProgressBar } from "./StepProgressBar";
import { getTimeFromNow } from "../helpers/getTimeFromNow";

import styles from "./SubjectCard.module.scss";

type PopoverProps = {
  onHide: () => void;
  selectedSubj: any;
  availTime: string | null;
};

export const SubjDetailPopover = ({
  onHide,
  selectedSubj,
  availTime,
}: PopoverProps) => {
  // *testing
  console.log("selectedSubj: ", selectedSubj);
  // *testing

  let timeTill = getTimeFromNow(availTime);
  console.log("🚀 ~ file: RadicalCard.tsx:26 ~ timeTill:", timeTill);

  return (
    <div className={`${styles.subjPopover}`}>
      <p className={`${styles.subjText}`}>{selectedSubj.characters}</p>
      <p>{timeTill}</p>
    </div>
  );
};

type RadProps = {
  // TODO: change to use Subject obj type
  subject: any;
  srsStage: number;
  availTime: string | null;
};

export const SubjectCard = ({ subject, srsStage, availTime }: RadProps) => {
  const [selectedSubj, setSelectedSubj] = useState<any>();
  const [present, dismiss] = useIonPopover(SubjDetailPopover, {
    onHide: () => {
      dismiss();
    },
    size: "cover",
    selectedSubj,
    availTime,
  });

  return (
    <>
      <IonRow>
        <button
          className={`${styles.subjDiv}`}
          onClick={(e: any) => {
            setSelectedSubj(subject);
            present({
              event: e.nativeEvent,
              size: "auto",
              alignment: "center",
              cssClass: "radPopover",
            });
          }}
        >
          <p className={`${styles.subjText}`}>{subject.characters}</p>
        </button>
      </IonRow>
      <IonRow className={`${styles.progressContainer}`}>
        <StepProgressBar stage={srsStage}></StepProgressBar>
      </IonRow>
    </>
  );
};
