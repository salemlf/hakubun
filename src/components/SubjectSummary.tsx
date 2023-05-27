import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import { LvlBadge } from "../components/LvlBadge";
import { AlternativeMeanings } from "../components/AlternativeMeanings";
import { AssignmentSrs } from "../components/AssignmentSrs";
import { SubjNameAndCharacter } from "../components/SubjNameAndCharacter";
import { BasicCard } from "./cards/BasicCard";

import styles from "./SubjectSummary.module.scss";

type Props = {
  subject: Subject | undefined;
  assignment: Assignment | undefined;
};

export const SubjectSummary = ({ subject, assignment }: Props) => {
  let subjectSummaryLoading = !subject || !assignment;

  if (subjectSummaryLoading) {
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
    <BasicCard isLoading={false}>
      <IonRow
        class="ion-align-items-end ion-justify-content-start"
        className={`${styles.cardRow}`}
      >
        <IonCol className={`${styles.badgeCol}`}>
          {subject && <LvlBadge level={subject!.level}></LvlBadge>}
        </IonCol>
        <SubjNameAndCharacter
          subjectData={subject}
          assignmentData={assignment}
        />
      </IonRow>
      {subject && <AlternativeMeanings subject={subject} />}
      {assignment && <AssignmentSrs assignment={assignment} />}
    </BasicCard>
  );
};
