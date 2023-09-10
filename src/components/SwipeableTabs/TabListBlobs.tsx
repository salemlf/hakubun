import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { TabData } from "../../types/MiscTypes";
import {
  BgColorSelectionAndHover,
  CustomBgColor,
  TabContainerStyles,
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

const TabContainerBottomFlex = styled.div<TabContainerStyles>`
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
  isolation: isolate;
`;

const TabListBlobsStyled = styled(Tabs.List)<CustomBgColor>`
  display: flex;
  gap: 10px;
  max-width: 100%;
`;

export const TabStyledBlob = styled(Tabs.Trigger)<BgColorSelectionAndHover>`
  outline-style: none;
  font-size: 1rem;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  border-radius: 9999px;
  background-color: ${({ bgcolor }) => bgcolor};
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: default;

  margin: auto;
  position: relative;
  border-radius: 9999px;
  line-height: 1.25rem;
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

type SwipeableTabsListProps = {
  tabs: TabData[];
  tabElements: Element[];
  selectedTabKey: string;
  //   x: MotionValue<number>;
  //   width: MotionValue<number>;
  tabBgColor: string;
  tabSelectionColor: string;
  roundedContainer: boolean;
  tabFontSize: string;
};

// TODO: scrolling to last items automatically for some reason, fix
function TabListBlobsCore(
  {
    tabs,
    tabElements,
    selectedTabKey,
    // x,
    // width,
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
    <TabContainerBottomFlex
      ref={tabContainerRef}
      bgcolor={"transparent"}
      roundedcontainer={roundedContainer}
      {...props}
    >
      <TabListBlobsStyled ref={tabListRef} bgcolor={tabBgColor}>
        {tabs.map((tab) => (
          <TabStyledBlob
            key={tab.id}
            value={tab.id}
            bgcolor={tabBgColor}
            selectioncolor={tabSelectionColor}
          >
            {selectedTabKey === tab.id && (
              <SelectorBlob
                style={{ borderRadius: 9999 }}
                bgcolor={tabBgColor}
                layoutId="selector"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </TabStyledBlob>
        ))}
      </TabListBlobsStyled>
    </TabContainerBottomFlex>
  );
}

export const TabListBlobs = forwardRef(TabListBlobsCore);
