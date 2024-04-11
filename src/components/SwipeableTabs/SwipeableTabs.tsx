import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { TargetAndTransition, animate, useScroll } from "framer-motion";
import {
  ROUNDED_CONTAINER_DEFAULT,
  TAB_BG_COLOR_DEFAULT,
  TAB_SELECTION_COLOR_DEFAULT,
} from "./constants";
import { TabData } from "../../types/MiscTypes";
import { TabList } from "./TabList";
import styled from "styled-components";

const TabsStyled = styled(Tabs.Root)`
  width: 100%;
  height: 100%;
`;

// TODO: change to calculate height using some other method
const TabPanelStyled = styled(Tabs.Content)`
  border-radius: 0.25rem;
  outline-style: none;
  width: 100%;
  height: 85%;
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
    outline: 2px solid white;
  }
`;

const TabPanels = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 0;
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

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

type TabsComponentProps = {
  tabs: TabData[];
  selectedTabKey: string;
  setSelectedTabKey: (selected: string) => void;
  defaultValue?: string;
  scrollToDefault?: boolean;
  tabBgColor?: string;
  tabSelectionColor?: string;
  roundedContainer?: boolean;
  tabFontSize?: string;
};

// TODO: fix so on end of scroll, parent container scrolls
// originally based off of Devon Govett's react aria framer motion example, p cool shit
function SwipeableTabs({
  tabs,
  defaultValue,
  selectedTabKey,
  setSelectedTabKey,
  scrollToDefault = true,
  tabBgColor = TAB_BG_COLOR_DEFAULT,
  tabSelectionColor = TAB_SELECTION_COLOR_DEFAULT,
  roundedContainer = ROUNDED_CONTAINER_DEFAULT,
  tabFontSize = "1rem",
}: TabsComponentProps) {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabPanelsRef = useRef<HTMLDivElement | null>(null);
  const { scrollXProgress } = useScroll({
    container: tabPanelsRef as RefObject<HTMLElement>,
  });
  const timerId = useRef<number | null>(null);

  const removeTimeout = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      removeTimeout();
    };
  }, []);

  // TODO: clean this up, a not ideal workaround for scrolling to default item. Necessary rn due to how tab components are being rendered
  useEffect(() => {
    if (
      scrollToDefault &&
      defaultValue &&
      tabListRef.current &&
      tabPanelsRef.current
    ) {
      removeTimeout();
      timerId.current = window.setTimeout(() => {
        onSelectionChange(defaultValue);
      }, 500);
    }
  }, [tabListRef.current, tabPanelsRef.current, defaultValue]);

  // Find all the tab elements so we can use their dimensions.
  const [tabElements, setTabElements] = useState<HTMLButtonElement[]>([]);

  const getIndex = useCallback(
    (x: number) => {
      if (tabElements.length <= 1) {
        return 0;
      }
      const optionsToRoundTo: number[] = [];
      for (let i = 0; i < tabElements.length; i++) {
        optionsToRoundTo.push(i / (tabElements.length - 1));
      }

      let closestIndex = 0;
      let closestDifference = Math.abs(optionsToRoundTo[0] - x);

      for (let i = 1; i < optionsToRoundTo.length; i++) {
        const currentDifference = Math.abs(optionsToRoundTo[i] - x);
        if (currentDifference < closestDifference) {
          closestIndex = i;
          closestDifference = currentDifference;
        }
      }

      return closestIndex;
    },
    [tabElements]
  );

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

  // TODO: think that the problem for selecting always selecting last tab is (at least partially) here?
  // When the user scrolls, update the selected key
  // so that the correct tab panel becomes interactive.
  useEffect(() => {
    const handleChange = (x: number) => {
      if (animationRef.current || !tabElements.length) {
        return;
      }

      setSelectedTabKey(tabs[getIndex(x)].id);
    };
    const unsubscribe = scrollXProgress.on("change", handleChange);

    return () => unsubscribe();
  }, [scrollXProgress, getIndex, tabElements]);

  // When the user clicks on a tab perform an animation of
  // the scroll position to the newly selected tab panel.
  const animationRef = useRef<any>();
  const onSelectionChange = (selectedTab: string) => {
    setSelectedTabKey(selectedTab);

    // If the scroll position is already moving but we aren't animating
    // then the key changed as a result of a user scrolling. Ignore.
    if (scrollXProgress.getVelocity() && !animationRef.current) {
      return;
    }

    const tabPanel = tabPanelsRef.current;
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const index = tabs.findIndex((tab) => tab.id === selectedTab);
    if (tabPanel) {
      animationRef.current = animate<TargetAndTransition>(
        tabPanel.scrollLeft as any,
        (tabPanel.scrollWidth * (index / tabs.length)) as any,
        {
          type: "spring",
          damping: 30,
          mass: 1.5,
          stiffness: 250,
          bounce: 0.2,
          duration: 0.6,
          onUpdate: (v) => {
            (tabPanel.scrollLeft as any) = v;
          },
          onPlay: () => {
            // Disable scroll snap while the animation is going or weird things happen.
            tabPanel.style.scrollSnapType = "none";
          },
          onComplete: () => {
            tabPanel.style.scrollSnapType = "";
            animationRef.current = null;
          },
        }
      );
    }
  };

  return (
    <TabsStyled value={selectedTabKey} onValueChange={onSelectionChange}>
      <TabList
        ref={tabListRef}
        tabs={tabs}
        tabElements={tabElements}
        selectedTabKey={selectedTabKey}
        tabBgColor={tabBgColor}
        tabSelectionColor={tabSelectionColor}
        roundedContainer={roundedContainer}
        tabFontSize={tabFontSize}
      />
      <TabPanels ref={tabPanelsRef}>
        {tabs.map((tab) => (
          <TabPanelStyled key={tab.id} value={tab.id} forceMount={true}>
            {tab.tabContents}
          </TabPanelStyled>
        ))}
      </TabPanels>
    </TabsStyled>
  );
}

export default SwipeableTabs;
