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
import { useSubAndAssignmentByID } from "../hooks/useSubAndAssignmentByID";

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import Header from "../components/Header";
import { BasicCard } from "../components/cards/BasicCard";
import { LvlBadge } from "../components/LvlBadge";
import { SubjectCard } from "../components/cards/SubjectCard";
import { RadicalImageCard } from "../components/cards/RadicalImageCard";

import styles from "./SubjectDetails.module.scss";

type SubjectDetailParams = {
  // id: string | undefined;
  id: string;
};

export const SubjectDetails = () => {
  const { id } = useParams<SubjectDetailParams>();
  const [subjID, setSubjID] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  // TODO: use history to allow user to go back?
  // const history = useHistory();

  // const {
  //   isLoading: subjDataLoading,
  //   data: subjData,
  //   error: subjDataErr,
  // } = useSubjectByID(subjID);

  // const { subjAssignDataLoading, subjAssignData } =
  //   useSubAndAssignmentByID(subjID);

  // useEffect(() => {
  //   // TODO: change so if statement not needed?
  //   if (subjAssignData) {
  //     console.log(
  //       "🚀 ~ file: SubjectDetails.tsx:50 ~ useEffect ~ subjAssignData:",
  //       subjAssignData
  //     );

  //     let name = getSubjectDisplayName(subjAssignData);
  //     setDisplayName(name);

  //     setIsLoading(false);
  //   }
  // }, [subjAssignDataLoading]);

  // TODO: make sure this is necessary
  useEffect(() => {
    if (id) {
      setSubjID(id);
    }
  }, [id]);

  // const [loading, setLoading] = useState(true);
  // const { kanjiDataLoading, kanjiData } = useKanjiSubAndAssignments(level);
  const { subjAssignDataLoading, subjAssignData } =
    useSubAndAssignmentByID(subjID);
  // useSubAndAssignmentByID(id);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (subjAssignData) {
      console.log(
        "🚀 ~ file: SubjectDetails.tsx:80 ~ useEffect ~ subjAssignData:",
        subjAssignData
      );

      let name = getSubjectDisplayName(subjAssignData);
      setDisplayName(name);

      // setIsLoading(false);
      setLoading(false);
    }
  }, [subjAssignDataLoading]);

  return (
    <IonPage>
      <Header></Header>
      <IonContent className="ion-padding">
        <IonGrid>
          {!loading ? (
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <BasicCard isLoading={false}>
                  <IonRow
                    class="ion-align-items-center ion-justify-content-start"
                    className={`${styles.cardRow}`}
                  >
                    <IonCol>
                      <LvlBadge level={subjAssignData?.level}></LvlBadge>
                    </IonCol>
                    <IonCol>
                      {subjAssignData?.object == "radical" ? (
                        <>
                          {subjAssignData.useImage ? (
                            <RadicalImageCard
                              radicalObj={subjAssignData}
                              clickDisabled={true}
                            ></RadicalImageCard>
                          ) : (
                            <SubjectCard
                              subject={subjAssignData}
                              isRadical={true}
                              clickDisabled={true}
                            ></SubjectCard>
                          )}
                        </>
                      ) : (
                        <SubjectCard
                          subject={subjAssignData}
                          isRadical={false}
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
