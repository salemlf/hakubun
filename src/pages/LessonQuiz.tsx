import { useEffect, useState } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { shuffleArray } from "../services/MiscService";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import AnimatedPage from "../components/AnimatedPage";
import ReviewCards from "../components/ReviewCards";
import QueueHeader from "../components/QueueHeader";
import styled from "styled-components";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";

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

// TODO: add ReactRouterPrompt and account for user trying to navigate away from page
function LessonQuiz() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const assignmentQueue = useAssignmentQueueStore.use.assignmentQueue();
  const setAssignmentQueueData =
    useAssignmentQueueStore.use.setAssignmentQueueData();

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

      setAssignmentQueueData(shuffledLessons);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [location.state]);

  // TODO: start assignments and redirect to lesson summary page
  const submitLessonQuiz = (queueData: ReviewQueueItem[]) => {
    // *testing
    console.log("submitLessonQuiz NOT IMPLEMENTED YET");
    // *testing
  };

  return (
    <Page>
      {!isLoading && assignmentQueue.length !== 0 && <QueueHeader />}
      <IonContent>
        <Grid>
          {isLoading && <p>Loading...</p>}
          {!isLoading && assignmentQueue.length !== 0 && (
            <ReviewCards submitItems={submitLessonQuiz} />
          )}
        </Grid>
      </IonContent>
    </Page>
  );
}

export default LessonQuiz;
