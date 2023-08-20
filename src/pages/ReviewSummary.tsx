import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IonContent } from "@ionic/react";
import { getReviewsGroupedByResult } from "../services/ReviewService";
import { flattenData } from "../services/MiscService";
import { useQueueStore } from "../stores/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { Assignment, PreFlattenedAssignment } from "../types/Assignment";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import AnimatedPage from "../components/AnimatedPage";
import HomeButton from "../components/HomeButton";
import { FullWidthGrid } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
`;

function ReviewSummary() {
  const location = useLocation();
  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const reviewData: ReviewQueueItem[] = location.state.reviewData;
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:52 ~ ReviewSummary ~ location.state:",
    location.state
  );
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:52 ~ ReviewSummary ~ reviewData:",
    reviewData
  );
  // *testing
  const reviewResponses: PreFlattenedAssignment[] =
    location.state.reviewResponses;

  const flattenedAssignmentData: Assignment[] = flattenData(
    reviewResponses,
    false
  );
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:55 ~ ReviewSummary ~ reviewResponses:",
    reviewResponses
  );
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:69 ~ ReviewSummary ~ flattenedAssignmentData:",
    flattenedAssignmentData
  );
  // *testing

  useEffect(() => {
    resetQueueStore();
    resetAssignmentQueue();
  }, []);

  let groupedReviewItems = getReviewsGroupedByResult(reviewData);
  let numCorrect = groupedReviewItems.correct.length;
  let numWrong = groupedReviewItems.incorrect.length;

  return (
    <Page>
      <ResultsHeader numCorrect={numCorrect} numReviews={reviewData.length} />
      <IonContent className="ion-padding">
        <FullWidthGrid>
          <ReviewResults
            groupedReviewItems={groupedReviewItems}
            numWrong={numWrong}
            numCorrect={numCorrect}
          />
        </FullWidthGrid>
        <HomeButton />
      </IonContent>
    </Page>
  );
}

export default ReviewSummary;
