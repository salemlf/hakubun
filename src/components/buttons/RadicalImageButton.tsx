import { useState } from "react";

import { IonRow, useIonPopover } from "@ionic/react";

import ImageFallback from "../ImageFallback";
import { StepProgressBar } from "../progress/StepProgressBar";
import { getTimeFromNow } from "../../helpers/getTimeFromNow";

import styles from "./RadicalImageButton.module.scss";

type PopoverProps = {
  onHide: () => void;
  selectedRadical: any;
  availTime: string | null;
};

const RadicalDetailPopover = ({
  onHide,
  selectedRadical,
  availTime,
}: PopoverProps) => {
  let timeTill = getTimeFromNow(availTime);

  return (
    <div className={`${styles.radicalPopoverWithImg}`}>
      <ImageFallback
        images={selectedRadical.availableImages}
        altText={selectedRadical.meaning_mnemonic}
      ></ImageFallback>
      <p>{timeTill}</p>
    </div>
  );
};

type RadImageProps = {
  radicalObj: any;
  availableImages: any[];
  srsStage: number;
  availTime: string | null;
};

export const RadicalImageCard = ({
  radicalObj,
  availableImages,
  srsStage,
  availTime,
}: RadImageProps) => {
  const [selectedRadical, setSelectedRadical] = useState<any>();
  const [present, dismiss] = useIonPopover(RadicalDetailPopover, {
    onHide: () => {
      dismiss();
    },
    size: "cover",
    selectedRadical,
    availTime,
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
        >
          <ImageFallback
            images={availableImages}
            altText={radicalObj.meaning_mnemonic}
          ></ImageFallback>
        </button>
      </IonRow>
      <IonRow className={`${styles.progressContainer}`}>
        <StepProgressBar stage={srsStage}></StepProgressBar>
      </IonRow>
    </>
  );
};
