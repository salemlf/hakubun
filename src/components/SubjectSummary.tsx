import { IonCol, IonRow, IonSkeletonText, IonHeader } from "@ionic/react";

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

  const getSummaryStyle = () => {
    console.log("subject.object: ", subject?.object);
    return subject ? subject.object : "";
  };

  // TODO: change this from card
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
    <div className={`${styles.subjContainer} ion-padding`}>
      <IonRow
        className={`${styles.cardRow} ion-align-items-center ion-justify-content-start`}
      >
        {subject && <LvlBadge level={subject!.level}></LvlBadge>}
        <SubjNameAndCharacter
          subjectData={subject}
          assignmentData={assignment}
        />
      </IonRow>
      <IonRow>{subject && <AlternativeMeanings subject={subject} />}</IonRow>
      <IonRow className="ion-justify-content-end">
        {assignment && <AssignmentSrs assignment={assignment} />}
      </IonRow>
    </div>
  );
};
