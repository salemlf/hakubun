import { useNavigate } from "react-router-dom";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import Button from "../Button";
import BackArrowIcon from "../../images/back-arrow.svg";
import styled from "styled-components";

const BackButtonStyled = styled(Button)`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  margin-left: 5px;
  padding: 8px;
  border-radius: 10px;
`;

const BackIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

type Props = {
  backgroundColor?: string;
};

function BackButton({ backgroundColor = "var(--darkest-purple)" }: Props) {
  const navigate = useNavigate();

  return (
    <BackButtonStyled
      backgroundColor={backgroundColor}
      onPress={() => navigate(-1)}
    >
      <BackIcon src={BackArrowIcon} />
    </BackButtonStyled>
  );
}

export default BackButton;
