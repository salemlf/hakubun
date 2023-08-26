import { useNavigate } from "react-router-dom";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import {
  FloatingButton,
  FloatingButtonContainer,
} from "../../styles/BaseStyledComponents";
import ColorHomeIcon from "../../images/home-color.svg";
import styled from "styled-components";

const HomeIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

const HomeTxt = styled.p`
  margin: 0;
  text-transform: capitalize;
`;

function FloatingHomeButton() {
  const navigate = useNavigate();

  return (
    <FloatingButtonContainer
      distancefrombottom="35px"
      transition={{ type: "spring", delay: 0.5 }}
      initial={{ scale: 0, x: "-50%" }}
      animate={{ scale: 1 }}
    >
      <FloatingButton
        backgroundColor="var(--ion-color-tertiary)"
        color="black"
        onPress={() => navigate("/", { replace: true })}
      >
        <HomeIcon src={ColorHomeIcon} />
        <HomeTxt>Home</HomeTxt>
      </FloatingButton>
    </FloatingButtonContainer>
  );
}

export default FloatingHomeButton;
