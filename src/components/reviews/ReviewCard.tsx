import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem, ReviewType } from "../../types/MiscTypes";
import { capitalizeWord } from "../../services/MiscService";

import styled from "styled-components/macro";
import {
  getReviewTypeColor,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService";
import { SubjectChars } from "../SubjectChars";

type CharColProps = {
  subjType: SubjectType;
};

const SubjectCharactersCol = styled(IonCol)<CharColProps>`
  padding: 50px 0;
  padding-bottom: 65px;
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
`;

const ButtonCol = styled(IonCol)`
  text-align: center;
  button {
    font-size: 1.5rem;
  }
`;

type ReviewTypeProps = {
  reviewType: ReviewType;
};

const ReviewTypeRow = styled(IonRow)<ReviewTypeProps>`
  justify-content: center;
  background-color: ${({ reviewType }) => getReviewTypeColor(reviewType)};
  --ion-background-color: ${({ reviewType }) => getReviewTypeColor(reviewType)};

  p {
    font-size: 1.125rem;
    margin: 10px;
  }
`;

const AnswerInput = styled.input`
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: 1.25rem;
  background-color: var(--offwhite-color);
  color: black;
`;

type Props = {
  reviewQueue: ReviewQueueItem[];
  onPrevClick: () => void;
  onNextClick: () => void;
  currReviewCardIndex: number;
};

export const ReviewCard = ({
  reviewQueue,
  onPrevClick,
  onNextClick,
  currReviewCardIndex,
}: Props) => {
  const currentReviewItem = reviewQueue[currReviewCardIndex];
  let subjType = currentReviewItem.object as SubjectType;

  let reviewType = currentReviewItem.review_type;
  let reviewTypeCapitalized = capitalizeWord(reviewType);
  let subjectTypeCapitalized = capitalizeWord(currentReviewItem.object);

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
      <ReviewTypeRow reviewType={reviewType}>
        <p>
          {subjectTypeCapitalized} {reviewTypeCapitalized}
        </p>
      </ReviewTypeRow>
      <IonRow>
        <AnswerInput type="text" />
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
