import { useState, useEffect } from "react";
import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import { IonButton, IonItem, IonSpinner } from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import usePrevious from "../hooks/usePrevious";

import Header from "../components/Header";
import LessonsButton from "../components/LessonsButton";
import ReviewsButton from "../components/ReviewsButton";

const Home = () => {
  const [reviewNum, setReviewNum] = useState<number | undefined>();
  const [reviewData, setReviewData] = useState([]);
  const [lessonNum, setLessonNum] = useState<number | undefined>();
  const [lessonData, setLessonData] = useState([]);
  const [subjectData, setSubjectData] = useState<Array<any>>([]);
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number | undefined>();
  const [username, setUsername] = useState<string | undefined>("");

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

  const removeAuth = () => {
    (auth as any).removeAuth();
  };

  const setUserDetails = () => {
    let username = auth.auth!.username;
    setUsername(username);

    let level = auth.auth!.level;
    setLevel(level);
  };

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

  const getSubjectsForLevel = () => {
    WaniKaniAPI.getSubjectsByLevel(level).then((subjects) => {
      setSubjectData(subjects.data);
    });
  };

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
          <IonRow>
            <IonButton
              title="Remove authorization"
              onClick={() => removeAuth()}
            >
              Remove Auth
            </IonButton>
          </IonRow>
        </IonGrid>
        {homeLoading && <IonSpinner name="dots"></IonSpinner>}
      </IonContent>
    </>
  );
};

export default Home;
