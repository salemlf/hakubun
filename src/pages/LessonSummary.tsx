import { IonContent } from "@ionic/react";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { useQueueStore } from "../stores/useQueueStore";
import AnimatedPage from "../components/AnimatedPage";
import HomeButton from "../components/HomeButton";
import { FullWidthGrid } from "../styles/BaseStyledComponents";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { useEffect } from "react";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

// TODO: create a header component for this page
function LessonSummary() {
  const location = useLocation();
  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const lessonsStartedData: ReviewQueueItem[] = location.state.lessonResponses;
  //   *testing
  console.log(
    "🚀 ~ file: LessonSummary.tsx:21 ~ LessonSummary ~ lessonsStartedData:",
    lessonsStartedData
  );
  //   *testing

  useEffect(() => {
    resetQueueStore();
    resetAssignmentQueue();
  }, []);

  // TODO: use data passed from previous page to display lesson summary

  return (
    <Page>
      <IonContent className="ion-padding">
        <FullWidthGrid>
          <p>Lesson summary, plz implement :p</p>
        </FullWidthGrid>
        <HomeButton />
      </IonContent>
    </Page>
  );
}

export default LessonSummary;
