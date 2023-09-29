import { useRef } from "react";
import { AnimatePresence, PanInfo, motion } from "framer-motion";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import Button from "../Button";
import Counter from "../Counter";
import NextArrowIcon from "../../images/next-arrow-color.svg";
import PrevArrowIcon from "../../images/back-arrow-color.svg";
import styled from "styled-components";

const getPageIndex = (
  currentPageNum: number,
  updatedPageNum: number,
  numPages: number
) => {
  // Using modulo so it loops back around if we go past the first or last page
  const index = (currentPageNum + (updatedPageNum - currentPageNum)) % numPages;
  return index < 0 ? index + numPages : index;
};

type CurrPageUpdateProps = [page: number, direction: number];

type Props = {
  pageArr: React.ReactNode[];
  currentPage: number;
  direction: number;
  setCurrentPage: (updateProps: CurrPageUpdateProps) => void;
  typeOfPaginator: "buttons" | "tabs";
};

// TODO: make sure other pages aren't selectable with keyboard/screenreader when not selected
// TODO: improve animations between pages
function Paginator({
  pageArr,
  currentPage,
  direction,
  setCurrentPage,
  typeOfPaginator,
}: Props) {
  // const showButtons = typeOfPaginator === "buttons";
  const pageIndices = [...Array(pageArr.length).keys()];
  // *testing
  console.log(
    "🚀 ~ file: Paginator.tsx:17 ~ Paginator ~ currentPage:",
    currentPage
  );
  // *testing

  const setPage = (
    newPage: number,
    newDirection: number = newPage - currentPage
  ) => {
    setCurrentPage([newPage, newDirection]);
  };

  return (
    <>
      {typeOfPaginator === "tabs" && (
        <PageTabs
          tabLabels={pageIndices.map((index) => index)}
          selectedPage={currentPage}
          setPage={setPage}
        />
      )}
      <Pages
        currentPage={currentPage}
        pageArr={pageArr}
        direction={direction}
        setPage={setPage}
      />
      {typeOfPaginator === "buttons" && (
        <PageIndicator
          currentPage={currentPage}
          setPage={setPage}
          pageIndices={pageIndices}
        />
      )}
    </>
  );
}

const xOffset = 100;
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? xOffset : -xOffset,
    opacity: 0,
  }),
  selected: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0,
  }),
};

const PagesWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const PageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
`;

type PagesProps = {
  currentPage: number;
  setPage: (page: number, direction: number) => void;
  direction: number;
  pageArr: React.ReactNode[];
};

function Pages({ currentPage, setPage, direction, pageArr }: PagesProps) {
  const hasPaginated = useRef<boolean>(false);

  function onPageDrag(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    let offset = info.offset;

    if (hasPaginated.current) return;
    let newPage = currentPage;
    const threshold = xOffset / 2;

    if (offset.x < -threshold) {
      newPage = currentPage + 1;
    } else if (offset.x > threshold) {
      newPage = currentPage - 1;
    }

    if (newPage !== currentPage) {
      hasPaginated.current = true;
      let updatedIndex = getPageIndex(currentPage, newPage, pageArr.length);

      setPage(updatedIndex, offset.x < 0 ? 1 : -1);
    }
  }

  return (
    <PagesWrapper>
      <AnimatePresence initial={false} custom={direction}>
        <PageContainer
          key={currentPage}
          data-page={currentPage}
          variants={variants}
          initial="enter"
          animate="selected"
          exit="exit"
          drag="x"
          onDrag={onPageDrag}
          onDragStart={() => (hasPaginated.current = false)}
          onDragEnd={() => (hasPaginated.current = true)}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          custom={direction}
        >
          {pageArr[currentPage]}
        </PageContainer>
      </AnimatePresence>
    </PagesWrapper>
  );
}

const CountSeparator = styled.p`
  margin: 0 0.45em;
`;

const PageCountContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const PrevPageButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 12;
`;

const NextPageButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 12;
`;

const Arrow = styled(IonIcon)`
  width: 3.5em;
  height: 3.5em;
`;

type PageIndicatorProps = {
  pageIndices: number[];
  currentPage: number;
  setPage: (page: number) => void;
};

function PageIndicator({
  pageIndices,
  currentPage,
  setPage,
}: PageIndicatorProps) {
  let hasNext = currentPage < pageIndices.length - 1;

  return (
    <>
      <PageCountContainer>
        <Counter value={currentPage + 1} maxNum={pageIndices.length} />
        <CountSeparator>/</CountSeparator>
        <Counter value={pageIndices.length} maxNum={pageIndices.length} />
      </PageCountContainer>
      {currentPage !== 0 && (
        <PrevPageButton
          aria-label="Previous Page"
          backgroundColor="transparent"
          onPress={() =>
            setPage(
              getPageIndex(currentPage, currentPage - 1, pageIndices.length)
            )
          }
        >
          <Arrow src={PrevArrowIcon} />
        </PrevPageButton>
      )}
      {hasNext && (
        <NextPageButton
          aria-label="Next Page"
          backgroundColor="transparent"
          onPress={() =>
            setPage(
              getPageIndex(currentPage, currentPage + 1, pageIndices.length)
            )
          }
        >
          <Arrow src={NextArrowIcon} />
        </NextPageButton>
      )}
    </>
  );
}

const TabContainer = styled.div`
  display: flex;
  background-color: white;
  position: relative;
  background-color: white;
  padding: 0;
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

const PageTab = styled(Button)`
  /* all: unset; */
  padding: 12px;
  outline-style: none;
  color: black;
  background-color: white;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: default;
  font-size: 1rem;
  font-weight: 600;

  margin: auto;
  position: relative;
  border-radius: 9999px;
  line-height: 1.25rem;
`;

const Selector = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  mix-blend-mode: difference;
  margin: 5px 0;
`;

type PageTabsProps = {
  tabLabels: number[];
  selectedPage: number;
  setPage: (page: number) => void;
};

const PageTabs = ({ tabLabels, selectedPage, setPage }: PageTabsProps) => {
  return (
    <TabContainer>
      {tabLabels.map((label) => {
        return (
          <PageTab
            key={label}
            onPress={() =>
              setPage(getPageIndex(selectedPage, label, tabLabels.length))
            }
            backgroundColor="white"
          >
            {selectedPage === label && (
              <Selector
                style={{ borderRadius: 9999 }}
                layoutId="selector"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {label}
          </PageTab>
        );
      })}
    </TabContainer>
  );
};

export default Paginator;
