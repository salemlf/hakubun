import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  useMotionValue,
  useTransform,
  useWillChange,
  useAnimate,
} from "framer-motion";
import { toHiragana } from "wanakana";
import { isUserAnswerValid } from "../../services/ReviewService";
import { useKeyDown } from "../../hooks/useKeyDown";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { useLessonQuizStore } from "../../stores/useLessonQuizStore";
import { SubjectType } from "../../types/Subject";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import ReviewCharAndType from "./ReviewCharAndType";
import ReviewAnswerInput from "./ReviewAnswerInput";
import ReviewItemBottomSheet from "../ReviewItemBottomSheet";
import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";
import {
  NextCardOverlay,
  RetryCardOverlay,
  ReviewCardStyled,
  SwipeIcon,
  ReviewCardContainer,
} from "./ReviewCardsStyled";
import { useCardQueueStore } from "../../stores/useCardQueueStore";

type CardProps = {
  currentReviewItem: ReviewQueueItem;
};

export const ReviewCard = ({ currentReviewItem }: CardProps) => {
  const {
    handleNextClick,
    handleRetryClick,
    queueState,
    displayInvalidAnswerMsg,
  } = useReviewQueue();
  // !added
  const savedUserAnswer = useCardQueueStore.use.savedUserAnswer();
  const setSavedUserAnswer = useCardQueueStore.use.setSavedUserAnswer();
  let initialUserAnswer =
    !queueState.isSecondClick || savedUserAnswer === null
      ? ""
      : savedUserAnswer;
  console.log(
    "🚀 ~ file: ReviewCards.tsx:46 ~ ReviewCard ~ queueState.isSecondClick:",
    queueState.isSecondClick
  );
  // !added
  // const [userAnswer, setUserAnswer] = useState("");
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

  // !added
  useEffect(() => {
    // *testing
    console.log("Came back to page!!");
    console.log("Restoring user answer from store...");
    console.log(
      "🚀 ~ file: ReviewCards.tsx:67 ~ useEffect ~ savedUserAnswer:",
      savedUserAnswer
    );
    // *testing
    return () => {
      // *testing
      console.log("LEAVING PAGE!");
    };
  }, []);
  // !added

  const retryTriggered = () => {
    if (queueState.showRetryButton) {
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
      // !added
      console.log("Saving user answer to store...");
      // *testing
      // TODO: save user answer to store
      console.log(
        "🚀 ~ file: ReviewCards.tsx:80 ~ return ~ userAnswer:",
        userAnswer
      );
      setSavedUserAnswer(userAnswer);
      // !added
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
    if (info.offset.x > 200) {
      attemptToAdvance();
    } else if (info.offset.x < -200) {
      retryTriggered();
    }
  };

  return (
    <>
      <ReviewCardStyled
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
        <ReviewItemBottomSheet currentReviewItem={currentReviewItem} />
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
      </ReviewCardStyled>
    </>
  );
};

type QueueInfo = {
  currQueueIndex: number;
  queueData: ReviewQueueItem[];
};

type Props = {
  queueType: "review" | "quiz";
  submitItems: (reviewData: ReviewQueueItem[]) => void;
};

function ReviewCards({ queueType, submitItems }: Props) {
  const { queueDataState } = useReviewQueue();
  const lessonQuizQueue = useLessonQuizStore.use.lessonQuizQueue();
  const lessonQueueIndex = useLessonQuizStore.use.currQueueIndex();
  const queueInfo: { [index: string]: QueueInfo } = {
    review: {
      currQueueIndex: queueDataState.currQueueIndex,
      queueData: queueDataState.reviewQueue,
    },
    quiz: {
      currQueueIndex: lessonQueueIndex,
      queueData: lessonQuizQueue,
    },
  };

  let currQueueIndex = queueInfo[queueType].currQueueIndex;
  let queueData = queueInfo[queueType].queueData;

  useEffect(() => {
    if (currQueueIndex === queueData.length && queueData.length !== 0) {
      submitItems(queueData);
    }
  }, [queueData[currQueueIndex]]);

  return (
    <>
      {queueData.length === 0 || currQueueIndex === queueData.length ? (
        <p>Loading...</p>
      ) : (
        <ReviewCardContainer>
          <ReviewCard
            key={queueData[currQueueIndex].itemID}
            currentReviewItem={queueData[currQueueIndex]}
          />
        </ReviewCardContainer>
      )}
    </>
  );
}

export default ReviewCards;
