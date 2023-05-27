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
import { SubjectSummary } from "../components/SubjectSummary";

import styles from "./SubjectDetails.module.scss";
import { BasicCard } from "../components/cards/BasicCard";

type SubjectDetailParams = {
  id: string;
};

// TODO: change bgcolor depending on whether radical, kanji, or vocab
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

  return (
    <IonPage className={`${styles.subjectDetailPg}`}>
      {/* <Header></Header> */}
      <IonContent>
        <IonGrid className={`${styles.fullWidthGrid}`}>
          {/* <IonRow class="ion-justify-content-start">
            <IonCol> */}
          <SubjectSummary
            subject={subjectData}
            assignment={assignmentData}
          ></SubjectSummary>
          {/* </IonCol>
          </IonRow> */}
        </IonGrid>
        {/* <IonGrid className={`${styles.fullWidthGrid}`}>
          <BasicCard isLoading={false}></BasicCard>
        </IonGrid> */}
      </IonContent>
      {/* <IonContent>
        <IonGrid>
        </IonGrid>
      </IonContent> */}
    </IonPage>
  );
};
