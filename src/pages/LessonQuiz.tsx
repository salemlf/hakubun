import { useEffect } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { shuffleArray } from "../services/MiscService";
import { useLessonQuizStore } from "../stores/useLessonQuizStore";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import AnimatedPage from "../components/AnimatedPage";
import ReviewCards from "../components/ReviewCards";
import QueueHeader from "../components/QueueHeader";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const Grid = styled(IonGrid)`
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 10px;
`;

function LessonQuiz() {
  const location = useLocation();
  const isLoading = useLessonQuizStore.use.isLoading();
  const lessonQuizQueue = useLessonQuizStore.use.lessonQuizQueue();
  const setLessonQuizLoaded = useLessonQuizStore.use.setLessonQuizLoaded();
  // TODO: move this state down to ReviewCards
  const currQueueIndex = useLessonQuizStore.use.currQueueIndex();

  let lessonQueueFromSession: ReviewQueueItem[] = location.state;

  useEffect(() => {
    if (location.state) {
      const shuffledLessons = shuffleArray(lessonQueueFromSession);
      //   *testing
      console.log(
        "🚀 ~ file: LessonQuiz.tsx:52 ~ useEffect ~ shuffledLessons:",
        shuffledLessons
      );
      //   *testing

      setLessonQuizLoaded(shuffledLessons);
    }
  }, [location.state]);

  let currentReviewItem = lessonQuizQueue[currQueueIndex];

  return (
    <Page>
      {!isLoading && lessonQuizQueue.length !== 0 && (
        <QueueHeader currentReviewItem={currentReviewItem} queueType="quiz" />
      )}
      <IonContent>
        <Grid>
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            lessonQuizQueue.length !== currQueueIndex &&
            currentReviewItem && <ReviewCards queueType="quiz" />}
        </Grid>
      </IonContent>
    </Page>
  );
}

export default LessonQuiz;
