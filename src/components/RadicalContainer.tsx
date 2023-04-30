import { useEffect, useState } from "react";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { ProgressBar } from "./ProgressBar";
import { Subject } from "../types/Subject";
import { useRadicalAssignmentsForLvl } from "../hooks/useRadicalAssignmentsForLvl";
import { useRadicalSubjectsForLvl } from "../hooks/useRadicalSubjectsForLvl";
import styles from "./RadicalContainer.module.css";

interface Props {
  level: number | undefined;
}

interface SrsLevels {
  [key: string]: any;
}

// TODO: use image description
export const RadicalContainer = ({ level }: Props) => {
  const [srsStages, setSrsStages] = useState<SrsLevels>({});

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
        <IonGrid>
          <IonRow>
            <IonCol>
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
                        <IonCol key={`col_${radical.id}`} size="2">
                          {radical.selectedImage ? (
                            <>
                              <div
                                key={`${radical.id}`}
                                className={`${styles.radicalDivWithImg}`}
                              >
                                <img
                                  src={
                                    radical.selectedImage
                                      ? radical.selectedImage
                                      : radical.fallbackImage
                                  }
                                  alt="radical image"
                                />
                              </div>
                              <ProgressBar
                                stage={srsStages[radical.id]}
                              ></ProgressBar>
                            </>
                          ) : (
                            <>
                              <div
                                key={`${radical.id}`}
                                className={`${styles.radicalDiv}`}
                              >
                                <p className={`${styles.radicalText}`}>
                                  {radical.characters}
                                </p>
                              </div>
                              <ProgressBar
                                stage={srsStages[radical.id]}
                              ></ProgressBar>
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
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </>
  );
};
