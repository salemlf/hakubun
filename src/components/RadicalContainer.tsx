import { useEffect, useState } from "react";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  useIonPopover,
  IonContent,
  IonItem,
} from "@ionic/react";

import { StepProgressBar } from "./StepProgressBar";
import ImageFallback from "./ImageFallback";
import { Subject } from "../types/Subject";
import { useRadicalAssignmentsForLvl } from "../hooks/useRadicalAssignmentsForLvl";
import { useRadicalSubjectsForLvl } from "../hooks/useRadicalSubjectsForLvl";
// import "./RadicalContainer.module.scss";
import styles from "./RadicalContainer.module.scss";

interface Props {
  level: number | undefined;
}

interface SrsLevels {
  [key: string]: any;
}

type PopoverProps = {
  onHide: () => void;
  selectedRadical: any;
};

const RadicalDetailPopover = ({ onHide, selectedRadical }: PopoverProps) => {
  // *testing
  console.log("selectedRadical: ", selectedRadical);
  // *testing
  if (selectedRadical.useImage) {
    return (
      <div className={`${styles.radicalPopoverWithImg}`}>
        <ImageFallback
          images={selectedRadical.availableImages}
          altText={selectedRadical.meaning_mnemonic}
        ></ImageFallback>
      </div>
    );
  } else {
    return (
      <div className={`${styles.radicalPopover}`}>
        <p className={`${styles.radicalText}`}>{selectedRadical.characters}</p>
      </div>
    );
  }
};

// TODO: use image description
export const RadicalContainer = ({ level }: Props) => {
  const [srsStages, setSrsStages] = useState<SrsLevels>({});
  const [selectedRadical, setSelectedRadical] = useState<any>();
  const [present, dismiss] = useIonPopover(RadicalDetailPopover, {
    onHide: () => {
      dismiss();
    },
    size: "cover",
    selectedRadical,
  });

  const {
    isLoading: radicalSubLvlLoading,
    data: radicalSubLvlData,
    error: radicalSubLvlErr,
  } = useRadicalSubjectsForLvl(level);

  const {
    isLoading: radicalAssignmentLvlLoading,
    data: radicalAssignmentLvlData,
    error: radicalAssignmentLvlErr,
  } = useRadicalAssignmentsForLvl(level, radicalSubLvlData);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (radicalSubLvlData) {
      let mappedSrsLvls: SrsLevels = {};

      radicalSubLvlData.forEach((radical: any) => {
        const found = radicalAssignmentLvlData.find(
          ({ subject_id }: any) => subject_id === radical.id
        );

        if (found) {
          mappedSrsLvls[radical.id] = found.srs_stage;
        }
      });

      setSrsStages(mappedSrsLvls);
    }
  }, [radicalAssignmentLvlData]);

  //   TODO: change to ternary where loading skeleton is displayed while no data
  return (
    <>
      {radicalSubLvlData && radicalAssignmentLvlData && (
        <IonCard className={`${styles.radicalCard}`}>
          <IonCardHeader>
            <IonCardTitle className={`${styles.radicalCardTitle}`}>
              Radicals
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className={`${styles.cardContent}`}>
            <IonRow class="ion-align-items-center ion-justify-content-start">
              {(radicalSubLvlData as Subject[]).map((radical: any) => {
                return (
                  <IonCol
                    key={`col_${radical.id}`}
                    size="2"
                    className={`${styles.radItemContainer}`}
                  >
                    {/* TODO: change below into its own component */}
                    {radical.useImage ? (
                      <>
                        <IonRow>
                          <button
                            key={`${radical.id}`}
                            className={`${styles.radicalDivWithImg}`}
                            onClick={(e: any) => {
                              setSelectedRadical(radical);
                              present({
                                event: e.nativeEvent,
                                size: "auto",
                                alignment: "center",
                                cssClass: "radPopover",
                              });
                            }}
                          >
                            <ImageFallback
                              images={radical.availableImages}
                              altText={radical.meaning_mnemonic}
                            ></ImageFallback>
                          </button>
                        </IonRow>
                        <IonRow className={`${styles.progressContainer}`}>
                          <StepProgressBar
                            stage={srsStages[radical.id]}
                          ></StepProgressBar>
                        </IonRow>
                      </>
                    ) : (
                      <>
                        <IonRow>
                          {/* TODO: change below into its own component */}
                          <button
                            key={`${radical.id}`}
                            className={`${styles.radicalDiv}`}
                            onClick={(e: any) => {
                              setSelectedRadical(radical);
                              present({
                                event: e.nativeEvent,
                                size: "auto",
                                alignment: "center",
                                cssClass: "radPopover",
                              });
                            }}
                          >
                            <p className={`${styles.radicalText}`}>
                              {radical.characters}
                            </p>
                          </button>
                        </IonRow>
                        <IonRow className={`${styles.progressContainer}`}>
                          <StepProgressBar
                            stage={srsStages[radical.id]}
                          ></StepProgressBar>
                        </IonRow>
                      </>
                    )}
                  </IonCol>
                );
              })}
            </IonRow>
            {srsStages && (
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
            )}
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};
