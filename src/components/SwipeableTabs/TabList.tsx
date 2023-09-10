import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { TabData } from "../../types/MiscTypes";
import {
  CustomBgColor,
  TabContainerStyles,
  TabStyledProps,
} from "./SwipeableTabsTypes";
import styled from "styled-components";

export const TabContainer = styled.div<TabContainerStyles>`
  position: relative;
  background-color: ${({ bgcolor }) => bgcolor};
  padding: 0;
  border-radius: ${({ roundedcontainer }) =>
    roundedcontainer ? ".5rem" : "0"};
  max-width: 100vw;
  overflow-x: auto;
  padding: 0 12px;
  isolation: isolate;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const TabListStyled = styled(Tabs.List)<CustomBgColor>`
  display: flex;
  background-color: ${({ bgcolor }) => bgcolor};
`;

export const TabStyled = styled(Tabs.Trigger)<TabStyledProps>`
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

  margin: auto;
  position: relative;
  border-radius: 9999px;
  line-height: 1.25rem;
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
  margin: 5px 0;
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
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  // scrolls to the selected tab when tab list is large enough to have scrollbar
  useEffect(() => {
    if (
      tabContainerRef.current &&
      selectedTabKey &&
      tabElements &&
      tabElements.length > 0
    ) {
      // *testing
      const index = tabs.findIndex((tab) => tab.id === selectedTabKey);
      let currSelected = tabElements[index];
      if (currSelected) {
        scrollIntoView(
          currSelected,
          {
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          },
          {
            duration: 250, // aprox. the duration that chrome uses,
          }
        );
      }
    }
  }, [selectedTabKey, tabContainerRef.current]);

  return (
    <TabContainer
      bgcolor={tabBgColor}
      roundedcontainer={roundedContainer}
      ref={tabContainerRef}
      {...props}
    >
      <TabListStyled ref={tabListRef} bgcolor={tabBgColor}>
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
    </TabContainer>
  );
}

export const TabList = forwardRef(TabListCore);
