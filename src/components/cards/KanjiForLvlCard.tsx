import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { BasicCard } from "./BasicCard";
import { SubjectButton } from "../buttons/SubjectButton";
import { StepProgressBar } from "../progress/StepProgressBar";

import { Subject } from "../../types/Subject";
import styles from "./KanjiForLvlCard.module.scss";

import { useKanjiSubjectsForLvl } from "../../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";
import {
  isAssignmentLocked,
  findAssignmentWithSubjID,
} from "../../services/SubjectAndAssignmentService";

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

  // TODO: sort so locked kanji are last
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
                  <SubjectButton
                    subject={kanjiItem}
                    assignment={findAssignmentWithSubjID(
                      assignmentsData,
                      kanjiItem
                    )}
                    locked={isAssignmentLocked(assignmentsData, kanjiItem)}
                    useLockedStyle={true}
                    showDetails={false}
                  />
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
