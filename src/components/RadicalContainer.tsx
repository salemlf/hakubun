import { useEffect, useState } from "react";

import {
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { Subject } from "../types/Subject";

import { RadicalImageCard } from "./RadicalImageCard";
import { RadicalCard } from "./RadicalCard";

import { useRadicalAssignmentsForLvl } from "../hooks/useRadicalAssignmentsForLvl";
import { useRadicalSubjectsForLvl } from "../hooks/useRadicalSubjectsForLvl";

import styles from "./RadicalContainer.module.scss";

interface Props {
  level: number | undefined;
}

interface SrsLevels {
  [key: string]: any;
}

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
                    {radical.useImage ? (
                      <RadicalImageCard
                        radicalObj={radical}
                        availableImages={radical.availableImages}
                        srsStage={srsStages[radical.id]}
                      ></RadicalImageCard>
                    ) : (
                      <RadicalCard
                        radicalObj={radical}
                        srsStage={srsStages[radical.id]}
                      ></RadicalCard>
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
