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

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import Header from "../components/Header";
import { BasicCard } from "../components/cards/BasicCard";
import { LvlBadge } from "../components/LvlBadge";
import { SubjectCard } from "../components/cards/SubjectCard";
import { RadicalImageCard } from "../components/cards/RadicalImageCard";

import styles from "./SubjectDetails.module.scss";

type SubjectDetailParams = {
  id: string;
};

export const SubjectDetails = () => {
  const { id } = useParams<SubjectDetailParams>();
  const [subjID, setsubjID] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  // TODO: use history to allow user to go back?
  // const history = useHistory();

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
      let name = getSubjectDisplayName(subjData);
      setDisplayName(name);
    }
  }, [subjData]);
  // *testing

  // TODO: make sure this is necessary
  useEffect(() => {
    if (id) {
      setsubjID(id);
    }
  }, [id]);

  return (
    <IonPage>
      <Header></Header>
      <IonContent className="ion-padding">
        <IonGrid>
          {!subjDataLoading ? (
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <BasicCard isLoading={false}>
                  <IonRow
                    class="ion-align-items-center ion-justify-content-start"
                    className={`${styles.cardRow}`}
                  >
                    <IonCol>
                      <LvlBadge level={subjData.level}></LvlBadge>
                    </IonCol>
                    <IonCol>
                      {subjData.useImage ? (
                        <RadicalImageCard
                          radicalObj={subjData}
                          clickDisabled={true}
                        ></RadicalImageCard>
                      ) : (
                        <SubjectCard
                          subject={subjData}
                          isRadical={true}
                        ></SubjectCard>
                      )}
                    </IonCol>
                    <IonCol>
                      <h2>{`${displayName}`}</h2>
                    </IonCol>
                  </IonRow>
                </BasicCard>
              </IonCol>
            </IonRow>
          ) : (
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
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
