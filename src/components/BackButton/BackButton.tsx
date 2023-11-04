import { useNavigate } from "react-router-dom";
import Button from "../Button";
import SvgIcon from "../SvgIcon";
import BackArrowIcon from "../../images/back-arrow.svg?react";
import styled from "styled-components";

const BackButtonStyled = styled(Button)`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  padding: 8px;
  border-radius: 10px;
  position: absolute;
  left: 15px;
`;

type Props = {
  backgroundColor?: string;
};

function BackButton({ backgroundColor = "var(--offwhite-color)" }: Props) {
  const navigate = useNavigate();

  return (
    <BackButtonStyled
      aria-label="Back to previous page"
      backgroundColor={backgroundColor}
      onPress={() => navigate(-1)}
    >
      <SvgIcon icon={<BackArrowIcon />} width="1.5em" height="1.5em" />
      {/* <BackIcon src={BackArrowIcon} /> */}
    </BackButtonStyled>
  );
}

export default BackButton;
