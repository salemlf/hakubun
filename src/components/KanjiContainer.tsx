import { useEffect, useState } from "react";

import {
  IonRow,
  IonCard,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { StepProgressBar } from "./StepProgressBar";
import { useKanjiSubjectsForLvl } from "../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../hooks/useKanjiAssignmentsForLvl";
import { Subject } from "../types/Subject";
import styles from "./KanjiContainer.module.scss";

interface Props {
  level: number | undefined;
}

interface SrsLevels {
  [key: string]: any;
}

export const KanjiContainer = ({ level }: Props) => {
  const [srsStages, setSrsStages] = useState<SrsLevels>({});
  const {
    isLoading: kanjiSubLvlLoading,
    data: kanjiSubLvlData,
    error: kanjiSubLvlErr,
  } = useKanjiSubjectsForLvl(level);

  const {
    isLoading: kanjiAssignmentsLvlLoading,
    data: kanjiAssignmentsLvlData,
    error: kanjiAssignmentsLvlErr,
  } = useKanjiAssignmentsForLvl(level, true, kanjiSubLvlData);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (kanjiSubLvlData) {
      let mappedSrsLvls: SrsLevels = {};

      kanjiSubLvlData.forEach((kanji: any) => {
        const found = kanjiAssignmentsLvlData.find(
          ({ subject_id }: any) => subject_id === kanji.id
        );

        if (found) {
          mappedSrsLvls[kanji.id] = found.srs_stage;
        }
      });

      setSrsStages(mappedSrsLvls);
    }
  }, [kanjiAssignmentsLvlData]);

  //   TODO: change to ternary where loading skeleton is displayed while no data
  return (
    <>
      {kanjiSubLvlData && (
        <IonCard className={`${styles.kanjiCard}`}>
          <IonCardHeader>
            <IonCardTitle className={`${styles.kanjiCardTitle}`}>
              Kanji
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className={`${styles.cardContent}`}>
            <IonRow class="ion-align-items-center ion-justify-content-start">
              {(kanjiSubLvlData as Subject[]).map((kanjiItem: any) => {
                return (
                  <IonCol
                    key={`col_${kanjiItem.id}`}
                    size="2"
                    className={`${styles.kanjiItemContainer}`}
                  >
                    <IonRow>
                      <div
                        key={`${kanjiItem.id}`}
                        className={`${styles.kanjiDiv}`}
                      >
                        <p className={`${styles.kanjiText}`}>
                          {kanjiItem.characters}
                        </p>
                      </div>
                    </IonRow>
                    <IonRow className={`${styles.progressContainer}`}>
                      <StepProgressBar
                        stage={srsStages[kanjiItem.id]}
                      ></StepProgressBar>
                    </IonRow>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};
