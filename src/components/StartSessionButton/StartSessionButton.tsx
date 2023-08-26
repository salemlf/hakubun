// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import ReviewsIcon from "../../images/reviews.svg";
import LessonsIcon from "../../images/lessons.svg";
import LessonQuizIcon from "../../images/quiz.svg";
import {
  FloatingButton,
  FloatingButtonContainer,
} from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const StartIcon = styled(IonIcon)`
  width: 1.75em;
  height: 1.75em;
`;

const StartTxt = styled.p`
  margin: 0;
  text-transform: capitalize;
`;

type Props = {
  onStartBtnClick: () => void;
  buttonType: "lessons" | "reviews" | "quiz";
};

// TODO: add aria label based on type of start button
function StartSessionButton({ onStartBtnClick, buttonType }: Props) {
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
        {buttonType === "reviews" && <StartIcon src={ReviewsIcon} />}
        {buttonType === "lessons" && <StartIcon src={LessonsIcon} />}
        {buttonType === "quiz" && <StartIcon src={LessonQuizIcon} />}
        <StartTxt>Start {buttonType}</StartTxt>
      </FloatingButton>
    </FloatingButtonContainer>
  );
}

export default StartSessionButton;
