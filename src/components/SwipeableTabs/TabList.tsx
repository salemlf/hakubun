import { ForwardedRef, forwardRef } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { TabData } from "../../types/MiscTypes";
import {
  CustomBgColor,
  TabContainerStyles,
  TabStyledProps,
} from "./SwipeableTabsTypes";
import styled from "styled-components";

const TabListStyled = styled(Tabs.List)<TabContainerStyles>`
  display: flex;
  background-color: ${({ bgcolor }) => bgcolor};
  position: relative;
  background-color: ${({ bgcolor }) => bgcolor};
  padding: 0;
  border-radius: ${({ $roundedcontainer }) =>
    $roundedcontainer ? ".5rem" : "0"};
  max-width: 100vw;
  overflow-x: auto;
  padding: 5px 12px;
  isolation: isolate;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const TabStyled = styled(Tabs.Trigger)<TabStyledProps>`
  padding: 6px 12px;
  outline-style: none;
  color: ${({ selectioncolor }) => selectioncolor};
  background-color: ${({ bgcolor }) => bgcolor};
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: default;
  font-size: ${({ tabfontsize }) => tabfontsize};
  font-weight: 600;

  margin: auto;
  position: relative;
  border-radius: 9999px;
  line-height: 1.25rem;

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const Selector = styled(motion.div)<CustomBgColor>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: ${({ bgcolor }) => bgcolor};
  mix-blend-mode: difference;
  /* margin: 5px 0; */

  margin: 0;
`;

type SwipeableTabsListProps = {
  tabs: TabData[];
  tabElements: Element[];
  selectedTabKey: string;
  tabBgColor: string;
  tabSelectionColor: string;
  roundedContainer: boolean;
  tabFontSize: string;
};

function TabListCore(
  {
    tabs,
    tabElements,
    selectedTabKey,
    roundedContainer,
    tabBgColor,
    tabSelectionColor,
    tabFontSize,
    ...props
  }: SwipeableTabsListProps,
  tabListRef: ForwardedRef<HTMLDivElement>
) {
  return (
    <TabListStyled
      ref={tabListRef}
      bgcolor={tabBgColor}
      $roundedcontainer={roundedContainer}
      {...props}
    >
      {tabs.map((tab) => (
        <TabStyled
          key={tab.id}
          value={tab.id}
          bgcolor={tabBgColor}
          selectioncolor={tabSelectionColor}
          tabfontsize={tabFontSize}
        >
          {selectedTabKey === tab.id && (
            <Selector
              style={{ borderRadius: 9999 }}
              bgcolor={tabBgColor}
              layoutId="selector"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </TabStyled>
      ))}
    </TabListStyled>
  );
}

export const TabList = forwardRef(TabListCore);
