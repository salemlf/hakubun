import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSkeletonText,
} from "@ionic/react";

import { useSubjectByID } from "../hooks/useSubjectByID";

import Header from "../components/Header";
import { LvlBadge } from "../components/LvlBadge";

import styles from "./SubjectDetails.module.scss";

interface SubjectDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const SubjectDetails: React.FC<SubjectDetailsProps> = ({ match }) => {
  const [subjID, setsubjID] = useState<string>("");

  const {
    isLoading: subjDataLoading,
    data: subjData,
    error: subjDataErr,
  } = useSubjectByID(subjID);

  // *testing
  useEffect(() => {
    if (subjData) {
      console.log(
        "🚀 ~ file: SubjectDetails.tsx:34 ~ useEffect ~ subjData:",
        subjData
      );
    }
  }, [subjData]);
  // *testing

  // TODO: make sure this is necessary
  useEffect(() => {
    if (match) {
      setsubjID(match.params.id);
    }
  }, [match]);

  return (
    <IonPage>
      <Header></Header>
      <IonContent className="ion-padding">
        <IonGrid>
          {!subjDataLoading ? (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Subject {match.params.id}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonRow class="ion-align-items-center ion-justify-content-start"></IonRow>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ) : (
            <IonRow>
              <IonSkeletonText
                animated={true}
                className={`${styles.subjDefLoading}`}
              ></IonSkeletonText>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
