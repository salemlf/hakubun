import { useState } from "react";
import { IonRow, IonIcon } from "@ionic/react";
import {
  motion,
  useMotionValue,
  useTransform,
  LayoutGroup,
} from "framer-motion";

import { ReviewCharAndType } from "./ReviewCharAndType";
import { ReviewInputAndButtons } from "./ReviewInputAndButtons";
import { ReviewItemBottomSheet } from "./ReviewItemBottomSheet";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import { useReviewQueue } from "../../hooks/useReviewQueue";

import { useKeyDown } from "../../hooks/useKeyDown";
import { toHiragana } from "wanakana";
import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";
import styled from "styled-components/macro";

type ReviewItemProps = {
  subjType: SubjectType;
};

const ReviewCardContainer = styled(IonRow)`
  border-radius: 10px;
  position: relative;
  display: flex;
  max-width: 1400px;
`;

const ReviewCard = styled(motion.div)<ReviewItemProps>`
  padding: 50px 0 100px 0;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
`;

const SwipeOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  pointer-events: none;
  flex-grow: 1;
`;

const SwipeIcon = styled(motion.div)`
  position: absolute;
  padding: 20px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
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
  const [userAnswer, setUserAnswer] = useState("");
  useKeyDown(() => nextBtnClicked(), ["F12"]);
  useKeyDown(() => handleRetryClick(currentReviewItem, setUserAnswer), ["F6"]);
  const { handleNextClick, handleRetryClick, queueState } = useReviewQueue();
  const x = useMotionValue(0);
  const opacityLeft = useTransform(x, [-100, 0], [1, 0]);
  const opacityRight = useTransform(x, [0, 100], [0, 1]);
  const rotate = useTransform(x, [-300, 300], [-10, 10]);

  const nextBtnClicked = () => {
    // *testing
    console.log("userAnswer: ", userAnswer);
    console.log("nextBtnClicked called!");
    // *testing

    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(userAnswer));
    handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: any) => {
    if (info.offset.x > window.innerWidth / 2) {
      console.log("RIGHT");
      handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
    }
    if (info.offset.x < -window.innerWidth / 2) {
      console.log("LEFT");
      if (queueState.showRetryButton) {
        handleRetryClick(currentReviewItem, setUserAnswer);
      } else {
        console.log("RETRY NOT AVAILABLE!");
        // TODO: show some visual indication of this
      }
    }
  };

  return (
    <ReviewCardContainer>
      <LayoutGroup>
        <ReviewCard
          subjType={currentReviewItem.object as SubjectType}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
          onDragEnd={handleDragEnd}
          style={{
            x,
            rotate: rotate,
          }}
        >
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
        <RetryCardOverlay
          style={{
            x,
            opacity: opacityLeft,
            rotate: rotate,
          }}
        >
          <SwipeIcon>
            <IonIcon icon={RetryIcon}></IonIcon>
          </SwipeIcon>
        </RetryCardOverlay>
        <NextCardOverlay
          style={{
            x,
            opacity: opacityRight,
            rotate: rotate,
          }}
        >
          <SwipeIcon>
            <IonIcon icon={NextIcon}></IonIcon>
          </SwipeIcon>
        </NextCardOverlay>
      </LayoutGroup>
    </ReviewCardContainer>
  );
};
