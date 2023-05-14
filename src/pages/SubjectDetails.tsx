import { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
// import { useHistory } from "react-router";

import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonPage,
  IonSkeletonText,
} from "@ionic/react";

import { useSubjectByID } from "../hooks/useSubjectByID";

import Header from "../components/Header";
import { BasicCard } from "../components/cards/BasicCard";
import { LvlBadge } from "../components/LvlBadge";

import styles from "./SubjectDetails.module.scss";

interface SubjectDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const SubjectDetails: React.FC<SubjectDetailsProps> = ({ match }) => {
  const [subjID, setsubjID] = useState<string>("");
  const history = useHistory();

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
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <BasicCard
                  title={`Subject ${match.params.id}`}
                  isLoading={false}
                >
                  <IonRow
                    class="ion-align-items-center ion-justify-content-start"
                    className={`${styles.cardRow}`}
                  >
                    <IonCol>
                      <LvlBadge level={subjData.level}></LvlBadge>
                    </IonCol>
                  </IonRow>
                </BasicCard>
              </IonCol>
            </IonRow>
          ) : (
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <BasicCard title="" isLoading={true}>
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
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
