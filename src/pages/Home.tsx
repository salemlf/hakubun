import { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonSpinner,
  IonSkeletonText,
} from "@ionic/react";

import "./Home.module.scss";

import { useAuth } from "../contexts/AuthContext";

import { ProgressBar } from "../components/progress/ProgressBar";
import Header from "../components/Header";
import LessonsButton from "../components/buttons/LessonsButton";
import ReviewsButton from "../components/buttons/ReviewsButton";
import { RadicalContainer } from "../components/cards/RadicalForLvlCard";
import { KanjiContainer } from "../components/cards/KanjiForLvlCard";
import { SrsStages } from "../components/SrsStages";
import { Footer } from "../components/Footer";

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number>(0);
  // TODO: remove, not needed?
  const [username, setUsername] = useState<string | undefined>("");

  const auth = useAuth();

  // TODO: change so loading displays until everything is loaded (including subjects)
  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    setHomeLoading(false);
  }, [auth]);

  const removeAuth = () => {
    (auth as any).removeAuth();
  };

  const setUserDetails = () => {
    // TODO: remove, not needed?
    let username = auth.auth!.username;
    setUsername(username);

    let level = auth.auth!.level;
    if (level != undefined) {
      setLevel(level);
    }
  };

  return (
    <>
      <Header></Header>
      <IonContent className="ion-padding">
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
                  <RadicalContainer level={level}></RadicalContainer>
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
      <Footer></Footer>
    </>
  );
};

export default Home;
