import { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLocation } from "react-router";
import { Subject } from "../../types/Subject";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import BottomSheetHeader from "./BottomSheetHeader";
import styled from "styled-components";
import RadicalDetailTabs from "../RadicalDetailTabs/RadicalDetailTabs";
import KanjiDetailTabs from "../KanjiDetailTabs/KanjiDetailTabs";
import VocabDetailTabs from "../VocabDetailTabs/VocabDetailTabs";
import { useQueueStore } from "../../stores/useQueueStore";
import BottomSheetRoot, { BottomSheetContent } from "../BottomSheet";

const FullWidthGrid = styled(IonGrid)`
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
`;

const Title = styled(IonTitle)`
  text-align: center;
`;

const Toolbar = styled(IonToolbar)`
  &:first-of-type {
    padding-top: 8px;
  }
  padding-bottom: 8px;
`;

type Props = {
  currentReviewItem: AssignmentQueueItem;
};

// TODO: rename so matches AssignmentQueue naming convention
// TODO: modify how BottomSheet component is displayed, rn it's isOpen prop will always be true lol
function ReviewItemBottomSheet({ currentReviewItem }: Props) {
  const location = useLocation();
  const showBottomSheet = useQueueStore.use.isBottomSheetVisible();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // TODO: also reopen to previous breakpoint on return? Use something like modal.current.getCurrentBreakpoint()
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
      <BottomSheetRoot
        isOpen={isBottomSheetVisible}
        setIsOpen={setIsBottomSheetVisible}
      >
        <BottomSheetContent>
          <IonHeader>
            <Toolbar>
              <Title>Subject Info</Title>
            </Toolbar>
          </IonHeader>
          <BottomSheetHeader subject={currentReviewItem as Subject} />
          <IonContent className="ion-padding">
            <FullWidthGrid>
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
            </FullWidthGrid>
          </IonContent>
        </BottomSheetContent>
      </BottomSheetRoot>
    )
  );
}

export default ReviewItemBottomSheet;
