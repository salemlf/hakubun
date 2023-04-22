import React, { useState, useEffect } from "react";
// import { Text, View, Button, ActivityIndicator } from "react-native";
import { IonButton, IonSpinner } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const Home = () => {
  const [reviewNum, setReviewNum] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [homeLoading, setHomeLoading] = useState(false);
  // TODO: show user level and name

  const auth = useAuth();
  const removeAuth = () => {
    (auth as any).removeAuth();
  };

  useEffect(() => {
    setHomeLoading(true);

    WaniKaniAPI.getReviews()
      .then((reviews: { total_count: any; data: any }) => {
        // *testing
        console.log("🚀 ~ file: Home.js:22 ~ .then ~ reviews:", reviews);
        // *testing

        setReviewNum(`${reviews.total_count}`);
        setReviewData(reviews.data);

        // TODO: use reviewData to show radicals kanji and kanji

        // TODO: get lessons by chaining promises
      })
      .finally(() => {
        setHomeLoading(false);
      });
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Testing Home!</p>
        <p>Reviews: {reviewNum}</p>
        {homeLoading && <IonSpinner name="dots"></IonSpinner>}
        <IonButton title="Remove authorization" onClick={() => removeAuth()}>
          Remove Auth
        </IonButton>
      </IonContent>
    </>
  );
};

export default Home;
