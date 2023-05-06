import { useState } from "react";

import { IonRow, useIonPopover } from "@ionic/react";

import { StepProgressBar } from "./StepProgressBar";

import styles from "./RadicalCard.module.scss";

type PopoverProps = {
  onHide: () => void;
  selectedRadical: any;
};

export const RadicalDetailPopover = ({
  onHide,
  selectedRadical,
}: PopoverProps) => {
  // *testing
  console.log("selectedRadical: ", selectedRadical);
  // *testing

  return (
    <div className={`${styles.radicalPopover}`}>
      <p className={`${styles.radicalText}`}>{selectedRadical.characters}</p>
    </div>
  );
};

type RadProps = {
  radicalObj: any;
  srsStage: number;
};

export const RadicalCard = ({ radicalObj, srsStage }: RadProps) => {
  const [selectedRadical, setSelectedRadical] = useState<any>();
  const [present, dismiss] = useIonPopover(RadicalDetailPopover, {
    onHide: () => {
      dismiss();
    },
    size: "cover",
    selectedRadical,
  });

  return (
    <>
      <IonRow>
        <button
          className={`${styles.radicalDiv}`}
          onClick={(e: any) => {
            setSelectedRadical(radicalObj);
            present({
              event: e.nativeEvent,
              size: "auto",
              alignment: "center",
              cssClass: "radPopover",
            });
          }}
        >
          <p className={`${styles.radicalText}`}>{radicalObj.characters}</p>
        </button>
      </IonRow>
      <IonRow className={`${styles.progressContainer}`}>
        <StepProgressBar stage={srsStage}></StepProgressBar>
      </IonRow>
    </>
  );
};
