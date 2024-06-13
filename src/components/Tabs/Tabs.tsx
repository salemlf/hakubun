import { useCallback, useEffect, useRef, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useMotionValueEvent, useScroll, useVelocity } from "framer-motion";
import { useSnapCarousel } from "react-snap-carousel";
import { mergeRefs } from "../../utils";
import { TabData } from "../../types/MiscTypes";
import { TabsList } from "./TabsList";
import styled from "styled-components";
import {
  ROUNDED_CONTAINER_DEFAULT,
  TAB_BG_COLOR_DEFAULT,
  TAB_FONT_SIZE_DEFAULT,
  TAB_SELECTION_COLOR_DEFAULT,
} from "./constants";

const TabsStyled = styled(TabsPrimitive.Root)`
  max-width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TabPanels = styled.div`
  max-width: 100vw;
  display: flex;
  overflow-x: auto;
  margin: 0;
  margin-bottom: 20px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 300;
  color: white;
  scroll-snap-type: x mandatory;
  -webkit-scroll-snap-type: x mandatory;
  overscroll-behavior-x: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  padding-bottom: 30px;

  scroll-snap-type: x mandatory;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Tab = styled(TabsPrimitive.Content)`
  border-radius: 0.25rem;
  outline-style: none;
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  -webkit-scroll-snap-align: start;
  flex-shrink: 0;
  margin: 0 5px;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &:focus-visible {
    outline: 2px solid var(--focus-color);
  }
`;

interface TabsProps {
  id: string;
  tabs: TabData[];
  selectedTabKey: string;
  setSelectedTabKey: (selected: string) => void;
  tabBgColor?: string;
  tabSelectionColor?: string;
  roundedContainer?: boolean;
  tabFontSize?: string;
}

function Tabs({
  id,
  tabs,
  selectedTabKey,
  setSelectedTabKey,
  tabBgColor = TAB_BG_COLOR_DEFAULT,
  tabSelectionColor = TAB_SELECTION_COLOR_DEFAULT,
  roundedContainer = ROUNDED_CONTAINER_DEFAULT,
  tabFontSize = TAB_FONT_SIZE_DEFAULT,
}: TabsProps) {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const panelScrollRef = useRef<HTMLDivElement | null>(null);
  const {
    scrollRef: snapScrollRef,
    activePageIndex,
    goTo,
    pages,
  } = useSnapCarousel();

  const { scrollX } = useScroll({
    container: panelScrollRef,
  });
  const scrollVelocity = useVelocity(scrollX);

  // Find all the tab elements so we can use their dimensions.
  const [tabElements, setTabElements] = useState<HTMLButtonElement[]>([]);

  useEffect(() => {
    goToSelectedTab();
  }, [selectedTabKey, pages]);

  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (Math.abs(latest) < 275) {
      const indexOfSelected = getSelectedIndex(selectedTabKey);
      if (indexOfSelected !== activePageIndex) {
        setSelectedTabKey(tabs[activePageIndex].id);
      }
    }
  });

  useEffect(() => {
    if (tabElements.length === 0 && tabListRef.current) {
      const tabList: NodeListOf<HTMLButtonElement> =
        tabListRef.current.querySelectorAll("[role=tab]");
      setTabElements(Array.from(tabList));
    }
  }, [tabElements]);

  // scrolls to the selected tab (and centers it) when tab list is large enough to have scrollbar
  useEffect(() => {
    if (
      tabListRef.current &&
      selectedTabKey &&
      tabElements &&
      tabElements.length > 0
    ) {
      const index = tabs.findIndex((tab) => tab.id === selectedTabKey);
      const currSelected = tabElements[index];
      if (currSelected) {
        // TODO: this doesn't work as expected in webkit browsers, fix
        const scrollToCenterPos =
          currSelected.offsetLeft +
          currSelected.offsetWidth / 2 -
          tabListRef.current.offsetWidth / 2;

        tabListRef.current.scrollTo({
          left: scrollToCenterPos,
          behavior: "smooth",
        });
      }
    }
  }, [selectedTabKey, tabListRef.current]);

  const goToSelectedTab = useCallback(() => {
    const indexOfSelected = getSelectedIndex(selectedTabKey);
    if (activePageIndex !== indexOfSelected) {
      goTo(indexOfSelected);
    }
  }, [selectedTabKey, pages]);

  const getSelectedIndex = (selectedTabKey: string) => {
    return tabs.findIndex((tab) => tab.id === selectedTabKey);
  };

  return (
    <TabsStyled value={selectedTabKey} onValueChange={setSelectedTabKey}>
      <TabsList
        id={id}
        ref={tabListRef}
        tabs={tabs}
        selectedTabKey={selectedTabKey}
        tabBgColor={tabBgColor}
        tabSelectionColor={tabSelectionColor}
        roundedContainer={roundedContainer}
        tabFontSize={tabFontSize}
      />
      <TabPanels ref={mergeRefs(snapScrollRef, panelScrollRef)}>
        {tabs.map((tab) => (
          <Tab key={tab.id} value={tab.id} forceMount={true}>
            {tab.tabContents}
          </Tab>
        ))}
      </TabPanels>
    </TabsStyled>
  );
}

export default Tabs;
