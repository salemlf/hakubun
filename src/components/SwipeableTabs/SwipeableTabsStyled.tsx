import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import styled from "styled-components";

interface CustomSelectColor {
  selectioncolor: string;
}

interface CustomBgColor {
  bgcolor: string;
}

type TabContainerStyles = {
  bgcolor: string;
  roundedcontainer: boolean;
};

type BgColorSelectionAndHover = CustomSelectColor & CustomBgColor;

type CustomFontSize = {
  tabfontsize: string;
};

export const TabsStyled = styled(Tabs.Root)`
  width: 100%;
  /* max-height: 90vh; */
`;

export const TabContainer = styled.div<TabContainerStyles>`
  position: relative;
  background-color: ${({ bgcolor }) => bgcolor};
  padding: 0;
  border-radius: ${({ roundedcontainer }) =>
    roundedcontainer ? ".5rem" : "0"};
  max-width: 100vw;
  overflow-x: auto;
  padding: 0 12px;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const TabContainerBottomFlex = styled.div<TabContainerStyles>`
  background-color: ${({ bgcolor }) => bgcolor};
  padding: 0;
  border-radius: ${({ roundedcontainer }) =>
    roundedcontainer ? ".5rem" : "0"};
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  max-width: 100vw;
  overflow-x: auto;
`;

export const TabListStyled = styled(Tabs.List)`
  display: flex;
  gap: 5px;
`;

export const TabListBlobsStyled = styled(Tabs.List)`
  display: flex;
  max-width: 100%;
`;

export const TabStyled = styled(Tabs.Trigger)<
  BgColorSelectionAndHover & CustomFontSize
>`
  margin: auto;
  padding: 12px;
  outline-style: none;
  color: ${({ selectioncolor }) => selectioncolor};
  background-color: ${({ bgcolor }) => bgcolor};
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: default;
  font-size: ${({ tabfontsize }) => tabfontsize};

  /* @media (min-width: 640px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  } */
`;

export const TabStyledBlob = styled(Tabs.Trigger)<BgColorSelectionAndHover>`
  outline-style: none;
  font-size: 1rem;
  min-width: 25px;
  min-height: 25px;
  margin: 0 5px;
  border-radius: 9999px;
  background-color: var(--offwhite-color);
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: default;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`;

// TODO: use or delete this
export const FocusRing = styled(motion.span)<CustomBgColor>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-radius: 9999px;
  box-shadow: ${({ bgcolor }) => `0 0 0 0 calc(2px + 0) ${bgcolor}`};
  --ring-color: var(--darkest-purple);
  --ring-offset-width: 2px;
`;

export const Selector = styled(motion.span)<CustomBgColor>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-radius: 9999px;
  background-color: ${({ bgcolor }) => bgcolor};
  mix-blend-mode: difference;
  margin: 5px 0;
`;

export const SelectorBlob = styled(motion.span)<CustomBgColor>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-radius: 9999px;
  background-color: var(--ion-color-primary);
`;

export const TabPanels = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 300;
  color: white;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

// TOODO: change to calculate height using some other method
export const TabPanelStyled = styled(Tabs.Content)`
  border-radius: 0.25rem;
  outline-style: none;
  width: 100%;
  scroll-snap-align: start;
  flex-shrink: 0;
  margin: 0 5px;
  /* max-height: 90vh; */
  max-height: 80%;
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
