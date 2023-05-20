import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { BasicCard } from "./cards/BasicCard";
import { SubjectCard } from "./cards/SubjectCard";
import { RadicalImageCard } from "./cards/RadicalImageCard";

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import styles from "./SubjNameAndCharacter.module.scss";

type Props = {
  subjectData: Subject | undefined;
  assignmentData: Assignment | undefined;
};

export const SubjNameAndCharacter = ({
  subjectData,
  assignmentData,
}: Props) => {
  let loading = !subjectData || !assignmentData;

  if (loading) {
    return (
      <>
        <IonCol>
          <IonSkeletonText animated={true}></IonSkeletonText>
        </IonCol>
        <IonCol>
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
        </IonCol>
      </>
    );
  }

  // TODO: display loading skeletons
  return (
    <>
      <IonCol>
        {subjectData?.object == "radical" ? (
          <>
            {subjectData.useImage
              ? assignmentData && (
                  <RadicalImageCard
                    subject={subjectData}
                    assignment={assignmentData}
                    clickDisabled={true}
                    displayProgress={false}
                  ></RadicalImageCard>
                )
              : assignmentData && (
                  <SubjectCard
                    subject={subjectData}
                    assignment={assignmentData}
                    isRadical={true}
                    clickDisabled={true}
                    displayProgress={false}
                  ></SubjectCard>
                )}
          </>
        ) : (
          subjectData &&
          assignmentData && (
            <SubjectCard
              subject={subjectData}
              assignment={assignmentData}
              isRadical={false}
              clickDisabled={true}
              displayProgress={false}
            ></SubjectCard>
          )
        )}
      </IonCol>
      <IonCol>
        {subjectData && <h1>{getSubjectDisplayName(subjectData)}</h1>}
      </IonCol>
    </>
  );
};
