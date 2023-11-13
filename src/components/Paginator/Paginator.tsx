import { useRef } from "react";
import { AnimatePresence, PanInfo, motion } from "framer-motion";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import { getPageIndex } from "../../services/MiscService";
import Button from "../Button";
import Counter from "../Counter";
import NextArrowIcon from "../../images/next-arrow-color.svg";
import PrevArrowIcon from "../../images/back-arrow-color.svg";
import styled from "styled-components";

type CurrPageUpdateProps = [page: number, direction: number];

type Props = {
  pageArr: React.ReactNode[];
  currentPage: number;
  direction: number;
  setCurrentPage: (updateProps: CurrPageUpdateProps) => void;
  showNavigationButtons: boolean;
  hasTabBar?: boolean;
};

// TODO: make sure other pages aren't selectable with keyboard/screenreader when not selected
// TODO: improve animations between pages
function Paginator({
  pageArr,
  currentPage,
  direction,
  setCurrentPage,
  showNavigationButtons,
  hasTabBar = false,
}: Props) {
  const pageIndices = [...Array(pageArr.length).keys()];

  const setPage = (
    newPage: number,
    newDirection: number = newPage - currentPage
  ) => {
    setCurrentPage([newPage, newDirection]);
  };

  return (
    <>
      <Pages
        currentPage={currentPage}
        pageArr={pageArr}
        direction={direction}
        setPage={setPage}
        hasTabBar={hasTabBar}
      />
      {showNavigationButtons && (
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

type WrapperProps = {
  hasbottompadding: boolean;
};

const PagesWrapper = styled.div`
  background-color: var(--background-color);
  position: relative;
  height: 100%;
  width: 100%;
`;

const PageContainer = styled(motion.div)<WrapperProps>`
  background-color: var(--background-color);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  padding-bottom: ${({ hasbottompadding }) => (hasbottompadding ? "60px" : 0)};
`;

type PagesProps = {
  currentPage: number;
  setPage: (page: number, direction: number) => void;
  direction: number;
  pageArr: React.ReactNode[];
  hasTabBar: boolean;
};

function Pages({
  currentPage,
  setPage,
  direction,
  pageArr,
  hasTabBar,
}: PagesProps) {
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
          hasbottompadding={hasTabBar}
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

export default Paginator;
