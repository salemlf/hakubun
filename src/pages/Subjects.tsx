import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useUserInfoStore } from "../stores/useUserInfoStore";
import { useStickyState } from "../hooks/useStickyState";
import { LEVELS } from "../constants";
import { getPageIndex } from "../services/MiscService";
import AnimatedPage from "../components/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import SubjectsOnLvlTab from "../components/SubjectsOnLvlTab/SubjectsOnLvlTab";
import LoadingDots from "../components/LoadingDots";
import Paginator from "../components/Paginator";
import { FixedCenterContainer, Header } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

const SubjectsHeader = styled(Header)`
  color: black;
  text-align: center;
  padding: 10px 0;
`;

// TODO: add indicator for current level (since not always the one selected)
export const Subjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [level, setLevel] = useStickyState(0, "subjects-pg-level-selected");

  useEffect(() => {
    if (userInfo && userInfo.level) {
      if (level === 0) {
        setLevel(userInfo.level);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [userInfo, userInfo?.level]);

  return (
    <>
      <Page>
        {isLoading ? (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        ) : (
          <SubjectsContent level={level} setLevel={setLevel} />
        )}
      </Page>
      <FloatingTabBar />
    </>
  );
};

type SubjectsContentProps = {
  level: number;
  setLevel: (level: number) => void;
};

const SubjectsContent = ({ level, setLevel }: SubjectsContentProps) => {
  const [[currentPage, direction], setCurrentPage] = useState([level - 1, 0]);
  const levelPages = LEVELS.map((levelPg) => (
    <SubjectsOnLvlTab
      key={levelPg}
      level={levelPg}
      isSelected={currentPage === levelPg}
    />
  ));
  const pageIndices = [...Array(LEVELS.length).keys()];
  const setPage = (
    newPage: number,
    newDirection: number = newPage - currentPage
  ) => {
    setCurrentPage([newPage, newDirection]);
    setLevel(newPage + 1);
  };

  return (
    <>
      <SubjectsHeader bgcolor="var(--ion-color-primary-tint)">
        Level
        <SubjectTabs
          tabLabels={pageIndices.map((index) => index)}
          selectedIndex={currentPage}
          setSelectedIndex={setPage}
        />
      </SubjectsHeader>
      <Paginator
        hasTabBar={true}
        showNavigationButtons={false}
        pageArr={levelPages}
        currentPage={currentPage}
        direction={direction}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const TabContainer = styled.div`
  display: flex;
  background-color: var(--ion-color-primary-tint);
  position: relative;
  background-color: var(--ion-color-primary-tint);
  padding: 0;
  max-width: 100vw;
  overflow-x: auto;
  padding: 8px;
  isolation: isolate;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const PageTab = styled.button`
  padding: 8px 12px;
  outline-style: none;
  color: black;
  background-color: var(--ion-color-primary-tint);
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: default;
  font-size: 1rem;
  font-weight: 600;

  margin: 0 4px;
  position: relative;
  border-radius: 9999px;
  line-height: 1.25rem;

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const TabSelector = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: var(--ion-color-primary-tint);
  mix-blend-mode: difference;
`;

type SubjectTabsProps = {
  tabLabels: number[];
  selectedIndex: number;
  setSelectedIndex: (page: number) => void;
};

// TODO: improve tab index selection so selects tab list as a group and then can tab into that
const SubjectTabs = ({
  tabLabels,
  selectedIndex,
  setSelectedIndex,
}: SubjectTabsProps) => {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [tabElements, setTabElements] = useState<HTMLButtonElement[]>([]);
  useEffect(() => {
    if (tabElements.length === 0 && tabListRef.current) {
      const tabList: NodeListOf<HTMLButtonElement> =
        tabListRef.current.querySelectorAll("[data-subject-tab]");
      setTabElements(Array.from(tabList));
    }
  }, [tabListRef.current]);

  // scrolls to the selected tab (and centers it) when tab list is large enough to have scrollbar
  useEffect(() => {
    if (
      tabListRef.current &&
      selectedIndex &&
      tabElements &&
      tabElements.length > 0
    ) {
      // const index = tabs.findIndex((tab) => tab.id === selectedTabKey);
      let currSelected = tabElements[selectedIndex];
      if (currSelected) {
        let scrollToCenterPos =
          currSelected.offsetLeft +
          currSelected.offsetWidth / 2 -
          tabListRef.current.offsetWidth / 2;

        tabListRef.current.scrollTo({
          left: scrollToCenterPos,
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex, tabListRef.current]);

  return (
    <TabContainer ref={tabListRef}>
      {tabLabels.map((label) => {
        return (
          <PageTab
            data-subject-tab={`tab-${label}`}
            key={label}
            onClick={() =>
              setSelectedIndex(
                getPageIndex(selectedIndex, label, tabLabels.length)
              )
            }
          >
            {selectedIndex === label && (
              <TabSelector
                style={{ borderRadius: 9999 }}
                layoutId="subj-tab-selector"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {label + 1}
          </PageTab>
        );
      })}
    </TabContainer>
  );
};
