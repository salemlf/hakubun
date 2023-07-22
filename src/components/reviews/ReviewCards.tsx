import { useState } from "react";
import { IonRow, IonIcon } from "@ionic/react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { ReviewCharAndType } from "./ReviewCharAndType";
import { ReviewInputAndButtons } from "./ReviewInputAndButtons";
import { ReviewItemBottomSheet } from "./ReviewItemBottomSheet";
import {
  getSubjectColor,
  isUserAnswerValid,
} from "../../services/SubjectAndAssignmentService";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import { useReviewQueue } from "../../hooks/useReviewQueue";

import { useKeyDown } from "../../hooks/useKeyDown";
import { toHiragana } from "wanakana";
import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";
import styled from "styled-components/macro";

const TestReviewCardContainer = styled(motion.div)`
  border-radius: 10px;
  margin: 10px;
  display: flex;
  max-width: 1400px;
  will-change: "transform";
  touch-action: none;
`;

type ReviewItemProps = {
  subjtype: SubjectType;
};

const ReviewCard = styled(motion.div)<ReviewItemProps>`
  position: relative;
  padding: 50px 0 100px 0;
  border-radius: 10px;
  width: 100%;
  background-color: ${({ subjtype }) => getSubjectColor(subjtype)};
  will-change: "transform";
  cursor: grab;
  touch-action: none;
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

type CardProps = {
  currentReviewItem: ReviewQueueItem;
};

// TODO: also use animations when keyboard shortcuts are used
const Card = ({ currentReviewItem }: CardProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  useKeyDown(() => nextBtnClicked(), ["F12"]);
  useKeyDown(() => handleRetryClick(currentReviewItem, setUserAnswer), ["F6"]);
  const {
    handleNextClick,
    handleRetryClick,
    queueState,
    displayInvalidAnswerMsg,
  } = useReviewQueue();
  const x = useMotionValue(0);
  const opacityLeft = useTransform(x, [-100, 0], [1, 0]);
  const opacityRight = useTransform(x, [0, 100], [0, 1]);
  const [exitX, setExitX] = useState(0);
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20], {
    clamp: false,
  });

  const nextBtnClicked = () => {
    // *testing
    console.log("userAnswer: ", userAnswer);
    console.log("nextBtnClicked called!");
    // *testing

    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(userAnswer));

    let isValidInfo = isUserAnswerValid(currentReviewItem, userAnswer);
    if (isValidInfo.isValid === false) {
      displayInvalidAnswerMsg(isValidInfo.message);
    } else {
      setExitX(300);
      handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: any) => {
    if (info.offset.x > 200) {
      nextBtnClicked();
    } else if (info.offset.x < -200) {
      if (queueState.showRetryButton) {
        setExitX(-300);
        handleRetryClick(currentReviewItem, setUserAnswer);
      } else {
        // TODO: show some visual indication of this
        console.log("RETRY NOT AVAILABLE!");
      }
    }
  };

  const reviewItemVariants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.3,
      },
    },
    exit: (custom: number) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.2,
      },
    }),
  };

  const overlayVariants = {
    initial: {
      opacity: 0,
    },
  };

  // const retryItemVariants = {
  //   initial: {
  //     opacity: 0,
  //   },
  //   exit: (custom: number) => ({
  //     x: custom,
  //     scale: 0.5,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   }),
  // };

  return (
    <ReviewCard
      subjtype={currentReviewItem.object as SubjectType}
      style={{
        top: 0,
        x,
        rotate,
      }}
      drag="x"
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      variants={reviewItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      whileTap={{ cursor: "grabbing" }}
      dragElastic={0.3}
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
      <RetryCardOverlay
        variants={overlayVariants}
        initial="initial"
        style={{
          opacity: opacityLeft,
        }}
      >
        <SwipeIcon>
          <IonIcon icon={RetryIcon}></IonIcon>
        </SwipeIcon>
      </RetryCardOverlay>
      <NextCardOverlay
        variants={overlayVariants}
        initial="initial"
        custom={exitX}
        style={{
          opacity: opacityRight,
        }}
      >
        <SwipeIcon>
          <IonIcon icon={NextIcon}></IonIcon>
        </SwipeIcon>
      </NextCardOverlay>
    </ReviewCard>
  );
};

type ReviewCardsProps = {
  currentReviewItem: ReviewQueueItem;
};
export const ReviewCards = ({ currentReviewItem }: ReviewCardsProps) => {
  return (
    <TestReviewCardContainer>
      <AnimatePresence>
        <Card
          key={currentReviewItem.itemID}
          currentReviewItem={currentReviewItem}
        />
      </AnimatePresence>
    </TestReviewCardContainer>
  );
};
