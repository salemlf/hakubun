import { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonSpinner,
} from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";
import { useRadicalsCurrLevel } from "../hooks/useRadicalsCurrLvl";
import { useKanjiCurrLevel } from "../hooks/useKanjiCurrLvl";
import { useReviews } from "../hooks/useReviews";
import { useLessons } from "../hooks/useLessons";
import styles from "./Home.module.css";

import Header from "../components/Header";
import LessonsButton from "../components/LessonsButton";
import ReviewsButton from "../components/ReviewsButton";
import { RadicalContainer } from "../components/RadicalContainer";
import { KanjiContainer } from "../components/KanjiContainer";
import { ProgressBar } from "../components/ProgressBar";

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number | undefined>();
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
    let username = auth.auth!.username;
    setUsername(username);

    let level = auth.auth!.level;
    setLevel(level);
  };

  const {
    isLoading: lessonsLoading,
    data: lessonData,
    error: lessonErr,
  } = useLessons(level);

  const {
    isLoading: availReviewsLoading,
    data: availReviewsData,
    error: availReviewsErr,
  } = useReviews(level);

  // TODO: move to radical component?
  const {
    isLoading: radicalsCurrLvlLoading,
    data: radicalsCurrLvlData,
    error: radicalsCurrLvlErr,
  } = useRadicalsCurrLevel(level);

  // TODO: move to kanji component
  const {
    isLoading: kanjiCurrLvlLoading,
    data: kanjiCurrLvlData,
    error: kanjiCurrLvlErr,
  } = useKanjiCurrLevel(level);

  // TODO: move to component
  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  // TODO: move to component
  const goToReviews = () => {
    // TODO: use reviewData
    console.log("TODO: add reviews button action");
  };

  return (
    <>
      <Header username={username} level={level}></Header>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <LessonsButton
                handleClick={goToLessons}
                numLessons={lessonData?.length}
              ></LessonsButton>
            </IonCol>
            <IonCol>
              <ReviewsButton
                handleClick={goToReviews}
                numReviews={availReviewsData?.length}
              ></ReviewsButton>
            </IonCol>
          </IonRow>
          {radicalsCurrLvlData && (
            <IonRow>
              <IonCol>
                <ProgressBar stage={3} />
              </IonCol>
            </IonRow>
          )}

          {radicalsCurrLvlData && (
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <RadicalContainer
                  radicals={radicalsCurrLvlData}
                ></RadicalContainer>
              </IonCol>
            </IonRow>
          )}
          {kanjiCurrLvlData && (
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <KanjiContainer kanji={kanjiCurrLvlData}></KanjiContainer>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonButton
                title="Remove authorization"
                onClick={() => removeAuth()}
              >
                Remove Auth
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {homeLoading && <IonSpinner name="dots"></IonSpinner>}
      </IonContent>
    </>
  );
};

export default Home;
