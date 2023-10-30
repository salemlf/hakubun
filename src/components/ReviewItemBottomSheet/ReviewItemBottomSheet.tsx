import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useWindowSize } from "usehooks-ts";
import { useQueueStore } from "../../stores/useQueueStore/useQueueStore";
import { Subject } from "../../types/Subject";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import BottomSheetHeader from "./BottomSheetHeader";
import RadicalDetailTabs from "../RadicalDetailTabs/RadicalDetailTabs";
import KanjiDetailTabs from "../KanjiDetailTabs/KanjiDetailTabs";
import VocabDetailTabs from "../VocabDetailTabs/VocabDetailTabs";
import BottomSheetRoot, { BottomSheetContent } from "../BottomSheet";
import { Section } from "../../styles/BaseStyledComponents";
import styled from "styled-components";
import useQueueStoreFacade from "../../stores/useQueueStore/useQueueStore.facade";

const SectionWithPadding = styled(Section)`
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
`;

type Props = {
  currentReviewItem: AssignmentQueueItem;
};

// TODO: rename so matches AssignmentQueue naming convention
// TODO: modify how BottomSheet component is displayed, rn it's isOpen prop will always be true lol
function ReviewItemBottomSheet({ currentReviewItem }: Props) {
  const location = useLocation();
  const { isBottomSheetVisible: showBottomSheet } = useQueueStoreFacade();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { height } = useWindowSize();

  // TODO: also reopen to previous breakpoint on return?
  useEffect(() => {
    if (
      (location.pathname === "/reviews/session" ||
        location.pathname === "/lessons/quiz") &&
      showBottomSheet
    ) {
      // using timeout otherwise it gets all weird with the input state being disabled at same time
      setTimeout(() => {
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
            <BottomSheetHeader subject={currentReviewItem as Subject} />
            <SectionWithPadding>
              {currentReviewItem.object == "radical" && (
                <RadicalDetailTabs
                  radical={currentReviewItem}
                  scrollToDefault={true}
                />
              )}
              {currentReviewItem.object == "kanji" && (
                <KanjiDetailTabs
                  kanji={currentReviewItem}
                  scrollToDefault={true}
                />
              )}
              {(currentReviewItem.object == "vocabulary" ||
                currentReviewItem.object == "kana_vocabulary") && (
                <VocabDetailTabs
                  vocab={currentReviewItem}
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

export default ReviewItemBottomSheet;
