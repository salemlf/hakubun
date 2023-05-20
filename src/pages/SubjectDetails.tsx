import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonPage,
  IonSkeletonText,
} from "@ionic/react";

import { useSubjectByID } from "../hooks/useSubjectByID";
import { useAssignmentBySubjID } from "../hooks/useAssignmentBySubjID";

import Header from "../components/Header";
import { BasicCard } from "../components/cards/BasicCard";
import { LvlBadge } from "../components/LvlBadge";
import { AlternativeMeanings } from "../components/AlternativeMeanings";
import { AssignmentSrs } from "../components/AssignmentSrs";
import { SubjNameAndCharacter } from "../components/SubjNameAndCharacter";

import styles from "./SubjectDetails.module.scss";

type SubjectDetailParams = {
  id: string;
};

export const SubjectDetails = () => {
  const { id } = useParams<SubjectDetailParams>();
  const [subjID, setSubjID] = useState<string>("");

  // TODO: use history to allow user to go back?
  // const history = useHistory();

  // TODO: make sure this is necessary
  useEffect(() => {
    if (id) {
      setSubjID(id);
    }
  }, [id]);

  const {
    isLoading: subjectLoading,
    data: subjectData,
    error: subjectErr,
  } = useSubjectByID(subjID);

  const {
    isLoading: assignmentLoading,
    data: assignmentData,
    error: assignmentErr,
  } = useAssignmentBySubjID(subjID);

  let subjectDetailsLoading =
    subjectLoading || subjectErr || assignmentLoading || assignmentErr;

  if (subjectDetailsLoading) {
    return (
      <IonPage>
        <Header></Header>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow class="ion-justify-content-start">
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
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header></Header>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-start">
            <IonCol>
              <BasicCard isLoading={false}>
                <IonRow
                  class="ion-align-items-end ion-justify-content-start"
                  className={`${styles.cardRow}`}
                >
                  <IonCol className={`${styles.badgeCol}`}>
                    {subjectData && (
                      <LvlBadge level={subjectData.level}></LvlBadge>
                    )}
                  </IonCol>
                  <SubjNameAndCharacter
                    subjectData={subjectData}
                    assignmentData={assignmentData}
                  />
                </IonRow>
                {subjectData && <AlternativeMeanings subject={subjectData} />}
                {assignmentData && (
                  <AssignmentSrs assignment={assignmentData} />
                )}
              </BasicCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
