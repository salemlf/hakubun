import React, { createElement, useEffect, useRef } from "react";
import { IonRow } from "@ionic/react";
import { toHiragana } from "wanakana";

import styled from "styled-components/macro";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";

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
  value,
  onChange,
  translateToHiragana,
  ...props
}: InputProps) => {
  const inputRef = useRef(document.createElement("input"));
  const translatedVal = translateInputValue(value, translateToHiragana);
  // TODO: change this, a mehhh workaround for autofocusing
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  });

  const handleChange = (e: any) => {
    let updatedValue = translateInputValue(e.target.value, translateToHiragana);
    inputRef.current.value = updatedValue;
    onChange(e);
  };

  return createElement("input", {
    ref: inputRef,
    value: translatedVal,
    onChange: handleChange,
    autoCorrect: "off",
    autoCapitalize: "none",
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

function ReviewAnswerInput({
  currentReviewItem,
  userAnswer,
  setUserAnswer,
  nextBtnClicked,
}: Props) {
  const { queueState } = useReviewQueue();
  let reviewType = currentReviewItem.review_type;

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
          onChange={(e: any) => setUserAnswer(e.target.value)}
          disabled={queueState.isSecondClick}
          placeholder={reviewType === "reading" ? "答え" : ""}
        />
      </InputRow>
    </>
  );
}

export default ReviewAnswerInput;
