import { IonContent } from "@ionic/react";
import AnimatedPage from "../components/AnimatedPage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// const Page = styled(AnimatedPage)`
//   background-color: var(--dark-greyish-purple);
// `;

function Settings() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <IonContent>
        <p>TODO: settings page</p>
      </IonContent>
    </AnimatedPage>
  );
}

export default Settings;
