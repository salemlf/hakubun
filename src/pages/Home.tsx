import { useState, useEffect, useRef } from "react";
import { IonGrid, IonCol, IonRow, IonSkeletonText } from "@ionic/react";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
  useVelocity,
} from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useUserAuth } from "../contexts/AuthContext";
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
import RefreshIcon from "../images/refresh.svg";
import { FixedCenterContainer } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const SnapContainer = styled.div`
  scroll-snap-type: y mandatory;
  overscroll-behavior-y: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  scroll-snap-align: start;
`;

const DraggableMainContent = styled(motion.main)`
  max-width: 100vw;
  padding: 5px 5px 85px 5px;
  /* height: 100%; */
  scroll-snap-align: start;
`;

const REFRESH_MAX_SIZE = 100;

const refreshingVariants = {
  hidden: { height: 0, width: 0, rotate: 0, marginTop: 0, marginBottom: 0 },
  refreshing: {
    height: REFRESH_MAX_SIZE,
    width: REFRESH_MAX_SIZE,
    marginTop: 20,
    marginBottom: 20,
  },
  spin: { rotate: -360, transition: { duration: 2, repeat: Infinity } },
  complete: { height: 0, width: 0, rotate: 0, marginTop: 0, marginBottom: 0 },
};

const Home = () => {
  const queryClient = useQueryClient();
  const appContext = useUserAuth();
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const [lastTimeRefreshed, setLastTimeRefreshed] = useState<
    Date | undefined
  >();

  const controls = useAnimation();
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainContentRef,
    container: snapContainerRef,
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["assignments-available-for-review"],
    });
    queryClient.invalidateQueries({
      queryKey: ["assignments-available-in-range"],
    });
    queryClient.invalidateQueries({
      queryKey: ["available-lessons"],
    });
  };

  const refreshIfTimeElapsed = () => {
    let currTime = new Date();
    if (lastTimeRefreshed === undefined) {
      setLastTimeRefreshed(currTime);
      refresh();
      return;
    }

    let timeDiff = (currTime.getTime() - lastTimeRefreshed.getTime()) / 60000;
    // *testing
    console.log(
      "🚀 ~ file: Home.tsx:133 ~ refreshIfTimeElapsed ~ timeDiff:",
      timeDiff
    );
    // *testing

    // if it's been more than a minute, refresh
    // TODO: otherwise, show a toast letting user know they can't refresh yet
    if (timeDiff >= 1) {
      refresh();
    }
  };

  // TODO: improve/change how this is done
  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (latest < -2 && scrollYProgress.get() < 0.2) {
      controls.start("refreshing");
      controls.start("spin");
      refreshIfTimeElapsed();

      setTimeout(() => {
        controls.start("complete");
      }, 3000);
    }
  });

  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    setHomeLoading(false);
  }, [appContext.isAuthenticated]);

  const setUserDetails = () => {
    let userData = appContext.user;
    if (userData !== null) {
      setLevel(userData.level);
    }
  };

  return (
    <>
      <AnimatedPage>
        <HomeHeader></HomeHeader>
        <SnapContainer ref={snapContainerRef}>
          <LoadingContainer>
            <motion.img
              initial="hidden"
              animate={controls}
              src={RefreshIcon}
              variants={refreshingVariants}
            />
          </LoadingContainer>
          <DraggableMainContent ref={mainContentRef}>
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
          </DraggableMainContent>
        </SnapContainer>
        <FloatingTabBar />
      </AnimatedPage>
    </>
  );
};

export default Home;
