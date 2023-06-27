import { useState } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { toKana } from "wanakana";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem, ReviewType } from "../../types/MiscTypes";
import {
  getReviewTypeColor,
  getSubjectColor,
  getSubjectTypeDisplayText,
} from "../../services/SubjectAndAssignmentService";
import { capitalizeWord } from "../../services/MiscService";

import styled from "styled-components/macro";
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
  onNextClick: (
    currReviewItem: ReviewQueueItem,
    userAnswer: string,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => void;
  currReviewCardIndex: number;
};

export const ReviewCard = ({
  reviewQueue,
  onPrevClick,
  onNextClick,
  currReviewCardIndex,
}: Props) => {
  const [userAnswer, setUserAnswer] = useState("");
  //   *testing
  console.log("🚀 ~ file: ReviewCard.tsx:69 ~ userAnswer:", userAnswer);
  //   *testing
  const currentReviewItem = reviewQueue[currReviewCardIndex];
  let subjType = currentReviewItem.object as SubjectType;

  let reviewType = currentReviewItem.review_type;
  let reviewTypeCapitalized = capitalizeWord(reviewType);
  let reviewDisplayTxt = getSubjectTypeDisplayText(
    currentReviewItem.object,
    false
  );

  const convertInputToKana = (newestUserInput: string) => {
    // special case needed for "n" since could be the kana "ん" or any romaji that starts with "n"
    if (userAnswer.at(-1) === "n" && newestUserInput.at(-1) === "n") {
      return setUserAnswer(toKana(newestUserInput.slice(0, -1)));
    }
    if (newestUserInput.at(-1) === "n") {
      return setUserAnswer(toKana(newestUserInput.slice(0, -1)) + "n");
    }
    setUserAnswer(toKana(newestUserInput));
  };

  let onInputFunction =
    reviewType === "reading" ? convertInputToKana : setUserAnswer;

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
          {reviewDisplayTxt} {reviewTypeCapitalized}
        </p>
      </ReviewTypeRow>
      <IonRow>
        <AnswerInput
          id="user-answer-field"
          type="text"
          value={userAnswer}
          onChange={(e) => onInputFunction(e.target.value)}
        />
      </IonRow>
      <IonGrid>
        <IonRow>
          <ButtonCol>
            <button
              onClick={() => {
                setUserAnswer("");
                onPrevClick();
              }}
              disabled={currReviewCardIndex === 0}
            >
              Previous
            </button>
          </ButtonCol>
          <ButtonCol>
            <button
              onClick={() => {
                onNextClick(currentReviewItem, userAnswer, setUserAnswer);
              }}
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
