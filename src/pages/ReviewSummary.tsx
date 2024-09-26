import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";
import {
  getReviewsGroupedByResult,
  getCompletedAssignmentQueueData,
} from "../services/AssignmentQueueService/AssignmentQueueService";
import { useQueueStore } from "../stores/useQueueStore/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import SummaryLayout from "../components/SummaryLayout";
import ErrorCard from "../components/SummaryErrorCard";
import ReviewsIcon from "../images/reviews.svg?react";

// TODO: make sure to attempt to resubmit reviews that had errors
function ReviewSummary() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { scrollY } = useScroll({ container: contentRef });
  const [showButtons, setShowButtons] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prevScrollY = scrollY.getPrevious();
    setShowButtons(latest > prevScrollY);
  });

  const { submittedAssignmentQueueItems, submittedAssignmentsWithErrs } =
    useAssignmentSubmitStoreFacade();

  const allSubmitted = [
    ...submittedAssignmentQueueItems,
    ...submittedAssignmentsWithErrs.map((item) => item.queueItem),
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
      <SummaryLayout
        showButtons={showButtons}
        onMorePress={() => navigate("/reviews/settings", { replace: true })}
        moreButtonText="Do More Reviews!"
        moreButtonIcon={<ReviewsIcon />}
      >
        {submittedAssignmentsWithErrs.length > 0 && (
          <ErrorCard
            errorCount={submittedAssignmentsWithErrs.length}
            errors={submittedAssignmentsWithErrs}
            type="review"
          />
        )}
        <ReviewResults groupedReviewItems={groupedReviewItems} />
      </SummaryLayout>
    </>
  );
}

export default ReviewSummary;
