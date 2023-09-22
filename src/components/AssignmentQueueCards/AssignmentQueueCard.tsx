import { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  useMotionValue,
  useTransform,
  useWillChange,
  useAnimate,
  AnimatePresence,
} from "framer-motion";
import { toHiragana } from "wanakana";
import { isUserAnswerValid } from "../../services/AssignmentQueueService";
import { useKeyDown } from "../../hooks/useKeyDown";
import { SubjectType } from "../../types/Subject";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import AssignmentCharAndType from "./AssignmentCharAndType";
import AssignmentAnswerInput from "./AssignmentAnswerInput";
import ReviewItemBottomSheet from "../ReviewItemBottomSheet";
import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";
import {
  NextCardOverlay,
  RetryCardOverlay,
  AssignmentCardStyled,
  SwipeIcon,
} from "./AssignmentQueueCardsStyled";
import { useQueueStore } from "../../stores/useQueueStore";

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

  // TODO: display these shortcuts on page so user knows about them
  useKeyDown(() => attemptToAdvance(), ["F12"]);
  useKeyDown(() => retryTriggered(), ["F6"]);

  const x = useMotionValue(0);
  const [reviewCardRef, animateCard] = useAnimate();
  const opacityLeft = useTransform(x, [-100, 0], [1, 0]);
  const opacityRight = useTransform(x, [0, 100], [0, 1]);
  const willChange = useWillChange();
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  const [shakeInputTrigger, setShakeInputTrigger] = useState(0);
  const exitTimeMs = 500;
  const exitTimeDecimal = (exitTimeMs / 1000).toFixed(1) as unknown as number;

  // TODO: fix handleRetryClick being called even when showRetryButton shouldn't be visible
  const retryTriggered = () => {
    // *testing
    console.log("Handling retry for item: ", currentReviewItem);
    // *testing

    if (showRetryButton) {
      setTimeout(() => {
        x.set(0);
        handleRetryClick(currentReviewItem, setUserAnswer);
      }, exitTimeMs);
    } else {
      // TODO: show some visual indication of this
      console.log("RETRY NOT AVAILABLE!");
    }
  };

  const attemptToAdvance = () => {
    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(userAnswer));

    let isValidInfo = isUserAnswerValid(currentReviewItem, userAnswer);
    if (isValidInfo.isValid === false) {
      displayInvalidAnswerMsg(isValidInfo.message);
      setShakeInputTrigger((shakeInputTrigger) => shakeInputTrigger + 1);
    } else {
      setSavedUserAnswer(userAnswer);
      animateCard(
        reviewCardRef.current,
        { x: "150%" },
        { duration: exitTimeDecimal }
      );

      setTimeout(() => {
        x.set(0);
        handleNextClick(currentReviewItem, userAnswer, setUserAnswer);
        // TODO: check if answer was correct or not, then show toast
      }, exitTimeMs);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: any) => {
    if (info.offset.x > 200 || (info.offset.x > 100 && info.velocity.x) > 400) {
      attemptToAdvance();
    } else if (
      info.offset.x < -200 ||
      (info.offset.x < -100 && info.velocity.x) < -400
    ) {
      retryTriggered();
    }
  };

  return (
    <AnimatePresence>
      {currentReviewItem && (
        <>
          <AssignmentCardStyled
            ref={reviewCardRef}
            subjtype={currentReviewItem.object as SubjectType}
            initial={{ y: "-150%" }}
            animate={{ y: 0 }}
            style={{
              x,
              rotate,
              willChange,
            }}
            drag="x"
            transition={{ type: "spring", duration: 1, bounce: 0.5 }}
            dragSnapToOrigin={true}
            dragConstraints={{ left: 0, right: 0 }}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
            onDragEnd={handleDragEnd}
            dragDirectionLock={true}
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
          </AssignmentCardStyled>
          <ReviewItemBottomSheet currentReviewItem={currentReviewItem} />
        </>
      )}
    </AnimatePresence>
  );
};
