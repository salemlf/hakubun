import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { BasicCard } from "./BasicCard";
import { SubjectCard } from "./SubjectCard";
import { useKanjiSubjectsForLvl } from "../../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";
import { useKanjiSubAndAssignments } from "../../hooks/useKanjiSubAndAssignments";

import { Subject } from "../../types/Subject";
import styles from "./KanjiForLvlCard.module.scss";

interface Props {
  level: number | undefined;
}

export const KanjiContainer = ({ level }: Props) => {
  const [loading, setLoading] = useState(true);

  const { kanjiDataLoading, kanjiData } = useKanjiSubAndAssignments(level);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (kanjiData) {
      setLoading(false);
    }
  }, [kanjiDataLoading]);

  //   TODO: create component for loading subject card
  return (
    <>
      {!loading && (
        <BasicCard title="Kanji" isLoading={false}>
          <IonRow class="ion-align-items-center ion-justify-content-start">
            {(kanjiData as Subject[]).map((kanjiItem: any) => {
              return (
                <IonCol
                  key={`col_${kanjiItem.id}`}
                  size="2"
                  className={`${styles.kanjiItemContainer}`}
                >
                  <SubjectCard
                    subject={kanjiItem}
                    srsStage={kanjiItem.srs_stage}
                    availTime={kanjiItem.available_at}
                    isRadical={false}
                  ></SubjectCard>
                </IonCol>
              );
            })}
          </IonRow>
        </BasicCard>
      )}
      {loading && (
        <BasicCard title="" isLoading={true}>
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
        </BasicCard>
      )}
    </>
  );
};
