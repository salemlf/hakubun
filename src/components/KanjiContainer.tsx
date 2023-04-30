import { useEffect, useState } from "react";

import {
  IonRow,
  IonCard,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { ProgressBar } from "./ProgressBar";
import { useKanjiSubjectsForLvl } from "../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../hooks/useKanjiAssignmentsForLvl";
import { Subject } from "../types/Subject";
import styles from "./KanjiContainer.module.css";

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
  } = useKanjiAssignmentsForLvl(level, kanjiSubLvlData);

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
                  <IonCol key={`col_${kanjiItem.id}`} size="2">
                    <div
                      key={`${kanjiItem.id}`}
                      className={`${styles.kanjiDiv}`}
                    >
                      <p className={`${styles.kanjiText}`}>
                        {kanjiItem.characters}
                      </p>
                    </div>
                    <ProgressBar stage={srsStages[kanjiItem.id]}></ProgressBar>
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
