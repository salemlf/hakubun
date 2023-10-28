import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getReviewsGroupedByResult } from "../services/AssignmentQueueService";
import { flattenData } from "../services/MiscService";
import { useQueueStore } from "../stores/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { Assignment, PreFlattenedAssignment } from "../types/Assignment";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../types/AssignmentQueueTypes";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import AnimatedPage from "../components/AnimatedPage";
import FloatingHomeButton from "../components/FloatingHomeButton/FloatingHomeButton";
import { FullWidthGridDiv, MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

// TODO: figure out why background color isn't changing, fix and change to --light-greyish-purple background, then cards to --light-grey
const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const Grid = styled(FullWidthGridDiv)`
  margin-top: 10px;
`;

const WarningMsg = styled.p`
  margin: 16px;
`;

// TODO: change to use submit store data
function ReviewSummary() {
  const location = useLocation();
  const resetQueueStore = useQueueStore((state) => state.resetAll);
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );
  const submittedReviewInfo: AssignmentSubmitInfo = location.state;
  const reviewData: AssignmentQueueItem[] = submittedReviewInfo.assignmentData;
  const errors: AssignmentQueueItem[] = submittedReviewInfo.errors;
  // *testing
  if (errors.length > 0) {
    console.log("errors: ", errors);
  }
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
    submittedReviewInfo.submitResponses;

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
      <MainContent>
        <Grid>
          <ReviewResults
            groupedReviewItems={groupedReviewItems}
            numWrong={numWrong}
            numCorrect={numCorrect}
          />
          {errors.length > 0 && (
            <WarningMsg>
              Oh no, looks like we weren't able to submit all your reviews for
              some reason...
            </WarningMsg>
          )}
        </Grid>
        <FloatingHomeButton />
      </MainContent>
    </Page>
  );
}

export default ReviewSummary;
