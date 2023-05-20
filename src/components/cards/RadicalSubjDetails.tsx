import { useState, useEffect } from "react";
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
  const [displayName, setDisplayName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    isLoading: subjDataLoading,
    data: subjData,
    error: subjDataErr,
  } = useSubjectByID(radID);

  const {
    isLoading: assignmentLoading,
    data: assignmentData,
    error: assignmentErr,
  } = useAssignmentBySubjID(radID);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (subjData) {
      let name = getSubjectDisplayName(subjData);
      setDisplayName(name);

      setIsLoading(false);
    }
  }, [subjDataLoading]);

  return (
    <>
      {!isLoading ? (
        <BasicCard isLoading={false}>
          <IonRow
            class="ion-align-items-center ion-justify-content-start"
            className={`${styles.cardRow}`}
          >
            <IonCol>
              <LvlBadge level={subjData?.level}></LvlBadge>
            </IonCol>
            <IonCol>
              {subjData && assignmentData && (
                <>
                  {subjData.useImage ? (
                    <RadicalImageCard
                      subject={subjData}
                      assignment={assignmentData}
                      clickDisabled={true}
                    ></RadicalImageCard>
                  ) : (
                    <SubjectCard
                      subject={subjData}
                      assignment={assignmentData}
                      isRadical={true}
                      clickDisabled={true}
                    ></SubjectCard>
                  )}
                </>
              )}
            </IonCol>
            <IonCol>
              <h2>{`${displayName}`}</h2>
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
