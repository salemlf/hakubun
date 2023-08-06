import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  TargetAndTransition,
  useTransform,
  motion,
  animate,
  useScroll,
} from "framer-motion";
import { TabData } from "../../types/MiscTypes";
import styled from "styled-components";

interface CustomSelectColor {
  selectioncolor: string;
}

interface CustomBgColor {
  bgcolor: string;
}

interface SelectionColorRGBA {
  selectioncolorrgba: string;
}

type TabContainerStyles = {
  bgcolor: string;
  roundedcontainer: boolean;
};

type BgColorSelectionAndHover = CustomSelectColor &
  CustomBgColor &
  SelectionColorRGBA;

const TabsStyled = styled(Tabs.Root)`
  width: 100%;
`;

const TabContainer = styled.div<TabContainerStyles>`
  position: relative;
  background-color: ${({ bgcolor }) => bgcolor};
  padding: 3px 0;
  border-radius: ${({ roundedcontainer }) =>
    roundedcontainer ? ".5rem" : "0"};
`;

const TabListStyled = styled(Tabs.List)`
  display: flex;
  margin-left: 0.25rem;
  justify-content: space-evenly;
`;

// TODO: base hover color off selectioncolor
const TabStyled = styled(Tabs.Trigger)<BgColorSelectionAndHover>`
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  outline-style: none;
  font-size: 1rem;
  color: ${({ selectioncolor }) => selectioncolor};
  background-color: ${({ bgcolor }) => bgcolor};
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: default;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &:hover {
    color: ${({ selectioncolorrgba }) => selectioncolorrgba};
  }
`;

const FocusRing = styled(motion.span)<CustomBgColor>`
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

const Selector = styled(motion.span)<CustomBgColor>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-radius: 9999px;
  background-color: ${({ bgcolor }) => bgcolor};
  mix-blend-mode: difference;
  margin: 4px 0;
`;

const TabPanels = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 300;
  color: white;
  scroll-snap-type: x mandatory;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const TabPanelStyled = styled(Tabs.Content)`
  border-radius: 0.25rem;
  outline-style: none;
  width: 100%;
  scroll-snap-align: start;
  flex-shrink: 0;
  margin: 0 5px;
`;

type TabsComponentProps = {
  tabs: TabData[];
  defaultValue: string;
  tabBgColor?: string;
  tabSelectionColor?: string;
  tabSelectionColorRGBA?: string;
  roundedContainer?: boolean;
};

// TODO: actually use the passed in tabBgColor, tabSelectionColor, and roundedContainer
function SwipeableTabs({
  tabs,
  defaultValue,
  tabBgColor,
  tabSelectionColor,
  tabSelectionColorRGBA,
  roundedContainer = true,
}: TabsComponentProps) {
  let bgColor = tabBgColor ? tabBgColor : "var(--ion-color-primary)";
  let selectionColor = tabSelectionColor
    ? tabSelectionColor
    : "var(--darkest-purple)";
  let selectionColorRGBA = tabSelectionColorRGBA
    ? tabSelectionColorRGBA
    : "rgba(53, 32, 71, 0.8)";

  const [selectedTabKey, setSelectedTabKey] = useState<string>(defaultValue);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabPanelsRef = useRef<HTMLDivElement | null>(null);
  const { scrollXProgress } = useScroll({
    container: tabPanelsRef as RefObject<HTMLElement>,
  });

  // TODO: clean this up, a not ideal workaround for scrolling to default item
  useEffect(() => {
    if (tabListRef.current && tabPanelsRef.current) {
      setTimeout(() => {
        onSelectionChange(defaultValue);
      }, 500);
    }
  }, [tabListRef, tabPanelsRef, defaultValue]);

  // Find all the tab elements so we can use their dimensions.
  const [tabElements, setTabElements] = useState<Element[]>([]);

  const getIndex = useCallback(
    (x: number) => {
      if (tabs.length <= 1) {
        return 0;
      }
      let optionsToRoundTo: number[] = [];
      for (let i = 0; i < tabs.length; i++) {
        optionsToRoundTo.push(i / (tabs.length - 1));
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
    [tabs]
  );

  useEffect(() => {
    if (tabElements.length === 0 && tabListRef.current) {
      const tabs = tabListRef.current.querySelectorAll("[role=tab]");
      setTabElements(Array.from(tabs));
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

  // TODO: this is messing up actual selected item somehow
  // When the user scrolls, update the selected key
  // so that the correct tab panel becomes interactive.
  useEffect(() => {
    const handleChange = (x: number) => {
      if (animationRef.current || !tabs.length) {
        return;
      }

      setSelectedTabKey(tabs[getIndex(x)].id);
    };
    const unsubscribe = scrollXProgress.on("change", handleChange);

    return () => unsubscribe();
  }, [scrollXProgress, getIndex, tabs]);

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
      <TabContainer bgcolor={bgColor} roundedcontainer={roundedContainer}>
        <TabListStyled ref={tabListRef}>
          {tabs.map((tab) => (
            <TabStyled
              key={tab.id}
              value={tab.id}
              bgcolor={bgColor}
              selectioncolor={selectionColor}
              selectioncolorrgba={selectionColorRGBA}
            >
              {tab.label}
            </TabStyled>
          ))}
        </TabListStyled>
        {/* Selection indicator. */}
        <Selector style={{ x, width }} bgcolor={bgColor} />
      </TabContainer>
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
