import { IonGrid, IonRow } from "@ionic/react";
import { motion } from "framer-motion";
import { getSubjectColor } from "../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { SubjectType } from "../types/Subject";
import Button from "../components/Button/Button";
import styled from "styled-components";

export type CustomBgColor = {
  bgcolor: string;
};

export type CustomTextColor = {
  txtcolor: string;
};

export type CustomFontSize = {
  sizeoffont: string;
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
  background-color: var(--secondary-foreground-color);
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
  text-transform: capitalize;
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

  i {
    margin-right: 5px;
  }
`;

// TODO: replace IconHeadingContainer with this
export const SvgIconHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;

  gap: 5px;
`;

export const FoundInHeadingContainer = styled(IconHeadingContainer)`
  margin-bottom: 10px;
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
  border: 1px solid black;
`;

type FloatingButtonContainerProps = {
  distancefrombottom: string;
};

export const FloatingButtonContainer = styled(
  motion.div
)<FloatingButtonContainerProps>`
  position: absolute;
  left: 50%;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
  bottom: ${({ distancefrombottom }) => distancefrombottom};
`;

export const FullWidthColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MainContent = styled.main`
  background-color: var(--background-color);
  overflow-y: auto;
  /* don't want to show scrollbar when swiping */
  overflow-x: hidden;
`;

export const ContentWithTabBar = styled.main`
  background-color: var(--background-color);
  overflow-y: auto;
  padding: 5px 5px 85px 5px;
`;

export const ContentWithTabBarNoPadding = styled.main`
  background-color: var(--background-color);
  overflow-y: auto;
  padding: 0;
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
  margin: 20px 6px;
  align-items: center;
  gap: 10px;

  &:first-child {
    margin-top: 10px;
  }
`;

// okay, not actually "fixed" cuz ios is picky
export const FixedCenterContainer = styled.div`
  position: absolute;
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
  gap: 10px;
  margin: 22px 12px;
  align-items: center;

  &:first-child {
    margin-top: 10px;
  }
`;

export const SubjectButtonAndProgress = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubjForLvlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(3.125rem, 1fr));
  gap: 5px;
`;

export const LoadingButtonRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  width: 100%;
`;

type ItemContainerProps = {
  subjtype: SubjectType;
};

export const SubjectItemContainer = styled.button<ItemContainerProps>`
  background-color: ${({ subjtype }) => getSubjectColor(subjtype)};
  width: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px;
  margin-bottom: 2px;
  border-radius: 10px;
  border: 2px solid black;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;
