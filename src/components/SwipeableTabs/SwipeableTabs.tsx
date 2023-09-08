import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  TargetAndTransition,
  useTransform,
  animate,
  useScroll,
} from "framer-motion";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { TabData } from "../../types/MiscTypes";
import {
  Selector,
  SelectorBlob,
  TabContainer,
  TabContainerBottomFlex,
  TabListBlobsStyled,
  TabListStyled,
  TabPanelStyled,
  TabPanels,
  TabStyled,
  TabStyledBlob,
  TabsStyled,
} from "./SwipeableTabsStyled";

type TabsComponentProps = {
  tabs: TabData[];
  selectedTabKey: string;
  setSelectedTabKey: (selected: string) => void;
  defaultValue?: string;
  scrollToDefault?: boolean;
  tabBgColor?: string;
  tabSelectionColor?: string;
  roundedContainer?: boolean;
  blobs?: boolean;
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
  tabBgColor = "var(--offwhite-color)",
  tabSelectionColor = "var(--darkest-purple)",
  roundedContainer = true,
  blobs = false,
  tabFontSize = "1rem",
}: TabsComponentProps) {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabPanelsRef = useRef<HTMLDivElement | null>(null);
  // !added
  const tabContainerRef = useRef<HTMLDivElement | null>(null);
  // !added
  const { scrollXProgress } = useScroll({
    container: tabPanelsRef as RefObject<HTMLElement>,
  });

  // TODO: clean this up, a not ideal workaround for scrolling to default item. Necessary rn due to how tab components are being rendered
  useEffect(() => {
    if (
      scrollToDefault &&
      defaultValue &&
      tabListRef.current &&
      tabPanelsRef.current
    ) {
      setTimeout(() => {
        onSelectionChange(defaultValue);
      }, 500);
    }
  }, [tabListRef, tabPanelsRef, defaultValue]);

  // scrolls to the selected tab when tab list is large enough to have scrollbar
  useEffect(() => {
    if (
      tabContainerRef.current &&
      selectedTabKey &&
      tabElements &&
      tabElements.length > 0
    ) {
      // *testing
      // console.log(
      //   "🚀 ~ file: SwipeableTabs.tsx:80 ~ useEffect ~ tabContainerRef.current:",
      //   tabContainerRef.current
      // );
      // *testing
      const index = tabs.findIndex((tab) => tab.id === selectedTabKey);
      let currSelected = tabElements[index];
      // *testing
      // console.log(
      //   "🚀 ~ file: SwipeableTabs.tsx:86 ~ useEffect ~ currSelected:",
      //   currSelected
      // );
      // *testing

      if (currSelected) {
        // *testing
        // console.log("CALLED");
        // *testing
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
  // }, [selectedTabKey]);

  // Find all the tab elements so we can use their dimensions.
  const [tabElements, setTabElements] = useState<Element[]>([]);

  const getIndex = useCallback(
    (x: number) => {
      if (tabElements.length <= 1) {
        return 0;
      }
      let optionsToRoundTo: number[] = [];
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
      const tabList = tabListRef.current.querySelectorAll("[role=tab]");
      setTabElements(Array.from(tabList));
    }
  }, [tabElements]);

  // This function transforms the scroll position into the X position
  // or width of the selected tab indicator.
  const transform = (
    x: number,
    property: "offsetLeft" | "offsetWidth"
  ): number => {
    if (!tabElements.length) return 0;

    // Find the tab index for the scroll X position.
    const index = getIndex(x);

    // Get the difference between this tab and the next one.
    const difference =
      index < tabElements.length - 1
        ? tabElements[index + 1][property as keyof {}] -
          tabElements[index][property as keyof {}]
        : tabElements[index]["offsetWidth" as keyof {}];

    // Get the percentage between tabs.
    // This is the difference between the integer index and fractional one.
    const percent = (tabElements.length - 1) * x - index;

    // Linearly interpolate to calculate the position of the selection indicator.
    const value =
      tabElements[index][property as keyof {}] + difference * percent;

    // iOS scrolls weird when translateX is 0 for some reason. 🤷‍♂️
    return value || 0.1;
  };

  const x = useTransform(scrollXProgress, (x) => {
    return transform(x, "offsetLeft");
  });
  const width = useTransform(scrollXProgress, (x) =>
    transform(x, "offsetWidth")
  );

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
      {blobs ? (
        <>
          <TabPanels ref={tabPanelsRef}>
            {tabs.map((tab) => (
              <TabPanelStyled key={tab.id} value={tab.id} forceMount={true}>
                {tab.tabContents}
              </TabPanelStyled>
            ))}
          </TabPanels>
          <TabContainerBottomFlex
            ref={tabContainerRef}
            bgcolor={"transparent"}
            roundedcontainer={roundedContainer}
          >
            <TabListBlobsStyled ref={tabListRef} bgcolor={tabBgColor}>
              {tabs.map((tab) => (
                <TabStyledBlob
                  key={tab.id}
                  value={tab.id}
                  bgcolor={tabBgColor}
                  selectioncolor={tabSelectionColor}
                />
              ))}
            </TabListBlobsStyled>
            {/* Selection indicator. */}
            <SelectorBlob style={{ x, width }} bgcolor={tabBgColor} />
          </TabContainerBottomFlex>
        </>
      ) : (
        <>
          <TabContainer
            bgcolor={tabBgColor}
            roundedcontainer={roundedContainer}
            ref={tabContainerRef}
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
                  {tab.label}
                </TabStyled>
              ))}
            </TabListStyled>
            {/* Selection indicator. */}
            <Selector
              style={{ x, width, borderRadius: 9999 }}
              bgcolor={tabBgColor}
            />
          </TabContainer>
          <TabPanels ref={tabPanelsRef}>
            {tabs.map((tab) => (
              <TabPanelStyled key={tab.id} value={tab.id} forceMount={true}>
                {tab.tabContents}
              </TabPanelStyled>
            ))}
          </TabPanels>
        </>
      )}
    </TabsStyled>
  );
}

export default SwipeableTabs;
