import { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonItem,
  IonSpinner,
  IonCard,
} from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import usePrevious from "../hooks/usePrevious";
import styles from "./Home.module.css";

import Header from "../components/Header";
import LessonsButton from "../components/LessonsButton";
import ReviewsButton from "../components/ReviewsButton";
import { SubjectContainer } from "../components/SubjectContainer";
import { Subject, SubjectCharacterImage } from "../types/Subject";

const Home = () => {
  const [reviewNum, setReviewNum] = useState<number | undefined>();
  const [reviewData, setReviewData] = useState([]);
  const [lessonNum, setLessonNum] = useState<number | undefined>();
  const [lessonData, setLessonData] = useState([]);
  const [subjectData, setSubjectData] = useState<Subject[]>([]);
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number | undefined>();
  const [username, setUsername] = useState<string | undefined>("");
  const [radicalsCurrLevel, setRadicalsCurrLevel] = useState<Subject[]>([]);
  const [kanjiCurrLevel, setKanjiCurrLevel] = useState<Subject[]>([]);

  const auth = useAuth();
  const prevLevel = usePrevious(level);

  // TODO: change so loading displays until everything is loaded (including subjects)
  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    setHomeLoading(false);
  }, [auth]);

  useEffect(() => {
    if (!prevLevel && level) {
      getAvailableLessons();
      getAvailableReviews();
      getSubjectsForLevel();
    }
  }, [level]);

  // called every time subjectData updates
  useEffect(() => {
    getRadicalsForLevel();
    getKanjiForLevel();
  }, [JSON.stringify(subjectData)]);

  const removeAuth = () => {
    (auth as any).removeAuth();
  };

  const setUserDetails = () => {
    let username = auth.auth!.username;
    setUsername(username);

    let level = auth.auth!.level;
    setLevel(level);
  };

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  const goToReviews = () => {
    // TODO: use reviewData
    console.log("TODO: add reviews button action");
  };

  // TODO: below functions should be moved to their own file eventually
  const getAvailableLessons = () => {
    WaniKaniAPI.getLessons().then(
      (lessons: { total_count: any; data: any }) => {
        setLessonNum(lessons.total_count);
        setLessonData(lessons.data);
      }
    );
  };

  const getAvailableReviews = () => {
    WaniKaniAPI.getReviews().then(
      (reviews: { total_count: any; data: any }) => {
        setReviewNum(reviews.total_count);
        setReviewData(reviews.data);
      }
    );
  };

  // TODO: move
  const getSubjectsForLevel = () => {
    WaniKaniAPI.getSubjectsByLevel(level).then((subjects) => {
      let subjectData = subjects.data;

      // lowering nested data object down a level
      let lifted = subjectData.map((elem) => {
        elem = Object.assign({}, elem, elem.data);
        delete elem.data;
        return elem;
      });

      setSubjectData(lifted);
    });
  };

  // TODO: move to transformation file
  const getRadicalsForLevel = () => {
    let radicals = subjectData.filter((el) => el.object == "radical");
    setRadicalsCurrLevel(radicals);

    // TODO: this way is icky, create a component that checks urls and returns them instead
    radicals = radicals.map((radical) => {
      let availableImages =
        radical.character_images
          ?.filter((image) => image.content_type === "image/png")
          .map((image) => image.url) || null;

      radical.selectedImage = availableImages![0];
      radical.fallbackImage = availableImages![1];

      return radical;
    });
  };

  // TODO: move to transformation file
  const getKanjiForLevel = () => {
    let kanji = subjectData.filter((el) => el.object == "kanji");
    setKanjiCurrLevel(kanji);
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
                numLessons={lessonNum}
              ></LessonsButton>
            </IonCol>
            <IonCol>
              <ReviewsButton
                handleClick={goToReviews}
                numReviews={reviewNum}
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
