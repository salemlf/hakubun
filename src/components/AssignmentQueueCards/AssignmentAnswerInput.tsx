import { SetStateAction, useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import WanakanaInput from "./WanakanaInput";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import useQueueStoreFacade from "../../stores/useQueueStore/useQueueStore.facade";
import styled from "styled-components";

const InputRow = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

type AnswerInputProps = {
  inputcolor: string;
  translateToHiragana: boolean;
};

// uses japanese font if translateToHiragana is true, with English fallback since can be mixed
const AnswerInput = styled(WanakanaInput)<AnswerInputProps>`
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: 1.25rem;
  color: black;
  background-color: ${({ inputcolor }) => inputcolor};
  font-family: ${({ translateToHiragana }) =>
    translateToHiragana && "var(--japanese-with-english-fallback-font-family)"};
`;

type Props = {
  currentReviewItem: AssignmentQueueItem;
  userAnswer: string;
  setUserAnswer: (value: SetStateAction<string>) => void;
  nextBtnClicked: () => void;
  shakeInputTrigger: number;
};

function AssignmentAnswerInput({
  currentReviewItem,
  userAnswer,
  setUserAnswer,
  nextBtnClicked,
  shakeInputTrigger,
}: Props) {
  const { isSubmittingAnswer } = useQueueStoreFacade();
  const reviewType = currentReviewItem.review_type;
  const inputRef = useRef<HTMLInputElement>();
  const [inputContainerRef, animate] = useAnimate();
  const isReadingType = reviewType === "reading";
  const inputColor = isSubmittingAnswer
    ? currentReviewItem.is_correct_answer
      ? "var(--ion-color-tertiary)"
      : "var(--ion-color-danger)"
    : "var(--offwhite-color)";

  const timerId = useRef<number | null>(null);

  const removeTimeout = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      removeTimeout();
    };
  }, []);

  useEffect(() => {
    removeTimeout();
    // applying slight delay because this input is self-conscious and really doesn't like being focused on lol
    timerId.current = window.setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  });

  useEffect(() => {
    if (shakeInputTrigger) {
      animate(inputContainerRef.current, {
        x: [-5, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, 0],
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [shakeInputTrigger]);

  return (
    <InputRow ref={inputContainerRef}>
      <AnswerInput
        inputcolor={inputColor}
        inputRef={inputRef}
        type="text"
        value={userAnswer}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            nextBtnClicked();
          }
        }}
        translateToHiragana={isReadingType}
        onChange={(e: any) => setUserAnswer(e.target.value)}
        disabled={isSubmittingAnswer}
        placeholder={isReadingType ? "答え" : ""}
      />
    </InputRow>
  );
}

export default AssignmentAnswerInput;
