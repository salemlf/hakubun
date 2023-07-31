import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLocation } from "react-router";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { Subject } from "../../types/Subject";
import { ReviewQueueItem, ReviewType } from "../../types/ReviewSessionTypes";
import BottomSheetHeader from "./BottomSheetHeader";
import RadicalBottomSheet from "./RadicalBottomSheet";
import KanjiBottomSheet from "./KanjiBottomSheet";
import VocabBottomSheet from "./VocabBottomSheet";
import styled from "styled-components/macro";

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
  currentReviewItem: ReviewQueueItem;
  reviewType: ReviewType;
};

// TODO: some duplicated logic for tab lists in these child components, improve
function ReviewItemBottomSheet({ currentReviewItem, reviewType }: Props) {
  let initalValue = currentReviewItem.object == "radical" ? "name" : reviewType;
  let selectedTabColor = "var(--darkest-purple)";
  let tabsBgColor = "var(--offwhite-color)";
  const [selectedTabKey, setSelectedTabKey] = useState<string>(initalValue);
  const location = useLocation();
  const { queueState } = useReviewQueue();
  const modal = useRef<HTMLIonModalElement>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // TODO: also reopen to previous breakpoint on return? Use something like modal.current.getCurrentBreakpoint()
  useEffect(() => {
    if (
      location.pathname === "/review/session" &&
      queueState.isBottomSheetVisible
    ) {
      // using timeout otherwise it gets all weird with the input state being disabled at same time
      setTimeout(() => {
        setIsBottomSheetVisible(true);
      }, 500);
    } else {
      setIsBottomSheetVisible(false);
    }
  }, [location.pathname, queueState.isBottomSheetVisible]);

  return (
    <IonModal
      ref={modal}
      isOpen={isBottomSheetVisible}
      initialBreakpoint={0.08}
      breakpoints={[0.08, 1]}
      handleBehavior="cycle"
      backdropDismiss={false}
      backdropBreakpoint={0.5}
    >
      <IonPage className="inner-content">
        <IonHeader>
          <Toolbar>
            <Title>Subject Info</Title>
          </Toolbar>
        </IonHeader>
        <BottomSheetHeader subject={currentReviewItem as Subject} />
        <IonContent className="ion-padding">
          <FullWidthGrid>
            {currentReviewItem.object == "radical" && (
              <RadicalBottomSheet
                tabBgColor={tabsBgColor}
                tabSelectionColor={selectedTabColor}
                reviewItem={currentReviewItem}
                selectedTabKey={selectedTabKey}
                setSelectedTabKey={setSelectedTabKey}
              />
            )}
            {currentReviewItem.object == "kanji" && (
              <KanjiBottomSheet
                tabBgColor={tabsBgColor}
                tabSelectionColor={selectedTabColor}
                reviewItem={currentReviewItem}
                selectedTabKey={selectedTabKey}
                setSelectedTabKey={setSelectedTabKey}
              />
            )}
            {(currentReviewItem.object == "vocabulary" ||
              currentReviewItem.object == "kana_vocabulary") && (
              <VocabBottomSheet
                tabBgColor={tabsBgColor}
                tabSelectionColor={selectedTabColor}
                reviewItem={currentReviewItem}
                selectedTabKey={selectedTabKey}
                setSelectedTabKey={setSelectedTabKey}
              />
            )}
          </FullWidthGrid>
        </IonContent>
      </IonPage>
    </IonModal>
  );
}

export default ReviewItemBottomSheet;
