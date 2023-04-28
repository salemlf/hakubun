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
import { useReviews } from "../hooks/useReviews";
import { useLessons } from "../hooks/useLessons";
import styles from "./Home.module.css";

import Header from "../components/Header";
import LessonsButton from "../components/LessonsButton";
import ReviewsButton from "../components/ReviewsButton";
import { SubjectContainer } from "../components/SubjectContainer";
import { Subject } from "../types/Subject";

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number | undefined>();
  const [username, setUsername] = useState<string | undefined>("");
  const [radicalsCurrLevel, setRadicalsCurrLevel] = useState<Subject[]>([]);
  const [kanjiCurrLevel, setKanjiCurrLevel] = useState<Subject[]>([]);

  const auth = useAuth();

  // TODO: change so loading displays until everything is loaded (including subjects)
  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    // setHomeLoading(false);
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

  const onSubjectsCurrLvlSuccess = (data: any) => {
    console.log("onSubjectsCurrLvlSuccess called!");
    if (data) {
      getRadicalsForLevel();
      getKanjiForLevel();
    }
    setHomeLoading(false);
  };

  // TODO see if I need to use this
  const onSubjectsCurrLvlErr = (error: any) => {
    console.log("🚀 ~ file: Home.tsx:92 ~ onLvlSubjectsErr ~ error:", error);
  };

  const {
    isLoading: subjectsCurrLvlLoading,
    data: subjectsCurrLvlData,
    error: subjectsCurrLvlErr,
  } = useSubjectsCurrLevel(
    level,
    onSubjectsCurrLvlSuccess,
    onSubjectsCurrLvlErr
  );

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  const goToReviews = () => {
    // TODO: use reviewData
    console.log("TODO: add reviews button action");
  };

  // TODO: move to transformation file
  const getRadicalsForLevel = () => {
    // TODO: wrapping in if statement to avoid subjectsCurrLvlData undefined error, figure out why undefined
    if (subjectsCurrLvlData) {
      let radicals = subjectsCurrLvlData.filter((el) => el.object == "radical");

      // TODO: this way is icky, create a component that checks urls and returns them instead
      radicals = radicals.map((radical) => {
        let availableImages =
          radical.character_images
            ?.filter((image: any) => image.content_type === "image/png")
            .map((image: any) => image.url) || null;

        radical.selectedImage = availableImages![0];
        radical.fallbackImage = availableImages![1];

        return radical;
      });

      // TODO: fix, radicals in child component not updating cuz it doesn't recognize array changes due to lack of deep copy
      let updatedRadicals = JSON.parse(JSON.stringify(radicals));

      setRadicalsCurrLevel(updatedRadicals);
    }
  };

  // TODO: move to transformation file
  const getKanjiForLevel = () => {
    // TODO: wrapping in if statement to avoid subjectsCurrLvlData undefined error, figure out why undefined
    if (subjectsCurrLvlData) {
      let kanji = subjectsCurrLvlData!.filter((el) => el.object == "kanji");
      setKanjiCurrLevel(kanji);
    }
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
          {radicalsCurrLevel && (
            <IonRow class="ion-justify-content-start">
              <IonCol>
                <SubjectContainer
                  radicals={radicalsCurrLevel}
                ></SubjectContainer>
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
