import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useWindowSize } from "usehooks-ts";
import useQueueStoreFacade from "../../stores/useQueueStore/useQueueStore.facade";
import { convertQueueItemsToSubjects } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import BottomSheetHeader from "./BottomSheetHeader";
import RadicalDetailTabs from "../RadicalDetailTabs/RadicalDetailTabs";
import KanjiDetailTabs from "../KanjiDetailTabs/KanjiDetailTabs";
import VocabDetailTabs from "../VocabDetailTabs/VocabDetailTabs";
import BottomSheetRoot, { BottomSheetContent } from "../BottomSheet";
import { Section } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const SectionWithPadding = styled(Section)`
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
`;

type Props = {
  currentReviewItem: AssignmentQueueItem;
};

function AssignmentQueueItemBottomSheet({ currentReviewItem }: Props) {
  const location = useLocation();
  const { isBottomSheetVisible: showBottomSheet } = useQueueStoreFacade();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { height } = useWindowSize();

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

  const itemAsSubj = convertQueueItemsToSubjects([currentReviewItem])[0];

  // TODO: also reopen to previous breakpoint on return?
  useEffect(() => {
    if (
      (location.pathname === "/reviews/session" ||
        location.pathname === "/lessons/quiz") &&
      showBottomSheet
    ) {
      removeTimeout();
      // using timeout otherwise it gets all weird with the input state being disabled at same time
      timerId.current = window.setTimeout(() => {
        setIsBottomSheetVisible(true);
      }, 500);
    } else {
      setIsBottomSheetVisible(false);
    }
  }, [location.pathname, showBottomSheet]);

  return (
    isBottomSheetVisible && (
      <>
        <BottomSheetRoot>
          <BottomSheetContent title="Subject Info" height={height}>
            <BottomSheetHeader subject={itemAsSubj} />
            <SectionWithPadding>
              {currentReviewItem.object == "radical" && (
                <RadicalDetailTabs
                  radical={itemAsSubj}
                  scrollToDefault={true}
                />
              )}
              {currentReviewItem.object == "kanji" && (
                <KanjiDetailTabs
                  kanji={itemAsSubj}
                  reviewType={currentReviewItem.review_type}
                  scrollToDefault={true}
                />
              )}
              {(currentReviewItem.object == "vocabulary" ||
                currentReviewItem.object == "kana_vocabulary") && (
                <VocabDetailTabs
                  vocab={itemAsSubj}
                  reviewType={currentReviewItem.review_type}
                  scrollToDefault={true}
                />
              )}
            </SectionWithPadding>
          </BottomSheetContent>
        </BottomSheetRoot>
      </>
    )
  );
}

export default AssignmentQueueItemBottomSheet;
