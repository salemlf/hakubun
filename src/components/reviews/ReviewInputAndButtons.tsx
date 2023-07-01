import { useState } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { toKana } from "wanakana";
import { ReviewQueueItem } from "../../types/MiscTypes";

import styled from "styled-components/macro";
import { useKeyPress } from "../../hooks/useKeyPress";

const ButtonCol = styled(IonCol)`
  text-align: center;
  button {
    font-size: 1.5rem;
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
  onRetryClick: (
    currReviewItem: ReviewQueueItem,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => void;
  onNextClick: (
    currReviewItem: ReviewQueueItem,
    userAnswer: string,
    setUserAnswer: (value: React.SetStateAction<string>) => void
  ) => void;
  currReviewCardIndex: number;
  enterTextDisabled: boolean;
  showRetryButton: boolean;
};

// TODO: add button to abandon session
export const ReviewInputAndButtons = ({
  reviewQueue,
  onRetryClick,
  onNextClick,
  currReviewCardIndex,
  enterTextDisabled,
  showRetryButton,
}: Props) => {
  const [userAnswer, setUserAnswer] = useState("");
  const currentReviewItem = reviewQueue[currReviewCardIndex];
  useKeyPress(() => nextBtnClicked(), ["F12"]);

  let reviewType = currentReviewItem.review_type;

  const nextBtnClicked = () => {
    console.log("userAnswer: ", userAnswer);
    console.log("nextBtnClicked called!");
    if (reviewType === "reading") {
      setUserAnswer(toKana(userAnswer));
    }
    onNextClick(currentReviewItem, userAnswer, setUserAnswer);
  };

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

  return (
    <>
      <IonRow>
        <AnswerInput
          id="user-answer-field"
          type="text"
          value={userAnswer}
          onChange={(e) => onInputFunction(e.target.value)}
          disabled={enterTextDisabled}
          placeholder={reviewType === "reading" ? "答え" : ""}
        />
      </IonRow>
      <IonGrid>
        <IonRow>
          {showRetryButton && (
            <ButtonCol>
              <button
                onClick={() => {
                  onRetryClick(currentReviewItem, setUserAnswer);
                }}
              >
                Retry
              </button>
            </ButtonCol>
          )}
          <ButtonCol>
            <button
              onClick={() => {
                nextBtnClicked();
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
