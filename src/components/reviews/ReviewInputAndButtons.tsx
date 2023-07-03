import { useState } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { toKana } from "wanakana";

import styled from "styled-components/macro";
import { useKeyDown } from "../../hooks/useKeyDown";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";

const ButtonCol = styled(IonCol)`
  text-align: center;
  button {
    font-size: 1.5rem;
  }
`;

const BaseBtn = styled.button`
  padding: 10px;
  border-radius: 12px;
`;

const PreviousBtn = styled(BaseBtn)`
  background-color: var(--ion-color-primary);
`;

const NextBtn = styled(BaseBtn)`
  background-color: var(--ion-color-tertiary);
  color: black;
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
  currentReviewItem: ReviewQueueItem;
};

// TODO: add button to abandon session
export const ReviewInputAndButtons = ({ currentReviewItem }: Props) => {
  const { queueDataState, queueState, handleNextClick, handleRetryClick } =
    useReviewQueue();
  const [userAnswer, setUserAnswer] = useState("");
  useKeyDown(() => nextBtnClicked(), ["F12"]);

  let reviewType = currentReviewItem.review_type;

  const nextBtnClicked = () => {
    console.log("userAnswer: ", userAnswer);
    console.log("nextBtnClicked called!");
    if (reviewType === "reading") {
      setUserAnswer(toKana(userAnswer));
    }
    handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextBtnClicked();
            }
          }}
          disabled={queueState.isSecondClick}
          placeholder={reviewType === "reading" ? "答え" : ""}
        />
      </IonRow>
      <IonGrid>
        <IonRow>
          {queueState.showRetryButton && (
            <ButtonCol>
              <PreviousBtn
                onClick={() => {
                  handleRetryClick(currentReviewItem, setUserAnswer);
                }}
              >
                Retry
              </PreviousBtn>
            </ButtonCol>
          )}
          <ButtonCol>
            <NextBtn
              onClick={() => {
                nextBtnClicked();
              }}
              disabled={
                queueState.currReviewCardIndex ===
                queueDataState.reviewQueue.length - 1
              }
            >
              Next
            </NextBtn>
          </ButtonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
