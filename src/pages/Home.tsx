import { useState, useEffect } from "react";
import { IonGrid, IonCol, IonRow, IonSkeletonText } from "@ionic/react";
import { useUserInfoStore } from "../stores/useUserInfoStore";
import { useUserInfo } from "../hooks/useUserInfo";
import LevelProgressBar from "../components/LevelProgressBar/LevelProgressBar";
import HomeHeader from "../components/HomeHeader";
import LessonsButton from "../components/LessonsButton/LessonsButton";
import ReviewsButton from "../components/ReviewsButton/ReviewsButton";
import RadicalForLvlCard from "../components/RadicalForLvlCard/RadicalForLvlCard";
import KanjiForLvlCard from "../components/KanjiForLvlCard/KanjiForLvlCard";
import SrsStages from "../components/SrsStages/SrsStages";
import AnimatedPage from "../components/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import ReviewForecast from "../components/ReviewForecast";
import LoadingDots from "../components/LoadingDots";
import { FixedCenterContainer } from "../styles/BaseStyledComponents";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";

// TODO: save previous level value and show animation/congrats when level increases
const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const userInfo = useUserInfoStore.use.userInfo();
  const setUserInfo = useUserInfoStore.use.setUserInfo();

  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    setHomeLoading(false);
  }, [userInfo]);

  const setUserDetails = () => {
    if (userInfo) {
      setLevel(userInfo.level);
    }
  };

  // technically this would get the data again after initial user login, but one extra query ain't that big of a deal
  const {
    isLoading: userInfoLoading,
    data: userInfoData,
    error: userInfoErr,
  } = useUserInfo();

  useEffect(() => {
    if (!userInfoLoading && userInfoData) {
      if (!userInfoErr && userInfoData.data) {
        setUserInfo(userInfoData.data);
      }
    }
  }, [userInfoLoading]);

  return (
    <AnimatedPage>
      <HomeHeader></HomeHeader>
      <ContentWithTabBar>
        <IonGrid>
          {!homeLoading ? (
            <>
              <IonRow>
                <IonCol>
                  <LessonsButton />
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
              <IonRow class="ion-justify-content-start">
                <ReviewForecast />
              </IonRow>
            </>
          ) : (
            <IonSkeletonText animated={true}></IonSkeletonText>
          )}
        </IonGrid>
        {homeLoading && (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        )}
      </ContentWithTabBar>
      <FloatingTabBar />
    </AnimatedPage>
  );
};

export default Home;
