// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import Button from "../Button/Button";
import ReviewsIcon from "../../images/reviews.svg";
import LessonsIcon from "../../images/lessons.svg";
import styled from "styled-components";

import { FloatingButton } from "../../styles/BaseStyledComponents";

const StartButtonStyled = styled(Button)`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  position: fixed;
  z-index: 1;
  bottom: 35px;
  padding: 10px 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.25rem;
  margin: auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

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
  buttonType: "lessons" | "reviews";
};

// TODO: add aria label based on type of start button
function StartSessionButton({ onStartBtnClick, buttonType }: Props) {
  return (
    <FloatingButton
      backgroundColor="var(--ion-color-tertiary)"
      color="black"
      onPress={onStartBtnClick}
    >
      {buttonType === "reviews" && <StartIcon src={ReviewsIcon} />}
      {buttonType === "lessons" && <StartIcon src={LessonsIcon} />}
      <StartTxt>Start {buttonType}</StartTxt>
    </FloatingButton>
  );
}

export default StartSessionButton;
