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

import { useSubAndAssignmentByID } from "../hooks/useSubAndAssignmentByID";

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import Header from "../components/Header";
import { BasicCard } from "../components/cards/BasicCard";
import { LvlBadge } from "../components/LvlBadge";
import { SubjectCard } from "../components/cards/SubjectCard";
import { RadicalImageCard } from "../components/cards/RadicalImageCard";
import { AlternativeMeanings } from "../components/AlternativeMeanings";

import styles from "./SubjectDetails.module.scss";

type SubjectDetailParams = {
  id: string;
};

export const SubjectDetails = () => {
  const { id } = useParams<SubjectDetailParams>();
  const [subjID, setSubjID] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>();
  const [loading, setLoading] = useState(true);

  // TODO: use history to allow user to go back?
  // const history = useHistory();

  // TODO: make sure this is necessary
  useEffect(() => {
    if (id) {
      setSubjID(id);
    }
  }, [id]);

  const { subjAssignDataLoading, subjAssignDataSuccess, subjAssignData } =
    useSubAndAssignmentByID(subjID);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (subjAssignData) {
      console.log(
        "🚀 ~ file: SubjectDetails.tsx:52 ~ useEffect ~ subjAssignData:",
        subjAssignData
      );

      setLoading(false);
    }
  }, [subjAssignDataSuccess]);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (subjAssignData && !displayName) {
      let name = getSubjectDisplayName(subjAssignData);
      console.log("🚀 ~ file: SubjectDetails.tsx:58 ~ useEffect ~ name:", name);
      setDisplayName(name);
    }
  }, [subjAssignDataSuccess]);

  // TODO: use getTimeFromNow in MiscService to display time till available
  // TODO: Then use getSrsLevelsByName and convertToUpperCase functions to display srs phase
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
                    class="ion-align-items-end ion-justify-content-start"
                    className={`${styles.cardRow}`}
                  >
                    <IonCol className={`${styles.badgeCol}`}>
                      <LvlBadge level={subjAssignData?.level}></LvlBadge>
                    </IonCol>
                    <IonCol>
                      {subjAssignData?.object == "radical" ? (
                        <>
                          {subjAssignData.useImage ? (
                            <RadicalImageCard
                              radicalObj={subjAssignData}
                              clickDisabled={true}
                              displayProgress={false}
                            ></RadicalImageCard>
                          ) : (
                            <SubjectCard
                              subject={subjAssignData}
                              isRadical={true}
                              clickDisabled={true}
                              displayProgress={false}
                            ></SubjectCard>
                          )}
                        </>
                      ) : (
                        <SubjectCard
                          subject={subjAssignData}
                          isRadical={false}
                          clickDisabled={true}
                          displayProgress={false}
                        ></SubjectCard>
                      )}
                    </IonCol>
                    <IonCol>
                      <h1>{`${displayName}`}</h1>
                    </IonCol>
                  </IonRow>
                  <AlternativeMeanings subject={subjAssignData} />
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
