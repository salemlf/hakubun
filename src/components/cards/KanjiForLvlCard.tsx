import { useEffect, useState } from "react";

import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { BasicCard } from "./BasicCard";
import { SubjectCard } from "./SubjectCard";
// import { useKanjiSubAndAssignments } from "../../hooks/useKanjiSubAndAssignments";

import { Subject } from "../../types/Subject";
import styles from "./KanjiForLvlCard.module.scss";
import { useKanjiSubjectsForLvl } from "../../hooks/useKanjiSubjectsForLvl";

interface Props {
  level: number | undefined;
}

export const KanjiContainer = ({ level }: Props) => {
  const [loading, setLoading] = useState(true);
  // const { kanjiDataLoading, kanjiData } = useKanjiSubAndAssignments(level);

  const {
    isLoading: kanjiSubLoading,
    data: kanjiSubData,
    error: kanjiSubErr,
  } = useKanjiSubjectsForLvl(level);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (kanjiSubData) {
      setLoading(false);
    }
  }, [kanjiSubLoading]);

  //   TODO: create component for loading subject card
  return (
    <>
      {!loading ? (
        <BasicCard title="Kanji" isLoading={false}>
          <IonRow class="ion-align-items-center ion-justify-content-start">
            {(kanjiSubData as Subject[]).map((kanjiItem: any) => {
              return (
                <IonCol
                  key={`col_${kanjiItem.id}`}
                  size="2"
                  className={`${styles.kanjiItemContainer}`}
                >
                  <SubjectCard
                    subject={kanjiItem}
                    isRadical={false}
                  ></SubjectCard>
                </IonCol>
              );
            })}
          </IonRow>
        </BasicCard>
      ) : (
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
