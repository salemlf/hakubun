import { ForwardedRef, forwardRef } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { TabData } from "../../types/MiscTypes";
import {
  BgColorSelectionAndHover,
  CustomBgColor,
  TabContainerStyles,
} from "./SwipeableTabsTypes";
import styled from "styled-components";

const TabListBlobsStyled = styled(Tabs.List)<TabContainerStyles>`
  display: flex;
  gap: 10px;
  max-width: 100%;
  padding: 0;
  border-radius: ${({ roundedcontainer }) =>
    roundedcontainer ? ".5rem" : "0"};
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 20px;
  max-width: 100vw;
  overflow-x: auto;
  isolation: isolate;
`;

const TabStyledBlob = styled(Tabs.Trigger)<BgColorSelectionAndHover>`
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

const SelectorBlob = styled(motion.span)<CustomBgColor>`
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
  tabBgColor: string;
  tabSelectionColor: string;
  roundedContainer: boolean;
  tabFontSize: string;
};

// TODO: combine this and TabList into one component OR combine common styles
// TODO: scrolling to last items automatically for some reason, fix
function TabListBlobsCore(
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
    <TabListBlobsStyled
      ref={tabListRef}
      roundedcontainer={roundedContainer}
      bgcolor={tabBgColor}
      {...props}
    >
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
  );
}

export const TabListBlobs = forwardRef(TabListBlobsCore);
