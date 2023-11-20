import { ReactElement } from "react";
import SvgIcon from "../SvgIcon";
import {
  FloatingButton,
  FloatingButtonContainer,
} from "../../styles/BaseStyledComponents";
import ReviewsIcon from "../../images/reviews.svg?react";
import LessonsIcon from "../../images/lessons.svg?react";
import LessonQuizIcon from "../../images/quiz.svg?react";
import styled from "styled-components";

const StartTxt = styled.p`
  margin: 0;
  text-transform: capitalize;
`;

type Props = {
  onStartBtnClick: () => void;
  buttonType: "lesson" | "review" | "quiz";
};

type SessionIcon = ReactElement;

const sessionIcons: { [index: string]: SessionIcon } = {
  lesson: <LessonsIcon />,
  review: <ReviewsIcon />,
  quiz: <LessonQuizIcon />,
};

// TODO: add aria label based on type of start button
function StartSessionButton({ onStartBtnClick, buttonType }: Props) {
  const displayTxt =
    buttonType === "lesson" || buttonType === "review"
      ? `${buttonType}s`
      : buttonType;

  return (
    <FloatingButtonContainer
      distancefrombottom={buttonType === "quiz" ? "60px" : "35px"}
      transition={{ type: "spring", delay: 0.5 }}
      initial={{ scale: 0, x: "-50%" }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <FloatingButton
        backgroundColor="var(--ion-color-tertiary)"
        color="black"
        onPress={onStartBtnClick}
      >
        <SvgIcon
          icon={sessionIcons[buttonType]}
          width="1.75em"
          height="1.75em"
        />
        <StartTxt>Start {displayTxt}</StartTxt>
      </FloatingButton>
    </FloatingButtonContainer>
  );
}

export default StartSessionButton;
