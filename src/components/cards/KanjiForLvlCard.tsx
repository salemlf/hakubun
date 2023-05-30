import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { BasicCard } from "./BasicCard";
import { SubjectCard } from "./SubjectCard";
import { StepProgressBar } from "../progress/StepProgressBar";

import styles from "./KanjiForLvlCard.module.scss";

import { useKanjiSubjectsForLvl } from "../../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";

import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

const isAssignmentLocked = (
  assignmentsData: Assignment[],
  subject: Subject
) => {
  let found = findAssignmentWithSubjID(assignmentsData, subject);
  return found === undefined;
};

const findAssignmentWithSubjID = (
  assignmentsData: Assignment[],
  subject: Subject
) => {
  return assignmentsData.find(
    (assignment: Assignment) => assignment.subject_id === subject.id
  );
};

interface Props {
  level: number | undefined;
}

export const KanjiContainer = ({ level }: Props) => {
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

  let kanjiLoading =
    subjectsLoading || subjectsErr || assignmentsLoading || assignmentsErr;

  //   TODO: create component for loading subject card?
  if (kanjiLoading) {
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
                <>
                  <SubjectCard
                    subject={kanjiItem}
                    assignment={findAssignmentWithSubjID(
                      assignmentsData,
                      kanjiItem
                    )}
                    locked={isAssignmentLocked(assignmentsData, kanjiItem)}
                    useLockedStyle={true}
                  ></SubjectCard>
                  <StepProgressBar
                    assignment={findAssignmentWithSubjID(
                      assignmentsData,
                      kanjiItem
                    )}
                    locked={isAssignmentLocked(assignmentsData, kanjiItem)}
                  />
                </>
              )}
            </IonCol>
          );
        })}
      </IonRow>
    </BasicCard>
  );
};
