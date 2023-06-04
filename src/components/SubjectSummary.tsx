import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { Subject } from "../types/Subject";

import { useAssignmentBySubjID } from "../hooks/useAssignmentBySubjID";

import { AlternativeMeanings } from "../components/AlternativeMeanings";
import { AssignmentSrs } from "../components/AssignmentSrs";
import { BasicCard } from "./cards/BasicCard";
import { SubjectHeader } from "./SubjectHeader";

import styles from "./SubjectSummary.module.scss";

type Props = {
  subject: Subject;
};

export const SubjectSummary = ({ subject }: Props) => {
  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID([subject.id]);

  // TODO: change this from card
  if (assignmentLoading || assignmentErr) {
    return (
      <BasicCard isLoading={true}>
        <IonRow className="ion-align-items-center ion-justify-content-start">
          <IonCol>
            <IonSkeletonText animated={true}></IonSkeletonText>
          </IonCol>
        </IonRow>
      </BasicCard>
    );
  }

  return (
    <>
      {subject && <SubjectHeader subject={subject} assignment={assignment} />}
      <div className={`${styles.subjContainer} ion-padding`}>
        <IonRow>{subject && <AlternativeMeanings subject={subject} />}</IonRow>
        <IonRow className="ion-justify-content-end">
          <AssignmentSrs assignment={assignment} />
        </IonRow>
      </div>
    </>
  );
};
