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

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import Header from "../components/Header";
import { BasicCard } from "../components/cards/BasicCard";
import { LvlBadge } from "../components/LvlBadge";
import { SubjectCard } from "../components/cards/SubjectCard";
import { RadicalImageCard } from "../components/cards/RadicalImageCard";
import { AlternativeMeanings } from "../components/AlternativeMeanings";
import { AssignmentSrs } from "../components/AssignmentSrs";

import styles from "./SubjectDetails.module.scss";

type SubjectDetailParams = {
  id: string;
};

export const SubjectDetails = () => {
  const { id } = useParams<SubjectDetailParams>();
  const [subjID, setSubjID] = useState<string>("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (!subjectLoading && !assignmentLoading) {
      setLoading(false);
    }
  }, [assignmentLoading, subjectLoading]);

  if (subjectLoading || subjectErr || assignmentLoading || assignmentErr) {
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

  // TODO: use getTimeFromNow in MiscService to display time till available
  // TODO: Then use getSrsLevelsByName and convertToUpperCase functions to display srs phase
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
                    {subjectData && (
                      <h1>{getSubjectDisplayName(subjectData)}</h1>
                    )}
                  </IonCol>
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
