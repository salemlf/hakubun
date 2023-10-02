import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  useMotionValue,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { toHiragana } from "wanakana";
import { isUserAnswerValid } from "../../services/AssignmentQueueService";
import { useQueueStore } from "../../stores/useQueueStore";
import { useKeyDown } from "../../hooks/useKeyDown";
import { SubjectType } from "../../types/Subject";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import AssignmentCharAndType from "./AssignmentCharAndType";
import AssignmentAnswerInput from "./AssignmentAnswerInput";
import ReviewItemBottomSheet from "../ReviewItemBottomSheet";
import Emoji from "../Emoji";
import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";
import {
  NextCardOverlay,
  RetryCardOverlay,
  AssignmentCardStyled,
  SwipeIcon,
} from "./AssignmentQueueCardsStyled";
import styled from "styled-components";

const SwipeMeHint = styled.p`
  font-size: 0.9rem;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  /* z-index: 12; */
`;

const queueCardVariants = {
  submit: () => ({
    x: 500,
    transition: {
      duration: 0.5,
    },
  }),
  hideAbove: {
    y: "-150%",
    x: 0,
  },
  fallDown: {
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.5,
      delay: 0.5,
      duration: 0.8,
    },
  },
  center: {
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
  retry: {
    x: -500,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
};

type CardProps = {
  currentReviewItem: AssignmentQueueItem;
  displayInvalidAnswerMsg: (message: string) => void;
  handleNextClick: (
    currentReviewItem: AssignmentQueueItem,
    userAnswer: string,
    setUserAnswer: (userAnswer: string) => void
  ) => void;
  handleRetryClick: (
    currentReviewItem: AssignmentQueueItem,
    setUserAnswer: (userAnswer: string) => void
  ) => void;
};

export const AssignmentQueueCard = ({
  currentReviewItem,
  displayInvalidAnswerMsg,
  handleNextClick,
  handleRetryClick,
}: CardProps) => {
  const savedUserAnswer = useQueueStore.use.savedUserAnswer();
  const setSavedUserAnswer = useQueueStore.use.setSavedUserAnswer();
  const isSecondClick = useQueueStore.use.isSecondClick();
  const showRetryButton = useQueueStore.use.showRetryButton();
  let initialUserAnswer =
    !isSecondClick || savedUserAnswer === null ? "" : savedUserAnswer;
  const [userAnswer, setUserAnswer] = useState(initialUserAnswer);

  useKeyDown(() => attemptToAdvance(), ["F12"]);
  useKeyDown(() => retryTriggered(), ["F6"]);

  const controls = useAnimation();
  const dragX = useMotionValue(0);
  const opacityLeft = useTransform(dragX, [-100, 0], [1, 0]);
  const opacityRight = useTransform(dragX, [0, 100], [0, 1]);
  const rotate = useTransform(dragX, [-300, 0, 300], [-20, 0, 20]);
  const [shakeInputTrigger, setShakeInputTrigger] = useState(0);
  const exitTimeMs = 600;

  useEffect(() => {
    controls.start("fallDown");
  }, []);

  const retryTriggered = () => {
    // *testing
    console.log("Handling retry for item: ", currentReviewItem);
    // *testing

    if (showRetryButton) {
      controls.start("retry");
      handleRetryClick(currentReviewItem, setUserAnswer);
      controls.start("center");
    } else {
      // TODO: show some visual indication of this
      console.log("RETRY NOT AVAILABLE!");
      controls.start("center");
    }
  };

  const attemptToAdvance = () => {
    let strippedUserAnswer = userAnswer.trim();
    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(strippedUserAnswer));

    let isValidInfo = isUserAnswerValid(currentReviewItem, strippedUserAnswer);
    if (isValidInfo.isValid === false) {
      displayInvalidAnswerMsg(isValidInfo.message);
      setShakeInputTrigger((shakeInputTrigger) => shakeInputTrigger + 1);
    } else {
      setSavedUserAnswer(strippedUserAnswer);
      controls.start("submit");

      setTimeout(() => {
        controls.set("hideAbove");
        controls.start("center");
        handleNextClick(currentReviewItem, strippedUserAnswer, setUserAnswer);
        // TODO: check if answer was correct or not, then show toast
      }, exitTimeMs);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: any) => {
    const xOffsetTrigger = 150;
    const xMinOffset = 100;
    const xMinVelocity = 350;
    if (
      info.offset.x > xOffsetTrigger ||
      (info.offset.x > xMinOffset && info.velocity.x) > xMinVelocity
    ) {
      attemptToAdvance();
    } else if (
      info.offset.x < -xOffsetTrigger ||
      (info.offset.x < -xMinOffset && info.velocity.x) < -xMinVelocity
    ) {
      retryTriggered();
    } else {
      console.log("DIDN'T MEET DRAG THRESHOLD");
      controls.start("center");
      // dragX.set(0);
    }
  };

  return (
    <AnimatePresence>
      {currentReviewItem && (
        <>
          <AssignmentCardStyled
            subjtype={currentReviewItem.object as SubjectType}
            initial="hideAbove"
            animate={controls}
            variants={queueCardVariants}
            style={{
              x: dragX,
              rotate,
            }}
            drag="x"
            transition={{ type: "spring", bounce: 0.5 }}
            dragConstraints={{ left: 0, right: 0 }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
            dragElastic={0.5}
          >
            <AssignmentCharAndType
              currentReviewItem={currentReviewItem}
              disableTextSelection={true}
            />
            <AssignmentAnswerInput
              shakeInputTrigger={shakeInputTrigger}
              currentReviewItem={currentReviewItem}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              nextBtnClicked={attemptToAdvance}
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
            <SwipeMeHint>
              Swipe me <Emoji symbol="😋" label="Tongue sticking out face" />
            </SwipeMeHint>
          </AssignmentCardStyled>
          <ReviewItemBottomSheet currentReviewItem={currentReviewItem} />
        </>
      )}
    </AnimatePresence>
  );
};
