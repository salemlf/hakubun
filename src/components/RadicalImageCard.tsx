import { useState } from "react";

import { IonRow, useIonPopover } from "@ionic/react";

import ImageFallback from "./ImageFallback";
import { StepProgressBar } from "./StepProgressBar";

import styles from "./RadicalImageCard.module.scss";

type PopoverProps = {
  onHide: () => void;
  selectedRadical: any;
};

const RadicalDetailPopover = ({ onHide, selectedRadical }: PopoverProps) => {
  // *testing
  console.log("selectedRadical: ", selectedRadical);
  // *testing

  return (
    <div className={`${styles.radicalPopoverWithImg}`}>
      <ImageFallback
        images={selectedRadical.availableImages}
        altText={selectedRadical.meaning_mnemonic}
      ></ImageFallback>
    </div>
  );
};

type RadImageProps = {
  radicalObj: any;
  availableImages: any[];
  srsStage: number;
};

export const RadicalImageCard = ({
  radicalObj,
  availableImages,
  srsStage,
}: RadImageProps) => {
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
