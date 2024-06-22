import { useState, useEffect } from "react";
import { IonSkeletonText } from "@ionic/react";
import { useScrollRestoration } from "use-scroll-restoration";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import { useAuthTokenStore } from "../stores/useAuthTokenStore/useAuthTokenStore";
import { useUserInfo } from "../hooks/user/useUserInfo";
import { PersistentStore } from "../hooks/useHydration";
import LevelProgressBar from "../components/LevelProgressBar/LevelProgressBar";
import HomeHeader from "../components/HomeHeader";
import LessonsButton from "../components/LessonsButton/LessonsButton";
import ReviewsButton from "../components/ReviewsButton/ReviewsButton";
import RadicalsForLvlCard from "../components/RadicalsForLvlCard/RadicalsForLvlCard";
import KanjiForLvlCard from "../components/KanjiForLvlCard/KanjiForLvlCard";
import SrsStages from "../components/SrsStages/SrsStages";
import ReviewForecast from "../components/ReviewForecast";
import LoadingDots from "../components/LoadingDots";
import HydrationWrapper from "../components/HydrationWrapper";
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

const Home = () => {
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number | undefined>();
  const { setUserInfo, userInfo } = useUserInfoStoreFacade();

  const { ref } = useScrollRestoration("homePageScroll", {
    debounceTime: 200,
    persist: "sessionStorage",
  });

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
    <HydrationWrapper store={useAuthTokenStore as PersistentStore}>
      <HomeHeader></HomeHeader>
      <HomePageContainer ref={ref}>
        {!homeLoading ? (
          <>
            <LessonAndReviewButtonsContainer>
              <LessonsButton />
              <ReviewsButton />
            </LessonAndReviewButtonsContainer>
            {level && (
              <>
                <LevelProgressBar level={level} />
                <RadicalsForLvlCard level={level}></RadicalsForLvlCard>
                <KanjiForLvlCard level={level}></KanjiForLvlCard>
              </>
            )}
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
    </HydrationWrapper>
  );
};

export default Home;
