import { useEffect, useState } from "react";

import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { BasicCard } from "./BasicCard";
import { SubjectCard } from "./SubjectCard";
// import { useKanjiSubAndAssignments } from "../../hooks/useKanjiSubAndAssignments";

import { Subject } from "../../types/Subject";
import styles from "./KanjiForLvlCard.module.scss";
import { useKanjiSubjectsForLvl } from "../../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";
import { Assignment } from "../../types/Assignment";

interface Props {
  level: number | undefined;
}

export const KanjiContainer = ({ level }: Props) => {
  // const [loading, setLoading] = useState(true);

  const {
    isLoading: subjectsLoading,
    data: subjectsData,
    error: subjectsErr,
  } = useKanjiSubjectsForLvl(level);

  const {
    isLoading: assignmentsLoading,
    data: assignmentsData,
    error: assignmentsErr,
  } = useKanjiAssignmentsForLvl(level);

  // useEffect(() => {
  //   // TODO: change so if statement not needed?
  //   if (subjectsData) {
  //     setLoading(false);
  //   }
  // }, [subjectsLoading]);

  //   TODO: create component for loading subject card?
  if (subjectsLoading || subjectsErr || assignmentsLoading || assignmentsErr) {
    return (
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
    );
  }

  return (
    // <>
    //   {!loading ? (
    <BasicCard title="Kanji" isLoading={false}>
      <IonRow class="ion-align-items-center ion-justify-content-start">
        {(subjectsData as Subject[]).map((kanjiItem: any) => {
          return (
            <IonCol
              key={`col_${kanjiItem.id}`}
              size="2"
              className={`${styles.kanjiItemContainer}`}
            >
              {assignmentsData && (
                <SubjectCard
                  subject={kanjiItem}
                  assignment={assignmentsData.find(
                    (assignment: Assignment) =>
                      assignment.subject_id === kanjiItem.id
                  )}
                  isRadical={false}
                ></SubjectCard>
              )}
            </IonCol>
          );
        })}
      </IonRow>
    </BasicCard>
    // ) : (
    //   <BasicCard title="" isLoading={true}>
    //     <IonRow>
    //       <IonSkeletonText
    //         animated={true}
    //         style={{ height: "50px" }}
    //       ></IonSkeletonText>
    //     </IonRow>
    //     <IonRow>
    //       <IonSkeletonText
    //         animated={true}
    //         style={{ height: "50px" }}
    //       ></IonSkeletonText>
    //     </IonRow>
    //     <IonRow>
    //       <IonSkeletonText
    //         animated={true}
    //         style={{ height: "50px" }}
    //       ></IonSkeletonText>
    //     </IonRow>
    //     <IonRow>
    //       <IonSkeletonText
    //         animated={true}
    //         style={{ height: "50px" }}
    //       ></IonSkeletonText>
    //     </IonRow>
    //   </BasicCard>
    // )}
    // </>
  );
};
