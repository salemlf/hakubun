// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import ReviewsIcon from "../../images/reviews.svg";
import LessonsIcon from "../../images/lessons.svg";
import LessonQuizIcon from "../../images/quiz.svg";
import styled from "styled-components";

import { FloatingButton } from "../../styles/BaseStyledComponents";

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
    <FloatingButton
      backgroundColor="var(--ion-color-tertiary)"
      color="black"
      onPress={onStartBtnClick}
      distancefrombottom={buttonType === "quiz" ? "60px" : "35px"}
    >
      {buttonType === "reviews" && <StartIcon src={ReviewsIcon} />}
      {buttonType === "lessons" && <StartIcon src={LessonsIcon} />}
      {buttonType === "quiz" && <StartIcon src={LessonQuizIcon} />}
      <StartTxt>Start {buttonType}</StartTxt>
    </FloatingButton>
  );
}

export default StartSessionButton;
