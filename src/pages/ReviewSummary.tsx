import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
} from "@ionic/react";
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
import { useLocation } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
`;

const HeaderContainer = styled(IonHeader)`
  background: var(--wanikani-review);
  --ion-toolbar-background: var(--wanikani-review);
  padding: 10px 0;
  box-shadow: none;
`;

const Title = styled(IonTitle)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 90px 1px;
  width: 100%;
  height: 100%;
  text-align: center;
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
  // !added
  // TODO: use passed in data from review queue page
  const location = useLocation();
  const dataTest = location.state;
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:33 ~ ReviewSummary ~ dataTest:",
    dataTest
  );
  // !added
  useEffect(() => {
    // *testing
    console.log("Ending review session in review summary useEffect!");
    // *testing
    endReviewSession();
  }, []);

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
      <HeaderContainer>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <Title>Review Settings</Title>
        </IonToolbar>
      </HeaderContainer>
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
