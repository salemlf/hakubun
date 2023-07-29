import { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  useMotionValue,
  useTransform,
  useWillChange,
  useAnimate,
} from "framer-motion";
import { toHiragana } from "wanakana";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import { isUserAnswerValid } from "../../services/ReviewService";
import { useKeyDown } from "../../hooks/useKeyDown";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import ReviewCharAndType from "./ReviewCharAndType";
import ReviewAnswerInput from "./ReviewAnswerInput";
import ReviewItemBottomSheet from "../ReviewItemBottomSheet";

import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";
import {
  NextCardOverlay,
  RetryCardOverlay,
  ReviewCard,
  SwipeIcon,
  TestReviewCardContainer,
} from "./ReviewCardsStyled";

type CardProps = {
  currentReviewItem: ReviewQueueItem;
};

const Card = ({ currentReviewItem }: CardProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  useKeyDown(() => attemptToAdvance(), ["F12"]);
  useKeyDown(() => retryTriggered(), ["F6"]);
  const {
    handleNextClick,
    handleRetryClick,
    queueState,
    displayInvalidAnswerMsg,
  } = useReviewQueue();
  const x = useMotionValue(0);
  const [reviewCardRef, animateCard] = useAnimate();
  const opacityLeft = useTransform(x, [-100, 0], [1, 0]);
  const opacityRight = useTransform(x, [0, 100], [0, 1]);
  const willChange = useWillChange();
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  const [shakeInputTrigger, setShakeInputTrigger] = useState(0);
  const exitTimeMs = 500;
  const exitTimeDecimal = (exitTimeMs / 1000).toFixed(1) as unknown as number;

  const retryTriggered = () => {
    setTimeout(() => {
      x.set(0);
      handleRetryClick(currentReviewItem, setUserAnswer);
    }, exitTimeMs);
  };

  const attemptToAdvance = () => {
    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(userAnswer));

    let isValidInfo = isUserAnswerValid(currentReviewItem, userAnswer);
    if (isValidInfo.isValid === false) {
      displayInvalidAnswerMsg(isValidInfo.message);
      setShakeInputTrigger((shakeInputTrigger) => shakeInputTrigger + 1);
    } else {
      animateCard(
        reviewCardRef.current,
        { x: "150%" },
        { duration: exitTimeDecimal }
      );

      setTimeout(() => {
        x.set(0);
        handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
      }, exitTimeMs);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: any) => {
    if (info.offset.x > 200) {
      attemptToAdvance();
    } else if (info.offset.x < -200) {
      if (queueState.showRetryButton) {
        retryTriggered();
      } else {
        // TODO: show some visual indication of this
        console.log("RETRY NOT AVAILABLE!");
      }
    }
  };

  return (
    <>
      <ReviewCard
        ref={reviewCardRef}
        subjtype={currentReviewItem.object as SubjectType}
        initial={{ y: "-150%" }}
        style={{
          x,
          rotate,
          willChange,
        }}
        drag="x"
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        dragSnapToOrigin={true}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
        onDragEnd={handleDragEnd}
        dragDirectionLock={true}
        whileTap={{ cursor: "grabbing" }}
        dragElastic={0.5}
      >
        <ReviewCharAndType
          currentReviewItem={currentReviewItem}
          disableTextSelection={true}
        />
        <ReviewAnswerInput
          shakeInputTrigger={shakeInputTrigger}
          currentReviewItem={currentReviewItem}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          nextBtnClicked={attemptToAdvance}
        />
        <ReviewItemBottomSheet
          currentReviewItem={currentReviewItem}
          reviewType={currentReviewItem.review_type}
        />
        <RetryCardOverlay
          style={{
            opacity: opacityLeft,
          }}
        >
          <SwipeIcon>
            <IonIcon icon={RetryIcon}></IonIcon>
          </SwipeIcon>
        </RetryCardOverlay>
        <NextCardOverlay
          style={{
            opacity: opacityRight,
          }}
        >
          <SwipeIcon>
            <IonIcon icon={NextIcon}></IonIcon>
          </SwipeIcon>
        </NextCardOverlay>
      </ReviewCard>
    </>
  );
};

type Props = {
  currentReviewItem: ReviewQueueItem;
};

// TODO: change to just use queueDataState.reviewQueue[queueDataState.currQueueIndex] instead of prop?
function ReviewCards({ currentReviewItem }: Props) {
  return (
    <TestReviewCardContainer>
      <Card
        key={currentReviewItem.itemID}
        currentReviewItem={currentReviewItem}
      />
    </TestReviewCardContainer>
  );
}

export default ReviewCards;
