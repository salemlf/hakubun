import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonTitle,
} from "@ionic/react";
import Button from "../components/Button/Button";
import styled from "styled-components";

export const FullWidthGrid = styled(IonGrid)`
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
`;

export const FullWidthGridDiv = styled.div`
  display: grid;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
`;

type RowProps = {
  justify: string;
};

export const SubjRow = styled(IonRow)<RowProps>`
  align-items: center;
  justify-content: ${({ justify }) => justify};
  margin-left: -3px;
`;

export const SubjCol = styled(IonCol)`
  flex-grow: 0;
  flex-shrink: 0;
`;

export const NoteHintContainer = styled.div`
  background-color: var(--light-grey);
  border-radius: 15px;
  padding: 15px 12px 8px;
  margin: 10px 0;

  font-size: 0.9rem;
  line-height: 1.5;
`;

export const NoteHintHeading = styled.h6`
  margin: 3px 0;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const IconHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  ion-icon {
    width: 1.5em;
    height: 1.5em;
    margin-right: 5px;
  }
`;

// TODO: modify so can see textbox before click (has an outline)
export const Alert = styled(IonAlert)`
  @media (prefers-color-scheme: dark) {
    .alert-message {
      color: white;
    }
  }
`;

export const Chip = styled(Button)`
  padding: 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  font-size: 1rem;

  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }

  ion-icon {
    margin-left: 5px;
    width: 1.25em;
    height: 1.25em;
  }
`;

export const BottomSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
`;

// TODO: change to use plain html styled div instead of IonRow
export const BottomSheetContent = styled(IonRow)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
  border-radius: 25px;
  margin: 0;

  display: flex;
  justify-content: flex-start;
  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
`;

export const ContentWithTabBar = styled(IonContent)`
  --padding-start: var(--ion-padding, 0px);
  --padding-end: var(--ion-padding, 5px);
  --padding-top: var(--ion-padding, 5px);
  --padding-bottom: 4rem;
  padding-inline-start: var(--ion-padding, 5px);
  padding-inline-end: var(--ion-padding, 5px);
  padding-top: var(--ion-padding, 5px);
  padding-bottom: 4rem;
`;

export const SettingsTitle = styled(IonTitle)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 90px 1px;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.5rem;
`;

type ButtonContainerProps = {
  isPressed: boolean;
  backgroundcolor: string;
  color: string;
};

export const BaseButton = styled.button<ButtonContainerProps>`
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

type FloatingButtonProps = {
  distancefrombottom: string;
};
export const FloatingButton = styled(Button)<FloatingButtonProps>`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  position: fixed;
  z-index: 1;
  bottom: ${({ distancefrombottom }) => distancefrombottom};
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

export const FullWidthColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MainContent = styled.main``;

type HeaderContainerProps = {
  bgcolor: string;
};

export const Header = styled.header<HeaderContainerProps>`
  background-color: ${({ bgcolor }) => bgcolor};
  padding: 10px;
  font-size: 1.5rem;
`;
