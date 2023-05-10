import { useEffect, useState } from "react";

import {
  IonRow,
  IonCard,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSkeletonText,
} from "@ionic/react";

import { SubjectCard } from "./SubjectCard";
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

interface AvailableTimes {
  [key: string]: any;
}

export const KanjiContainer = ({ level }: Props) => {
  const [srsStages, setSrsStages] = useState<SrsLevels>({});
  const [availTimes, setAvailTimes] = useState<AvailableTimes>({});
  const [loading, setLoading] = useState(true);

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
      let mappedAvailTimes: AvailableTimes = {};

      kanjiSubLvlData.forEach((kanji: any) => {
        const found = kanjiAssignmentsLvlData.find(
          ({ subject_id }: any) => subject_id === kanji.id
        );

        if (found) {
          mappedAvailTimes[kanji.id] = found.available_at;
          mappedSrsLvls[kanji.id] = found.srs_stage;
        }
      });

      setSrsStages(mappedSrsLvls);
      setAvailTimes(mappedAvailTimes);

      setLoading(false);
    }
  }, [kanjiAssignmentsLvlData, kanjiSubLvlData]);

  //   TODO: create component for loading subject card
  return (
    <>
      {!loading && (
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
                    <SubjectCard
                      subject={kanjiItem}
                      srsStage={srsStages[kanjiItem.id]}
                      availTime={availTimes[kanjiItem.id]}
                      isRadical={false}
                    ></SubjectCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonCardContent>
        </IonCard>
      )}
      {loading && (
        <IonCard className={`${styles.kanjiCard}`}>
          <IonCardHeader>
            <IonCardTitle className={`${styles.kanjiCardTitle}`}>
              <IonSkeletonText
                animated={true}
                style={{ height: "20px" }}
              ></IonSkeletonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className={`${styles.cardContent}`}>
            <IonRow>
              <IonSkeletonText
                animated={true}
                style={{ height: "50px" }}
              ></IonSkeletonText>
            </IonRow>
            <IonRow>
              <IonSkeletonText
                animated={true}
                style={{ height: "50px" }}
              ></IonSkeletonText>
            </IonRow>
            <IonRow>
              <IonSkeletonText
                animated={true}
                style={{ height: "50px" }}
              ></IonSkeletonText>
            </IonRow>
            <IonRow>
              <IonSkeletonText
                animated={true}
                style={{ height: "50px" }}
              ></IonSkeletonText>
            </IonRow>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};
