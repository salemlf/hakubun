import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

import { BasicCard } from ".././cards/BasicCard";
import { RadicalImageCard } from "./RadicalImageCard";
import { SubjectCard } from "../cards/SubjectCard";
import { StepProgressBar } from "../progress/StepProgressBar";

import styles from "./RadicalForLvlCard.module.scss";
import { useRadicalSubjectsForLvl } from "../../hooks/useRadicalSubjectsForLvl";
import { useRadicalAssignmentsForLvl } from "../../hooks/useRadicalAssignmentsForLvl";

interface Props {
  level: number | undefined;
}

export const RadicalForLvlCard = ({ level }: Props) => {
  const {
    isLoading: subjectCurrLvlLoading,
    data: subjectCurrLvlData,
    error: subjectCurrLvlErr,
  } = useRadicalSubjectsForLvl(level);

  const {
    isLoading: assignmentCurrLvlLoading,
    data: assignmentCurrLvlData,
    error: assignmentCurrLvlErr,
  } = useRadicalAssignmentsForLvl(level);

  let radicalCardLoading =
    subjectCurrLvlLoading ||
    subjectCurrLvlErr ||
    assignmentCurrLvlLoading ||
    assignmentCurrLvlErr;

  if (radicalCardLoading) {
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
      </BasicCard>
    );
  }

  return (
    <BasicCard title="Radicals" isLoading={false}>
      <IonRow class="ion-align-items-center ion-justify-content-start">
        {(subjectCurrLvlData as Subject[]).map((radical: Subject) => {
          return (
            <IonCol
              key={`col_${radical.id}`}
              size="2"
              className={`${styles.radItemContainer}`}
            >
              {radical.useImage ? (
                <RadicalImageCard
                  subject={radical}
                  assignment={assignmentCurrLvlData.find(
                    (assignment: Assignment) =>
                      assignment.subject_id === radical.id
                  )}
                ></RadicalImageCard>
              ) : (
                <SubjectCard
                  subject={radical}
                  assignment={assignmentCurrLvlData.find(
                    (assignment: Assignment) =>
                      assignment.subject_id === radical.id
                  )}
                  locked={false}
                  useLockedStyle={false}
                ></SubjectCard>
              )}
              <StepProgressBar
                assignment={assignmentCurrLvlData.find(
                  (assignment: Assignment) =>
                    assignment.subject_id === radical.id
                )}
                locked={false}
              />
            </IonCol>
          );
        })}
      </IonRow>
    </BasicCard>
  );
};
