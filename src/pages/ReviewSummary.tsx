import { useEffect } from "react";
import { getReviewsGroupedByResult } from "../services/AssignmentQueueService";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService";
import { useQueueStore } from "../stores/useQueueStore/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import AnimatedPage from "../components/AnimatedPage";
import FloatingHomeButton from "../components/FloatingHomeButton/FloatingHomeButton";
import {
  ContentWithTabBar,
  FullWidthGridDiv,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

// TODO: figure out why background color isn't changing, fix and change to --light-greyish-purple background, then cards to --light-grey
const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const WarningMsg = styled.p`
  margin: 16px;
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
  let completedReviews = getCompletedAssignmentQueueData(allSubmitted);
  let groupedReviewItems = getReviewsGroupedByResult(completedReviews);

  return (
    <Page>
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
    </Page>
  );
}

export default ReviewSummary;
