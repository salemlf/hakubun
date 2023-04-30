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

export const KanjiContainer = ({ level }: Props) => {
  const {
    isLoading: kanjiSubLvlLoading,
    data: kanjiSubLvlData,
    error: kanjiSubLvlErr,
  } = useKanjiSubjectsForLvl(level);

  // TODO: map two datasets together
  const {
    isLoading: kanjiAssignmentsLvlLoading,
    data: kanjiAssignmentsLvlData,
    error: kanjiAssignmentsLvlErr,
  } = useKanjiAssignmentsForLvl(level);

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
