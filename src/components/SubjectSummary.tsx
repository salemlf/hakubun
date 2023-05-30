import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { Subject } from "../types/Subject";

import { useAssignmentBySubjID } from "../hooks/useAssignmentBySubjID";

import { LvlBadge } from "../components/LvlBadge";
import { AlternativeMeanings } from "../components/AlternativeMeanings";
import { AssignmentSrs } from "../components/AssignmentSrs";
import { SubjNameAndCharacter } from "../components/SubjNameAndCharacter";
import { BasicCard } from "./cards/BasicCard";

import styles from "./SubjectSummary.module.scss";

type Props = {
  subject: Subject;
};

export const SubjectSummary = ({ subject }: Props) => {
  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID(subject.id);

  // TODO: change this from card
  if (assignmentLoading) {
    return (
      <BasicCard isLoading={true}>
        <IonRow
          class="ion-align-items-center ion-justify-content-start"
          className={`${styles.cardRow}`}
        >
          <IonCol>
            <IonSkeletonText animated={true}></IonSkeletonText>
          </IonCol>
        </IonRow>
      </BasicCard>
    );
  }

  return (
    <div className={`${styles.subjContainer} ion-padding`}>
      <IonRow
        className={`${styles.cardRow} ion-align-items-center ion-justify-content-start`}
      >
        {subject && <LvlBadge level={subject!.level}></LvlBadge>}
        <SubjNameAndCharacter subject={subject} assignment={assignment} />
      </IonRow>
      <IonRow>{subject && <AlternativeMeanings subject={subject} />}</IonRow>
      <IonRow className="ion-justify-content-end">
        <AssignmentSrs assignment={assignment} />
      </IonRow>
    </div>
  );
};
