import { createElement, useEffect, useRef, useState } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { toHiragana, toKana } from "wanakana";

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

const InputRow = styled(IonRow)`
  width: 100%;
`;

const translateInputValue = (string: string, translateToHiragana: boolean) => {
  if (translateToHiragana) {
    return toHiragana(string, { IMEMode: true });
  }
  return string;
};

type InputProps = {
  [key: string]: any;
  value: string;
  onChange: (e: any) => void;
  translateToHiragana: boolean;
};

const WanakanaInput = ({
  component,
  value,
  onChange,
  translateToHiragana,
  ...props
}: InputProps) => {
  const inputRef = useRef(document.createElement("input"));

  const translatedVal = translateInputValue(value, translateToHiragana);

  const handleChange = (e: any) => {
    let updatedValue = translateInputValue(e.target.value, translateToHiragana);
    inputRef.current.value = updatedValue;
    onChange(e);
  };

  return createElement("input", {
    ref: inputRef,
    value: translatedVal,
    onChange: handleChange,
    ...props,
  });
};

const AnswerInput = styled(WanakanaInput)`
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: 1.25rem;
  background-color: var(--offwhite-color);
  color: black;
`;

type Props = {
  currentReviewItem: ReviewQueueItem;
  userAnswer: string;
  setUserAnswer: (value: React.SetStateAction<string>) => void;
  nextBtnClicked: () => void;
};

// TODO: add button to abandon session
export const ReviewInputAndButtons = ({
  currentReviewItem,
  userAnswer,
  setUserAnswer,
  nextBtnClicked,
}: Props) => {
  const { queueDataState, queueState, handleNextClick, handleRetryClick } =
    useReviewQueue();

  let reviewType = currentReviewItem.review_type;

  const handleAnswerUpdate = (updatedAnswer: string) => {
    setUserAnswer(updatedAnswer);
  };

  return (
    <>
      <InputRow>
        <AnswerInput
          type="text"
          value={userAnswer}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              nextBtnClicked();
            }
          }}
          translateToHiragana={reviewType === "reading"}
          // onChange={(e: any) => setUserAnswer(e.target.value)}
          onChange={(e: any) => setUserAnswer(e.target.value)}
          disabled={queueState.isSecondClick}
          placeholder={reviewType === "reading" ? "答え" : ""}
        />
      </InputRow>
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
                queueDataState.currQueueIndex ===
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
