import { IonAlert, IonCol, IonGrid, IonRow, IonTitle } from "@ionic/react";
import { motion } from "framer-motion";
import Button from "../components/Button/Button";
import styled from "styled-components";

type CustomBgColor = {
  bgcolor: string;
};

type OptionalBgColor = {
  bgcolor?: string;
};

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

export const SubjRow = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justify }) => justify};
  margin-left: -3px;
`;

export const SubjCol = styled.div`
  display: flex;
  flex-direction: column;
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

export const FoundInHeadingContainer = styled(IconHeadingContainer)`
  margin-bottom: 10px;
`;

// TODO: modify so can see textbox before click (has an outline)
export const Alert = styled(IonAlert)`
  /* @media (prefers-color-scheme: dark) { */
  .alert-message {
    color: white;
    /* } */
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

  &:focus-visible {
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

export const ContentWithTabBar = styled.main`
  overflow-y: auto;
  padding: 5px 5px 85px 5px;
`;

export const ContentWithTabBarNoPadding = styled.main`
  overflow-y: auto;
  padding: 0;
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
  &:focus-visible {
    outline: 2px solid white;
  }
`;

export const FloatingButton = styled(Button)`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  padding: 10px 15px;
  font-size: 1.25rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

type FloatingButtonContainerProps = {
  distancefrombottom: string;
};

export const FloatingButtonContainer = styled(
  motion.div
)<FloatingButtonContainerProps>`
  position: fixed;
  z-index: 1;
  bottom: ${({ distancefrombottom }) => distancefrombottom};
  left: 50%;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FullWidthColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MainContent = styled.main`
  overflow-y: auto;
  /* don't want to show scrollbar when swiping */
  overflow-x: hidden;
`;

export const Section = styled.section<OptionalBgColor>`
  background-color: ${({ bgcolor }) =>
    bgcolor ? bgcolor : "var(--ion-background-color)"};
  padding: 0 10px;
`;

export const Header = styled.header<CustomBgColor>`
  background-color: ${({ bgcolor }) => bgcolor};
  padding: 10px;
  font-size: 1.5rem;
`;

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 6px;
  align-items: center;
  gap: 10px;
`;

export const FixedCenterContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
`;

export const AbsoluteCenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 12;
`;

export const SettingOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 22px 12px;
  align-items: center;

  &:first-child {
    margin-top: 10px;
  }
`;
