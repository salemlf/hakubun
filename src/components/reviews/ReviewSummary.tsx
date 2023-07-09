import { useReviewQueue } from "../../hooks/useReviewQueue";
import { getReviewSessionStats } from "../../services/ReviewService";

export const ReviewSummary = () => {
  const { queueDataState } = useReviewQueue();
  let reviewQueue = queueDataState.reviewQueue;
  let stats = getReviewSessionStats(reviewQueue);

  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:7 ~ ReviewSummary ~ reviewQueue:",
    reviewQueue
  );
  // *testing
  return <div>Review Summary</div>;
};
