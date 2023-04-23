import { useState, useEffect } from "react";
import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import { IonButton, IonItem, IonSpinner } from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";
import { WaniKaniAPI } from "../api/WaniKaniApi";
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

  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    getLessonsAndReviews();
  }, [auth]);

  const removeAuth = () => {
    (auth as any).removeAuth();
  };

  // TODO: level isn't always persisting across refresh, figure out why
  const setUserDetails = () => {
    let username = auth.auth!.username;
    setUsername(username);

    let level = auth.auth!.level;
    setLevel(level);
  };

  const getLessonsAndReviews = () => {
    WaniKaniAPI.getReviews()
      .then((reviews: { total_count: any; data: any }) => {
        setReviewNum(reviews.total_count);
        setReviewData(reviews.data);

        return WaniKaniAPI.getLessons();
      })
      .then((lessons) => {
        setLessonData(lessons.data);
        setLessonNum(lessons.total_count);

        console.log("level: ", level);
        return WaniKaniAPI.getSubjectsByLevel(level);
      })
      .then((subjects) => {
        // *testing
        // console.log("🚀 ~ file: Home.tsx:65 ~ .then ~ subjects:", subjects);
        // *testing

        setSubjectData(subjects.data);
        return;
      })
      .finally(() => {
        setHomeLoading(false);
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
