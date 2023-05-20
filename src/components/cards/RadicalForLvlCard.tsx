import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { Subject } from "../../types/Subject";

import { BasicCard } from ".././cards/BasicCard";
import { RadicalImageCard } from "./RadicalImageCard";
import { SubjectCard } from "../cards/SubjectCard";

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

  if (
    subjectCurrLvlLoading ||
    subjectCurrLvlErr ||
    assignmentCurrLvlLoading ||
    assignmentCurrLvlErr
  ) {
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

  // TODO: call find function to find assignment by subject_id
  return (
    <>
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
                  <RadicalImageCard radicalSubj={radical}></RadicalImageCard>
                ) : (
                  <SubjectCard subject={radical} isRadical={true}></SubjectCard>
                )}
              </IonCol>
            );
          })}
        </IonRow>
      </BasicCard>
    </>
  );
};
