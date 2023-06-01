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
import { RadicalSubjDetails } from "../components/cards/RadicalSubjDetails";

import styles from "./SubjectDetails.module.scss";

export const SubjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const parsedID = parseInt(id!);

  // TODO: use useHistory or useLocation to get state/type of subject

  const {
    isLoading: subjectLoading,
    data: subject,
    error: subjectErr,
  } = useSubjectByID(parsedID);

  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID([parsedID]);

  let locked =
    subject !== undefined && !assignmentLoading && assignment === undefined;
  console.log("🚀 ~ file: SubjectDetails.tsx:52 ~ locked:", locked);

  return (
    <IonPage className={`${styles.subjectDetailPg}`}>
      <IonContent>
        <IonGrid className={`${styles.fullWidthGrid}`}>
          {subject && <SubjectSummary subject={subject}></SubjectSummary>}
          {/* TODO: add cases for kanji and vocab too */}
          {subject && subject?.object == "radical" && (
            <RadicalSubjDetails subject={subject} />
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
