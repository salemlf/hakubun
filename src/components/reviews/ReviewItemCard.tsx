import { useEffect, useRef, useState } from "react";
import { IonRow, createGesture } from "@ionic/react";

import { ReviewCharAndType } from "./ReviewCharAndType";
import { ReviewInputAndButtons } from "./ReviewInputAndButtons";
import { ReviewItemBottomSheet } from "./ReviewItemBottomSheet";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import { useReviewQueue } from "../../hooks/useReviewQueue";

import styled from "styled-components/macro";
import { useKeyDown } from "../../hooks/useKeyDown";
import { toHiragana } from "wanakana";

type ReviewItemProps = {
  subjType: SubjectType;
};

const ReviewCard = styled(IonRow)<ReviewItemProps>`
  padding: 65px 0 65px;
  border-radius: 10px;
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
`;

type Props = {
  currentReviewItem: ReviewQueueItem;
};

export const ReviewItemCard = ({ currentReviewItem }: Props) => {
  const cardRef = useRef<HTMLIonRowElement>(null);
  const [userAnswer, setUserAnswer] = useState("");
  useKeyDown(() => nextBtnClicked(), ["F12"]);
  const { handleNextClick, handleRetryClick, queueState } = useReviewQueue();

  useEffect(() => {
    createCardGesture();
  }, [queueState.showRetryButton]);

  const nextBtnClicked = () => {
    // *testing
    console.log("userAnswer: ", userAnswer);
    console.log("nextBtnClicked called!");
    // *testing

    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(userAnswer));
    handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
  };

  const createCardGesture = () => {
    let reviewCard = cardRef.current;
    if (reviewCard) {
      let gesture = createGesture({
        el: reviewCard,
        gestureName: "card-swipe",
        onMove: (info) => {
          if (info.deltaX > 0) {
            reviewCard!.style.transform = `translateX(${
              info.deltaX
            }px) rotate(${info.deltaX / 20}deg)`;
          } else {
            // *testing
            console.log(
              "🚀 ~ file: ReviewItemCard.tsx:70 ~ createCardGesture ~ queueState.showRetryButton:",
              queueState.showRetryButton
            );
            // *testing
            if (queueState.showRetryButton) {
              reviewCard!.style.transform = `translateX(${
                info.deltaX
              }px) rotate(${info.deltaX / 20}deg)`;
            } else {
              reviewCard!.style.transform = "";
              // TODO: show some other indication that not allowed
              console.log("Retry not allowed rn!");
            }
          }
        },
        onEnd: (info) => {
          const windowWidth = window.innerWidth;
          reviewCard!.style.transition =
            "0.25s cubic-bezier (0.175, 0.885, 0.32, 1.275)";

          // TODO: also don't let user submit if invalid answer
          if (info.deltaX > windowWidth / 2) {
            reviewCard!.style.transform = `translateX(${windowWidth * 1.5}px)`;
            // *testing
            console.log(
              "🚀 ~ file: ReviewItemCard.tsx:74 ~ createCardGesture ~ info:",
              info
            );
            // *testing
            handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
            reviewCard!.style.transform = "";
          } else if (
            info.deltaX < -windowWidth / 2 &&
            queueState.showRetryButton
          ) {
            reviewCard!.style.transform = `translateX(-${windowWidth * 1.5}px)`;
            handleRetryClick(currentReviewItem, setUserAnswer);
            reviewCard!.style.transform = "";
          } else {
            reviewCard!.style.transform = "";
          }
        },
      });
      gesture.enable();
    }
  };

  let subjType = currentReviewItem.object as SubjectType;

  return (
    <ReviewCard subjType={subjType} ref={cardRef}>
      <ReviewCharAndType currentReviewItem={currentReviewItem} />
      <ReviewInputAndButtons
        currentReviewItem={currentReviewItem}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        nextBtnClicked={nextBtnClicked}
      />
      <ReviewItemBottomSheet
        currentReviewItem={currentReviewItem}
        reviewType={currentReviewItem.review_type}
      />
    </ReviewCard>
  );
};
