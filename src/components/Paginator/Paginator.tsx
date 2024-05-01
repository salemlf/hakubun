import { useRef } from "react";
import { AnimatePresence, PanInfo, motion } from "framer-motion";
import { getPageIndex } from "../../services/MiscService/MiscService";
import Button from "../Button";
import Counter from "../Counter";
import SvgIcon from "../SvgIcon";
import NextArrowIcon from "../../images/next-arrow-color.svg?react";
import PrevArrowIcon from "../../images/back-arrow-color.svg?react";
import styled from "styled-components";

type CurrPageUpdateProps = [page: number, direction: number];

type Props = {
  pageArr: React.ReactNode[];
  currentPage: number;
  direction: number;
  setCurrentPage: (updateProps: CurrPageUpdateProps) => void;
  showNavigationButtons: boolean;
};

function Paginator({
  pageArr,
  currentPage,
  direction,
  setCurrentPage,
  showNavigationButtons,
}: Props) {
  const pageIndices = [...Array(pageArr.length).keys()];

  const setPage = (
    newPage: number,
    newDirection: number = newPage - currentPage
  ) => {
    setCurrentPage([newPage, newDirection]);
  };

  return (
    <PagesWrapper>
      <Pages
        currentPage={currentPage}
        pageArr={pageArr}
        direction={direction}
        setPage={setPage}
      />
      {showNavigationButtons && (
        <PageIndicator
          currentPage={currentPage}
          setPage={setPage}
          pageIndices={pageIndices}
        />
      )}
    </PagesWrapper>
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
  display: grid;
  grid-template-rows: 2fr auto;
  position: relative;
  background-color: var(--background-color);
  height: 100%;
  width: 100%;
  min-height: 100%;
`;

const PageContainer = styled(motion.div)`
  background-color: var(--background-color);
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
    const offset = info.offset;

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
      const updatedIndex = getPageIndex(currentPage, newPage, pageArr.length);

      setPage(updatedIndex, offset.x < 0 ? 1 : -1);
    }
  }

  return (
    <>
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
    </>
  );
}

const PageIndicatorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 5px;
`;

const CountSeparator = styled.p`
  margin: 0 0.45em;
`;

const PageCountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const ChangePageButton = styled(Button)`
  z-index: 12;
  grid-row: 1 / 2;
`;

const PrevPageButton = styled(ChangePageButton)`
  left: 20px;
  grid-column: 1 / 2;
`;

const NextPageButton = styled(ChangePageButton)`
  grid-column: 3 / 4;
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
  const hasNext = currentPage < pageIndices.length - 1;

  return (
    <PageIndicatorContainer>
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
          <SvgIcon icon={<PrevArrowIcon />} width="3.5em" height="3.5em" />
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
          <SvgIcon icon={<NextArrowIcon />} width="3.5em" height="3.5em" />
        </NextPageButton>
      )}
    </PageIndicatorContainer>
  );
}

export default Paginator;
