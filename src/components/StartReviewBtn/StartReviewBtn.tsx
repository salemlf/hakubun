// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import Button from "../Button/Button";
import ReviewsIcon from "../../images/reviews.svg";
import styled from "styled-components";

const StartButtonStyled = styled(Button)`
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
  padding: 10px 15px;
  font-size: 1.5rem;
  margin: auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const StartIcon = styled(IonIcon)`
  width: 1.75em;
  height: 1.75em;
`;

const StartTxt = styled.p`
  margin: 0;
  padding-left: 10px;
`;

type Props = {
  onStartReviewBtnClick: () => void;
};

// TODO: change to be more generic so lessons start button can use too
// TODO: add aria label based on type of start button
function StartReviewBtn({ onStartReviewBtnClick }: Props) {
  return (
    <StartButtonStyled
      backgroundColor="var(--ion-color-tertiary)"
      onPress={onStartReviewBtnClick}
    >
      <StartIcon src={ReviewsIcon} />
      <StartTxt>Start</StartTxt>
    </StartButtonStyled>
  );
}

export default StartReviewBtn;
