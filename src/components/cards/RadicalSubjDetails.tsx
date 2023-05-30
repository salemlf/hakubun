import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { useSubjectByID } from "../../hooks/useSubjectByID";
import { useAssignmentBySubjID } from "../../hooks/useAssignmentBySubjID";

import { getSubjectDisplayName } from "../../services/SubjectAndAssignmentService";

import { BasicCard } from "../../components/cards/BasicCard";
import { LvlBadge } from "../../components/LvlBadge";
import { SubjectCard } from "../../components/cards/SubjectCard";
import { RadicalImageCard } from "../../components/cards/RadicalImageCard";

import styles from "./RadicalSubjDetails.module.scss";

type RadProps = {
  radID: string;
};

export const RadicalSubjDetails = ({ radID }: RadProps) => {
  const {
    isLoading: subjectLoading,
    data: subject,
    error: subjectErr,
  } = useSubjectByID(radID);

  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID(radID);

  let radicalLoading =
    subjectLoading || subjectErr || assignmentLoading || assignmentErr;

  return (
    <>
      {!radicalLoading ? (
        <BasicCard isLoading={false}>
          <IonRow
            class="ion-align-items-center ion-justify-content-start"
            className={`${styles.cardRow}`}
          >
            <IonCol>
              <LvlBadge level={subject?.level}></LvlBadge>
            </IonCol>
            <IonCol>
              {subject && assignment && (
                <>
                  {subject.useImage ? (
                    <RadicalImageCard
                      subject={subject}
                      assignment={assignment}
                      clickDisabled={true}
                    ></RadicalImageCard>
                  ) : (
                    <SubjectCard
                      subject={subject}
                      assignment={assignment}
                      clickDisabled={true}
                      locked={assignment.subject_id !== subject.id}
                      useLockedStyle={false}
                    ></SubjectCard>
                  )}
                </>
              )}
            </IonCol>
            <IonCol>
              {subject && <h2>{getSubjectDisplayName(subject)}</h2>}
            </IonCol>
          </IonRow>
        </BasicCard>
      ) : (
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
      )}
    </>
  );
};
