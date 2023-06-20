import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import startIcon from "../../images/start.svg";
import styled from "styled-components";

// while icon is *technically* centered already, doesn't appear to be since it's an arrow
// see this as reference: https://www.joshwcomeau.com/css/pixel-perfection/#going-the-extra-mile-3
const StartCentered = styled(IonIcon)`
  padding-left: 6px;
`;

type Props = {
  onStartReviewBtnClick: () => void;
};

export const StartReviewBtn = ({ onStartReviewBtnClick }: Props) => {
  return (
    <IonFab vertical="bottom" horizontal="center" aria-label="Start Review">
      <IonFabButton onClick={onStartReviewBtnClick}>
        <StartCentered icon={startIcon}></StartCentered>
      </IonFabButton>
    </IonFab>
  );
};
