import { useEffect, useState } from "react";
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from "@ionic/react";
import { useTabBarContext } from "../contexts/TabBarContext";
import { useReviewSession } from "../contexts/ReviewSessionContext";
import { useQueue } from "../hooks/useQueue";
import { SubjectChars } from "../components/SubjectChars";

import styled from "styled-components/macro";
import { Subject } from "../types/Subject";

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

type Props = {
  reviewCards: Subject[];
};

const ReviewQueue = ({ reviewCards }: Props) => {
  const [currReviewCardIndex, setCurrReviewCardIndex] = useState(0);

  const handleNextClick = () => {
    setCurrReviewCardIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrReviewCardIndex((prevIndex) => prevIndex - 1);
  };

  const currentReviewItem = reviewCards[currReviewCardIndex];

  // TODO: let SubjectChars component take up full width (with max width), increase top and bottom padding
  // TODO: remove "previous" button, just for testing right now

  return (
    <>
      <IonRow>
        <IonCol>
          <SubjectChars
            subject={currentReviewItem}
            fontSize="4rem"
            withBgColor={true}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <ButtonCol>
          <button
            onClick={handlePrevClick}
            disabled={currReviewCardIndex === 0}
          >
            Previous
          </button>
        </ButtonCol>
        <ButtonCol>
          <button
            onClick={handleNextClick}
            disabled={currReviewCardIndex === reviewCards.length - 1}
          >
            Next
          </button>
        </ButtonCol>
      </IonRow>
    </>
  );
};

// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: add a back button/button to return home
export const ReviewSession = () => {
  const { setShowTabBar } = useTabBarContext();
  useEffect(() => {
    setShowTabBar(false);

    return () => {
      setShowTabBar(true);
    };
  });

  const { state, dispatch } = useReviewSession();

  let session = state.reviewData;
  // *testing
  console.log(
    "🚀 ~ file: ReviewSession.tsx:54 ~ ReviewSession ~ session:",
    session
  );
  // *testing

  let subjectsToReview = session?.reviewSubjects;

  return (
    <Page>
      <IonContent>
        <IonGrid>
          {state.isLoading && <p>Loading...</p>}
          {!state.isLoading &&
            state.reviewData &&
            subjectsToReview &&
            subjectsToReview.length !== 0 && (
              <ReviewQueue reviewCards={subjectsToReview} />
            )}
        </IonGrid>
      </IonContent>
    </Page>
  );
};
