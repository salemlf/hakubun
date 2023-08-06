import { useState, useEffect } from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonSpinner,
  IonSkeletonText,
} from "@ionic/react";

import { useUserAuth } from "../contexts/AuthContext";
import LevelProgressBar from "../components/LevelProgressBar/LevelProgressBar";
import HomeHeader from "../components/HomeHeader";
import LessonsButton from "../components/LessonsButton/LessonsButton";
import ReviewsButton from "../components/ReviewsButton/ReviewsButton";
import RadicalForLvlCard from "../components/RadicalForLvlCard/RadicalForLvlCard";
import KanjiForLvlCard from "../components/KanjiForLvlCard/KanjiForLvlCard";
import SrsStages from "../components/SrsStages/SrsStages";
// import FloatingTabBar from "../components/FloatingTabBar";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import AnimatedPage from "../components/AnimatedPage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const navigate = useNavigate();

  const appContext = useUserAuth();

  // TODO: remove spinner for loading, just using text skeletons instead
  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    setHomeLoading(false);
  }, [appContext.isAuthenticated]);

  const removeAuth = () => {
    appContext.logout();
    navigate("/authenticate");
  };

  const setUserDetails = () => {
    let userData = appContext.user;
    if (userData !== null) {
      setLevel(userData.level);
    }
  };

  return (
    <AnimatedPage>
      <HomeHeader></HomeHeader>
      <ContentWithTabBar>
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
                  <LevelProgressBar level={level} />
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <IonCol>
                  <RadicalForLvlCard level={level}></RadicalForLvlCard>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <IonCol>
                  <KanjiForLvlCard level={level}></KanjiForLvlCard>
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
      </ContentWithTabBar>
      {/* <FloatingTabBar /> */}
    </AnimatedPage>
  );
};

export default Home;
