import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
// import { useHistory, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
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

import { SubjectSummary } from "../components/SubjectSummary";
import { TxtWithSubjTags } from "../components/TxtWithSubjTags";

import styles from "./SubjectDetails.module.scss";

type SubjectDetailParams = {
  id: string;
};

export const SubjectDetails = () => {
  const { id } = useParams<SubjectDetailParams>();
  const [subjID, setSubjID] = useState<string>("");

  // TODO: use useHistory or useLocation to get state/type of subject

  // TODO: make sure this is necessary
  useEffect(() => {
    if (id) {
      setSubjID(id);
    }
  }, [id]);

  const {
    isLoading: subjectLoading,
    data: subject,
    error: subjectErr,
  } = useSubjectByID(subjID);

  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID(subjID);

  let locked =
    subject !== undefined && !assignmentLoading && assignment === undefined;
  console.log("🚀 ~ file: SubjectDetails.tsx:52 ~ locked:", locked);

  return (
    <IonPage className={`${styles.subjectDetailPg}`}>
      <IonContent>
        <IonGrid className={`${styles.fullWidthGrid}`}>
          {subject && (
            <SubjectSummary
              subject={subject}
              // assignment={assignment}
              // locked={locked}
            ></SubjectSummary>
          )}
          {/* TODO: add cases for kanji and vocab too */}
          {/* {subject && assignment && subject?.object == "radical" && ( */}
          {subject && subject?.object == "radical" && (
            <>
              <IonRow class="ion-justify-content-start">
                <div className="ion-padding">
                  <h3>Name Mnemonic</h3>
                  <TxtWithSubjTags mnemonic={subject.meaning_mnemonic} />
                  <h3>Found in Kanji</h3>
                </div>
              </IonRow>
            </>
          )}
          {subject && subject?.object == "kanji" && (
            <>
              <IonRow class="ion-justify-content-start">
                <div className="ion-padding">
                  <h3>Radical Combination</h3>
                  <p>...</p>
                  <h3>Meaning Mnemonic</h3>
                  <p>...</p>
                </div>
              </IonRow>
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
