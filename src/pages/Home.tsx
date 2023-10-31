import { useState, useEffect } from "react";
import { IonGrid, IonCol, IonRow, IonSkeletonText } from "@ionic/react";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
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
import styled from "styled-components";

const HomePageContainer = styled(ContentWithTabBar)`
  margin: 0 8px;
`;

const LessonAndReviewButtonsContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 16px;
`;

// TODO: save previous level value and show animation/congrats when level increases
const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const { setUserInfo, userInfo } = useUserInfoStoreFacade();

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
      <HomePageContainer>
        {!homeLoading ? (
          <>
            <LessonAndReviewButtonsContainer>
              <LessonsButton />
              <ReviewsButton level={level}></ReviewsButton>
            </LessonAndReviewButtonsContainer>
            <LevelProgressBar level={level} />
            <RadicalForLvlCard level={level}></RadicalForLvlCard>
            <KanjiForLvlCard level={level}></KanjiForLvlCard>
            <SrsStages></SrsStages>
            <ReviewForecast />
          </>
        ) : (
          <IonSkeletonText animated={true}></IonSkeletonText>
        )}
        {homeLoading && (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        )}
      </HomePageContainer>
      <FloatingTabBar />
    </AnimatedPage>
  );
};

export default Home;
