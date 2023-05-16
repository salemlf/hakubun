import { useState } from "react";
import { IonItem, IonRow, useIonPopover } from "@ionic/react";

import { SubjAndAssignment } from "../../types/MiscTypes";

import ImageFallback from "../ImageFallback";
import { StepProgressBar } from "../progress/StepProgressBar";

import { getTimeFromNow } from "../../services/MiscService";

import styles from "./RadicalImageCard.module.scss";

type PopoverProps = {
  selectedRadical: SubjAndAssignment;
};

const RadicalDetailPopover = ({ selectedRadical }: PopoverProps) => {
  let availTime = selectedRadical.available_at;

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
  radicalObj: SubjAndAssignment;
  displayProgress?: boolean;
  clickDisabled?: boolean;
};

export const RadicalImageCard = ({
  radicalObj,
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
          key={`${radicalObj.id}`}
          className={`${styles.radicalDivWithImg}`}
          onClick={(e: any) => {
            setSelectedRadical(radicalObj);
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
            images={radicalObj.availableImages}
            altText={radicalObj.meaning_mnemonic}
          ></ImageFallback>
        </button>
      </IonRow>
      {displayProgress && (
        <IonRow className={`${styles.progressContainer}`}>
          <StepProgressBar stage={radicalObj.srs_stage}></StepProgressBar>
        </IonRow>
      )}
    </>
  );
};
