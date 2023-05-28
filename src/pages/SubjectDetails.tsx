import { useState, useEffect } from "react";
import { useHistory } from "react-router";
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
      <IonContent>
        <IonGrid className={`${styles.fullWidthGrid}`}>
          <SubjectSummary
            subject={subjectData}
            assignment={assignmentData}
          ></SubjectSummary>
          {/* TODO: add cases for kanji and vocab too */}
          {subjectData &&
            assignmentData &&
            subjectData?.object == "radical" && (
              <>
                <IonRow class="ion-justify-content-start">
                  <div className="ion-padding">
                    <h3>Name Mnemonic</h3>
                    <TxtWithSubjTags mnemonic={subjectData.meaning_mnemonic} />
                    <h3>Found in Kanji</h3>
                  </div>
                </IonRow>
                {/* <IonRow class="ion-justify-content-start"> */}
                {/* <div className="ion-padding">
                    <h3>Found in Kanji</h3>
                  </div> */}
                {/* </IonRow> */}
              </>
            )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
