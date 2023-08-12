import { useNavigate } from "react-router-dom";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import { FloatingButton } from "../../styles/BaseStyledComponents";
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

function HomeButton() {
  const navigate = useNavigate();

  return (
    <FloatingButton
      backgroundColor="var(--ion-color-tertiary)"
      color="black"
      onPress={() => navigate("/home", { replace: true })}
    >
      <HomeIcon src={ColorHomeIcon} />
      <HomeTxt>Home</HomeTxt>
    </FloatingButton>
  );
}

export default HomeButton;
