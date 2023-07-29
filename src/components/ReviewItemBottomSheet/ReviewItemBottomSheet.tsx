import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLocation } from "react-router";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { Subject, SubjectType } from "../../types/Subject";
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

const BottomSheetContent = styled(IonRow)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
  border-radius: 25px;
  margin: 0;

  display: flex;
  justify-content: flex-start;
  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 16px);
  padding-bottom: var(--ion-padding, 16px);
`;

const Segment = styled(IonSegment)`
  margin-bottom: 10px;
`;

type Props = {
  currentReviewItem: ReviewQueueItem;
  reviewType: ReviewType;
};

function ReviewItemBottomSheet({ currentReviewItem, reviewType }: Props) {
  const location = useLocation();
  const { queueState } = useReviewQueue();
  const modal = useRef<HTMLIonModalElement>(null);
  let initalValue = currentReviewItem.object == "radical" ? "name" : reviewType;
  const [selectedSegment, setSelectedSegment] = useState<ReviewType | string>(
    initalValue
  );
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

  useEffect(() => {
    if (reviewType !== selectedSegment) {
      let selected =
        currentReviewItem.object == "radical" ? "name" : reviewType;
      setSelectedSegment(selected);
    }
  }, [reviewType]);

  const subjectsWithReadings: SubjectType[] = ["kanji", "vocabulary"];

  const onSegmentClick = (e: any) => {
    const segmentClicked = e.target.value;
    if (segmentClicked !== selectedSegment) {
      setSelectedSegment(segmentClicked);
    }
  };

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
            <BottomSheetContent>
              <Segment value={selectedSegment} onClick={onSegmentClick}>
                {currentReviewItem.object == "kanji" && (
                  <IonSegmentButton value="radicals">
                    <IonLabel>Radicals</IonLabel>
                  </IonSegmentButton>
                )}
                {currentReviewItem.object == "vocabulary" && (
                  <IonSegmentButton value="breakdown">
                    <IonLabel>Breakdown</IonLabel>
                  </IonSegmentButton>
                )}
                {(currentReviewItem.object == "kanji" ||
                  currentReviewItem.object == "vocabulary" ||
                  currentReviewItem.object == "kana_vocabulary") && (
                  <IonSegmentButton value="meaning">
                    <IonLabel>Meaning</IonLabel>
                  </IonSegmentButton>
                )}
                {currentReviewItem.object == "radical" && (
                  <IonSegmentButton value="name">
                    <IonLabel>Name</IonLabel>
                  </IonSegmentButton>
                )}
                {subjectsWithReadings.includes(currentReviewItem.object) && (
                  <IonSegmentButton value="reading">
                    <IonLabel>Reading</IonLabel>
                  </IonSegmentButton>
                )}
              </Segment>

              {currentReviewItem.object == "radical" && (
                <RadicalBottomSheet
                  reviewItem={currentReviewItem}
                  selectedSegment={selectedSegment}
                />
              )}
              {currentReviewItem.object == "kanji" && (
                <KanjiBottomSheet
                  reviewItem={currentReviewItem}
                  selectedSegment={selectedSegment}
                />
              )}
              {(currentReviewItem.object == "vocabulary" ||
                currentReviewItem.object == "kana_vocabulary") && (
                <VocabBottomSheet
                  reviewItem={currentReviewItem}
                  selectedSegment={selectedSegment}
                />
              )}
            </BottomSheetContent>
          </FullWidthGrid>
        </IonContent>
      </IonPage>
    </IonModal>
  );
}

export default ReviewItemBottomSheet;
