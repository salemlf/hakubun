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
import { useSubjectsCurrLevel } from "../hooks/useSubjectsCurrLevel";
import { useRadicalsCurrLevel } from "../hooks/useRadicalsCurrLvl";
import { useKanjiCurrLevel } from "../hooks/useKanjiCurrLvl";
import { useReviews } from "../hooks/useReviews";
import { useLessons } from "../hooks/useLessons";
import styles from "./Home.module.css";

import Header from "../components/Header";
import LessonsButton from "../components/LessonsButton";
import ReviewsButton from "../components/ReviewsButton";
import { RadicalContainer } from "../components/RadicalContainer";
import { Subject } from "../types/Subject";

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

  const {
    isLoading: radicalsCurrLvlLoading,
    data: radicalsCurrLvlData,
    error: radicalsCurrLvlErr,
  } = useRadicalsCurrLevel(level);

  const {
    isLoading: kanjiCurrLvlLoading,
    data: kanjiCurrLvlData,
    error: kanjiCurrLvlErr,
  } = useKanjiCurrLevel(level);

  const {
    isLoading: subjectsCurrLvlLoading,
    data: subjectsCurrLvlData,
    error: subjectsCurrLvlErr,
  } = useSubjectsCurrLevel(level);

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

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
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <RadicalContainer
                  radicals={radicalsCurrLvlData}
                ></RadicalContainer>
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
