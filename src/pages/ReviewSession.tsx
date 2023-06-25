import { useEffect, useState } from "react";
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from "@ionic/react";
import { useTabBarContext } from "../contexts/TabBarContext";
import { useReviewSession } from "../contexts/ReviewSessionContext";
import { useQueue } from "../hooks/useQueue";

import styled from "styled-components/macro";

import { getSubjectColor } from "../services/SubjectAndAssignmentService";
import { SubjectType } from "../types/Subject";
import { ReviewQueueItem } from "../types/MiscTypes";
import { SubjectChars } from "../components/SubjectChars";
import { ReviewSessionHeader } from "../components/reviews/ReviewSessionHeader";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

const ButtonCol = styled(IonCol)`
  text-align: center;
  button {
    font-size: 1.5rem;
  }
`;

type CharColProps = {
  subjType: SubjectType;
};

const SubjectCharactersCol = styled(IonCol)<CharColProps>`
  padding: 50px 0;
  padding-bottom: 65px;
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
`;

type Props = {
  reviewQueue: ReviewQueueItem[];
  onPrevClick: () => void;
  onNextClick: () => void;
  currReviewCardIndex: number;
};

const ReviewQueue = ({
  reviewQueue,
  onPrevClick,
  onNextClick,
  currReviewCardIndex,
}: Props) => {
  const currentReviewItem = reviewQueue[currReviewCardIndex];
  let subjType = currentReviewItem.object as SubjectType;

  // TODO: remove "previous" button, just for testing right now

  return (
    <>
      <IonRow>
        <SubjectCharactersCol subjType={subjType}>
          <SubjectChars
            subject={currentReviewItem}
            fontSize="4rem"
            withBgColor={true}
          />
        </SubjectCharactersCol>
      </IonRow>
      <IonGrid>
        <IonRow>
          <ButtonCol>
            <button onClick={onPrevClick} disabled={currReviewCardIndex === 0}>
              Previous
            </button>
          </ButtonCol>
          <ButtonCol>
            <button
              onClick={onNextClick}
              disabled={currReviewCardIndex === reviewQueue.length - 1}
            >
              Next
            </button>
          </ButtonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: fix the excessive number of rerenders happening for this page
export const ReviewSession = () => {
  const { setShowTabBar } = useTabBarContext();
  useEffect(() => {
    setShowTabBar(false);

    return () => {
      setShowTabBar(true);
    };
  });

  const [currReviewCardIndex, setCurrReviewCardIndex] = useState(0);
  const { state } = useReviewSession();
  let reviewQueue = state.reviewQueue;

  const handleNextClick = () => {
    setCurrReviewCardIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrReviewCardIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <Page>
      {!state.isLoading && reviewQueue && reviewQueue.length !== 0 && (
        <ReviewSessionHeader
          reviewQueue={reviewQueue}
          currReviewCardIndex={currReviewCardIndex}
        />
      )}
      <IonContent>
        {/* <IonGrid> */}
        {state.isLoading && <p>Loading...</p>}
        {!state.isLoading && reviewQueue && reviewQueue.length !== 0 && (
          <ReviewQueue
            reviewQueue={reviewQueue}
            currReviewCardIndex={currReviewCardIndex}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
        )}
        {/* </IonGrid> */}
      </IonContent>
    </Page>
  );
};
