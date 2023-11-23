import { useEffect } from "react";
import { getReviewsGroupedByResult } from "../services/AssignmentQueueService";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService";
import { useQueueStore } from "../stores/useQueueStore/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import FloatingHomeButton from "../components/FloatingHomeButton/FloatingHomeButton";
import {
  ContentWithTabBar,
  FullWidthGridDiv,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const WarningMsg = styled.p`
  margin: 16px;
  color: var(--text-color);
`;

// TODO: make sure to attempt to resubmit reviews that had errors
function ReviewSummary() {
  const { submittedAssignmentQueueItems, submittedAssignmentsWithErrs } =
    useAssignmentSubmitStoreFacade();

  const allSubmitted = [
    ...submittedAssignmentQueueItems,
    ...submittedAssignmentsWithErrs,
  ];

  const resetQueueStore = useQueueStore((state) => state.resetAll);
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );

  useEffect(() => {
    resetQueueStore();
    resetAssignmentQueue();
  }, []);

  // combine queue items so reading and meaning aren't separate anymore
  const completedReviews = getCompletedAssignmentQueueData(allSubmitted);
  const groupedReviewItems = getReviewsGroupedByResult(completedReviews);
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:43 ~ ReviewSummary ~ completedReviews:",
    completedReviews
  );
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:44 ~ ReviewSummary ~ groupedReviewItems:",
    groupedReviewItems
  );
  // *testing

  return (
    <>
      <ResultsHeader
        numCorrect={groupedReviewItems.correct.length}
        numReviews={allSubmitted.length}
      />
      <ContentWithTabBar>
        <FullWidthGridDiv>
          <ReviewResults groupedReviewItems={groupedReviewItems} />
          {submittedAssignmentsWithErrs.length > 0 && (
            <WarningMsg>
              Oh no, looks like we weren't able to submit all your reviews for
              some reason... {submittedAssignmentsWithErrs.length} had errors!
            </WarningMsg>
          )}
        </FullWidthGridDiv>
        <FloatingHomeButton />
      </ContentWithTabBar>
    </>
  );
}

export default ReviewSummary;
