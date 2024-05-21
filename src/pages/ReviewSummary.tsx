import { Fragment, useEffect } from "react";
import { getReviewsGroupedByResult } from "../services/AssignmentQueueService/AssignmentQueueService";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService/AssignmentQueueService";
import { useQueueStore } from "../stores/useQueueStore/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import FloatingHomeButton from "../components/FloatingHomeButton/FloatingHomeButton";
import Card from "../components/Card";
import {
  ContentWithTabBar,
  FullWidthGridDiv,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const WarningMsg = styled.p`
  margin: 10px 0;
  color: var(--text-color);
`;

const ErrorsContainer = styled.div`
  padding: 10px;
  background-color: var(--secondary-foreground-color);
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;

  pre {
    white-space: pre-wrap;

    &::selection {
      background-color: var(--ion-color-primary);
      color: black;
    }

    &::-moz-selection {
      background-color: var(--ion-color-primary);
      color: black;
    }
  }

  hr {
    background-color: #000;
  }
`;

// TODO: make sure to attempt to resubmit reviews that had errors
function ReviewSummary() {
  const { submittedAssignmentQueueItems, submittedAssignmentsWithErrs } =
    useAssignmentSubmitStoreFacade();

  const queueItemsThatHadErrors = submittedAssignmentsWithErrs.map(
    (item) => item.queueItem
  );

  const itemErrors = submittedAssignmentsWithErrs.map((item) => item.error);

  const allSubmitted = [
    ...submittedAssignmentQueueItems,
    ...queueItemsThatHadErrors,
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

  const totalNumSubmitted =
    groupedReviewItems.correct.length + groupedReviewItems.incorrect.length;
  const totalCorrect = groupedReviewItems.correct.length;

  return (
    <>
      <ResultsHeader numCorrect={totalCorrect} numReviews={totalNumSubmitted} />
      <ContentWithTabBar>
        <FullWidthGridDiv>
          {submittedAssignmentsWithErrs.length > 0 && (
            <Card
              title={`Oh no, looks like we weren't able to submit all your reviews for
            some reason...`}
              headerBgColor="var(--ion-color-danger)"
              headerFontSize="1.25rem"
              headerTextColor="white"
            >
              <WarningMsg>
                {submittedAssignmentsWithErrs.length} review(s) had errors when
                submitting!
              </WarningMsg>
              <ErrorsContainer>
                {submittedAssignmentsWithErrs.map((itemWithErr, idx) => (
                  <Fragment key={itemWithErr.queueItem.assignment_id}>
                    <pre>
                      Error for subject ID {itemWithErr.queueItem.subject_id}:
                      {"\n"}
                      {itemWithErr.error}
                    </pre>
                    {idx >= 0 && idx !== itemErrors.length - 1 && <hr />}
                  </Fragment>
                ))}
              </ErrorsContainer>
            </Card>
          )}
          <ReviewResults groupedReviewItems={groupedReviewItems} />
        </FullWidthGridDiv>
        <FloatingHomeButton />
      </ContentWithTabBar>
    </>
  );
}

export default ReviewSummary;
