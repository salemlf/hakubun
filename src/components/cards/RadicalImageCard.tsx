import { useState } from "react";
import { IonItem, IonRow, useIonPopover } from "@ionic/react";

// import { SubjAndAssignment } from "../../types/MiscTypes";

import ImageFallback from "../ImageFallback";
import { StepProgressBar } from "../progress/StepProgressBar";

import { getTimeFromNow } from "../../services/MiscService";

import styles from "./RadicalImageCard.module.scss";
import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

type PopoverProps = {
  // TODO: change to subject or assignment
  selectedRadical: any;
};

const RadicalDetailPopover = ({ selectedRadical }: PopoverProps) => {
  let availTime = selectedRadical.available_at;

  // TODO: this is always returning N/A for subjects on homescreen, fix
  let timeTill = getTimeFromNow(availTime);

  return (
    <IonItem
      className={`${styles.ionItem}`}
      button={true}
      routerLink={`/subject/${
        selectedRadical.subject_id || selectedRadical.id
      }`}
      routerDirection="forward"
    >
      <div className={`${styles.radicalPopoverWithImg}`}>
        <ImageFallback
          images={selectedRadical.availableImages}
          altText={selectedRadical.meaning_mnemonic}
        ></ImageFallback>
        <p>{timeTill}</p>
      </div>
    </IonItem>
  );
};

type RadImageProps = {
  // radicalObj: SubjAndAssignment;
  radicalSubj: Subject;
  displayProgress?: boolean;
  clickDisabled?: boolean;
};

export const RadicalImageCard = ({
  radicalSubj,
  displayProgress = true,
  clickDisabled,
}: RadImageProps) => {
  const [selectedRadical, setSelectedRadical] = useState<any>();
  const [present] = useIonPopover(RadicalDetailPopover, {
    size: "cover",
    selectedRadical,
  });
  return (
    <>
      <IonRow>
        <button
          key={`${radicalSubj.id}`}
          className={`${styles.radicalDivWithImg}`}
          onClick={(e: any) => {
            setSelectedRadical(radicalSubj);
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
            images={radicalSubj.availableImages}
            altText={radicalSubj.meaning_mnemonic}
          ></ImageFallback>
        </button>
      </IonRow>
      {displayProgress && (
        <IonRow className={`${styles.progressContainer}`}>
          <StepProgressBar
            // stage={radicalAssignment.srs_stage}
            subjID={radicalSubj.id}
          ></StepProgressBar>
        </IonRow>
      )}
    </>
  );
};
