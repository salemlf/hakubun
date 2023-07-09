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

const SwipeOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
`;

const SwipeIcon = styled.div`
  padding: 20px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ion-icon {
    width: 85px;
    height: 85px;
  }
`;

const NextCardOverlay = styled(SwipeOverlay)`
  background-color: var(--ion-color-tertiary);

  div {
    color: black;
    border: 2px solid black;
  }
`;

const RetryCardOverlay = styled(SwipeOverlay)`
  background-color: var(--ion-color-secondary);
  div {
    color: white;
    border: 2px solid white;
  }
`;

type Props = {
  currentReviewItem: ReviewQueueItem;
};

export const ReviewItemCard = ({ currentReviewItem }: Props) => {
  const cardRef = useRef<HTMLIonRowElement>(null);
  const retryCardOverlay = useRef<HTMLDivElement>(null);
  const nextCardOverlay = useRef<HTMLDivElement>(null);

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
    let retryOverlay = retryCardOverlay.current;
    let nextOverlay = nextCardOverlay.current;

    if (reviewCard) {
      let gesture = createGesture({
        el: reviewCard,
        gestureName: "card-swipe",
        onMove: (info) => {
          let overlayOpacity = info.deltaX / 100;
          let retryOpacity = overlayOpacity >= 0 ? 0 : Math.abs(overlayOpacity);
          let nextOpacity = overlayOpacity <= 0 ? 0 : overlayOpacity;

          if (info.deltaX > 0) {
            reviewCard!.style.transform = `translateX(${
              info.deltaX
            }px) rotate(${info.deltaX / 20}deg)`;

            nextOverlay!.style.opacity = `${nextOpacity}`;
          } else {
            if (queueState.showRetryButton) {
              reviewCard!.style.transform = `translateX(${
                info.deltaX
              }px) rotate(${info.deltaX / 20}deg)`;

              retryOverlay!.style.opacity = `${retryOpacity}`;
            } else {
              reviewCard!.style.transform = "";
              // TODO: show some other indication that retry not allowed
              console.log("Retry not allowed rn!");
            }
          }
        },
        onEnd: (info) => {
          retryOverlay!.style.opacity = "0";
          nextOverlay!.style.opacity = "0";
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
      <RetryCardOverlay ref={retryCardOverlay}>
        <SwipeIcon>
          <IonIcon icon={RetryIcon}></IonIcon>
        </SwipeIcon>
      </RetryCardOverlay>
      <NextCardOverlay ref={nextCardOverlay}>
        <SwipeIcon>
          <IonIcon icon={NextIcon}></IonIcon>
        </SwipeIcon>
      </NextCardOverlay>
    </ReviewCard>
  );
};
