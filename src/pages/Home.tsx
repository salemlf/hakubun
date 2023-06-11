import { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonSpinner,
  IonSkeletonText,
} from "@ionic/react";

import styles from "./Home.module.scss";

import { useAuth } from "../contexts/AuthContext";

import { ProgressBar } from "../components/progress/ProgressBar";
import Header from "../components/Header";
import LessonsButton from "../components/buttons/LessonsButton";
import ReviewsButton from "../components/buttons/ReviewsButton";
import { RadicalForLvlCard } from "../components/cards/RadicalForLvlCard";
import { KanjiContainer } from "../components/cards/KanjiForLvlCard";
import { SrsStages } from "../components/SrsStages";

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number>(0);

  const appContext = useAuth();

  // TODO: remove spinner for loading, just using text skeletons instead
  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    setHomeLoading(false);
  }, [appContext]);

  const removeAuth = () => {
    (appContext as any).removeAuth();
  };

  const setUserDetails = () => {
    let userData = appContext.userData;
    if (userData != undefined) {
      setLevel(userData.level);
    }
  };

  return (
    <IonPage>
      <Header></Header>
      {/* <IonContent className="ion-padding"> */}
      <IonContent className={`${styles.contentPadding}`}>
        <IonGrid>
          {!homeLoading ? (
            <>
              <IonRow>
                <IonCol>
                  <LessonsButton level={level}></LessonsButton>
                </IonCol>
                <IonCol>
                  <ReviewsButton level={level}></ReviewsButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <ProgressBar level={level}></ProgressBar>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <IonCol>
                  <RadicalForLvlCard level={level}></RadicalForLvlCard>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <IonCol>
                  <KanjiContainer level={level}></KanjiContainer>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <SrsStages></SrsStages>
              </IonRow>
              <IonRow className="ion-padding">
                <IonCol>
                  <IonButton
                    title="Remove authorization"
                    onClick={() => removeAuth()}
                  >
                    Remove Auth
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <IonSkeletonText animated={true}></IonSkeletonText>
          )}
        </IonGrid>
        {homeLoading && <IonSpinner name="dots"></IonSpinner>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
