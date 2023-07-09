import { useEffect, useRef, useState } from "react";
import { IonRow, IonIcon, createGesture } from "@ionic/react";

import { ReviewCharAndType } from "./ReviewCharAndType";
import { ReviewInputAndButtons } from "./ReviewInputAndButtons";
import { ReviewItemBottomSheet } from "./ReviewItemBottomSheet";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import { useReviewQueue } from "../../hooks/useReviewQueue";

import { useKeyDown } from "../../hooks/useKeyDown";
import { toHiragana } from "wanakana";
import styled from "styled-components/macro";

import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";

type ReviewItemProps = {
  subjType: SubjectType;
};

const ReviewCard = styled(IonRow)<ReviewItemProps>`
  padding: 50px 0;
  border-radius: 10px;
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  position: relative;
`;

const SwipeMsg = styled.div`
  padding: 20px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;

  ion-icon {
    width: 5rem;
    height: 5rem;
  }
`;

const NextCardMsg = styled(SwipeMsg)`
  background-color: var(--ion-color-tertiary);
  color: black;
  border: 2px solid black;
`;

const RetryCardMsg = styled(SwipeMsg)`
  background-color: var(--ion-color-secondary);
  color: white;
  border: 2px solid white;
`;

type Props = {
  currentReviewItem: ReviewQueueItem;
};

export const ReviewItemCard = ({ currentReviewItem }: Props) => {
  const cardRef = useRef<HTMLIonRowElement>(null);
  const retryCardMsg = useRef<HTMLDivElement>(null);
  const nextCardMsg = useRef<HTMLDivElement>(null);

  const [userAnswer, setUserAnswer] = useState("");
  useKeyDown(() => nextBtnClicked(), ["F12"]);
  useKeyDown(() => handleRetryClick(currentReviewItem, setUserAnswer), ["F6"]);
  const { handleNextClick, handleRetryClick, queueState } = useReviewQueue();

  useEffect(() => {
    createCardGesture();
  }, [queueState.showRetryButton, currentReviewItem, userAnswer]);

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
    // !added
    let retry = retryCardMsg.current;
    let next = nextCardMsg.current;
    // !added

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
      <RetryCardMsg ref={retryCardMsg}>
        <IonIcon icon={RetryIcon}></IonIcon>
      </RetryCardMsg>
      <NextCardMsg ref={nextCardMsg}>
        <IonIcon icon={NextIcon}></IonIcon>
      </NextCardMsg>
    </ReviewCard>
  );
};
