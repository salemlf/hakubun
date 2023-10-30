import { useEffect } from "react";
import { getReviewsGroupedByResult } from "../services/AssignmentQueueService";
import { useQueueStore } from "../stores/useQueueStore/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
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
    return () => {
      // TODO: call resetAll on submit store?
    };
  }, []);

  let groupedReviewItems = getReviewsGroupedByResult(allSubmitted);
  let numCorrect = groupedReviewItems.correct.length;
  let numWrong = groupedReviewItems.incorrect.length;

  return (
    <Page>
      <ResultsHeader numCorrect={numCorrect} numReviews={allSubmitted.length} />
      <MainContent>
        <Grid>
          <ReviewResults
            groupedReviewItems={groupedReviewItems}
            numWrong={numWrong}
            numCorrect={numCorrect}
          />
          {submittedAssignmentsWithErrs.length > 0 && (
            <WarningMsg>
              Oh no, looks like we weren't able to submit all your reviews for
              some reason... {submittedAssignmentsWithErrs.length} had errors!
            </WarningMsg>
          )}
        </Grid>
        <FloatingHomeButton />
      </MainContent>
    </Page>
  );
}

export default ReviewSummary;
