import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import {
  getCompletedReviewSessionData,
  createReviewPostData,
} from "../services/ReviewService";
import { useCreateReview } from "../hooks/useCreateReview";
import { useReviewQueue } from "../hooks/useReviewQueue";
import { ReviewQueueItem, ReviewPostItem } from "../types/ReviewSessionTypes";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import { FullWidthGrid } from "../styles/BaseStyledComponents";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
`;

// TODO: show button to redirect to Home instead of normal tab bar?
function ReviewSummary() {
  const [reviewQueueItems, setReviewQueueItems] = useState<ReviewQueueItem[]>(
    []
  );
  const { mutate: createReviews } = useCreateReview();
  // TODO: change so not using "any" type
  const [reviewPostDataArr, setReviewPostDataArr] = useState<any>([]);
  const { endReviewSession, queueDataState } = useReviewQueue();
  useEffect(() => {
    // *testing
    console.log("Running Review summary useEffect!");
    // *testing

    let reviewQueue = queueDataState.reviewQueue;
    // TODO: call
    let reviewData = getCompletedReviewSessionData(reviewQueue);
    setReviewQueueItems(reviewData);

    let reviewPostData = createReviewPostData(reviewData);
    setReviewPostDataArr(reviewPostData);

    // *testing
    console.log(
      "🚀 ~ file: ReviewSummary.tsx:121 ~ useEffect ~ reviewPostData:",
      reviewPostData
    );
    // *testing

    submitReviews(reviewPostData);

    endReviewSession();
  }, []);

  const submitReviews = (reviewPostData: ReviewPostItem[]) => {
    let tempArr: any = [];

    // TODO: take response and call setReviewPostDataArr with it so can be used for summary
    reviewPostData.forEach((reviewItem: ReviewPostItem) => {
      createReviews(
        { reviewSessionData: reviewItem },
        {
          onSuccess: (data) => {
            tempArr.push(data);
          },
        }
      );
    });

    // *testing
    console.log(
      "🚀 ~ file: ReviewSummary.tsx:149 ~ submitReviews ~ tempArr:",
      tempArr
    );
    // *testing
  };

  // let reviewsByResult = getReviewsGroupedByResult(reviewData);
  // let numCorrect = reviewsByResult.correct.length;
  // let numWrong = reviewsByResult.incorrect.length;
  // let percentageCorrect = Math.ceil(100 * (numCorrect / reviewData.length));

  // let reviewsByResult = getReviewsGroupedByResult(reviewQueueItems);
  // let numCorrect = reviewsByResult.correct.length;
  // let numWrong = reviewsByResult.incorrect.length;
  // let percentageCorrect = Math.ceil(
  //   100 * (numCorrect / reviewQueueItems.length)
  // );

  // let correctSubjIDs = reviewsByResult.correct.map(
  //   (reviewItem: any) => reviewItem.id
  // );
  // let incorrectSubjIDs = reviewsByResult.incorrect.map(
  //   (reviewItem: any) => reviewItem.id
  // );

  // let hasCorrect = correctSubjIDs.length !== 0;
  // let hasIncorrect = incorrectSubjIDs.length !== 0;

  // const {
  //   isLoading: correctReviewSubjLoading,
  //   data: correctReviewSubjData,
  //   error: correctReviewSubjErr,
  // } = useSubjectsByIDs(correctSubjIDs, hasCorrect);

  // const {
  //   isLoading: incorrectReviewSubjLoading,
  //   data: incorrectReviewSubjData,
  //   error: incorrectReviewSubjErr,
  // } = useSubjectsByIDs(incorrectSubjIDs, hasIncorrect);

  // let reviewSummaryDataLoading =
  //   (correctReviewSubjLoading && hasCorrect) ||
  //   (incorrectReviewSubjLoading && hasIncorrect);

  // TODO: display page content and header once all reviews have been submitted
  return (
    <Page>
      {/* TODO: pass in actual percentage (or just pass in data and calculate in component)*/}
      <ResultsHeader percentageCorrect={0} />
      <IonContent className="ion-padding">
        <FullWidthGrid>
          <ReviewResults />
        </FullWidthGrid>
      </IonContent>
    </Page>
  );
}

export default ReviewSummary;
